import axios from "axios";

import React, { useEffect, useReducer, useState, useCallback } from "react";
import App from "../app/App";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";

import { StoriesAction, StoriesState } from "./action_types";

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
export const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

const getUrl = (searchTerm: string, page: number) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
        isLoading: false,
        isError: false,
      };
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
};

export function Fetch() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("seach", "React");
  const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    page: 0,
    isLoading: false,
    isError: false,
  });

  const handleSearch = (searchTerm: string, page: number) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearch(searchTerm, 0);
    event.preventDefault(); // prevent page refresh, HTML native behavior
  };

  // Remove an item from the list
  // use the useCallback to avoid creating a new function every time the button is clicked
  const handleRemoveItem = useCallback((item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);

  // memoized function
  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios(lastUrl);
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls]);

  // use data fetching logic outside of useEffect
  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <App
      stories={stories}
      searchTerm={searchTerm}
      urls={urls}
      setSearchTerm={setSearchTerm}
      handleSearchSubmit={handleSearchSubmit}
      handleRemoveItem={handleRemoveItem}
      handleSearch={handleSearch}
    />
  );
}
