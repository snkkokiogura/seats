export interface Employee {
  id: string;
  name: string;
  department: Department;
}

export interface Seat {
  id: string;
  x: number;
  y: number;
  department: Department;
  occupiedBy?: Employee;
  area: 'office' | 'manufacturing';
}

export type Department = 
  | '製造技術課' 
  | '生産管理課' 
  | '総務課' 
  | '設備保全課' 
  | '品質保証課' 
  | '製造課';

export interface SeatArea {
  department: Department;
  seats: Seat[];
  color: string;
}