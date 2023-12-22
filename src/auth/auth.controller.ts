import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Get()
    getAllUsers(){
        return this.authService.getAllUsers()
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authDto : authDto){
        return this.authService.Signup(authDto)
    }
    
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() authDto : authDto){
        return this.authService.Login(authDto)
    }
}
