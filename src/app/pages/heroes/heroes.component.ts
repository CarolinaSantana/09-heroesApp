import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes().subscribe( result => {
      this.heroes = result
      this.loading = false;
    });
  }

  deleteHeroe( heroe: HeroeModel, i: number ){
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${ heroe.name }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( result => {
      if ( result.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe( heroe.id ).subscribe();
      }
    }); 
  }


}
