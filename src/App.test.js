import { render, screen } from '@testing-library/react';
import Login from './Pages/Login/login.jsx';

test('renders learn react link', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Login/);
    expect(linkElement).toBeInTheDocument();
});
