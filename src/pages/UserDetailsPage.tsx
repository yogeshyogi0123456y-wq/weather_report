import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../App.css';

const UserDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !city.trim() || !email.trim() || !phone.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        // Basic Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Basic Phone Validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }

        // Save to global context
        setUser({ name, city, email, phone });

        // Navigate to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="layout-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Welcome!</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0.8 }}>
                    Let's personalize your experience.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="glass-input" />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>City</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" className="glass-input" />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="glass-input" />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="glass-input" />
                    </div>

                    {error && (
                        <div style={{ color: '#ff6b6b', fontSize: '0.9rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="search-btn" style={{ marginTop: '1rem', padding: '0.75rem', fontSize: '1rem', justifyContent: 'center' }}>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetailsPage;
