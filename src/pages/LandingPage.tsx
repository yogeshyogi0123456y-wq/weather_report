import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Reusing main styles for now

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: 'white',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 800 }}>Weather Check</h1>
            <p style={{ fontSize: '1.5rem', opacity: 0.9, maxWidth: '600px', marginBottom: '3rem' }}>
                Your personal weather assistant. Get real-time reports, future forecasts, and historical data in one beautiful interface.
            </p>
            <button
                onClick={() => navigate('/login')}
                style={{
                    padding: '1rem 3rem',
                    fontSize: '1.25rem',
                    background: 'white',
                    color: '#1e3c72',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Start
            </button>
        </div>
    );
};

export default LandingPage;
