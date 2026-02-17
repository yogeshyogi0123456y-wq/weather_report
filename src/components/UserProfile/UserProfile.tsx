import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile: React.FC = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Do not render if no user is logged in
    if (!user) return null;

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="user-profile-widget" ref={dropdownRef}>
            <div className="profile-header" onClick={() => setIsOpen(!isOpen)} title="Click to view profile">
                <div className="profile-info">
                    <span className="profile-name">{user.name}</span>
                    <span className="profile-location">📍 {user.city}</span>
                </div>
                <div className="profile-avatar">
                    {getInitials(user.name)}
                </div>
            </div>

            {isOpen && (
                <div className="profile-dropdown">
                    <div className="dropdown-header">
                        <div className="large-avatar">{getInitials(user.name)}</div>
                        <h3>{user.name}</h3>
                        <p>{user.city}</p>
                    </div>
                    <div className="dropdown-details">
                        {user.email && (
                            <div className="detail-item">
                                <span className="label">Email</span>
                                <span className="value">{user.email}</span>
                            </div>
                        )}
                        {user.phone && (
                            <div className="detail-item">
                                <span className="label">Phone</span>
                                <span className="value">{user.phone}</span>
                            </div>
                        )}
                    </div>
                    <div className="dropdown-footer">
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
