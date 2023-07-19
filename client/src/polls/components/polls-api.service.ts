import environment from "../../environment/environment";
import { HttpClient, httpClient } from "../../shared/http/http-client";
import { CreateVotesDto } from "./dto/create-votes.dto";

export class PollsApiService {
  constructor(private readonly http: HttpClient) {}

  public async vote(pollId: string, dto: CreateVotesDto): Promise<void> {
    return await this.http.post<void>(
      `${environment.apiUrl}/polls/${pollId}/votes`,
      dto
    );
  }

  public async retractVote(pollId: string): Promise<void> {
    return await this.http.delete<void>(
      `${environment.apiUrl}/polls/${pollId}/votes`
    );
  }
}

export const pollsApiService = new PollsApiService(httpClient);
