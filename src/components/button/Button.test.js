import { render, screen } from '@testing-library/react';
import {Button} from './Button';

it('is text', () => {
    const { getByText } = render(<Button title="Hello" />);
    const button = getByText(/Hello/i);
    expect(button).toBeInTheDocument();   
})