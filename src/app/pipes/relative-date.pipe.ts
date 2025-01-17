// relative-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) {
      return '';
    }

    const currentDate = new Date();
    const inputDate = new Date(value);

    // Calculate difference in days
    const differenceInTime = currentDate.getTime() - inputDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return 'Today';
    } else if (differenceInDays === 1) {
      return 'Yesterday';
    } else {
      return formatDate(inputDate, 'dd MMM, yyyy', 'en-US'); // Format as "12 Jan, 2025"
    }
  }
}
