# Use Effect & Use Layout Effect

Kedua hooks ini sebenernya konsepnya hampir sama, cuman perbedaannya adalah dari bagaimana cara komunikasi dari function ini bekerja, dan timing dalam penggunaannya. So, dicase kali ini dibagian pertama secara konsep kita fokus pada `useEffect` dulu saja karena kedua hooks ini mempunyai konsep yang hampir sama, tapi secara penggunaan nanti akan dijelaskan bagaiamana kedua hooks ini digunakan.

## `useEffect()`
`useEffect` ini erat kaitannya dengan lifecycle pada react, pada komponen yang berbasis `Class` tahap pada umumnya adalah:
- `componentDidMount()` : Tahap sebelum komponen di render, 
- `componentDidUpdate()` : Tahap setelah komponen di render
- `componentWillUnmount()` : Tahap ketika komponen di destroy/unmount

Sedangkan pada `functional` komponen, React sudah memfasilitasi dengan salah satu hooks andalan yaitu [`useEffect()`](https://reactjs.org/docs/hooks-reference.html#useeffect). Sesuai dengan namanya, fungsinya adalah untuk side effect, contoh: **pemanggilan API, perubahan/manipulasi DOM, timing, read browser storage**, dll. Diluar contoh ini, disarankan tidak menggunakan `useEffect`, karena ada cara yang lebih tepat misal menggunakan `useCallback()`, `useMemo()`, dll. Alasannya terkait dengan optimisasi performance dari React itu sendiri. Lihat kode dibawah ini:

```tsx
React.useEffect(() => {
    console.log(state);
}, []);
```

Hooks `useEffect` mempunyai 2 parameter, `function (effect: EffectCallback, deps?: DependencyList): void;`. 

### @effect
Parameter pertama, adalah `effect`, yang sebenernya adalah sebuah imperatif function berupa `callback`, nah didalam callback ini juga ada sebuah function yang tujuannya untuk melakukan pembersihan pada komponen tersebut, artinya *'kalo ga kepake ya buang, atau bersiin'*. Contoh cleanup:

```tsx
React.useEffect(() => {
    console.log(state);

    return () => {
        console.log("Good bye!");
    }
}, []);
```

Cara kerja cleanup ini mirip seperti `componentWillUnmount()`. Fungsi clean up ini tujuannya adalah untuk mencegah memory leak / kebocoran memori. Clean up akan berjalan, jika component di destroy/unmount, coba pindah routes, apa yang terjadi?. Misal tanpa di cleanup, ketika pindah routes, titlenya tidak akan berubah, nilainya masi seperti di komponen yang sebelumnya.

Maka dari itu, solusinya adalah melalukan pembersihan, ketika component di destroy/unmount maka *do whatever you want*. Beberapa contoh penggunaan cleanup seperti: membatalkan network request saat terjadi error, unsubscribe, menghapus fungsi yang udah gakepake (ex: `removeEventListener()`), dll.

### @deps
Parameter kedua, adalah dependensi, artinya `useEffect` akan melakukan tugasnya/merender ulang jika salah satu dependensinya berubah. Misal: 
```tsx
const [state, setState] = React.useState(0);
  
React.useEffect(() => {
    console.log(state);
}, [state]);

return <button onClick={() => setState(state + 1)}> 
```
Ketika button di klik, button akan memanggil function setState(), artinya nilai state berubah. Maka dari itu useEffect baru akan melakukan tugasnya/merender ulang komponen ketika dependensi `state` ini berubah, bisa coba lihat di example.

Jika dependensi nya kosong `[]`, artinya `useEffect` hanya akan berjalan ketika pertama kali saja artinya **hanya sekali**. Jika tanpa dependencies `React.useEffect(() => { ... })`, artinya `useEffect` akan berjalan setelah **setiap komponen di render ulang**.

```tsx
// Render at once
React.useEffect(() => {
    console.log('useEffect() berjalan hanya sekali');
}, []);

// Render every component re-rendered
React.useEffect(() => {
    console.log('useEffect() berjalan setiap komponen di render ulang');
});
```


## `useLayoutEffect()`
Bedanya antara `useLayoutEffect()` dan `useEffect()` adalah dari sifatnya, jika `useEffect` berjalan secara asynchronous setelah perubahan yang terjadi pada DOM telah selesai di render dilayar, sedangkan `useLayoutEffect()` berjalan secara synchronous sebelum perubahan yang terjadi pada DOM dirender dilayar. Pertanyaannya adalah, saat kapan hooks ini digunakan? :)

Didalam [dokumentasinya](https://reactjs.org/docs/hooks-reference.html#uselayouteffect), dan beberapa source mereka mengatakan hooks ini digunakan saat ketika ingin **membaca tata letak dari DOM, checking scroll position, dan me-render perubahan DOM yang sifatnya synchronous**. Perhatikan kode dibawah ini:

```tsx
React.useEffect(() => {
    console.log('useEffect() dipanggil');
}, []);

React.useLayoutEffect(() => {
    console.log('useLayoutEffect() dipanggil');
}, []);
```

Jika dilihat di browser, terlihat function `useLayoutEffect()` ini yang pertama kali dieksekusi, atau kalau masih penasaran bisa switch posisi antara kedua hooks tersebut menjadi sebaliknya, apakah console dari `useEffect` yang akan pertama kali dieksekusi?. Tentunya tidak, ini adalah perbedaan dari kedua hooks tersebut, dari timingnya.

Beberapa problem yang terjadi ketika menggunakan `useEffect()` ketika melakukan perubahan visual/manipulasi DOM, terkadang terjadi perubahan yang tidak konsisten, seperti pada contoh kode dibawah ini:

```tsx
// Terjadi proses kedipan, saat melakukan perubahan dom (async)
React.useEffect(() => {
    console.log(effectState);

    if (effectState === 0) {
        setEffectState(10 + Math.random() * 500);
    }
}, [effectState]);

// Tidak terjadi proses kedipan, saat melakukan perubahan dom (sync)
React.useLayoutEffect(() => {
    console.log(layoutEffectState);

    if (layoutEffectState === 0) {
        setLayoutEffectState(10 + Math.random() * 500);
    }
}, [layoutEffectState]);
```

Coba lihat di browser lalu klik button beberapa kali secara cepat. Maka akan terlihat perubahan data yang menggunakan `useEffect` terjadi beberapa kali kedipan, sedangkan pada `useLayoutEffect`, terasa clean tanpa ada kedipan. Ini karena kedua hooks ini mempunyai proses komunikasi yang berbeda, seperti yang dijelaskan diatas. 


## Notes
- Hati-hati dengan dependencies, karena jika tidak tepat penggunannya akan menyebabkan bugs pada apps, ex: infinite loop. Pasang dependencies jika diperlukan saja, sesuaikan dengan kebutuhan.
- Jika ingin melakukan perubahan DOM atau masalah visual yang sifatnya synchronous, disarankan menggunakan `useLayoutEffect()`, karena akan lebih cepat, dan menghindari pemblokiran visual seperti pada contoh diatas tadi.

# Next Hooks
[useEffect() & useLayoutEffect()](https://reactjs.org/docs/hooks-reference.html#usereducer)

