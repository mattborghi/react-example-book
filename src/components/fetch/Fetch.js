import axios from 'axios';

import { useEffect, useReducer, useState, useCallback } from "react";
import App from "../../App";
import { useSemiPersistentState } from '../../hooks/useSemiPersistentState';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const storiesReducer = (state, action) => {
    switch (action.type) {
        case "SET_STORIES_SUCCESS":
            return {
                ...state,
                data: action.payload,
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
                data: state.data.filter(story => story.objectID !== action.payload.objectID),
            };
        default: throw new Error("Unknown action type");
    }
}

export function Fetch() {
    const [searchTerm, setSearchTerm] = useSemiPersistentState('seach', 'React');
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
    const [{ data, isLoading, isError }, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false }
    );

    // useEffect(() => {
    //     console.log("fetch: ", data)
    // }, [data])

    const handleSearchSubmit = (event) => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        event.preventDefault(); // prevent page refresh, HTML native behavior
    }

    // Remove an item from the list
    const handleRemoveItem = item => {
        // const newList = stories.filter(({ objectID }) => {
        //     return objectID !== item.objectID;
        // });
        // setStories(newList);
        dispatchStories({ type: "REMOVE_STORY", payload: item });
    }

    // memoized function
    const handleFetchStories = useCallback(async () => {

        dispatchStories({ type: "STORIES_FETCH_INIT" });
        try {
            const result = await axios(url);
            dispatchStories({ type: "SET_STORIES_SUCCESS", payload: result.data.hits });
        } catch {
            dispatchStories({ type: "STORIES_FETCH_FAILURE" });
        }
    }, [url]);

    // use data fetching logic outside of useEffect
    useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    return (
        <App key={data} data={data} isLoading={isLoading} isError={isError} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchSubmit={handleSearchSubmit} handleRemoveItem={handleRemoveItem} />
    );
}