import * as React from 'react';

function useState() {
    const [state, setState] = React.useState(0);

    return (
        <div>
            <h1>Use State</h1>
            <p>Kamu udah click {state} kali</p>

            <button onClick={() => setState(state + 1)}>Klik aku</button>
            <button onClick={() => setState(0)}>Reset</button>
        </div>
    )
}

export default useState;