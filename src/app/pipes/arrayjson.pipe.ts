import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayjson',
  pure: false
})
export class ArrayjsonPipe implements PipeTransform {

  transform(value: any): any {
    let array = [];
    for (let key in value) {
      array.push(key);
    }

    return array;
  }

}
