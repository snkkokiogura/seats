import React from 'react';
import { useSeatingData } from './hooks/useSeatingData';
import { EmployeeList } from './components/EmployeeList';
import { SeatMap } from './components/SeatMap';
import { ActionPanel } from './components/ActionPanel';
import { RouletteModal } from './components/RouletteModal';
import { Building2, Sparkles } from 'lucide-react';

function App() {
  const {
    seats,
    employees,
    selectedEmployee,
    setSelectedEmployee,
    selectedSeat,
    setSelectedSeat,
    assignSeat,
    vacateSeat,
    getAvailableSeatsForEmployee,
    getEmployeeSeat,
    resetAllSeats,
  } = useSeatingData();

  const [isRouletteOpen, setIsRouletteOpen] = React.useState(false);

  const handleEmployeeSelect = (employee: typeof employees[0]) => {
    setSelectedEmployee(employee);
    setSelectedSeat(null); // 社員変更時は座席選択をリセット
  };

  const handleSeatSelect = (seat: typeof seats[0]) => {
    if (selectedEmployee && seat.department === selectedEmployee.department && !seat.occupiedBy) {
      setSelectedSeat(seat);
    }
  };

  const handleAssignSeat = () => {
    if (selectedEmployee && selectedSeat) {
      assignSeat(selectedSeat.id, selectedEmployee);
      setSelectedSeat(null);
    }
  };

  const handleRouletteAssign = (seatId: string) => {
    if (selectedEmployee) {
      assignSeat(seatId, selectedEmployee);
      setSelectedEmployee(null);
    }
  };

  const availableSeatsCount = selectedEmployee 
    ? getAvailableSeatsForEmployee(selectedEmployee).length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="text-blue-600 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">
                フリーアドレス座席管理システム
              </h1>
              <Sparkles className="text-yellow-500 ml-2" size={24} />
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleString('ja-JP', {
                timeZone: 'Asia/Tokyo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 社員リスト */}
          <div className="lg:col-span-1">
            <EmployeeList
              employees={employees}
              selectedEmployee={selectedEmployee}
              onEmployeeSelect={handleEmployeeSelect}
              getEmployeeSeat={getEmployeeSeat}
              onVacateSeat={vacateSeat}
            />
          </div>

          {/* 座席マップと操作パネル */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1F事務所エリア */}
            <SeatMap
              seats={seats}
              selectedEmployee={selectedEmployee}
              selectedSeat={selectedSeat}
              onSeatSelect={handleSeatSelect}
              area="office"
              title="1F 事務所エリア"
            />

            {/* 1F製造事務所エリア */}
            <SeatMap
              seats={seats}
              selectedEmployee={selectedEmployee}
              selectedSeat={selectedSeat}
              onSeatSelect={handleSeatSelect}
              area="manufacturing"
              title="1F 製造事務所エリア"
            />

            {/* 操作パネル */}
            <ActionPanel
              selectedEmployee={selectedEmployee}
              selectedSeat={selectedSeat}
              onAssignSeat={handleAssignSeat}
              onResetSeats={resetAllSeats}
              onOpenRoulette={() => setIsRouletteOpen(true)}
              availableSeatsCount={availableSeatsCount}
            />
          </div>
        </div>
      </div>

      {/* ルーレットモーダル */}
      {selectedEmployee && (
        <RouletteModal
          isOpen={isRouletteOpen}
          onClose={() => setIsRouletteOpen(false)}
          employee={selectedEmployee}
          availableSeats={getAvailableSeatsForEmployee(selectedEmployee)}
          onAssignSeat={handleRouletteAssign}
        />
      )}

      {/* フッター */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              フリーアドレス座席管理システム - 快適なオフィス環境をサポート
            </p>
            <p className="text-xs mt-2 text-gray-500">
              毎日18:00に座席がリセットされます
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;