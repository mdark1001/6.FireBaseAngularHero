import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {log} from "util";
import {hasOwnProperty} from "tslint/lib/utils";
import {HeroService} from "../../services/hero.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    .ng-valid[required], .ng-valid.required {
      border-left: 5px solid #42A948; /* green */
    }

    .error {
      color: #a94442;
      border-color: #a94442 !important;
      border: 1px solid #a94442 !important;
      box-shadow: 0 0 10px #ce001c;
    }
  `]
})
export class HeroeComponent implements OnInit {
  public title: string = 'Heroe';
  public is_ready: boolean = false;
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
  public id_hero_index: string = "0";

  public formHero: FormGroup;

  constructor(private _hereoService: HeroService,
              private _router: Router,
              private  _act_router: ActivatedRoute) {

    this.formHero = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'casa': new FormControl('', Validators.required),
      'descripcion': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this._act_router.params.subscribe(data => {
      console.log(data);
      if (data['id'] !== "0") {
        this.id_hero_index = data['id'];
        this._hereoService.getByIndex(this.id_hero_index).subscribe(data => this.formHero.setValue(data));
      }
    });

  }

  ngOnInit() {


  }

  guardar() {
    this.is_ready = true;
    if (this.formHero.valid) {
      if (this.id_hero_index === "0") {
        this._hereoService.addHero(this.formHero.value).subscribe(data => {
          console.log(data);
          this._router.navigate(['/heroe', data.name]);
        });
      } else {
        this._hereoService.updateHero(this.formHero.value, this.id_hero_index).subscribe(data => {
          console.log(data);

        });
      }
    }
  }

  /*
  This is magic function, implements
  add class for show or hide  errors for a input form
  your  validations laws
    */
  mostrar_errors(controls_name: string, is_ready: boolean): boolean {
    if (this.formHero.controls.hasOwnProperty(controls_name) && is_ready) {

      const control = this.formHero.controls[controls_name];
      if (control.invalid === true) {
        if (control.errors.hasOwnProperty('required') && control.errors.required == true) {
          return true;
        }
        if (control.errors.hasOwnProperty('minlength') && control.errors.minlength.actualLength < control.errors.minlength.requiredLength) {
          return true;
        }
      }
    }
    return false;
  }
}
