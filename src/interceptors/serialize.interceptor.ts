import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
  Injectable,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ContractResponseDto } from '../contracts/dtos/contract.response.dto';

interface ClassConstructor {
  // so input must be a class
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    return next.handle().pipe(
      map((data) => {
        // Check if the data is an instance of the Contract entity and serialize it accordingly
        if (data instanceof Contract) {
          return plainToClass(ContractResponseDto, data, {
            excludeExtraneousValues: true,
          });
        }
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}