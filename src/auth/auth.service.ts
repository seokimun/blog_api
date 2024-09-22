import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Payload } from './jwt/jwt.payload';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/Login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly env: ConfigService,
    ) {}

    createPayload(user: UserEntity): Payload {
        return {
            userId: user.id,
            userName: user.name,
        };
    }

    signToken(payload: Payload): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.env.get<string>('JWT_EXPIRES_IN'),
        });
    }

    async validateUser(loginDto: LoginDto): Promise<UserEntity> {
        const { email, password } = loginDto;
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new UnauthorizedException('유효하지 않은 로그인 정보입니다.');
        }

        const payload = this.createPayload(user);
        const accessToken = this.signToken(payload);

        return {
            access_token: accessToken,
        };
    }
}
