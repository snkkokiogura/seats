import React from 'react';
import { Employee } from '../types';
import { departmentColors } from '../data/employees';
import { User, MapPin, LogOut } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  onEmployeeSelect: (employee: Employee) => void;
  getEmployeeSeat: (employee: Employee) => any;
  onVacateSeat: (seatId: string) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  selectedEmployee,
  onEmployeeSelect,
  getEmployeeSeat,
  onVacateSeat,
}) => {
  const groupedEmployees = employees.reduce((groups, employee) => {
    const department = employee.department;
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(employee);
    return groups;
  }, {} as Record<string, Employee[]>);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <User className="mr-3 text-blue-600" size={28} />
        社員名簿
      </h2>
      
      <div className="space-y-4">
        {Object.entries(groupedEmployees).map(([department, deptEmployees]) => (
          <div key={department} className="border rounded-lg p-4">
            <h3 
              className="text-lg font-semibold mb-3 flex items-center"
              style={{ color: departmentColors[department as keyof typeof departmentColors] }}
            >
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: departmentColors[department as keyof typeof departmentColors] }}
              ></div>
              {department}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {deptEmployees.map((employee) => {
                const currentSeat = getEmployeeSeat(employee);
                const isSelected = selectedEmployee?.id === employee.id;
                
                return (
                  <div
                    key={employee.id}
                    className={`p-3 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-100 border-2 border-blue-500 shadow-md'
                        : currentSeat
                        ? 'bg-green-50 border-2 border-green-300 hover:bg-green-100'
                        : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => onEmployeeSelect(employee)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: departmentColors[employee.department] }}
                      ></div>
                      <span className="font-medium text-gray-800">
                        {employee.name}
                      </span>
                    </div>
                    
                    {currentSeat && (
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-green-600 text-sm">
                          <MapPin size={14} className="mr-1" />
                          {currentSeat.id}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onVacateSeat(currentSeat.id);
                          }}
                          className="p-1 text-red-500 hover:bg-red-100 rounded"
                          title="退席"
                        >
                          <LogOut size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};