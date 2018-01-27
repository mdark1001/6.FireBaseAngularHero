import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'casahero'
})
export class CasaheroPipe implements PipeTransform {

  transform(value: any): string {
    const opciones_casa = [
      '',
      'DC',
      'MARVEL'
    ];


    return opciones_casa[value];
  }

}
