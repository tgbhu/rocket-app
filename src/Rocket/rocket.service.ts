import { HttpService, Injectable } from '@nestjs/common';
import { response } from 'express';
import * as countdown from 'countdown';
import { map } from 'rxjs/operators';

@Injectable()
export class RocketService {
  constructor(private http: HttpService) {}

  getNextLaunchRemainingTime() {
    return this.http.get('https://api.spacexdata.com/v4/launches/next').pipe(
      map((response) => response.data),
      map((launch) =>
        countdown(new Date(), new Date(launch.date_utc)).toString(),
      ),
    );
  }
}
