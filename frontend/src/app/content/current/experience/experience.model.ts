export interface TimePeriod {
    startYear: number; // The starting year
    endYear: number | 'Present'; // The ending year or 'Present'
}

export interface Experience{
    id?: number;
    role: string;
    place: string;
    period: TimePeriod;
}

export class TimePeriodFormatter {
  static formatPeriod(period: TimePeriod): string {
    if (period.startYear === period.endYear) {
      return `${period.startYear}`; // Only display the year if startYear and endYear are the same
    }
    return `${period.startYear} - ${period.endYear}`; // Otherwise, show the full range
  }
}