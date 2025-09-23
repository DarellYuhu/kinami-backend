import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PavidMetadata } from './entities/pavid.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PavidService {
  constructor(private http: HttpService) {}

  async getArticleList() {
    const { data } = await firstValueFrom(
      this.http.get<PavidMetadata[]>(
        'https://kuda.hitam.id/pavid/en/api/page/list?page=0',
      ),
    );
    return data;
  }

  async getArticle(id: string) {
    const { data } = await firstValueFrom(
      this.http.get<string>(`https://kuda.hitam.id/pavid/en/api/page/p/${id}`),
    );
    return data;
  }
}
