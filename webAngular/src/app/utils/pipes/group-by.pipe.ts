import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform(value: any[], property: string): any[] {
    if (!value || !Array.isArray(value) || !property) {
      return value;
    }

    const groupedItems = value.reduce((result, item) => {
      const key = item[property];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});

    return Object.values(groupedItems);
  }
}
