import * as React from 'react';
import Composition from './composition';
import ContextProvider, { Context } from './provider';
import ContextCallbackProvider, { ContextCallback } from './providerWCallback';

/** 
 * Berbicara tentang context, simpelnya context ini adalah global state manajemen bawaan React
 * Dengan menggunakan konteks, kita bisa mempasing data/mengirim data dari parent komponen ke child komponen,
 * 
 * Tapi sebelum itu, kita menuju pada dokumentasi React, di dokumentasi sempat disinggung mengenai `component tree`, ini menjadi maksud bahwa cara berfikir React, adalah `Struktur hierarki`, yang artinya komponen terbagi2 menjadi susunan kecil piece by piece, sub by sub dan level by level. 
 * 
 * Perumpamaannya seperti ini, ada komponen orang tua dan ada komponen anak-anak, contoh:
 * 
 * - FilterableProductTable
 *  - SearchBar
 *  - ProductTable
 *      - ProductCategoryRow
 *      - ProductRow
 * 
 * 
 * Di React sendiri, menggunakan konsep *props* dan *state*, ini berhubungan dengan proses input dan data antar masing2 komponen. Konsep yang cerdas menurut saya, tapi masalahnya adalah ada beberapa pertanyaan *'apakah state ini berlaku di semua komponen? Atau hanya di komponen itu sendiri saja?, Ketika komponen saya nantinya sudah banyak cabang2, banyak melalui level sampai 5 level, apa saya harus menggunakan props untuk sharing input terus menerus?'*
 * 
 * 
 * Jika kita membaca dokumentasi react, react memberikan beberapa solusi tepat dari masalah diatas,
 * 
 * Sebelum menggunakan context, kita harus mempertimbangkan terlebih dahulu casenya seperti apa: 
 * Jika hanya untuk menghindari melewatkan beberapa props melalui banyak level, kamu bisa menggunakan
 * - [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) Contohnya ada di file composition
 * 
 * Namun, bila memang untuk sharing data antar komponen yg sifatnya global seperti 
 *  - authentikasi user
 *  - Tema 
 *  - Cache data
 *  - Language, maka itu adalah saat yg tepat untuk menggunakan [Context](https://reactjs.org/docs/context.htm)
 * 
 * Selain penggunaan diluar ini, disarankan menggunakan cara yang lebih tepat dan efektif, karena di dokumentasi react sendiri mengatakan 'Apply it sparingly because it makes component reuse more difficult.'
 * 
 * Context
 * Terdapat beberapa API penting di context, seperti: createContext, Consumer, dan Provider bisa baca dokumentasi ini dlu, [context](https://reactjs.org/docs/context.html)
 * 
 * Pada case kali ini, kita akan menggunakan cara best practice untuk update context, yaitu dengan sebuah fungsi. So, kali ini kita akan menggunakan peran useState hook,
 * 
*/


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