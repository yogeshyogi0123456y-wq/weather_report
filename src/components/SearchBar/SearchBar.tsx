import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (city: string) => void;
    onGeoLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onGeoLocation }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </div>
                <button
                    type="button"
                    className="geo-button"
                    onClick={onGeoLocation}
                    title="Use current location"
                >
                    📍
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
