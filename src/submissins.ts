export interface Submission {
    name: string;
    date: Date;
    workHoursOrLeaveDay: string;
    startTime: string;
    endTime: string;
    description: string;
    approved?: boolean;
  }