import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    return next.handle().pipe(
      map((data) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}