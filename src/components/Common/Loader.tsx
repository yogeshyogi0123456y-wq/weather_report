import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p className="loader-text">Fetching weather data...</p>
        </div>
    );
};

export default Loader;
