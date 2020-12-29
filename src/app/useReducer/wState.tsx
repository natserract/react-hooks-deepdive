import * as React from 'react';

export default function UseState() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<string | undefined>(undefined);

    const fetchRequest = (async () => {
        setErrors('');
        setLoading(true);

        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) throw new Error(response.statusText);

            let body = await response.json();
            setLoading(false);
            setPosts(body);

        } catch (error) {
            setErrors(error.message);
            console.error(error);
        }
    });

    React.useEffect(() => {
        fetchRequest();
    }, []);


    if (errors) return <h4>Errors: {JSON.stringify(errors)}</h4>
    if (loading) return <h4>Loading...</h4>

    return (
        <div className="item-lists">
            <ul>
                {posts && posts.map((item: any, index) => (
                    <li key={index}>
                        <span>Title: {item.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}