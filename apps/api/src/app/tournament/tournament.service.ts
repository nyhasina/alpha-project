import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Tournament } from '@prisma/client';
import { CreateMatchInput, MatchModel } from '../match/match.model';
import { MatchService } from '../match/match.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoundService } from '../round/round.service';
import { computePowerOf2 } from '../shared/helpers/compute-power-of-2.helper';
import { generateUuid } from '../shared/helpers/generate-unique-serial.helper';
import { getRandomInt } from '../shared/helpers/get-random-int.helper';
import { TeamModel } from '../team/team.model';
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
        // const perfectParticipantsNumber = computePowerOf2(tournament.teams.length);
        // const firstRoundParticipantsNumber = this.computeRoundParticipants(tournament.teams.length, perfectParticipantsNumber);
        // const firstRoundRestNumber = perfectParticipantsNumber - tournament.teams.length;
        // const firstRoundMatchsNumber = this.computeRoundMatchs(tournament.teams.length, perfectParticipantsNumber);
        // const nextRoundParticipantsNumber = perfectParticipantsNumber / 2;
        // const nextRoundMatchsNumber = Math.trunc(firstRoundMatchsNumber / 2) + Math.trunc(nextRoundParticipantsNumber / 2);
        // const firstRoundParticipants = [];
        // const pool = tournament.teams;
        // await this.scheduleMatchs(
        //     firstRoundParticipantsNumber,
        //     pool,
        //     firstRoundParticipants,
        //     tournament,
        //     firstRoundMatchsNumber,
        //     perfectParticipantsNumber
        // );
        const tree = this.generateTournamentTree(tournament);
        console.log(tree);
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

    private generateTournamentTree(tournament: Partial<TournamentModel>): TournamentNode {
        const n = tournament?.teams.length; // the number of participants of the tournament
        const p = computePowerOf2(n); // The smallest power of 2 at least as large as
        const eliminatoryRoundParticipantsNumber = 2 * n - p;
        const eliminatoryRoundMatchsNumber = n - p / 2;
        const firstRoundParticipantsNumber = p / 2;
        const firstRoundMatchsNumber = firstRoundParticipantsNumber / 2;
        const tournamentMatchsNumber = firstRoundParticipantsNumber - 1 + eliminatoryRoundMatchsNumber;
        const tournamentMatchs: MatchModel[] = [];
        for (let i = 0; i < tournamentMatchsNumber; i++) {
            tournamentMatchs.push(new MatchModel(uuid()));
        }
        tournamentMatchs.sort((a, b) => (a.getUuid() < b.getUuid() ? -1 : 1));
        const tree = this.matchArrayToBST(tournamentMatchs);
        return tree;
    }

    private computeRoundParticipants(participants: number, perfectParticipantsNumber: number): number {
        return 2 * participants - perfectParticipantsNumber;
    }

    private computeRoundMatchs(participants: number, perfectParticipantsNumber: number): number {
        return participants - perfectParticipantsNumber / 2;
    }

    private async scheduleMatchs(
        firstRoundParticipantsNumber: number,
        pool: TeamModel[],
        firstRoundParticipants: Partial<TeamModel>[],
        tournament: Partial<TournamentModel>,
        firstRoundMatchsNumber: number,
        perfectParticipantsNumber: number
    ) {
        for (let i = 0; i < firstRoundParticipantsNumber; i++) {
            const [team] = pool.splice(getRandomInt(pool.length - 1, 0), 1);
            firstRoundParticipants.push(team);
        }
        const firstRound = await this.roundService.createRound({ rank: 1, tournament: { connect: { id: tournament.id } } });
        const firstRoundMatchs = [];
        let firstRoundMatch: CreateMatchInput = new CreateMatchInput(null, null, null);
        for (let i = 0; i < firstRoundMatchsNumber; i++) {
            const [teamA] = firstRoundParticipants.splice(getRandomInt(firstRoundParticipants.length - 1, 0), 1);
            const [teamB] = firstRoundParticipants.splice(getRandomInt(firstRoundParticipants.length - 1, 0), 1);
            firstRoundMatch = new CreateMatchInput(teamA.id, teamB.id, firstRound.id);
            firstRoundMatchs.push(firstRoundMatch);
        }
        await this.saveMatch(firstRoundMatchs);
        if (!pool.length) {
            return;
        }
        const secondRoundParticipantsNumber = perfectParticipantsNumber / 2;
        const secondRoundMatchNumber = secondRoundParticipantsNumber / 2;
        const secondRound = await this.roundService.createRound({
            rank: 2,
            tournament: { connect: { id: tournament.id } },
        });
        const secondRoundMatchs = [];
        let secondRoundMatch = null;
        for (let i = 0; i < secondRoundMatchNumber; i++) {
            const [teamA] = pool.splice(getRandomInt(pool.length - 1, 0), 1);
            const [teamB] = pool.splice(getRandomInt(pool.length - 1, 0), 1);
            secondRoundMatch = new CreateMatchInput(teamA?.id, teamB?.id, secondRound.id);
            secondRoundMatchs.push(secondRoundMatch);
        }
        await this.saveMatch(secondRoundMatchs);
    }

    private async saveMatch(matchs: CreateMatchInput[]) {
        for (const match of matchs) {
            await this.matchService.createMatch({
                round: match.round ? { connect: { id: match.round } } : {},
                teamA: match.teamA ? { connect: { id: match?.teamA } } : {},
                teamB: match?.teamB ? { connect: { id: match?.teamB } } : {},
            });
        }
    }

    private traverse(values: MatchModel[], start: number, end: number): TournamentNode {
        if (start > end) {
            return null;
        }
        const middle = Math.floor((start + end) / 2);
        const root = new TournamentNode(values[middle]);
        root.left = this.traverse(values, start, middle - 1);
        root.right = this.traverse(values, middle + 1, end);
        return root;
    }

    private matchArrayToBST(values: MatchModel[]) {
        return this.traverse(values, 0, values.length - 1);
    }
}
