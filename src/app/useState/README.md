# Use State

State simplenya adalah data, sifatnya mutable / bisa diubah. React basenya adalah komponen by komponen, terdapat 2 jenis komponen, yaitu komponen yg sifatnya stateful, dan ada yg stateless.
- Stateful: Komponen yang sifatnya utk melacak data, mksdnya adalah tempat dimana komponen lain menerima data, istilahnya adalah container.
- Stateless: Bisa juga dibilang komponen statis/dumb, artinya semua keluaran diambil dari props, jadi komponen ini biasanya mempunyai props.

Fungsi `useState()` merupakan stateful function yang pendefinisannya didefinisikan melalui destructuring array. Contoh pada kode dibawah ini:
```tsx
const [state, setState] = React.useState(0);
```

Terdapat 2 variabel pada array, yaitu `state`, dan `setState`, pada variabel pertama state adalah *value*, sedangkan setState adalah function untuk merubah *value* state, karena nilainya bersifat mutable/bisa diubah. Dan disana value dari statenya adalah 0

## Case
Case kali ini, adalah melakukan pertambahan dan pengurangan bilangan (increment/decrement). Seperti yang dijelaskan diatas, fungsi untuk merubah datanya adalah parameter kedua, yaitu `setState()`. Perhatikan kode dibawah ini:
```tsx
<button onClick={() => setState(state + 1)}>
``` 
Pada element button terdapat event onClick, yang memanggil function `setState()`, dan didalamnya terdapat parameter `state`, parameter `state` ini adalah previous state / state sebelumnya yang nilainya di + 1. Penggunaan setState sendiri tergantung pada nilainya, jika didefenisikan menggunakan object, maka untuk melakukan perubahan datanya juga menggunakan object, contoh:
```tsx
const [state, setState] = ( { count: 0 } )

setState( { count: state + 1 } )
```

## Notes
Jika nilai state udah banyak atau complex, disarankan menggunakan [`useReducer()`](https://reactjs.org/docs/hooks-reference.html#usereducer), karena untuk optimisasi performance dan managenya lebih mudah, perbedaannya adalah untuk melakukan action menggunakan `dispatch({ type: TYPE_ACTION, ... })`, bukan `callback/setState(() => ...)`

Kadang beberapa data, tidak harus menggunakan hooks `useState()`, bisa jadi nantinya kamu terlalu terpaku dengan ini. Yang harusnya caranya lebih mudah, bisa jadi lebih ribet dan jadinya tidak efektif. 

# Next Hooks
[useEffect() & useLayoutEffect()](https://github.com/natserract/react-hooks-deepdive/tree/main/src/app/useEffectnLayout)

