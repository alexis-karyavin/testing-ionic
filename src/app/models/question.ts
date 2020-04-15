import {Answer} from './answer';

export class Question {
  public id: number;
  public question: string;
  public answers: Answer[];
  public id_right: number;
}

export class QuestionAdapter {
  public static adapt(res, answers) {
    const question = new Question();
    question.id = res.id;
    question.question = res.question;
    question.answers = answers;
    return question;
  }
}
