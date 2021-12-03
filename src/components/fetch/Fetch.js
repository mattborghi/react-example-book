import { useEffect, useReducer } from "react";
import App from "../../App";

const initialData = [{
    id: 0,
    title: "React App",
    name: "Matias",
},
{
    id: 1,
    title: "React App 2",
    name: "Another name",
},
{
    id: 2,
    title: "React App 3",
    name: "Another name",
},
{
    id: 3,
    title: "React App 4",
    name: "Another name",
}]


// simulate getting the data async
const getAsyncData = () =>
    new Promise((resolve, reject) =>
        setTimeout(
            // (un)comment if you want data failure
            () => resolve({ data: initialData }),
            // reject,
            2000
        )
    );

const storiesReducer = (state, action) => {
    switch (action.type) {
        case "SET_STORIES_SUCCESS":
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError:false,
            };
        case "STORIES_FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError:false,
            };
        case "STORIES_FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError:true,
            };
        default: throw new Error("Unknown action type");
    }
}

export function Fetch() {
    // const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);
    const [{data, isLoading, isError}, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false }
    );

    useEffect(() => {
        console.log("fetch: ", data)
    }, [data])


    useEffect(() => {
        // setIsLoading(true);
        dispatchStories({ type: "STORIES_FETCH_INIT" });
        getAsyncData()
            .then(res => {
                // setStories(res.data);
                dispatchStories({ type: "SET_STORIES_SUCCESS", payload: res.data });
                // setIsLoading(false);
            })
            .catch(err => {
                // setIsError(true);
                dispatchStories({ type: "STORIES_FETCH_FAILURE" });
            })
    }, []);

    return <App key={data} data={data} isLoading={isLoading} isError={isError} />;
}