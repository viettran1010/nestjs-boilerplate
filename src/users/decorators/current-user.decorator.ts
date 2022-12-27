import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    console.log('=====dawdawa');
    // ExecutionContext can work with other protocols, not just HTTP
    const request = context.switchToHttp().getRequest();
    // currentUser is assigned in the CurrentUserInterceptor
    console.log('request.currentUser: ', request.currentUser);
    return request.currentUser;
  },
);
