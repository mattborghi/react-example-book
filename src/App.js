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
    <div className="container">
      <h1 className="headline-primary">Hacker News</h1>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearch} onSearchSubmit={handleSearchSubmit} />
      {isError && <strong>Something went wrong...</strong>}
      {isLoading ? <strong>Loading...</strong> :
        <List values={data} onRemoveItem={handleRemoveItem} />
      }
    </div>
  );
}

export default App;
