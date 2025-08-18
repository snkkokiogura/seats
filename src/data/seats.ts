import { Seat, Department } from '../types';

// 1F事務所エリアの座席配置
const officeAreaSeats: Seat[] = [
  // 製造技術課 (2×2, 2×4)
  // 2×2エリア
  { id: 'o1', x: 50, y: 100, department: '製造技術課', area: 'office' },
  { id: 'o2', x: 90, y: 100, department: '製造技術課', area: 'office' },
  { id: 'o3', x: 50, y: 140, department: '製造技術課', area: 'office' },
  { id: 'o4', x: 90, y: 140, department: '製造技術課', area: 'office' },
  
  // 2×4エリア（o1-o4の右隣）
  { id: 'o5', x: 130, y: 100, department: '製造技術課', area: 'office' },
  { id: 'o6', x: 170, y: 100, department: '製造技術課', area: 'office' },
  { id: 'o7', x: 130, y: 140, department: '製造技術課', area: 'office' },
  { id: 'o8', x: 170, y: 140, department: '製造技術課', area: 'office' },
  { id: 'o9', x: 130, y: 180, department: '製造技術課', area: 'office' },
  { id: 'o10', x: 170, y: 180, department: '製造技術課', area: 'office' },
  { id: 'o11', x: 130, y: 220, department: '製造技術課', area: 'office' },
  { id: 'o12', x: 170, y: 220, department: '製造技術課', area: 'office' },

  // 生産管理課 (2×4, 2×5, 5×2)
  // 2×4エリア
  { id: 'o13', x: 230, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o14', x: 270, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o15', x: 230, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o16', x: 270, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o17', x: 230, y: 180, department: '生産管理課', area: 'office' },
  { id: 'o18', x: 270, y: 180, department: '生産管理課', area: 'office' },
  { id: 'o19', x: 230, y: 220, department: '生産管理課', area: 'office' },
  { id: 'o20', x: 270, y: 220, department: '生産管理課', area: 'office' },

  // 2×5エリア（o13-o20の右隣）
  { id: 'o21', x: 310, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o22', x: 350, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o23', x: 310, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o24', x: 350, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o25', x: 310, y: 180, department: '生産管理課', area: 'office' },
  { id: 'o26', x: 350, y: 180, department: '生産管理課', area: 'office' },
  { id: 'o27', x: 310, y: 220, department: '生産管理課', area: 'office' },
  { id: 'o28', x: 350, y: 220, department: '生産管理課', area: 'office' },
  { id: 'o29', x: 310, y: 260, department: '生産管理課', area: 'office' },
  { id: 'o30', x: 350, y: 260, department: '生産管理課', area: 'office' },

  // 5×2エリア（o14の右隣）
  { id: 'o31', x: 310, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o32', x: 350, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o33', x: 390, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o34', x: 430, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o35', x: 470, y: 100, department: '生産管理課', area: 'office' },
  { id: 'o36', x: 310, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o37', x: 350, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o38', x: 390, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o39', x: 430, y: 140, department: '生産管理課', area: 'office' },
  { id: 'o40', x: 470, y: 140, department: '生産管理課', area: 'office' },

  // 総務課 (3席, 5×2, 2×2)
  // 3席
  { id: 'o41', x: 530, y: 100, department: '総務課', area: 'office' },
  { id: 'o42', x: 570, y: 100, department: '総務課', area: 'office' },
  { id: 'o43', x: 610, y: 100, department: '総務課', area: 'office' },

  // 2×2エリア（o41-o43の右隣）
  { id: 'o54', x: 650, y: 100, department: '総務課', area: 'office' },
  { id: 'o55', x: 690, y: 100, department: '総務課', area: 'office' },
  { id: 'o56', x: 650, y: 140, department: '総務課', area: 'office' },
  { id: 'o57', x: 690, y: 140, department: '総務課', area: 'office' },

  // 5×2エリア
  { id: 'o44', x: 530, y: 180, department: '総務課', area: 'office' },
  { id: 'o45', x: 570, y: 180, department: '総務課', area: 'office' },
  { id: 'o46', x: 610, y: 180, department: '総務課', area: 'office' },
  { id: 'o47', x: 650, y: 180, department: '総務課', area: 'office' },
  { id: 'o48', x: 690, y: 180, department: '総務課', area: 'office' },
  { id: 'o49', x: 530, y: 220, department: '総務課', area: 'office' },
  { id: 'o50', x: 570, y: 220, department: '総務課', area: 'office' },
  { id: 'o51', x: 610, y: 220, department: '総務課', area: 'office' },
  { id: 'o52', x: 650, y: 220, department: '総務課', area: 'office' },
  { id: 'o53', x: 690, y: 220, department: '総務課', area: 'office' },
];

// 1F製造事務所エリアの座席配置
const manufacturingAreaSeats: Seat[] = [
  // 設備保全課 (2×2)
  { id: 'm1', x: 50, y: 100, department: '設備保全課', area: 'manufacturing' },
  { id: 'm2', x: 90, y: 100, department: '設備保全課', area: 'manufacturing' },
  { id: 'm3', x: 50, y: 140, department: '設備保全課', area: 'manufacturing' },
  { id: 'm4', x: 90, y: 140, department: '設備保全課', area: 'manufacturing' },

  // 品質保証課 (2×2)
  { id: 'm5', x: 50, y: 200, department: '品質保証課', area: 'manufacturing' },
  { id: 'm6', x: 90, y: 200, department: '品質保証課', area: 'manufacturing' },
  { id: 'm7', x: 50, y: 240, department: '品質保証課', area: 'manufacturing' },
  { id: 'm8', x: 90, y: 240, department: '品質保証課', area: 'manufacturing' },

  // 右側 2×4エリア
  { id: 'm9', x: 170, y: 100, department: '製造課', area: 'manufacturing' },
  { id: 'm10', x: 210, y: 100, department: '製造課', area: 'manufacturing' },
  { id: 'm11', x: 170, y: 140, department: '製造課', area: 'manufacturing' },
  { id: 'm12', x: 210, y: 140, department: '製造課', area: 'manufacturing' },
  { id: 'm13', x: 170, y: 180, department: '製造課', area: 'manufacturing' },
  { id: 'm14', x: 210, y: 180, department: '製造課', area: 'manufacturing' },
  { id: 'm15', x: 170, y: 220, department: '製造課', area: 'manufacturing' },
  { id: 'm16', x: 210, y: 220, department: '製造課', area: 'manufacturing' },

  // 製造課 4×4エリア
  { id: 'm17', x: 290, y: 100, department: '製造課', area: 'manufacturing' },
  { id: 'm18', x: 330, y: 100, department: '製造課', area: 'manufacturing' },
  { id: 'm19', x: 370, y: 100, department: '製造課', area: 'manufacturing' },
  { id: 'm20', x: 410, y: 100, department: '製造課', area: 'manufacturing' },
  { id: 'm21', x: 290, y: 140, department: '製造課', area: 'manufacturing' },
  { id: 'm22', x: 330, y: 140, department: '製造課', area: 'manufacturing' },
  { id: 'm23', x: 370, y: 140, department: '製造課', area: 'manufacturing' },
  { id: 'm24', x: 410, y: 140, department: '製造課', area: 'manufacturing' },
  { id: 'm25', x: 290, y: 180, department: '製造課', area: 'manufacturing' },
  { id: 'm26', x: 330, y: 180, department: '製造課', area: 'manufacturing' },
  { id: 'm27', x: 370, y: 180, department: '製造課', area: 'manufacturing' },
  { id: 'm28', x: 410, y: 180, department: '製造課', area: 'manufacturing' },
  { id: 'm29', x: 290, y: 220, department: '製造課', area: 'manufacturing' },
  { id: 'm30', x: 330, y: 220, department: '製造課', area: 'manufacturing' },
  { id: 'm31', x: 370, y: 220, department: '製造課', area: 'manufacturing' },
  { id: 'm32', x: 410, y: 220, department: '製造課', area: 'manufacturing' },
];

export const allSeats: Seat[] = [...officeAreaSeats, ...manufacturingAreaSeats];