import React from 'react';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <div className="background-overlay"></div>
            <header className="app-header">
                <h1 className="app-logo">SkyCast</h1>
            </header>
            <main className="app-main">
                {children}
            </main>
            <footer className="app-footer">
                <p>© 2026 SkyCast Weather Hub. Powered by OpenWeatherMap.</p>
            </footer>
        </div>
    );
};

export default Layout;
