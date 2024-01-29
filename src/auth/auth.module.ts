import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './role.guard';
require('dotenv').config()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy : 'jwt'
    }),
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : { 
        expiresIn : '30d' 
      }
    }),
    MongooseModule.forFeature([{name : User.name , schema : UserSchema }])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
   RolesGuard, 
  ],
  exports : [
    JwtStrategy,
    PassportModule,
    JwtModule
  ]

})
export class AuthModule {}
