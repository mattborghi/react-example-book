import React, { useMemo } from "react";
import "./App.css";

import { SearchForm } from "./components/search_form/SearchForm";
import { MemoizedList as List } from "./components/list/List";
import { Stories, Story } from "./components/list/List.types";
import { API_ENDPOINT } from "./components/fetch/Fetch";
import { LastSearches } from "./components/last_searches/LastSearches";

const getSumComments = (data: Stories) => {
  return data.reduce((acc, item) => {
    return acc + item.num_comments;
  }, 0);
};

type AppProps = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
  searchTerm: string;
  urls: string[];
  handleSearch: (searchTerm: string) => void;
  setSearchTerm: (search: string) => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveItem: (id: Story) => void;
};

function App({
  data,
  isLoading,
  isError,
  searchTerm,
  urls,
  setSearchTerm,
  handleSearchSubmit,
  handleRemoveItem,
  handleSearch,
}: AppProps) {
  const onHandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const sumComments = useMemo(() => getSumComments(data), [data]);

  const extractSearchTerm = (url: string) => url.replace(API_ENDPOINT, "");
  const lastSearches = useMemo(
    () =>
      urls
        .reduce((result: string[] = [], url, index) => {
          const searchTerm = extractSearchTerm(url);
          if (index === 0) {
            return result.concat(searchTerm);
          }
          const previousSearchTerm = result[result.length - 1];
          if (searchTerm === previousSearchTerm) {
            return result;
          } else {
            return result.concat(searchTerm);
          }
        }, [])
        .slice(-6)
        .slice(0, -1)
        .map(extractSearchTerm),
    [urls]
  );

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className="container">
      <h1 className="headline-primary">
        Hacker News Stories with {sumComments} comments.
      </h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={onHandleSearch}
        onSearchSubmit={handleSearchSubmit}
      />
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />
      <br />
      {isLoading ? (
        <strong>Loading...</strong>
      ) : isError ? (
        <strong>Something went wrong...</strong>
      ) : (
        <List values={data} onRemoveItem={handleRemoveItem} />
      )}
    </div>
  );
}

export default App;
