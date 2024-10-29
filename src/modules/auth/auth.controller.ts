import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiAuth, ApiPublic } from 'src/decorators/http.decorators';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RefreshResDto } from './dto/refresh.res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @ApiPublic({
      type: LoginResDto,
      summary: 'Sign in'
    })
    @Post('login')
    async signIn(@Body() userLogin: LoginReqDto): Promise<LoginResDto>{
        return await this.authService.signIn(userLogin);
    }
}
