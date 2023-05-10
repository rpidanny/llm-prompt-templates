export interface IPromptTemplate {
  name: string;
  content: string;
  description: string;
  category: string;
  tags?: string[];
  paper?: string;
}
