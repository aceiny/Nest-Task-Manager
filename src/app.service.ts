import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello This is a simple nest js app created by aceiny , go check other routes';
  }
}
