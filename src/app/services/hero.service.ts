import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Hero} from "../interfaces/hero";

@Injectable()
export class HeroService {
  urlApi: string = 'https://fireangular-35d3c.firebaseio.com/heroes';

  constructor(private  _http: Http) {

  }

  addHero(_heroe) {
    let body = JSON.stringify(_heroe);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.urlApi}.json`;
    return this._http.post(url, body, {headers}).map(data => {
      return data.json();
    });
  }

  updateHero(_heroe, key$: string) {
    let body = JSON.stringify(_heroe);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.urlApi}/${key$}.json`;
    return this._http.put(url, body, {headers}).map(data => {
      return data.json();
    });
  }

  getByIndex(index_key$) {
    const url = `${this.urlApi}/${index_key$}.json`;
    return this._http.get(url).map(data => {
      return data.json();
    });
  }

  getAll() {
    const url = `${this.urlApi}.json`;
    return this._http.get(url).map(data => {
      return data.json();
    });
  }

  deleteHereoById(key$) {
    const url = `${this.urlApi}/${key$}.json`;
    return this._http.delete(url).map(data => {
      return data.json();
    });
  }

}
