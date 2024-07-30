import { render, screen } from '@testing-library/react';
import AuthProvider from './context/AuthContext.js';
import Login from './Pages/Login/login.jsx';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/FitNet/);
    expect(linkElement).toBeInTheDocument();
});
