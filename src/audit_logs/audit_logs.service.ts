import { Injectable } from '@nestjs/common';
import { I18nService } from '@nestjs-modules/i18n';

@Injectable()
export class AuditLogsService {
  constructor(private readonly i18n: I18nService) {}

  async provideUserFeedback(action: string, lang: string): Promise<string> {
    let messageKey: string;

    switch (action) {
      case 'approve':
        messageKey = 'feedback.approve';
        break;
      case 'deny':
        messageKey = 'feedback.deny';
        break;
      case 'update':
        messageKey = 'feedback.update';
        break;
      case 'verify':
        messageKey = 'feedback.verify';
        break;
      case 'back':
        messageKey = 'feedback.back';
        break;
      default:
        messageKey = 'feedback.unknown';
        break;
    }

    return this.i18n.translate(messageKey, { lang });
  }
}