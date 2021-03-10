import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateTournamentInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  closed?: boolean;

  @Field((returns) => Int)
  tournamentType: number;

  @Field((returns) => [Int], { nullable: true })
  rules: number[];

  @Field((returns) => Int)
  format: number;

  @Field((returns) => [Int], { nullable: true })
  teams: number[];

  @Field((returns) => [Int], { nullable: true })
  rounds: number[];
}
