/**
 * Current Survey Outline
 */
export interface ISurvey {
  gender: string;
  agreGroup: string;
}
/**
 * Survey a Customer
 */
export class Survey implements ISurvey {
  gender: string;
  agreGroup: string;

  constructor() {
    this.gender = "Otro";
    this.agreGroup = "Joven";
  }
}
