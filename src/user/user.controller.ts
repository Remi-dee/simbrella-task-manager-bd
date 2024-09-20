import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './user.schema';
import { GetUser } from 'src/auth/get-user.decorator';
import { EnableNotification } from './user.dto';

@ApiTags('users')
@ApiBearerAuth('Authorization')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get current user profile' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.userService.findById(req.user._id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.findAll(); // Ensure you implement findAll in UserService
  }

  @UseGuards(JwtAuthGuard)
  @Patch('preferences')
  updateNotificationPreferences(
    @Body() preferences: EnableNotification,
    @GetUser() user: User,
  ) {
    return this.userService.updatePreferences(
      user._id,
      preferences.notificationsEnabled,
    );
  }

  @Get('preferences')
  getUserPreferences(@GetUser() user: User) {
    return this.userService.getUserPreferences(user._id);
  }
}
