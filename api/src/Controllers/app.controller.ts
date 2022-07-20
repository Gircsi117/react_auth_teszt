import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from '../Services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() body) {
    //console.log("adatok");
    
    return [
      {id:1, name:"Erik", age:20},
      {id:2, name:"Anna", age:20},
      {id:3, name:"Ákos", age:20},
      {id:4, name:"Madrid", age:20},
      {id:5, name:"Zalán", age:20},
      {id:6, name:"Emese", age:20},
      {id:7, name:"Han Solo", age:20},
    ];
  }
}
