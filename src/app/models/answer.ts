export class Answer {
  public id: number;
  public id_question: number;
  public answer: string;
  public right: boolean;
}

export class AnswerAdapter {
  public static adapt(res) {
    const answer = new Answer();
    answer.id = res.id_answer;
    answer.id_question = res.id_question;
    answer.answer = res.answer;
    if ( res.right === 1 ) {
      answer.right = true;
    } else {
      answer.right = false;
    }

    return answer;
  }
}
