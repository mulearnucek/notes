"use client";
import React, { useState, useEffect } from 'react';
import { CSQL } from '@/lib/csql';
import { FaLaptopCode } from 'react-icons/fa6';
import { BsCpuFill } from 'react-icons/bs';
import { IoPlanetSharp } from 'react-icons/io5';

interface DepartmentSelectDialogProps {
  isOpen: boolean;
  onSelect: (department: string) => void;
  db: CSQL | undefined;
}

const DepartmentSelectDialog: React.FC<DepartmentSelectDialogProps> = ({ isOpen, onSelect, db }) => {
  const departments = ["CSE", "ECE", "IT"];
  const [selectedDept, setSelectedDept] = useState<string>('');

  const handleSubmit = () => {
    if (selectedDept) {
      onSelect(selectedDept);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/70 backdrop-filter backdrop-blur-lg border border-gray-600 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg text-white shadow-2xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-center text-white">Select Your Department</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 text-center">
          You can always change it later.
        </p>
        
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`relative flex items-center justify-start p-4 sm:p-5 lg:p-6 border rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 min-h-[80px] sm:min-h-[90px] ${
                selectedDept === dept 
                  ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-600 hover:bg-white/10 hover:border-gray-400'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mr-4 sm:mr-5 transition-all duration-300 ${
                selectedDept === dept 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {dept === 'CSE' ? <FaLaptopCode className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" /> :
                (dept === 'ECE' ? <BsCpuFill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" /> :
                <IoPlanetSharp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />)}
              </div>
              
              <div className="text-left flex-1">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white block">{dept}</span>
                <span className="text-xs sm:text-sm text-gray-400 block mt-1">
                  {dept === 'CSE' ? 'Computer Science & Engineering' : 
                   dept === 'ECE' ? 'Electronics & Communication' : 
                   'Information Technology'}
                </span>
              </div>
              
              {selectedDept === dept && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedDept}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelectDialog;
