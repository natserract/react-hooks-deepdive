# `useReducer()`

[`useReducer()`](https://reactjs.org/docs/hooks-reference.html#usereducer) merupakan react hooks yang tugasnya mirip seperti `useState()` yaitu sebagai bantuan untuk manajemen state tetapi dengan skala yang lebih besar dan kompleks. Jika kamu pernah menggunakan atau pernah mendengar [redux](https://redux.js.org/) sebelumnya, tentu ini akan terasa familiar. Yang patut diingat, sebenernya reducer adalah hanya sebuah fungsi yang hanya mengembalikan satu nilai saja, bisa berupa bilangan, string, atau object.
 
Fungsi useReducer() ini mempunyai 3 parameter, tetapi pada umumnya kebanyakan menggunakan hanya 2 parameter saja 
 ```tsx
 function useReducer<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    initializer?: undefined
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```

Dalam implementasinya, `useReducer` di define dgn desctructuring array (seperti `useState()`), 
 
 ```tsx
const [state, dispatch] = React.useReducer(__ReducerName__);
 ```

Jika useState menggunakan **callback**, useReducer menggunakan **dispatch** untuk melakukan manipulasi statenya. Mungkin ada beberapa pertanyaan, *"mengapa harus memakai useReducer() daripada useState()?, saat kapan menggunakan ini?"*, jawabannya akan menuju pada penjelasan dibawah ini

Case kali ini adalah melakukan request api, dengan menggunakan beberapa macam state. Disini saya akan buat 2 perbandingan kode antara `useState()` dengan `useReducer()`

## Menggunakan `useState()`
Dimulai dengan implementasi penggunaan `useState`, coba lihat kode dibawah ini:

```tsx
const [posts, setPosts] = React.useState([]);
const [loading, setLoading] = React.useState(false);
const [errors, setErrors] = React.useState<string | undefined>(undefined);

const fetchRequest = (async () => {
    setErrors('');
    setLoading(true);

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error(response.statusText);

        let body = await response.json();
        setLoading(false);
        setPosts(body);

    } catch (error) {
        setErrors(error.message);
        console.error(error);
    }
});
```

Dalam kode diatas terlihat ada 3 macam varian state, yaitu `posts`, `loading`, dan `errors` (ini sebagai contoh, case sebenernya bisa jadi kamu akan menemukan macam varian state yang lebih banyak dan kompleks). Di dalam function `fetchRequest()` proses fetching dilakukan, dari contoh kode diatas saya akan berikan beberapa literasi:

- Jika kita lihat, untuk melakukan state kita akan memanggil fungsi set* (setErrors, setLoading, etc), dari sini kita akan berfikir lebih ke **apa yang harus saya lakukan setelah fetch berhasil**, right?
- Dari sisi kode memang terlihat lebih sedikit, tapi ketika state sudah mencapai level kompleks dan banyak, manajemen yang dilakukan **akankah lebih mudah?**, begitu juga dengan proses pengujian / testing.
- Dan coba pahami kata-kata Sunil Pai (React Team) **"Using a reducer helps separate reads, from writes."**

Setelah cukup puas di bagian `useState()`, coba kita merujuk pada `useReducer()` (sambil mengingat beberapa literasi tadi).

## Menggunakan `useReducer()`
Selanjutnya implementasi penggunaan `useReducer`, coba lihat kode dibawah ini:

```tsx
const initialState = {
    posts: [],
    loading: false,
    errors: undefined,
};

// Create reducer
const Reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case '@@FETCH_REQUEST': {
            return {
                ...state,
                errors: '',
                loading: true,
            }
        }

        case '@@FETCH_SUCCESS': {
            return {
                ...state,
                loading: false,
                posts: action.payload.posts
            }
        }

        case '@@FETCH_ERROR': {
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            }
        }

        default: return state
    }
};

...
// Use reducer & call dispatch
const [state, dispatch] = React.useReducer(Reducer, initialState);

const fetchRequest = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const body = await response.json();

    try {
        dispatch({
            type: '@@FETCH_SUCCESS',
            payload: {
                posts: body
            }
        });

    } catch (error) {
        dispatch({
            type: '@@FETCH_ERROR',
            payload: {
                errors: error.message
            }
        });
    }
};
...
```

> Penulisan reducer memiliki beberapa gaya penulisan, tapi pada umumnya menggunakan gaya penulisan seperti redux 

Disini saya akan menjelaskan beberapa point penting di reducer:

- Pada fungsi ini `const Reducer = (state: any = initialState, action: any) => { ... }`, didalamnya ada 2 parameter yaitu parameter `state` untuk nilai / initial state, dan parameter `action` untuk perubahan nilai, mirip seperti (`[state, action] = ...`). 
- Mekanisme dari function tersebut adalah ketika `type` nya `@@FETCH_REQUEST` (misal), maka fungsi Reducer() akan mengembalikan nilai sesuai dengan kondisinya. 
- Lihat bagian ini `posts: action.payload.posts`, ada kata **payload**. Payload itu ibaratnya seperti titipan, jadi misal pak bos (reducer) menyuruh kita untuk membeli barang, barang yang harus dibeli adalah (payload.posts), jadi nanti toko akan memberikan / mengisi sesuai dengan barang yang diperlukan (posts)

Ketika reducer udah selesai dibuat, barulah `useReducer` ini akan dipake, contoh:

```tsx
const [state, dispatch] = React.useReducer(Reducer, initialState);

// Actions
dispatch({
    type: '@@FETCH_SUCCESS',
    payload: {
        posts: body
    }
});

// View
JSON.stringify(state.posts);
...
```

Jika useReducer sudah di define, `[state, dispatch]` kedua variabel ini perannya adalah, `state` untuk view, `dispatch` untuk actions / mutasi. Di fungsi `Reducer()` terdapat 3 type: `@@FETCH_REQUEST`, `@@FETCH_SUCCESS`, dan `@@FETCH_ERROR`. Jadi yaudah tinggal panggil dispatchnya, sesuain typenya, isi payloadnya (barangnya), done!

So, setelah penjelasan yg cukup detail diatas hal yang baru saya sadari adalah bahwa ketika membuat reducer kita akan lebih berfikir **apa yang diperlukan oleh user?** daripada **apa yang harus dilakukan setelahnya?** bukan?, ini adalah salah satu jawaban saat kapan reducer itu digunakan, dan kelebihan/kekurangannya. Yang terpenting disesuaikan dengan kebutuhan dan lihat kondisi, btw kamu juga bisa explore lebih dalam mengenai `useReducer()` ini, misal mengkombinasikannya dengan context, membuat custom hooks, dll. Saya pikir sebelum belajar redux, sebelumnya kamu coba pelajari bagian ini dulu ;).

## Next Hooks
[useCallback()](https://github.com/natserract/react-hooks-deepdive/tree/main/src/app/useCallback)
