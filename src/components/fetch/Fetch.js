import { useEffect, useState } from "react";
import App from "../../App";

const data = [{
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
            () => resolve({ data: data }),
            // reject,
            2000
        )
    );

export function Fetch() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [stories, setStories] = useState([])

    // useEffect(() => {
    //     console.log("fetch: ", stories)
    // }, [stories])


    useEffect(() => {
        setIsLoading(true);
        getAsyncData()
            .then(res => {
                setStories(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsError(true);
            })
    }, []);

    return <App key={stories} data={stories} isLoading={isLoading} isError={isError} />;
}