import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";

export class UploadsApiService {
  private fileFormData: FormData = new FormData();

  constructor(private readonly http: HttpClient) {}

  public async getFile(filename: string): Promise<Blob> {
    const response = await this.http.get(
      `${environment.apiUrl}/media/${filename}`,
      {
        responseType: "blob",
      }
    );
    return response;
  }

  public preparePostFile(formData: FormData) {
    this.fileFormData = formData;
  }

  public async postFile() {
    return await fetch(`${environment.apiUrl}/media`, {
      method: "POST",
      body: this.fileFormData,
    });
  }
}

export const uploadsApiService = new UploadsApiService(httpClient);
