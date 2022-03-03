import { CatRequestDto } from './../dto/casts.request.dto';
import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatsRepository) {}

  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당 고양이 존재');
    }
    const hashed = await bcrypt.hash(password, 10);
    const cat = await this.catRepository.create({
      email,
      name,
      password: hashed,
    });
    return cat;
  }
}
