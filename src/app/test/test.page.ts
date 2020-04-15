import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {Question} from '../models/question';
import {Answer} from '../models/answer';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  private selectedQuestion: Answer;
  public result = {
    countRight: 0,
    countQuestions: this.dbService.count()
  };
  public data: Question[];
  public index = 0;
  constructor(public dbService: DbService) { }

  ngOnInit() {
    this.data = this.dbService.getData();
    setTimeout(() => {
      this.result.countQuestions = this.dbService.count();
    }, 1000);
  }

  public nextAnswer() {
    if ( this.selectedQuestion ) {
      this.result.countRight = this.result.countRight + 1;
    }
    this.selectedQuestion = null;
    this.index++;
  }

  public changeRadio(value): void {
    this.selectedQuestion = value;
  }

}
