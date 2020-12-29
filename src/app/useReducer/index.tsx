import * as React from 'react';
import UseState from './wState';
import UseReducer from './wReducer';

function Page() {
    return (
        <>
            <div className="use-state">
                <h2>Menggunakan useReducer()</h2>
                <UseReducer />
            </div>
            <div className="use-state">
                <h2>Menggunakan useState()</h2>
                <UseState />
            </div>
        </>
    )
}

export default Page;