import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/custom-calendar.css";
import { formatDate } from "@/utils/formatter";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date[];
  onDateChange: (dates: Date[]) => void;
  title?: string;
}

const DateModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateChange,
  title = "",
}) => {
  // If modal is not open, dont render anything
  if (!isOpen) return null;

  // Initialize states for temporary selected dates and date inputs
  const [tempSelectedDates, setTempSelectedDates] =
    useState<Date[]>(selectedDate);
  const [dateInputs, setDateInputs] = useState<number[]>(
    new Array(Math.max(selectedDate.length, 1)).fill(0),
  );
  const [activeDatePickerIndex, setActiveDatePickerIndex] = useState<
    number | null
  >(null);

  // Handle the change of a date in the date picker
  const handleDateChange = useCallback(
    (date: Date | null, index: number) => {
      if (!date) return;

      // Avoid selecting duplicate dates
      if (
        tempSelectedDates.some(
          (existingDate) => existingDate.getTime() === date.getTime(),
        )
      ) {
        return;
      }

      setTempSelectedDates((prevDates) => {
        const newDates = [...prevDates];
        newDates[index] = date;
        return newDates;
      });

      setActiveDatePickerIndex(null); // Close date picker after selection
    },
    [tempSelectedDates],
  );

  // Toggle the visibility of the date picker
  const toggleCalendar = (index: number) => {
    setActiveDatePickerIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
  };

  // Add a new date input field
  const handleAddDateInput = () => {
    setDateInputs((prevInputs) => [...prevInputs, prevInputs.length]);
  };

  // Apply the selected dates and close the modal
  const handleApply = () => {
    onDateChange(tempSelectedDates);
    onClose();
  };

  // Delete a selected date if there is more than one
  const handleDelete = (index: number) => {
    if (tempSelectedDates.length > 1) {
      setTempSelectedDates((prevDates) =>
        prevDates.filter((_, i) => i !== index),
      );
      setDateInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-component-background fixed inset-0 bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-start items-start space-x-3 mb-5">
          <img
            src="/assets/images/calendar.png"
            alt="Calendar Logo"
            className="rounded-md w-8"
          />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        {/* Date Input Fields */}
        <div>
          {dateInputs.map((_, index) => (
            <div key={index} className="mb-2 relative">
              <button
                type="button"
                onClick={() => toggleCalendar(index)}
                className="text-left w-full text-black text-xs border rounded-md border-form-label p-2.5 font-semibold"
              >
                {tempSelectedDates[index]
                  ? formatDate(tempSelectedDates[index])
                  : "Select Date"}
              </button>

              {/* Delete Date Button */}
              {tempSelectedDates[index] && tempSelectedDates.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="absolute top-1 right-3 text-red-500 font-bold text-lg"
                >
                  &times;
                </button>
              )}

              {/* Date Picker */}
              {activeDatePickerIndex === index && (
                <div className="z-10 absolute">
                  <DatePicker
                    selected={tempSelectedDates[index]}
                    onChange={(date) => handleDateChange(date, index)}
                    inline
                    calendarClassName="custom-calendar"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add Date Button */}
          <div className="flex justify-end items-end">
            <button
              onClick={handleAddDateInput}
              className="mt-2 bg-badge-background bg-opacity-35 text-2xs font-semibold p-1 px-3 text-badge-text rounded-full"
            >
              Add Dates
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-5 mt-4">
          <button
            onClick={onClose}
            className="bg-white text-component-modalText font-semibold p-2 rounded-md w-full border border-sidebar-border text-sm"
          >
            Cancel
          </button>
          <button
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

export default DateModal;
