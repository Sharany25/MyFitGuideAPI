import { Injectable } from '@nestjs/common';
import Fuse from 'fuse.js';
import faqs from './faq.json';

interface FaqItem {
  id: string;
  tags: string[];
  respuesta: string;
}

@Injectable()
export class ChatbotService {
  private fuse: any;

  constructor() {
    const options = {
      keys: ['tags'],
      threshold: 0.4,
    };

    this.fuse = new Fuse(faqs as FaqItem[], options);
  }

  getResponse(message: string): string {
    const results = this.fuse.search(message.toLowerCase());

    if (results.length > 0) {
      return results[0].item.respuesta;
    }

    return 'Lo siento, no entendí tu pregunta.';
  }
}
