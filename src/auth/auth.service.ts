import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, LoginDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private configService: ConfigService,

    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const isEmailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isEmailExist) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user: any = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Convert the Mongoose document to a plain object and remove the password
    const userObject = user.toObject(); // Convert to plain JavaScript object
    delete userObject.password; // Remove the password field

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Success',
      user: userObject, // this user will not have the password
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

//   getMongoUri() {
//     return this.configService.get<string>('MONGODB_URI');
//   }
