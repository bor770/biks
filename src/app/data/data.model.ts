import { ExamResult, StudentData } from '../shared/results/results.model';

export interface FullDeployedExamResult extends ExamResult, StudentData {}

export type DeployedExamResult = FullDeployedExamResult | undefined;
