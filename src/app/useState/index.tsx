import * as React from 'react';

/** 
 * State simplenya adalah data, sifatnya mutable / data yg bisa diubah. 
 * 
 * Konsepnya react adalah komponen by komponen, terdapat 2 jenis komponen, yaitu komponen yg sifatnya stateful, dan ada yg stateless.
   Stateful: Komponen yang sifatnya utk melacak data, mksdnya adalah tempat dimana komponen lain menerima data, istilahnya adalah container.
   Stateless: Bisa juga dibilang komponen statis/dumb, artinya semua keluaran diambil dari props, jadi komponen itu biasanya mempunyai props.
*/

function useState() {
    /**
     * @see https://reactjs.org/docs/hooks-reference.html#usestate
     * __useState()__ sebuah stateful function yang pendefinisannya didefinisikan melalui destructuring array, 
     * Isinya mempunyai 2 value yaitu:
     * [
     *  Isi nilai --> value 
     *  function --> Function untuk merubah value
     * ] 
    */
    const [state, setState] = React.useState(0);

    /** 
     * Implementasi kali ini, yaitu pertambahan dan pengurangan nilai (increment/decrement)
     * Lihat kode dibawah, terdapat event onClick, yang memanggil function `setState()`, 
     * 
     * Karena pendefinisian nilai langsung, tanpa object didalamnya, jadi untuk perubahannya pun sama, 
     * setState(nilai + 1), beda lagi jika 
     * 
     * `jsx
     * 
     *  [state, setState] = ( { count: 0 } )
     * 
     * `
     * Jadi untuk action nya juga harus melalui object pula, setState( { count: state + 1 } );
     * 
     * Note: Kalau statenya udah banyak atau complex, disarankan menggunakan useReducer(), krn untuk optimisasi performance, 
     * Tapi perbedaannya, untuk action nya menggunakan dispatch({ type: TYPE_ACTION, ... }), bukan callback/setState(() => ...)
     * @see https://reactjs.org/docs/hooks-reference.html#usereducer
     * 
    */

    return (
        <div>
            <h1>Use State</h1>
            <p>Kamu udah click {state} kali</p>

            {/* 
                * setState(state + 1)
                * Didalam setState, terdapat parameter `state`, mksudnya parameter `state` ini adalah previous state / state sebelumnya
                * yang ditambah nilainya + 1. 
            */}

            <button onClick={() => setState(state + 1)}>
                Klik aku
            </button>
            <button onClick={() => setState(0)}>Reset</button>

        </div>
    )
}

export default useState;