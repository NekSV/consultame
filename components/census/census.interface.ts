export interface IQuestion {
  component: any;
  next: number | undefined;
}

export type QuestionListType = Map<number, IQuestion>;

export class QuestionList extends Map<number, IQuestion> {}
