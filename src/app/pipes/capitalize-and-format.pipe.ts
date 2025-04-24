import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAndFormat',
  standalone: true
})
export class CapitalizeAndFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const formatted = value.replace(/_/g, ' ').toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}
