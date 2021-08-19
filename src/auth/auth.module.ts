import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './localandjwt/jwt.strategy';
import { AuthService } from './auth.service';
import { jwtConstants } from './localandjwt/constants';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({secret: jwtConstants.secret, signOptions: { expiresIn: '3600s' }})],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}