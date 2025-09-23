import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KikuListData, KikuRaw } from './entities/kiku.entity';

@Injectable()
export class KikuService {
  constructor(private http: HttpService) {}

  async getDataList() {
    const { data } = await firstValueFrom(
      this.http.get<KikuListData>(
        'http://172.104.52.10:8041/api/transcriptions?per_page=50&page=1',
      ),
    );
    return data.items;
  }

  async getTranscribeData() {
    const { data } = await firstValueFrom(
      this.http.get<KikuRaw>(
        'http://172.104.52.10:8041/api/transcriptions?per_page=50&page=1',
      ),
    );
    return data;
  }
}
