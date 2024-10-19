import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('/')
export class HomeController {
  @Get()
  home(){
    return 'Wellcome to the 21 API';
  }
}