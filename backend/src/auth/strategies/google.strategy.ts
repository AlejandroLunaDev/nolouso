import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL_DEV,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user: any) => void,
  ): Promise<any> {
    const { id, emails, name, photos } = profile;
    const email = emails[0].value;
    const firstName = name?.givenName;
    const lastName = name?.familyName;
    const profilePicture = photos[0]?.value;

    const payload = {
      googleId: id,
      email,
      firstName,
      lastName,
      profilePicture,
      accessToken,
    };

    done(null, payload);
  }
}
