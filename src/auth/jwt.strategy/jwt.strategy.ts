import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema'; // Import the User model
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // Inject UserModel
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { sub: userId } = payload; // Extract the userId from the token payload

    // Fetch the user from the database using the userId
    const user = await this.userModel.findById(userId).select('-password'); // Don't return the password

    if (!user) {
      throw new UnauthorizedException('User not found'); // Throw exception if user is not found
    }

    return user; // Return the full user object
  }
}
