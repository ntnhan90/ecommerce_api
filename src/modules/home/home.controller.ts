import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/pubilc.decorator';
import { ApiPublic } from 'src/decorators/http.decorators';

@Controller('/')
export class HomeController {
  @Get()
  @Public()
  @ApiPublic({summary: 'Home'})
  home(){
    return 'Wellcome to the 21 API';
  }
}