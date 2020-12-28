import * as React from 'react';

const initialState = {
    state: ''
}

export const Context = React.createContext<typeof initialState | any>(undefined);

function ContextProvider(props: React.PropsWithChildren<{}>) {
    // Initial State
    const [state, setState] = React.useState(initialState);

    return (
        <Context.Provider value={{ state, setState }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;