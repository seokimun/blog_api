import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Payload } from './jwt/jwt.payload';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('유효하지 않은 로그인 정보입니다.');
        }

        const payload: Payload = { id: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
