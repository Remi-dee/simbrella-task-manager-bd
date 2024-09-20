import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './user.schema';
import { GetUser } from 'src/auth/get-user.decorator';
import { EnableNotification } from './user.dto';

@ApiTags('users')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get current user profile' })
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.userService.findById(req.user._id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers() {
    return this.userService.findAll(); // Ensure you implement findAll in UserService
  }

  @Patch('preferences')
  updateNotificationPreferences(
    @Body() preferences: EnableNotification,
    @GetUser() user: User,
  ) {
    console.log('this is user', user);
    return this.userService.updatePreferences(
      user._id,
      preferences.notificationsEnabled,
    );
  }

  @Get('preferences')
  getUserPreferences(@GetUser() user: User) {
    console.log('this is user', user);
    return this.userService.getUserPreferences(user._id);
  }
}
