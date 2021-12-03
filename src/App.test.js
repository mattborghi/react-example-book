import { render, screen } from '@testing-library/react';
import App from './App';

const data = [
  {
    objectID: 0,
    title: 'React',
    author: 'My name'
  }
];

test('show expected title and name data', () => {
  const { title, author } = data[0]
  render(<App data={data} isLoading={false} isError={false} searchTerm={'react'} setSearchTerm={()=>null} />);
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(`Hello ${author}!`)).toBeInTheDocument();
})