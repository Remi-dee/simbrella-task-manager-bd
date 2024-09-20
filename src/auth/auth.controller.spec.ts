import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn((dto: CreateUserDto) => {
      return {
        id: '1',
        user_name: dto.user_name,
        email: dto.email,
      };
    }),
    login: jest.fn((dto: LoginDto) => {
      return { accessToken: 'some-jwt-token' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        user_name: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      expect(await controller.register(createUserDto)).toEqual({
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      });

      expect(service.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should login a user and return a JWT token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(await controller.login(loginDto)).toEqual({
        accessToken: 'some-jwt-token',
      });

      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
