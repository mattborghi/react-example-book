import React, { useState } from 'react';
import './App.css';

import { SearchForm } from './components/search_form/SearchForm';
import { List } from './components/list/List';

function App({ data, isLoading, isError, searchTerm, setSearchTerm, handleSearchSubmit }) {
  const [stories, setStories] = useState(data);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  // Filter items containing string
  // const searchedItems = stories.filter(({ title }) => {
  //   return title.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // Remove an item from the list
  const handleRemoveItem = item => {
    const newList = stories.filter(({ objectID }) => {
      return objectID !== item.objectID;
    });
    setStories(newList);
  }

  return (
    <div className="App">
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearch} onSearchSubmit={handleSearchSubmit} />
      {isError && <h1>Something went wrong...</h1>}
      {isLoading ? <h1>Loading...</h1> :
        <List values={data} onRemoveItem={handleRemoveItem} />
      }
    </div>
  );
}

export default App;
