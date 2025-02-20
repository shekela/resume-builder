import { TimePeriod } from "../content/current/experience/experience.model"; 

export interface Introduction {
    name: string;
    greetingText: string;
    resume: string;
    cvFileName: string;
    photo: string;
}

export class TimePeriodFormatter {
    static formatPeriod(period: TimePeriod): string {
      if (period.startYear === period.endYear) {
        return `${period.startYear}`;
      }
      return `${period.startYear} - ${period.endYear}`;
    }
}