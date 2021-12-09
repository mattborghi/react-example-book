import React, { useMemo } from "react";
import "./App.css";

import { SearchForm } from "../search_form/SearchForm";
import { MemoizedList as List } from "../list/List";
import { Stories, Story } from "../list/List.types";
import { LastSearches } from "../last_searches/LastSearches";
import { PARAM_SEARCH } from "../fetch/Fetch";

const getSumComments = (data: Array<Story>) => {
  return data.reduce((acc, item) => {
    return acc + item.num_comments;
  }, 0);
};

type AppProps = {
  stories: Stories;
  searchTerm: string;
  urls: string[];
  handleSearch: (searchTerm: string, page: number) => void;
  setSearchTerm: (search: string) => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveItem: (id: Story) => void;
};

function App({
  stories,
  searchTerm,
  urls,
  setSearchTerm,
  handleSearchSubmit,
  handleRemoveItem,
  handleSearch,
}: AppProps) {
  const { data, page, isLoading, isError } = stories;

  const onHandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const sumComments = useMemo(() => getSumComments(data), [data]);

  const extractSearchTerm = (url: string) => {
    // url
    // https://hn.algolia.com/api/v1/search?query=react&page=0
    // url after substring
    // query=react
    // url after replace
    // react
    return url
      .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
      .replace(PARAM_SEARCH, "");
  };

  const getLastSearches = (urls: Array<string>) =>
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
      .slice(0, -1);

  const lastSearches = getLastSearches(urls);

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, page + 1);
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
      <hr />
      {isError ? (
        <strong>Something went wrong...</strong>
      ) : (
        <List values={data} onRemoveItem={handleRemoveItem} />
      )}
      {isError ||
        (isLoading ? (
          <strong>Loading ...</strong>
        ) : (
          <button type="button" onClick={handleMore}>
            More
          </button>
        ))}
    </div>
  );
}

export default App;
