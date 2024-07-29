import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedAccessException extends HttpException {
  constructor() {
    super('Unauthorized access to menu option', HttpStatus.FORBIDDEN);
  }
}