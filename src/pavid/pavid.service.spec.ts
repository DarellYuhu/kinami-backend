import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { PavidService } from './pavid.service';
import { PavidMetadata } from './entities/pavid.entity';
import { AxiosResponse } from 'axios';

describe('PavidService', () => {
  let service: PavidService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PavidService,
        { provide: HttpService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<PavidService>(PavidService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getArticleList', () => {
    it('should return an array of metadata', async () => {
      const mockData: PavidMetadata[] = [
        {
          id: '1',
          date: '2025-01-01',
          link: 'link1',
          title: 'title1',
          domain: 'd1',
          subdomain: 'sd1',
        },
      ];
      const axiosResponse: AxiosResponse<PavidMetadata[]> = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(axiosResponse));

      const data = service.getArticleList();

      await expect(data).resolves.toEqual(mockData);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://kuda.hitam.id/pavid/en/api/page/list?page=0',
      );
    });
  });

  describe('getArticle', () => {
    it('should return article string', async () => {
      const id = '123';
      const mockArticle = '<html>content</html>';
      const axiosResponse: AxiosResponse<string> = {
        data: mockArticle,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(axiosResponse));

      await expect(service.getArticle(id)).resolves.toEqual(mockArticle);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://kuda.hitam.id/pavid/en/api/page/p/${id}`,
      );
    });
  });
});
