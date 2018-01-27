import {Component, OnInit} from '@angular/core';
import {HeroService} from "../../services/hero.service";
import {Hero} from "../../interfaces/hero";
import {tick} from "@angular/core/testing";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  public heroes: any[] = [];
  public modal_title: string;
  public modal_msg: string;

  public opciones_casa = [
    {
      id: 1,
      casa: 'DC'
    },
    {
      id: 2,
      casa: 'Marvel'

    }
  ];

  constructor(private _heroeService: HeroService, private _router: Router) {
  }

  ngOnInit() {


    this._heroeService.getAll().subscribe(data => {
      console.log(data);

      this.heroes = data;


    });
  }

  editar_hero(key$) {
    this._router.navigate(['/heroe', key$]);
  }

  delete_hero(key$) {
    this.mostar_modal_confirmacion(key$, 'Eliminar Hero', '¿Desea eliminar el Héroe?', (key$) => {
      console.log(key$);
      this._heroeService.deleteHereoById(key$).subscribe(data => {
        delete this.heroes[key$];
        console.log(data);
      });
    });
  }

  private mostar_modal_confirmacion(key$, title, msg, callback) {
    this.modal_title = title;
    this.modal_msg = msg;
    $("#modal_confirmar_mensaje").modal('show');
    $("#modal_confirmar_mensaje #modal_aceptar_btn").click(function () {
      $("#modal_confirmar_mensaje").modal('hide');
      callback(key$);
    });
    return true;
  }

}
