import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { 
      API_STAUS: 'REST API APP IS UP AND RUNNING !!!'
    }
  }
}
