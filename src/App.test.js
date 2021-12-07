import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import axios from 'axios';

import App from './App';
import { List } from './components/list/List';

jest.mock('axios');

describe('App', () => {

  const data = [
    {
      objectID: 0,
      title: 'React',
      author: 'My name',
      num_comments: 3,
      points: 4,
      url: 'https://reactjs.org/',
    },
    {
      objectID: 1,
      title: 'Redux',
      author: 'Dan Abramov',
      num_comments: 3,
      points: 4,
      url: 'https://redux.js.org/',
    }
  ];

  const AppProps = {
    data: data,
    isLoading: false,
    isError: true,
    searchTerm: 'react',
    setSearchTerm: jest.fn(),
  };

  it('show expected title and name data', () => {
    const { title, author } = data[0]
    render(<App {...AppProps} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(author)).toBeInTheDocument();
    // this should be failing?
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  it('succeeds fetching data with a list', () => {
    const component = renderer.create(<App {...AppProps} />);
    expect(component.root.findByType(List).props.values).toEqual(data);
  });

  it('succeeds fetching data with a list - mock axios', async () => {
    const promise = Promise.resolve({
      data: {
        hist: data
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App {...AppProps} />);
    });

    expect(component.root.findByType(List).props.values).toEqual(data);
  });
  
  // FIXME: this test is failing
  // it('fails fetching data with a path', async () => {
  //   const promise = Promise.reject();
  //   axios.get.mockImplementationOnce(() => promise);
  //   let component;
  //   await renderer.act(async () => {
  //     component = renderer.create(<App {...AppProps} />);
  //   });
  //   expect(component.root.findByType('strong').props.children).toEqual(
  //     'Something went wrong...'
  //   );
  // });
});