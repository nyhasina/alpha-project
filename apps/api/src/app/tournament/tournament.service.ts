import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Tournament } from '@prisma/client';
import { MatchModel } from '../match/match.model';
import { MatchService } from '../match/match.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoundService } from '../round/round.service';
import { computePowerOf2 } from '../shared/helpers/compute-power-of-2.helper';
import { TournamentModel, TournamentNode } from './tournament.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService, private matchService: MatchService, private roundService: RoundService) {}

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

    private bstTraversal(root: TournamentNode, process: Function) {
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

    private scheduleTournament(tournament: Partial<TournamentModel>): TournamentNode {
        const n = tournament?.teams.length; // the number of participants of the tournament
        const p = computePowerOf2(n); // The smallest power of 2 at least as large as
        const eliminatoryRoundMatchsNumber = n - p / 2;
        const firstRoundParticipantsNumber = p / 2;
        const tournamentMatchsNumber = firstRoundParticipantsNumber - 1 + eliminatoryRoundMatchsNumber;
        const tournamentMatchs: MatchModel[] = [];
        for (let i = 0; i < tournamentMatchsNumber; i++) {
            tournamentMatchs.push(new MatchModel(uuid()));
        }
        tournamentMatchs.sort((a, b) => (a.getUuid() < b.getUuid() ? -1 : 1));
        const tree = this.generateTree(tournamentMatchs, 0, tournamentMatchs.length - 1);
        this.printAllNodes(tree);
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
        this.bstTraversal(root, function (node: TournamentNode) {
            console.log(`--- Match ${node?.data.uuid} ---`);
            console.log(`A: ${node?.left?.data.uuid}`);
            console.log(`B: ${node?.right?.data.uuid}`);
            console.log();
        });
    }
}
