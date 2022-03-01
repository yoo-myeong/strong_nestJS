import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cats';
  }

  @Get(':id')
  getOneCatById() {
    return 'one cat';
  }
}
