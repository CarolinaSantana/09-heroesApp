import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'new' ) {
      this.heroesService.getHeroe( id ).subscribe( (result: HeroeModel) => {
        this.heroe = result;
        this.heroe.id = id;
      });
    }
  }

  save( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Saving information',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;
  

    if ( this.heroe.id ) { 
      petition = this.heroesService.updateHeroe( this.heroe );
    } else { 
      petition = this.heroesService.newHeroe( this.heroe );
    }

    petition.subscribe( result => {
      Swal.fire({
        title: this.heroe.name,
        text: 'Updated successfully',
        icon: 'success'
      })
    });
  }

}
