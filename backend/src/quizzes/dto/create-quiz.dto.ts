export class CreateQuizDto {
  readonly name: string;
  readonly tags: string[];
  readonly image?: File;
}
