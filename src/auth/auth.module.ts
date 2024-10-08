import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    // TypeOrmModule.forFeature([User])
    UserModule,
    JwtModule.register({
      global: true,
      secret: '3StaE$L^lL^a3PRinC!^>Al',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
