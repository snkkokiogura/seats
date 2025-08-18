import React, { useState, useEffect } from 'react';
import { Employee, Seat } from '../types';
import { Shuffle, X, Play, Pause, CheckCircle } from 'lucide-react';

interface RouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  availableSeats: Seat[];
  onAssignSeat: (seatId: string) => void;
}

export const RouletteModal: React.FC<RouletteModalProps> = ({
  isOpen,
  onClose,
  employee,
  availableSeats,
  onAssignSeat,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSeat, setCurrentSeat] = useState<Seat | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    if (availableSeats.length > 0) {
      setCurrentSeat(availableSeats[0]);
    }
  }, [availableSeats]);

  const startRoulette = () => {
    if (availableSeats.length === 0) return;
    
    setIsSpinning(true);
    setSelectedSeat(null);
    setSpinCount(0);
    
    const spinDuration = 3000; // 3秒間スピン
    const spinInterval = 100; // 100msごとに座席を変更
    const totalSpins = spinDuration / spinInterval;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setSpinCount(prev => prev + 1);
      currentIndex = (currentIndex + 1) % availableSeats.length;
      setCurrentSeat(availableSeats[currentIndex]);
      
      if (spinCount >= totalSpins - 1) {
        clearInterval(interval);
        setIsSpinning(false);
        
        // 最終的にランダムな座席を選択
        const randomIndex = Math.floor(Math.random() * availableSeats.length);
        const finalSeat = availableSeats[randomIndex];
        setCurrentSeat(finalSeat);
        setSelectedSeat(finalSeat);
      }
    }, spinInterval);
  };

  const handleAssign = () => {
    if (selectedSeat) {
      onAssignSeat(selectedSeat.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Shuffle className="text-purple-600 mr-3" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">座席ルーレット</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* 社員情報 */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">対象社員</p>
          <p className="font-semibold text-gray-800">
            {employee.name} ({employee.department})
          </p>
          <p className="text-sm text-blue-600 mt-1">
            利用可能座席: {availableSeats.length}席
          </p>
        </div>

        {/* ルーレット表示エリア */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 text-center">
          <div className={`transition-all duration-200 ${isSpinning ? 'animate-pulse' : ''}`}>
            <div className="text-6xl mb-4">🎰</div>
            <div className="bg-white rounded-lg p-4 shadow-inner">
              {currentSeat ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-purple-600">
                    座席 {currentSeat.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentSeat.department}エリア
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentSeat.area === 'office' ? '1F 事務所' : '1F 製造事務所'}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">座席を選択中...</p>
              )}
            </div>
          </div>
          
          {isSpinning && (
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2 text-purple-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm font-medium">回転中... ({spinCount})</span>
              </div>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          {!selectedSeat ? (
            <button
              onClick={startRoulette}
              disabled={isSpinning || availableSeats.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
                isSpinning || availableSeats.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isSpinning ? (
                <>
                  <Pause className="mr-2" size={20} />
                  回転中...
                </>
              ) : (
                <>
                  <Play className="mr-2" size={20} />
                  ルーレット開始！
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="mx-auto text-green-600 mb-2" size={24} />
                <p className="text-green-800 font-semibold">
                  座席 {selectedSeat.id} が選ばれました！
                </p>
              </div>
              
              <button
                onClick={handleAssign}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <CheckCircle className="mr-2" size={20} />
                この座席に着席する
              </button>
              
              <button
                onClick={() => {
                  setSelectedSeat(null);
                  setCurrentSeat(availableSeats[0]);
                }}
                className="w-full py-2 px-4 border-2 border-purple-300 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-all duration-200"
              >
                もう一度回す
              </button>
            </div>
          )}
        </div>

        {availableSeats.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800">
              利用可能な座席がありません
            </p>
          </div>
        )}
      </div>
    </div>
  );
};