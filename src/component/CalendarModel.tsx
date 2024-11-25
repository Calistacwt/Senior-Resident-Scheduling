import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/custom-calendar.css";
import { formatDate } from "@/utils/formatter";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date[];
  onDateChange: (data: {
    dates: Date[];
    reasons: string[];
    sessions: string[];
  }) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateChange,
}) => {
  if (!isOpen) return null;

  const [tempSelectedDates, setTempSelectedDates] = useState<Date[]>(
    selectedDate
  );
  const [dateInputs, setDateInputs] = useState<number[]>(
    new Array(Math.max(selectedDate.length, 1)).fill(0)
  );
  const [selectedReasons, setSelectedReasons] = useState<string[]>(
    new Array(Math.max(selectedDate.length, 1)).fill("")
  );
  const [selectedSessions, setSelectedSessions] = useState<string[]>(
    new Array(Math.max(selectedDate.length, 1)).fill("")
  );
  const [activeDatePickerIndex, setActiveDatePickerIndex] = useState<number | null>(null);

  const handleDateChange = useCallback(
    (date: Date | null, index: number) => {
      if (!date) return;

      if (
        tempSelectedDates.some(
          (existingDate) => existingDate.getTime() === date.getTime()
        )
      ) {
        return;
      }

      setTempSelectedDates((prevDates) => {
        const newDates = [...prevDates];
        newDates[index] = date;
        return newDates;
      });

      setActiveDatePickerIndex(null);
    },
    [tempSelectedDates]
  );

  const toggleCalendar = (index: number) => {
    setActiveDatePickerIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const handleAddDateInput = () => {
    setDateInputs((prevInputs) => [...prevInputs, prevInputs.length]);
    setTempSelectedDates((prevDates) => [...prevDates, new Date()]);
    setSelectedReasons((prevReasons) => [...prevReasons, ""]);
    setSelectedSessions((prevSessions) => [...prevSessions, ""]);
  };

  const handleDelete = (index: number) => {
    if (tempSelectedDates.length > 1) {
      setTempSelectedDates((prevDates) =>
        prevDates.filter((_, i) => i !== index)
      );
      setDateInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
      setSelectedReasons((prevReasons) =>
        prevReasons.filter((_, i) => i !== index)
      );
      setSelectedSessions((prevSessions) =>
        prevSessions.filter((_, i) => i !== index)
      );
    }
  };

  const handleReasonChange = (reason: string, index: number) => {
    setSelectedReasons((prevReasons) => {
      const newReasons = [...prevReasons];
      newReasons[index] = reason;
      return newReasons;
    });

    if (reason !== "Leave") {
      setSelectedSessions((prevSessions) => {
        const newSessions = [...prevSessions];
        newSessions[index] = ""; 
        return newSessions;
      });
    }
  };

  const handleSessionChange = (session: string, index: number) => {
    setSelectedSessions((prevSessions) => {
      const newSessions = [...prevSessions];
      newSessions[index] = session;
      return newSessions;
    });
  };

  const handleApply = () => {
    onDateChange({
      dates: tempSelectedDates,
      reasons: selectedReasons,
      sessions: selectedSessions,
    });
    onClose(); 
  };

  return (
    <div className="bg-component-background fixed inset-0 bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg relative">
        <div className="flex justify-start items-start space-x-3 mb-5">
          <img
            src="/assets/images/calendar.png"
            alt="Calendar Logo"
            className="rounded-md w-8"
          />
          <h1 className="text-xl font-bold">Commitment</h1>
        </div>

        <div>
          {dateInputs.map((_, index) => (
            <div key={index} className="mb-2 relative">
              <div className="flex space-x-3 justify-center items-center">
                <div className="flex flex-col flex-1 space-y-3 p-1">
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => toggleCalendar(index)}
                      className="text-left w-full text-black text-xs border rounded-md border-form-label p-2.5 font-semibold"
                    >
                      {tempSelectedDates[index]
                        ? formatDate(tempSelectedDates[index])
                        : "Select Date"}
                    </button>

                    <select
                      onChange={(e) => handleReasonChange(e.target.value, index)}
                      className="text-black text-xs font-semibold border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
                      value={selectedReasons[index]}
                    >
                      <option value="" hidden>
                        Reason
                      </option>
                      <option value="Leave">Leave</option>
                      <option value="Call Dates">Call Dates</option>
                      <option value="On Course">On-Course</option>
                    </select>
                  </div>

                  {selectedReasons[index] === "Leave" && (
                    <select
                      onChange={(e) =>
                        handleSessionChange(e.target.value, index)
                      }
                      className="text-black text-xs font-semibold border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
                      value={selectedSessions[index]}
                    >
                      <option value="" hidden>
                        Session
                      </option>
                      <option value="Full Day">Full Day</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  )}
                </div>

                {tempSelectedDates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-500 font-bold text-lg"
                  >
                    &times;
                  </button>
                )}
              </div>

              {activeDatePickerIndex === index && (
                <div className="absolute z-10 top-12 left-1">
                  <DatePicker
                    selected={tempSelectedDates[index]}
                    onChange={(date) => handleDateChange(date, index)}
                    inline
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end items-end">
            <button
              type="button"
              onClick={handleAddDateInput}
              className="mt-2 bg-badge-background bg-opacity-35 text-2xs font-semibold p-1 px-3 text-badge-text rounded-full"
            >
              Add Dates
            </button>
          </div>
        </div>

        <div className="flex space-x-5 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-component-modalText font-semibold p-2 rounded-md w-full border border-sidebar-border text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="bg-sidebar-active text-white p-2 rounded-md w-full font-semibold text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};


export default CalendarModal;