import * as React from 'react';

const initialStateCallback = {
    callbackState: ''
}

export const ContextCallback = React.createContext<typeof initialStateCallback | any>(undefined);

function ContextCallbackProvider(props: React.PropsWithChildren<{}>) {
    const [callbackState, setCallbackState] = React.useState(initialStateCallback);

    // With useCallback (prefered)
    const setContextCallback = React.useCallback(
        newState => {
            return setCallbackState({
                callbackState: { ...newState }
            })
        },
        [callbackState, setCallbackState]
    );

    const getContextCallback = React.useCallback(
        () => ({ setContextCallback, ...callbackState }),
        [callbackState, setContextCallback]
    );

    return (
        <ContextCallback.Provider value={getContextCallback()}>
            {props.children}
        </ContextCallback.Provider>
    )
}

export default ContextCallbackProvider;