import * as React from 'react';
import UseState from './wState';
import UseReducer from './wReducer';


/** 
 * Use reducer merupakan react hooks yang tugasnya mirip seperti 'useState()` yaitu untuk manajemen state tetapi dengan skala yang lebih besar dan kompleks. Jika kamu pernah menggunakan atau pernah mendengar [`redux`](https://redux.js.org/) sebelumnya, tentu ini akan terasa familiar. Yang patut diingat, sebenernya reducer adalah hanya sebuah fungsi yang hanya mengembalikan satu nilai saja, bisa berupa bilangan, string, atau object.
 * 
 * Fungsi useReducer() ini mempunyai 3 parameter 
 * ```tsx
    * function useReducer<R extends Reducer<any, any>>(
            reducer: R,
            initialState: ReducerState<R>,
            initializer?: undefined
        ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
    ```
 * Dalam implmenetasinya, useReducer di define dgn desctucturing array (seperti `useState()`), 
 ```tsx
        const [state, dispatch] = React.useReducer(__ReducerName__);
 ```
 * Jika useState menggunakan callback, useReducer menggunakan dispatch
*/


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