import * as React from 'react';


function useEffect() {
    const [effectState, setEffectState] = React.useState(0);
    const [layoutEffectState, setLayoutEffectState] = React.useState(0);

    // Use Effect tanpa dependencies
    // Render at once
    React.useEffect(() => {
        console.log('useEffect() berjalan hanya sekali');
    }, []);

    // Use Layout Effect tanpa dependencies
    // Render at once
    React.useLayoutEffect(() => {
        console.log('useLayoutEffect() berjalan hanya sekali');
        document.title = 'Title page berganti, useLayoutEffect'; // Side-effect!
    }, []);

    // Use Effect dengan dependencies
    // Terjadi proses kedipan, saat melakukan perubahan dom (async)
    React.useEffect(() => {
        console.log('useEffect() berjalan ketika nilai pada effectState berubah');
        console.log(effectState);

        if (effectState === 0) {
            setEffectState(10 + Math.random() * 500);
        }
    }, [effectState]);

    // Use Layout Effect dengan dependencies
    // Tidak terjadi proses kedipan, saat melakukan perubahan dom (sync)
    React.useLayoutEffect(() => {
        console.log('useLayoutEffect() berjalan ketika nilai pada layoutEffectState berubah');
        console.log(layoutEffectState);

        if (layoutEffectState === 0) {
            setLayoutEffectState(10 + Math.random() * 500);
        }
    }, [layoutEffectState]);


    React.useEffect(() => {
        return () => {
            console.log('effect() dengan cleanup function');
            console.log('Good bye!');
            document.title = 'React App'; // Back to prev
        }
    }, []);

    return (
        <div>
            <h1>Use Effect/Use Layout Effect</h1>

            <div>
                <h3>Use Effect</h3>
                <p>Bilangan random: {effectState}</p>
                <div>
                    {/* Nilai 0 disini, cuman formalitas, perubahan value sebenernya ada di bagian useEffect() */}
                    <button onClick={() => setEffectState(0)}>Klik aku</button> 
                </div>
            </div>


            <div>
                <h3>Use Layout Effect</h3>
                <p>Bilangan random: {layoutEffectState}</p>
                <div>
                    {/* Nilai 0 disini, cuman formalitas, perubahan value sebenernya ada di bagian useLayoutEffect() */}
                    <button onClick={() => setLayoutEffectState(0)}>Klik aku</button> 
                </div>
            </div>

        </div>
    )
}

export default useEffect;