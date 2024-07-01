import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass, ClassTransformOptions } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  // so input must be a class
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    return next.handle().pipe(
      map((data: any) => {
        // Define class transformation options to exclude extraneous values
        const options: ClassTransformOptions = {
          excludeExtraneousValues: true,
        };
        return plainToClass(this.dto, data, options);
      }),
    );
  }
}