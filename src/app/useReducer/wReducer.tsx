import * as React from 'react';

const initialState = {
    posts: [],
    loading: false,
    errors: undefined,
};

const Reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case '@@FETCH_REQUEST': {
            return {
                ...state,
                errors: '',
                loading: true,
            }
        }

        case '@@FETCH_SUCCESS': {
            return {
                ...state,
                loading: false,
                posts: action.payload.posts
            }
        }

        case '@@FETCH_ERROR': {
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            }
        }

        default: return state
    }
};

export default function UseReducer() {
    const [state, dispatch] = React.useReducer<React.Reducer<any, any>>(Reducer, initialState);

    const fetchRequest = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const body = await response.json();

        try {
            dispatch({
                type: '@@FETCH_SUCCESS',
                payload: {
                    posts: body
                }
            });

        } catch (error) {
            dispatch({
                type: '@@FETCH_ERROR',
                payload: {
                    errors: error.message
                }
            });
        }

    };

    React.useEffect(() => {
        let isSubsribed = true;

        if (isSubsribed) {
            fetchRequest()
        }

        return () => {
            isSubsribed = false;
        }

    }, []);

    if (state.errors) return <h4>Errors: {JSON.stringify(state.errors)}</h4>
    if (state.loading) return <h4>Loading...</h4>

    return (
        <div className="item-lists">
            <ul>
                {state && state.posts && state.posts.map((item: any, index: number) => (
                    <li key={index}>
                        <span>Title: {item.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}