import React, { useEffect, useState } from 'react';
import './App.css';

import { Search } from './components/search/Search';
import { List } from './components/list/List';

// general hook independently of search
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue];
}

function App({ data, isLoading, isError }) {
  const [stories, setStories] = useState(data);
  const [search, setSearch] = useSemiPersistentState('search', '');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // Filter items containing string
  const searchedItems = stories.filter(({ name }) => {
    return name.toLowerCase().includes(search.toLowerCase());
  });

  // Remove an item from the list
  const handleRemoveItem = item => {
    const newList = stories.filter(({ id }) => {
      return id !== item.id;
    });
    setStories(newList);
  }

  return (
    <div className="App">
      <Search value={search} onChange={handleSearch} isFocused />
      {isError && <h1>Something went wrong...</h1>}
      {isLoading ? <h1>Loading...</h1> :
        <List values={searchedItems} onRemoveItem={handleRemoveItem} />
      }
    </div>
  );
}

export default App;
