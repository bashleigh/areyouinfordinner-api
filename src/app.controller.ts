import { Get, Controller, Res } from '@nestjs/common';
const manifest = require(process.cwd() + '/public/build/manifest.json');

@Controller()
export class AppController {
  @Get()
  index(@Res() response): string {
    // TODO pre-render PWA here

    return response.render('index', {
      manifest,
    });
  }
}
