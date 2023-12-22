import { Body, Controller, Get, Logger, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Get()
    @UseGuards(AuthGuard())
    CheckGuards(@Req() req){
        Logger.log(req.user)
        return 'guards'
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
