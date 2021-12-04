import React, { useMemo } from 'react';
import './App.css';

import { SearchForm } from './components/search_form/SearchForm';
import { MemoizedList as List } from './components/list/List';

const getSumComments = (data) => {
  console.log('C')
  return data.reduce((acc, item) => {
    return acc + item.num_comments;
  }, 0);
};

function App({ data, isLoading, isError, searchTerm, setSearchTerm, handleSearchSubmit, handleRemoveItem }) {
  console.log("B:App")
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const sumComments = useMemo(() => getSumComments(data), [data]);

  return (
    <div className="container">
      <h1 className="headline-primary">Hacker News Stories with {sumComments} comments.</h1>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearch} onSearchSubmit={handleSearchSubmit} />
      {isError && <strong>Something went wrong...</strong>}
      {isLoading ? <strong>Loading...</strong> :
        <List values={data} onRemoveItem={handleRemoveItem} />
      }
    </div>
  );
}

export default App;
