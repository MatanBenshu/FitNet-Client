import { render, screen } from '@testing-library/react';
import Home from './components/Pages/Home/Home.jsx';

test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Welcome to FitNet/);
    expect(linkElement).toBeInTheDocument();
});
