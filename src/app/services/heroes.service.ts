import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "";

  constructor( private http: HttpClient ) { }

  newHeroe( heroe: HeroeModel ) {
    return this.http.post(`${ this.url }/heroes.json`, heroe)
        .pipe(
          map( (result: any) => {
            heroe.id = result.name;
            return heroe;
          })
        );
  }

  updateHeroe( heroe: HeroeModel ) {
    const tempHeroe = {
      ...heroe
    };
    delete tempHeroe.id; 
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, tempHeroe);
  }

  deleteHeroe( id: string ) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`).pipe (
      map( this.createArray ),
      delay(0)
    );
  }

  private createArray( heroesObj: object ) {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null ) {
      return [];
    }
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });
    return heroes;
  }

}
