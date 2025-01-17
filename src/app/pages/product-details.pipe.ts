import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDetails'
})
export class ProductDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
