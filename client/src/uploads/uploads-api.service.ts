import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";

export class UploadsApiService {
  private fileFormData: FormData = new FormData();

  constructor(private readonly http: HttpClient) {}

  public async getFile(filename: string): Promise<Blob> {
    const response = await this.http.get(
      `${environment.apiUrl}/uploads/${filename}`,
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
    const form = this.fileFormData;

    await this.http.post(`${environment.apiUrl}/uploads`, form, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  }
}

export const uploadsApiService = new UploadsApiService(httpClient);
