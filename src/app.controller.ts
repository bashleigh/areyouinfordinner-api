import { Get, Controller, Res } from '@nestjs/common';
const manifest = require(process.cwd() + '/public/build/manifest.json');

@Controller()
export class AppController {
  @Get()
  root(@Res() response): string {
    //TODO pre-render PWA he

    return response.render('index', {
      manifest: manifest,
    });
  }
}
