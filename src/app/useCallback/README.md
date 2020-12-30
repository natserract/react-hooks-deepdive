# `useCallback()`

[useCallback()](https://reactjs.org/docs/hooks-reference.html#usecallback) tujuan dari penggunaan hooks ini adalah untuk **memoisasi**. Sebelum melangkah lebih dalam, alangkah baiknya kita harus pahami dulu apa itu memoisasi. Disini saya akan berikan 2 pengertian, yang sebenernya merujuk pada satu arti:

1. Memoisasi adalah istilah yang menggambarkan teknik pengoptimalan tempat Anda menyimpan hasil yang dihitung sebelumnya, dan mengembalikan hasil yang di-cache ketika perhitungan yang sama diperlukan lagi.
2. Memoisasi adalah tindakan menyimpan hasil masukan dan mengembalikan hasil saat masukan muncul lagi

Kata kuncinya adalah `menyimpan`, `teknik pengoptimalan`, dan `cache`, mengapa? coba perhatikan kode dibawah ini:

```tsx
function List() {
    const addItems = () => {
        let _placeArray: any = [];
        _placeArray.push(`Item ${items.lists.length + 1}`);

        setItems({
            lists: [...items.lists.concat(_placeArray)]
        })
    }

    return <button onClick={() => addItems()}>Add item</button>
}
```

Dan lagi sekali, lihat beberapa himbauan React di [dokumentasinya](https://reactjs.org/docs/faq-functions.html#how-do-i-pass-a-parameter-to-an-event-handler-or-callback)

> Using in render creates a new function each time the component renders, which may have performance implications.

> Using an arrow function in render creates a new function each time the component renders, which may break optimizations based on strict identity comparison.

Jadi maksudnya seperti ini, ketika button di component `List` ini di klik maka akan memanggil fungsi `() => addItems()`. Proses yang terjadi adalah nilai state akan berubah dan terjadi proses perenderan ulang `items.lists.map(() => ...})`. Nah masalahnya adalah ketika komponen `List` ini di render ulang (bukan perpindahan routes, krn setiap pergantian routes komponen selalu dirender ulang), yang terjadi di belakang layar ternyata fungsi `addItems()` ini akan selalu dibuat baru. 

*No bukti, Hoax!*  Hmm, okay ini aku kasi buktinya:

```tsx
const functionLogs = new Set();

functionLogs.add(addItems);

console.log(`Without callback addItems(), created: `, functionLogs.size, ' times');
```

Kalau kamu lihat examplenya, coba buka konsol lalu coba klik antara button yang tidak menggunakan callback, dan yang menggunakan `useCallback()`. Coba perhatikan, ketika button tidak pake `useCallback()` di klik maka: 
- Nilai pada teks ini `Without callback addItems(), created: 1 times` akan selalu bertambah
- Begitu juga saat button yg pake `useCallback()` di klik, anehnya nilai pada teks `Without callback addItems(), created: 1 times` ini juga ikut bertambah. 

Kalau file `index.tsx` kita kompile, maka hasilnya seperti ini: 

```js
var addItems = function () {
    var _placeArray = [];
    _placeArray.push("Item " + (items.lists.length + 1));
    setItems({
        lists: __spreadArrays(items.lists.concat(_placeArray))
    });
};
```

Jadi salah satu solusinya adalah membuat [bind(this)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) lalu menyimpannya di constructor `this.addItems = this.addItems.bind(this)`. 

Tapi masalahnya adalah ini `functional` komponen bukan `Class` komponen. So, *why care?, pake arrow function aja gpp* Okay, iya bener gapapa selagi ga ada masalah performance, tpi coba bayangkan saja ketika komponen mempunyai struktur yang kompleks, atau ada proses yang berjalan secara maraton, tentu ini bisa menyebabkan terjadinya memory leaks. Maka harus ada pengoptimalan, krn itu peran hooks `useCallback()` ini tepat untuk digunakan, penggunaannya sendiri mirip seperti `useEffect()`:

```tsx
// Recreate addItemsWCallback on every change of itemsWCallback.lists not every component re-rendered!
const addItemsWCallback = React.useCallback(() => {
    let _placeArrayWCallback = [];
    _placeArrayWCallback.push(`Item ${itemsWCallback.lists.length + 1}`)

    setItemsWCallback({
        lists: [...itemsWCallback.lists.concat(_placeArrayWCallback)]
    })
}, [itemsWCallback.lists]);

console.log(`With callback addItemsWCallback(), created: `, functionLogsWCallback.size, ' times');
```

## Notes

- Saya kira saat ini kamu sudah cukup paham hooks ini saat kapan digunakan, tetapi jika ingin melihat real case bisa mampir ke artikelnya **Kent C Codds** [disini](https://kentcdodds.com/blog/usememo-and-usecallback/)
- Jangan lupa install extension chrome ini untuk melihat performance dari komponen [react developer tools](https://chrome.google.com/webstore/detail/fmkadmapgofadopljbjfkapdkoienihi)
- Saat event dijalankan / fungsi dipanggil dari masing-masing tipe komponen, lihat bagaimana logsnya untuk tau apa yang terjadi

## Next Hooks
[useMemo()](https://github.com/natserract/react-hooks-deepdive/tree/main/src/app/useMemo)