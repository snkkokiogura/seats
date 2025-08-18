import { Employee, Department } from '../types';

export const employees: Employee[] = [
  // 製造技術課
  { id: '1', name: '田中 太郎', department: '製造技術課' },
  { id: '2', name: '佐藤 花子', department: '製造技術課' },
  { id: '3', name: '高橋 次郎', department: '製造技術課' },
  { id: '4', name: '伊藤 美咲', department: '製造技術課' },
  
  // 生産管理課
  { id: '5', name: '山田 隆志', department: '生産管理課' },
  { id: '6', name: '中村 由美', department: '生産管理課' },
  { id: '7', name: '小林 健一', department: '生産管理課' },
  { id: '8', name: '加藤 麻衣', department: '生産管理課' },
  { id: '9', name: '松本 大輔', department: '生産管理課' },
  { id: '10', name: '井上 彩子', department: '生産管理課' },
  
  // 総務課
  { id: '11', name: '木村 慎一', department: '総務課' },
  { id: '12', name: '林 恵美', department: '総務課' },
  { id: '13', name: '斎藤 浩二', department: '総務課' },
  
  // 設備保全課
  { id: '14', name: '清水 良介', department: '設備保全課' },
  { id: '15', name: '森田 さくら', department: '設備保全課' },
  { id: '16', name: '池田 和也', department: '設備保全課' },
  { id: '17', name: '橋本 理恵', department: '設備保全課' },
  
  // 品質保証課
  { id: '18', name: '青木 誠', department: '品質保証課' },
  { id: '19', name: '福田 愛', department: '品質保証課' },
  { id: '20', name: '村上 康夫', department: '品質保証課' },
  { id: '21', name: '藤井 結衣', department: '品質保証課' },
  
  // 製造課
  { id: '22', name: '渡辺 修', department: '製造課' },
  { id: '23', name: '上田 美穂', department: '製造課' },
  { id: '24', name: '岡田 剛', department: '製造課' },
  { id: '25', name: '長谷川 優子', department: '製造課' },
  { id: '26', name: '吉田 雅彦', department: '製造課' },
  { id: '27', name: '坂本 奈々', department: '製造課' },
];

export const departmentColors: Record<Department, string> = {
  '製造技術課': '#EF4444',
  '生産管理課': '#3B82F6',
  '総務課': '#10B981',
  '設備保全課': '#F59E0B',
  '品質保証課': '#8B5CF6',
  '製造課': '#EC4899',
};