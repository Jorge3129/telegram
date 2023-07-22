import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { PollVotePercentage } from "./models/poll-vote-percentage";
import { CreateVotesDto } from "./dto/create-votes.dto";
import { PollAnswerOptionWithUsers } from "./models/poll-answer-option-with-user";

export class PollsApiService {
  constructor(private readonly http: HttpClient) {}

  public async vote(
    pollId: string,
    dto: CreateVotesDto
  ): Promise<PollVotePercentage[]> {
    await this.http.post<void>(
      `${environment.apiUrl}/polls/${pollId}/votes`,
      dto
    );

    return this.http.get<PollVotePercentage[]>(
      `${environment.apiUrl}/polls/${pollId}/votes/percentage`
    );
  }

  public async retractVote(pollId: string): Promise<void> {
    return await this.http.delete<void>(
      `${environment.apiUrl}/polls/${pollId}/votes`
    );
  }

  public async getPollResults(
    pollId: string
  ): Promise<PollAnswerOptionWithUsers[]> {
    return this.http.get<PollAnswerOptionWithUsers[]>(
      `${environment.apiUrl}/polls/${pollId}/votes/results`
    );
  }
}

export const pollsApiService = new PollsApiService(httpClient);
