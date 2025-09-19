import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  getBotReply(@Body('message') message: string) {
    return {
      reply: this.chatbotService.getResponse(message),
    };
  }
}
