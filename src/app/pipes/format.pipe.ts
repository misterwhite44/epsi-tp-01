import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true, // très important !
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/_/g, ' ') // remplace les underscores par des espaces
      .replace(/\b\w/g, char => char.toUpperCase()); // majuscule en début de mot
  }
}
