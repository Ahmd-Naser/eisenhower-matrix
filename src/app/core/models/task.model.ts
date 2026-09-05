export interface Task {
  id: string;
  title: string;
  expectedTimeInMinutes: number | null;
  quadrant: EisenhowerQuadrant;
  isCompleted: boolean; 
}

export enum EisenhowerQuadrant {
  DoFirst = 1,        // Urgent & Important
  Schedule = 2,       // Not Urgent & Important
  Delegate = 3,       // Urgent & Not Important
  Eliminate = 4       // Not Urgent & Not Important
}