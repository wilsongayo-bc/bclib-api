import { HttpService } from "@nestjs/axios";
import {
    // ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
  } from "@nestjs/common";
import { AxiosResponse } from "axios";
  import { catchError, lastValueFrom, map, Observable } from "rxjs";

@Injectable()
export class ExternalService {
    constructor(private readonly httpService: HttpService) {}
    private readonly logger = new Logger(ExternalService.name);

    async getDatas() {
        const url = process.env.EXTERNAL_ENDPOINT;
        const request = this.httpService
          .get(url, {
            // withCredentials: true,
            // auth: this.getAuthRequest(),
          })
          .pipe(
            map((res) => {
              return res.data;
            })
          )
          .pipe(
            catchError((err) => {
              err.config.auth = undefined; //Hide Auth Details
              this.logger.error(err);
              throw new HttpException(err, HttpStatus.BAD_REQUEST);
            })
          );
        
        const extResponse = await lastValueFrom(request);
        const dataList = extResponse["Results"];
        console.log("dataList...", dataList);
        return dataList;
      }
}