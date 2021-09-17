export class CreateQuestionDto {
  readonly row: number;
  readonly price: number;
  readonly text: string;
  readonly type?: 'text' | 'audio' | 'video' | 'image' = 'text';
  readonly answer: string;
  readonly wrongAnswer?: string;
}
