export interface IPrompt {
  name: string;
  content: string;
  description: string;
  category: string;
  tags?: string[];
  paper?: string;
}
