import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Tournament } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { MatchModel } from '../match/match.model';
import { PrismaService } from '../prisma/prisma.service';
import { computePowerOf2 } from '../shared/helpers/compute-power-of-2.helper';
import { getRandomInt } from '../shared/helpers/get-random-int.helper';
import { TeamModel } from '../team/team.model';
import { TournamentModel, TournamentNode } from './tournament.model';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService) {}

    private static bstTraversal(root: TournamentNode, process: Function) {
        let queue = [root];
        let currentNode;
        while (queue.length) {
            currentNode = queue.shift();
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
            process(currentNode);
        }
    }

    async loadTournament(where: Prisma.TournamentWhereUniqueInput): Promise<Tournament | null> {
        return this.prisma.tournament.findUnique({
            where,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async loadTournaments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TournamentWhereUniqueInput;
        where?: Prisma.TournamentWhereInput;
        orderBy?: Prisma.TournamentOrderByInput;
    }): Promise<Tournament[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tournament.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async count(where: Prisma.TournamentWhereInput = {}): Promise<number> {
        return this.prisma.tournament.count({
            where,
        });
    }

    async createTournament(data: Prisma.TournamentCreateInput): Promise<Tournament> {
        return this.prisma.tournament.create({
            data,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async updateTournament(params: {
        where: Prisma.TournamentWhereUniqueInput;
        data: Prisma.TournamentUpdateInput;
    }): Promise<Tournament> {
        const { where, data } = params;
        return this.prisma.tournament.update({
            data,
            where,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async addParticipants(tournamentId: number, participants: number[]): Promise<Tournament> {
        const tournament = await this.loadTournament({ id: tournamentId });
        if (tournament && tournament.closed) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: 'This tournament is already closed',
                },
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        return this.updateTournament({
            data: {
                teams: {
                    connect: participants.map((id) => ({ id })),
                },
            },
            where: {
                id: tournamentId,
            },
        });
    }

    async closeRegistration(tournamentId: number): Promise<Tournament> {
        const tournament: Partial<TournamentModel> = await this.loadTournament({ id: tournamentId });
        if (!tournament) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: `Tournament ${tournamentId} not found`,
                },
                HttpStatus.NOT_FOUND
            );
        }
        const root = this.scheduleTournament(tournament);
        this.printAllNodes(root);
        return this.updateTournament({
            data: {
                closed: true,
            },
            where: {
                id: tournamentId,
            },
        });
    }

    async deleteTournament(where: Prisma.TournamentWhereUniqueInput): Promise<Tournament> {
        return this.prisma.tournament.delete({
            where,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    private scheduleTournament(tournament: Partial<TournamentModel>): TournamentNode {
        const n = tournament?.teams.length; // the number of participants of the tournament
        const p = computePowerOf2(n); // The smallest power of 2 at least as large as
        const eliminatorRoundMatchesNumber = n - p / 2;
        const firstRoundParticipantsNumber = p / 2;
        const tournamentMatchesNumber = firstRoundParticipantsNumber - 1 + eliminatorRoundMatchesNumber;
        const tournamentMatches: MatchModel[] = [];
        for (let i = 0; i < tournamentMatchesNumber; i++) {
            tournamentMatches.push(new MatchModel(uuid()));
        }
        tournamentMatches.sort((a, b) => (a.getUuid() < b.getUuid() ? -1 : 1));
        const tree = this.generateTree(tournamentMatches, 0, tournamentMatches.length - 1);
        this.placeEliminatorRoundParticipants(tree, tournament.teams);
        return tree;
    }

    private generateTree(values: MatchModel[], start: number, end: number): TournamentNode {
        if (start > end) {
            return null;
        }
        const middle = Math.floor((start + end) / 2);
        const root = new TournamentNode(values[middle]);
        root.left = this.generateTree(values, start, middle - 1);
        root.right = this.generateTree(values, middle + 1, end);
        return root;
    }

    private printAllNodes(root: TournamentNode): void {
        TournamentService.bstTraversal(root, function (node: TournamentNode) {
            console.log(`--- Match ${node?.data.uuid} ---`);
            console.log(`A: ${node?.left?.data.uuid}`);
            console.log(`B: ${node?.right?.data.uuid}`);
            console.log();
        });
    }

    private placeEliminatorRoundParticipants(root: TournamentNode, participants: Partial<TeamModel>[]) {
        let p = participants;
        TournamentService.bstTraversal(root, function (node: TournamentNode) {
            if (!node.left && !node.right) {
                const [a] = p.splice(getRandomInt(p.length - 1, 0), 1);
                const [b] = p.splice(getRandomInt(p.length - 1, 0), 1);
                node.data.teamAId = a?.id;
                node.data.teamBId = b?.id;
                console.log(node.data);
            }
        });
    }
}
