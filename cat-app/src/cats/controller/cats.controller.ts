import { LoginRequestDto } from './../../auth/dto/login.request.dto';
import { CatRequestDto } from './../dto/casts.request.dto';
import { CatDto } from './../dto/cats.dto';
import { Cat } from './../cat.schema';
import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import { CatsService } from './../service/cats.service';
import { SuccessInterceptor } from './../../common/interceptors/success.interceptor';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseInterceptors(SuccessInterceptor)
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsServoce: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @HttpCode(200)
  @Post('signup')
  async signup(@Body() body: CatRequestDto) {
    return await this.catsServoce.signup(body);
  }

  @ApiResponse({
    status: 201,
    description: '성공',
    type: CatDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiResponse({
    status: 201,
    description: '업로드 성공',
    type: CatDto,
  })
  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image'))
  @Post('upload')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
