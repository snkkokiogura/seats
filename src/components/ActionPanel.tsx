import React from 'react';
import { Employee, Seat } from '../types';
import { MapPin, LogIn, RotateCcw, Clock, Shuffle } from 'lucide-react';

interface ActionPanelProps {
  selectedEmployee: Employee | null;
  selectedSeat: Seat | null;
  onAssignSeat: () => void;
  onResetSeats: () => void;
  onOpenRoulette: () => void;
  availableSeatsCount: number;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  selectedEmployee,
  selectedSeat,
  onAssignSeat,
  onResetSeats,
  onOpenRoulette,
  availableSeatsCount,
}) => {
  const canAssign = selectedEmployee && selectedSeat && !selectedSeat.occupiedBy;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <MapPin className="mr-3 text-blue-600" size={28} />
        座席操作
      </h2>
      
      <div className="space-y-4">
        {/* 選択中の社員 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">選択中の社員</h3>
          {selectedEmployee ? (
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: '#3B82F6' }}
              ></div>
              <span className="font-medium">
                {selectedEmployee.name} ({selectedEmployee.department})
              </span>
            </div>
          ) : (
            <p className="text-gray-500">社員を選択してください</p>
          )}
        </div>

        {/* 選択中の座席 */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">選択中の座席</h3>
          {selectedSeat ? (
            <div className="flex items-center">
              <span className="mr-2">🪑</span>
              <span className="font-medium">
                座席 {selectedSeat.id} ({selectedSeat.department}エリア)
              </span>
            </div>
          ) : (
            <p className="text-gray-500">座席を選択してください</p>
          )}
        </div>

        {/* 利用可能座席数 */}
        {selectedEmployee && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">利用可能座席</h3>
            <p className="text-lg font-medium text-yellow-700">
              {availableSeatsCount} 席
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="space-y-3">
          <button
            onClick={onAssignSeat}
            disabled={!canAssign}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
              canAssign
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <LogIn className="mr-2" size={20} />
            着席する
          </button>

          <button
            onClick={onOpenRoulette}
            disabled={!selectedEmployee || availableSeatsCount === 0}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
              selectedEmployee && availableSeatsCount > 0
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Shuffle className="mr-2" size={20} />
            座席ルーレット 🎰
          </button>

          <button
            onClick={onResetSeats}
            className="w-full py-3 px-4 border-2 border-red-300 text-red-600 rounded-lg font-semibold flex items-center justify-center hover:bg-red-50 transition-all duration-200"
          >
            <RotateCcw className="mr-2" size={20} />
            全座席リセット
          </button>
        </div>

        {/* 自動リセット情報 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2" size={16} />
            毎日18:00に座席が自動リセットされます
          </div>
        </div>
      </div>
    </div>
  );
};