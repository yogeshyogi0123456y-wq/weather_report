import React from 'react';
import './DateSelector.css';

interface DateSelectorProps {
    onDateChange: (date: string) => void;
    selectedDate: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange, selectedDate }) => {
    const today = new Date().toISOString().split('T')[0];
    // Calculate max date (5 days from now for forecast)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    // Calculate min date (5 days ago for history - example limit)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 5);
    const minDateStr = minDate.toISOString().split('T')[0];

    return (
        <div className="date-selector-container">
            <label htmlFor="weather-date" className="date-label">Select Date:</label>
            <input
                type="date"
                id="weather-date"
                className="date-input"
                value={selectedDate}
                min={minDateStr}
                max={maxDateStr}
                onChange={(e) => onDateChange(e.target.value)}
            />
            <div className="date-info">
                {selectedDate === today && <span className="badge current">Today</span>}
                {selectedDate > today && <span className="badge future">Forecast</span>}
                {selectedDate < today && <span className="badge past">Historical</span>}
            </div>
        </div>
    );
};

export default DateSelector;
