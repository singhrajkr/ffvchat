import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    console.log('Hello 2')
    return { 
      API_STAUS: 'REST API APP IS UP AND RUNNING !!!'
    }
  }
}
