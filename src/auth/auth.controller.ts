import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description:
      'The user has been successfully registered and the user data is returned.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data. The user could not be registered.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while registering the user.',
  })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description:
      'User logged in successfully. Returns JWT token for authentication.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials provided.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while logging in.',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
