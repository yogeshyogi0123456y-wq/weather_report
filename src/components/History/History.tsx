import React from 'react';
import './History.css';

interface HistoryProps {
    searchedCities: string[];
    onCityClick: (city: string) => void;
    onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ searchedCities, onCityClick, onClear }) => {
    if (searchedCities.length === 0) return null;

    return (
        <div className="history-container">
            <div className="history-header">
                <h3 className="history-title">Recent Searches</h3>
                <button className="clear-history" onClick={onClear}>Clear</button>
            </div>
            <div className="history-list">
                {searchedCities.map((city, index) => (
                    <button
                        key={`${city}-${index}`}
                        className="history-item"
                        onClick={() => onCityClick(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default History;
