import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Question, QuestionAdapter} from '../models/question';
import {Platform} from '@ionic/angular';
import {Answer, AnswerAdapter} from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  public questions: Question[] = [];
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
      private platform: Platform,
      private sqlite: SQLite,
      private httpClient: HttpClient,
      private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'database.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.storage = db;
        this.initDb();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
  count(): number {
    return this.questions.length;
  }

  public getData() {
    return this.questions;
  }

  private initDb() {
    this.httpClient.get(
    'assets/database.sql',
    {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then( _ => {
          this.getQuestions();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }
  getQuestions() {
    this.storage.executeSql('SELECT * FROM questions', []).then(res => {
      for ( let i = 0; i < res.rows.length; i++) {
        const answers = this.getAnswers(res.rows.item(i).id);
        this.questions.push(QuestionAdapter.adapt(res.rows.item(i), answers));
      }
    });
  }
  private getAnswers(id: number) {
    const answers: Answer[] = [];
      this.storage.executeSql(`SELECT * FROM answers WHERE id_question=${id}`, []).then(res => {
      for ( let i = 0; i < res.rows.length; i++) {
        answers.push(AnswerAdapter.adapt(res.rows.item(i)));
      }
    });
    return answers;
  }
}
