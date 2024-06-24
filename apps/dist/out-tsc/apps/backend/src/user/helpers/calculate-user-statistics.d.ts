import type { UserStatistics } from 'global/api-client';
export interface CalculateUserStatisticsType {
    userHistory: {
        startDate: Date;
        endDate: Date;
        readingTimeMs: number;
        progressDelta: number;
        bookSlug: string;
    }[];
    goalMinutes: number;
}
export declare const calculateUserStatistics: ({ userHistory, goalMinutes }: CalculateUserStatisticsType) => Omit<UserStatistics, 'goalMinutes'>;
