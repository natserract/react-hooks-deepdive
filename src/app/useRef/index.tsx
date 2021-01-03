import * as React from 'react';

function UseRef() {
    const refDOM = React.useRef<any>(null);
    const refInput = React.useRef<any>(null);
    const refInitialValue = React.useRef<any>({
        username: 'alfinsurya',
        version: 'v17.0.1'
    });

    const changeTitleDOM = () => {
        refDOM.current.innerText = 'Title udah berganti';
    }

    const focusHandler = (event: any) => {
        event.preventDefault();
        refInput.current.focus();

        console.log(refInput.current.value);
    }

    console.log('changeTitleDOM() called?');

    // Won't be re-rendered
    React.useEffect(() => {
        refInitialValue.current.username = 'benjamin';
        refInitialValue.current.version = 'v16.8.1';

        refInitialValue.current = () => {
            console.log('Hello')
            refInitialValue.current.version = 'v16.8.1';
        }
    }, []);

    return (
        <div className="use-ref">
            <h1>useRef()</h1>
            <ul>
                <li>{refInitialValue.current.username}</li>
                <li>{refInitialValue.current.version}</li>
            </ul>
            <h3 ref={refDOM}>Title belum berganti</h3>
            <button onClick={() => changeTitleDOM()}>Change title</button>

            <h2>Form</h2>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" ref={refInput} defaultValue="Value for input"/>
                </div>
                <br/>
                <button onClick={(event) => focusHandler(event)}>Focus</button>
            </form>
        </div>
    )
}

export default UseRef;