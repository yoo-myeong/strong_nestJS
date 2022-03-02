import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/casts.request.dto';
import { CatDto } from './dto/cats.dto';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsServoce: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'cat';
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signup(@Body() body: CatRequestDto) {
    return await this.catsServoce.signup(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }
}
