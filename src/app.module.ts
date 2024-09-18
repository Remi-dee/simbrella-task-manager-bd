import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Path to the .env file
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Connect MongoDB using .env
    AuthModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
