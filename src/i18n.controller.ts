import { Controller, Get } from '@nestjs/common';

@Controller('i18n')
export class I18nController {
  @Get()
  getTranslations() {
    // Logic to return translations
  }
}