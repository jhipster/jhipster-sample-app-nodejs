import { PassportSerializer } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class SessionSerializer extends PassportSerializer {

  logger = new Logger('serializer');

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    this.logger.log('serialize ' + user);
    done(null, user);
  }
  deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
    this.logger.log('desserialize ' + payload);
    done(null, payload);
  }
}
