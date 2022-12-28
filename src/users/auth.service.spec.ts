// create test for auth.service.ts using nestjs testing module

// Path: src/users/auth.service.spec.ts

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let users = [];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            find: (email: string) =>
              Promise.resolve(users.filter((user) => user.email === email)),
            create: (email: string, password: string) => {
              const user = { id: 1, email, password } as User;
              users.push(user);
              return Promise.resolve(user);
            },
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await authService.signup('dawda@awdac.com', 'password');
    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await authService.signup('111@gmail.com', 'password');

    await expect(
      authService.signup('111@gmail.com', 'password'),
    ).rejects.toThrow();
  });

  it('throws if signin is called with an unused email', async () => {
    jest
      .spyOn(userService, 'find')
      .mockImplementation(() => Promise.resolve([]));
    await expect(
      authService.signin('adwa@acwa.com', 'password'),
    ).rejects.toThrow();
  });

  it('throws if an invalid password is provided', async () => {
    await authService.signup('adwa@cawc.com', 'invalidaawda'),
      await expect(
        authService.signin('adwa@cawc.com', 'invalid'),
      ).rejects.toThrow();
  });

  it('returns a user if correct password is provided', async () => {
    await authService.signup('awda@awc.com', 'password');
    const user = await authService.signin('awda@awc.com', 'password');
    expect(user).toBeDefined();
  });
});
