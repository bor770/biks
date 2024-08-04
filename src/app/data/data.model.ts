import { Result, StudentData } from '../shared/results/results.model';

interface Index {
  index: number;
}

export interface FullDeployedResult extends Index, Result, StudentData {}

export type DeployedResult = Partial<FullDeployedResult>;

export const PAGE_SIZE = 10;
