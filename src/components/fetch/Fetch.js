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
    new Promise(resolve =>
        setTimeout(
            () => resolve({ data: data }),
            2000
        )
    );

export function Fetch() {
    const [stories, setStories] = useState([])

    // useEffect(() => {
    //     console.log("fetch: ", stories)
    // }, [stories])


    useEffect(() => {
        getAsyncData().then(res => {
            setStories(res.data);
        })
    }, []);

    return <App key={stories} data={stories} />;
}