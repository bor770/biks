import { ExamResult, StudentData } from '../shared/results/results.model';

export interface FullDeployedExamResult extends ExamResult, StudentData {
  index: number;
}

export type DeployedExamResult = FullDeployedExamResult | undefined;

export const PAGE_SIZE = 10;
