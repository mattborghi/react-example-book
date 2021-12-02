import React, { useEffect, useState } from 'react';
import './App.css';

import { Search } from './components/search/Search';
import { Button } from './components/button/Button';
import { List } from './components/list/List';

// general hook independently of search
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue];
}

function App({ data }) {
  const [count, setCount] = useState(true);
  const [search, setSearch] = useSemiPersistentState('search', '');

  const handleClick = () => {
    setCount(prevState => !prevState);
    console.log("changed count to: ", !count);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // TODO: Add local storage for count


  const showItem = (key) => {
    // return true if count is true and key is even
    let value = null;
    if (count) {
      value = count && key % 2 === 0;
    } else {
      value = key % 2 === 1;
    }
    return value;
  }

  // Filter items containing string
  const searchedItems = data.filter(({ name }) => {
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="App">
      <br />
      <Button title="Click me!" onClick={handleClick} />
      <br />
      <Search value={search} onChange={handleSearch} isFocused />
      <List values={searchedItems} displayCallback={showItem} />
    </div>
  );
}

export default App;
