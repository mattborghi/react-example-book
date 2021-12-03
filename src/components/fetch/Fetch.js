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

    const handleSearchSubmit = () => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
    }

    // memoized function
    const handleFetchStories = useCallback(() => {
        // if (!searchTerm) return;

        dispatchStories({ type: "STORIES_FETCH_INIT" });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                dispatchStories({ type: "SET_STORIES_SUCCESS", payload: res.hits });
            })
            .catch(err => {
                dispatchStories({ type: "STORIES_FETCH_FAILURE" });
            })
    }, [url]);

    // use data fetching logic outside of useEffect
    useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    return (
        <App key={data} data={data} isLoading={isLoading} isError={isError} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchSubmit={handleSearchSubmit}/>
    );
}