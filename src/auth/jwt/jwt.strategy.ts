import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly env: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.get<string>('JWT_SECRET_KEY'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const user = await this.userService.findOneByUser(payload.id);
        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }
}
