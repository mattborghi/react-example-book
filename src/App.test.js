import { render, screen } from '@testing-library/react';
import App from './App';

const data = [
  {
    objectID: 0,
    title: 'The title',
    name: 'My name'
  }
];

test('show expected title and name data', () => {
  const { title, name } = data[0]
  render(<App data={data} />);
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(`Hello ${name}!`)).toBeInTheDocument();
})