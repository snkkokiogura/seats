import React from 'react';
import { Seat, Employee } from '../types';
import { departmentColors } from '../data/employees';
import { Armchair as Chair, Users } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  selectedEmployee: Employee | null;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat) => void;
  area: 'office' | 'manufacturing';
  title: string;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedEmployee,
  selectedSeat,
  onSeatSelect,
  area,
  title,
}) => {
  const areaSeats = seats.filter(seat => seat.area === area);
  const maxX = Math.max(...areaSeats.map(seat => seat.x)) + 50;
  const maxY = Math.max(...areaSeats.map(seat => seat.y)) + 50;

  const canSelectSeat = (seat: Seat) => {
    if (!selectedEmployee) return false;
    if (seat.occupiedBy) return false;
    return seat.department === selectedEmployee.department;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Users className="mr-3 text-blue-600" size={28} />
        {title}
      </h2>
      
      <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
        <svg 
          width={Math.min(maxX, 800)} 
          height={Math.min(maxY, 400)} 
          className="border border-gray-200 rounded bg-white"
        >
          {/* 座席描画 */}
          {areaSeats.map((seat) => {
            const isOccupied = !!seat.occupiedBy;
            const isSelectable = canSelectSeat(seat);
            const isSelected = selectedSeat?.id === seat.id;
            const departmentColor = departmentColors[seat.department];

            return (
              <g key={seat.id}>
                {/* 座席の背景円 */}
                <circle
                  cx={seat.x}
                  cy={seat.y}
                  r={16}
                  fill={
                    isSelected
                      ? '#3B82F6'
                      : isOccupied
                      ? departmentColor
                      : isSelectable
                      ? '#E5E7EB'
                      : '#F9FAFB'
                  }
                  stroke={
                    isSelected
                      ? '#1D4ED8'
                      : isSelectable
                      ? '#10B981'
                      : '#D1D5DB'
                  }
                  strokeWidth={isSelected ? 3 : isSelectable ? 2 : 1}
                  className={`transition-all duration-200 ${
                    isSelectable ? 'cursor-pointer hover:stroke-green-500' : ''
                  }`}
                  onClick={() => isSelectable && onSeatSelect(seat)}
                />
                
                {/* 座席アイコン */}
                <text
                  x={seat.x}
                  y={seat.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  className="pointer-events-none"
                >
                  🪑
                </text>
                
                {/* 座席ID */}
                <text
                  x={seat.x}
                  y={seat.y + 25}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#6B7280"
                  className="pointer-events-none"
                >
                  {seat.id}
                </text>
                
                {/* 占有者名前 */}
                {seat.occupiedBy && (
                  <text
                    x={seat.x}
                    y={seat.y - 25}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#374151"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {seat.occupiedBy.name}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* 部署エリアのラベル */}
          {Object.keys(departmentColors).map((department, index) => {
            const deptSeats = areaSeats.filter(s => s.department === department);
            if (deptSeats.length === 0) return null;
            
            const avgX = deptSeats.reduce((sum, s) => sum + s.x, 0) / deptSeats.length;
            const minY = Math.min(...deptSeats.map(s => s.y)) - 40;
            
            return (
              <text
                key={department}
                x={avgX}
                y={Math.max(minY, 20)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill={departmentColors[department as keyof typeof departmentColors]}
                className="pointer-events-none"
              >
                {department}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* 凡例 */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
          空席
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 border-2 border-green-500 rounded-full mr-2"></div>
          選択可能
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          選択中
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          着席中
        </div>
      </div>
    </div>
  );
};