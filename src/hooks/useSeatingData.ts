import { useState, useEffect } from 'react';
import { Seat, Employee } from '../types';
import { allSeats } from '../data/seats';
import { employees } from '../data/employees';

const STORAGE_KEY = 'seating-data';
const RESET_TIME_KEY = 'last-reset-time';

export const useSeatingData = () => {
  const [seats, setSeats] = useState<Seat[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : allSeats;
  });

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // 18:00のリセット処理
  useEffect(() => {
    const checkResetTime = () => {
      const now = new Date();
      const japanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
      const currentHour = japanTime.getHours();
      const lastResetDate = localStorage.getItem(RESET_TIME_KEY);
      const today = japanTime.toDateString();

      if (currentHour >= 18 && lastResetDate !== today) {
        // 18時以降で今日まだリセットしていない場合
        resetAllSeats();
        localStorage.setItem(RESET_TIME_KEY, today);
      }
    };

    const interval = setInterval(checkResetTime, 60000); // 1分ごとにチェック
    checkResetTime(); // 初回チェック

    return () => clearInterval(interval);
  }, []);

  // データ保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seats));
  }, [seats]);

  const resetAllSeats = () => {
    setSeats(allSeats.map(seat => ({ ...seat, occupiedBy: undefined })));
    setSelectedEmployee(null);
    setSelectedSeat(null);
  };

  const assignSeat = (seatId: string, employee: Employee) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId
          ? { ...seat, occupiedBy: employee }
          : seat
      )
    );
  };

  const vacateSeat = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId
          ? { ...seat, occupiedBy: undefined }
          : seat
      )
    );
  };

  const getAvailableSeatsForEmployee = (employee: Employee) => {
    return seats.filter(seat => 
      seat.department === employee.department && !seat.occupiedBy
    );
  };

  const getEmployeeSeat = (employee: Employee) => {
    return seats.find(seat => seat.occupiedBy?.id === employee.id);
  };

  return {
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
  };
};