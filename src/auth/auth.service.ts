import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import { authDto } from './auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>,
        private jwtService : JwtService
    ) {}

    async getAllUsers() : Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }
    async Signup(authDto : authDto) : Promise<User> {
        const exist = await this.userModel.findOne({ username : authDto.username })
        if(exist){
            throw new ConflictException('Username already exist')
        }
        const { username , password } = authDto
        try{
            const salt = bcrypt.genSaltSync(10);
            const HashedPass = bcrypt.hashSync(password, salt);
            const user = await this.userModel.create({
                username,
                password : HashedPass
            })
            if(!user){
                throw new InternalServerErrorException('User not created');
            }
            return user
        }catch(err){
            throw new InternalServerErrorException('User not created');
        }
    }
    async Login(authDto : authDto) : Promise<{Token:string}> {
        const user = await this.userModel.findOne({ username : authDto.username })
        if(!user){
            throw new UnauthorizedException('Username not exist')
        }
        if(!bcrypt.compareSync(authDto.password, user.password)){
            throw new UnauthorizedException('Password not match')
        }
        return { Token : this.jwtService.sign({username : user.username , id : user._id , role : 'user'}) }
    }

}
