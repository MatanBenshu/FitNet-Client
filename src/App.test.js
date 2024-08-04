import { render, screen } from '@testing-library/react';

import Page404 from './Pages/Page404/Page404.jsx';


test('renders learn react link', () => {
    render(<Page404/>);
    const linkElement = screen.getByText(/404/);
    expect(linkElement).toBeInTheDocument();
});
