import { Cat } from './../../cats/cat.schema';
import { PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
