import * as React from 'react';
import Composition from './composition';
import ContextProvider, { Context } from './provider';
import ContextCallbackProvider, { ContextCallback } from './providerWCallback';

function UseContext() {
    const contextState = React.useContext<any>(Context);
    const { setState } = contextState;

    const contextCallbackState = React.useContext<any>(ContextCallback);
    const { setContextCallback } = contextCallbackState;


    const handlerNoCallback = () => setState({
        state: 'Without useCallback()',
    })

    const handlerWCallback = () => setContextCallback({
        callbackState: 'With useCallback()'
    })


    return (
        <React.Fragment>
            <div className="without-useCallback">
                <h2>Without useCallback</h2>
                {JSON.stringify(contextState.state)}
                <button onClick={() => handlerNoCallback()}>Click Me</button>
            </div>
            <div className="with-useCallback">
                <h2>With useCallback</h2>
                {JSON.stringify(contextCallbackState)}
                <button onClick={() => handlerWCallback()}>Click Me</button>
            </div>

            <Composition />
        </React.Fragment>
    )
}

function Page() {
    return (
        <ContextProvider>
            <ContextCallbackProvider>
                <UseContext />
            </ContextCallbackProvider>
        </ContextProvider>
    )
}


export default Page;