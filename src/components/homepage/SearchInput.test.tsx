import React from 'react';
import { render } from '@testing-library/react';
import { SearchInput } from './SearchInput';

test('renders search input', () => {
    const { getByDisplayValue } = render(<SearchInput onChange={() => {}} value={"Search here"} />);
    const linkElement = getByDisplayValue(/Search here/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders search input with error', () => {
    const { getByText } = render(<SearchInput onChange={() => {}} value={""} error="An error has occured" />);
    const linkElement = getByText(/An error has occured/i);
    expect(linkElement).toBeInTheDocument();
});
