export interface ISurveyQuestion {
  id: string;
  statement: string;
  allowedAnswers: Array<string>;
  answer?: string;
  next?: string;
}
/**
 * Current Survey Outline
 */
export interface ISurvey {
  id: string;
  name: string;
  questions: Map<string, ISurveyQuestion>;
}
/**
 * Survey a Customer
 */
export class Survey implements ISurvey {
  id: string;
  name: string;
  questions: Map<string, ISurveyQuestion>;

  constructor(seed?: Array<ISurveyQuestion>) {
    this.id = "";
    this.name = "";
    this.questions = new Map<string, ISurveyQuestion>();
    if(!!seed){
      this.buildBaseQuestions(seed);
    }
  }

  private buildBaseQuestions(seed:  Array<ISurveyQuestion>) {
    for(let q of seed){
      this.addQuestion(q);
    }
  }

  addQuestion(question: ISurveyQuestion): void {
    if (!question.id) throw new Error("Invalid Question ID");
    const { id } = question;
    this.questions.set(id, question);
  }

  getQuestion(id: string): ISurveyQuestion | undefined {
    return this.questions.get(id);
  }
}
