import { ChatGPTDom } from '../chatgpt/chatgpt.dom';

export class BardDom extends ChatGPTDom {
  protected name = 'Bard';
  protected textAreaSelector = 'div > textarea';
}
