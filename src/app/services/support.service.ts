import { Injectable, signal } from '@angular/core';

export interface SupportMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'replied' | 'resolved';
  createdAt: Date;
  reply?: string;
  repliedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private messages = signal<SupportMessage[]>([]);
  
  getMessages() {
    return this.messages.asReadonly();
  }
  
  sendMessage(message: Omit<SupportMessage, 'id' | 'createdAt' | 'status'>): void {
    const newMessage: SupportMessage = {
      id: Date.now(),
      ...message,
      status: 'pending',
      createdAt: new Date()
    };
    this.messages.update(current => [newMessage, ...current]);
    console.log('Support message sent:', newMessage);
  }
  
  replyToMessage(id: number, reply: string): void {
    this.messages.update(current =>
      current.map(msg =>
        msg.id === id
          ? { ...msg, reply, repliedAt: new Date(), status: 'replied' }
          : msg
      )
    );
  }
}