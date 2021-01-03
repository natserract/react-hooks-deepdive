import * as React from 'react';

function fibonacci(n: any): any {
    console.log('fibonacci() called');

    if (n <= 1) {
        return 1
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

function Details({ name, title, memo }: any) {
    console.log(memo ? 'DetailsMemoized rendered' : 'Details rendered');

    return (
        <div>
            <h3>Your name is: {name}</h3>
            <h4>Title: {title}</h4>
        </div>
    )
}

const DetailsMemoized = React.memo(Details);

function UseMemo() {
    const [state, setState] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);

    const [name, setName] = React.useState('Alfin');

    const incrementVal = () => {
        setState(state - 1)
    }

    const decrementVal = () => {
        setState(state + 1)
    }

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    // Mengembalikan hasil
    const fmt = React.useMemo(() => {
        return fibonacci(state)
    }, [state]);

    return (
        <div>
            <div className="usememo">
                <h1>useMemo()</h1>
                <p>{JSON.stringify(fmt)}</p>
                <button onClick={() => incrementVal()}>Increment</button>
                <button onClick={() => decrementVal()}>Decrement</button>
                <button onClick={() => toggleHandler()}>Set Toggle</button>

                <div className="keterangan">
                    <p>(fibonacci() akan dipanggil jika nilai state berubah. Jika tanpa useMemo() ketika button Set Toggle di klik, maka fungsi yang harusnya tidak berkaitan, akan dipanggil juga.)</p>
                </div>
            </div>
            <div className="memo">
                <h1>React.memo</h1>
                <DetailsMemoized name={name} title="Judul" memo={true} />
                <Details name={name} title="Judul" memo={false} />

                <button onClick={() => setName('Surya')}>Change Name</button>
                <br />
                <br />
                <div className="keterangan">
                    <p>
                        (Ketika button increment / decrement di klik maka komponen details tanpa memoisasi akan dipanggil berulang2)
                </p>
                    <p>
                        (Namun pada komponen details dengan memoisasi hanya akan dipanggil jika nilai propsnya berubah. Coba klik button change name)
                </p>
                </div>
            </div>
        </div>
    )
}



export default UseMemo;