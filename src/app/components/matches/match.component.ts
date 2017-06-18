import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'match',
  templateUrl: 'match.component.html',
})

export class MatchComponent  {

  csvUrl: string = '../../csv/matches.csv';  // URL to web API
  csvData: any[] = [];
  match = {};//new Map<string, string[][]>();
  venue = {};//new Map<string, string[][]>();
  playerOfMatch = {};//new Map<string, string[][]>();
  winner = {};//new Map<string, string[][]>();
  season = {};//new Map<string, string[][]>();

  constructor (private http: Http) {}

  readCsvData () {
    this.http.get(this.csvUrl)
      .subscribe(
        data => this.extractData(data),
        err => this.handleError(err)
      );
  }

  private extractData(res: Response) {
    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 1; i < allTextLines.length; i++) {
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let tarr = [];
        for ( let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        this.match[tarr[4]+" vs "+tarr[5]] = this.match[tarr[4]+" vs "+tarr[5]] || [];
        this.match[tarr[4]+" vs "+tarr[5]].push(tarr);

        lines.push(tarr);
      }
    }
    this.csvData = lines;
    console.log(this.match);
    console.log(this.csvData);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }
}
