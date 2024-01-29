import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './Dtos/SignUpDto';
import { LoginDto} from './Dtos/LoginDto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>,
        private jwtService : JwtService
    ) {}

    async Signup(SignUpDto : SignUpDto) : Promise<User> {
        const exist = await this.userModel.findOne({ email : SignUpDto.Email})
        if(exist){
            throw new ConflictException('Email already exist')
        }
        const { Firstname , Lastname , Phone , Email } = SignUpDto
        let { Password } = SignUpDto
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);
        const user = await this.userModel.create({
            Firstname ,
            Lastname ,
            Phone ,
            Email , 
            Password,
            })
        if(!user){
            throw new InternalServerErrorException('User not created');
        }
        return user
    }

    async Login(LoginDto : LoginDto) : Promise<{}> {
        const user = await this.userModel.findOne({Email : LoginDto.Email})
        if(!user){
            throw new UnauthorizedException('Email not exist')
        }
        if(!bcrypt.compareSync(LoginDto.Password, user.Password)){
            throw new UnauthorizedException('Password not match')
        }
        return { 
            Status : 200 , 
            Token : this.jwtService.sign({id : user._id ,Email : user.Email, Role : user.Role}),
        }
    }

}
