import { Cat } from './../cat.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '135134',
    description: 'id',
    required: true,
  })
  id: string;
}
