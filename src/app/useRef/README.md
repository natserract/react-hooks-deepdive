# `useRef()`

Hook yang mengembalikan objek ref berupa properti `.current` yang sifatnya mutable atau bisa diubah. `useRef ()` berguna tidak hanya sekedar attribut `ref`, tapi juga berfungsi untuk mempertahankan nilai yang berubah selama masa hidup komponen. Perhatikan kode dibawah ini:

```tsx
const refDOM = React.useRef(null);
const changeTitleDOM = () => {
    refDOM.current.innerText = 'Title udah berganti';
}

<h3 ref={refDOM}>Title belum berganti</h3>

<button onClick={() => changeTitleDOM()}>Change title</button>
```

[useRef](https://reactjs.org/docs/hooks-reference.html#useref) memiliki 1 parameter `function useRef<T>(initialValue: T): MutableRefObject<T>;` berupa initial value `null`. Ketika `refDOM` ini di console, maka akan menampilkan objek properti berupa `.current` dan didalamnya terdapat tag `h3`. 

Pada kode diatas, `ref` digunakan untuk mengakses `DOM` element `h3`, lalu merubah `innerText` nya. Dan ketika button change title di klik maka title akan berganti, kalau kamu lihat secara detail pada bagian `console.log('changeTitleDOM() called?')` ternyata saat pergantian title tidak terjadi proses perenderan ulang. 

Ini adalah salah satu perbedaan antara `useRef` dengan `useState`:
- Jika `useState` menyebabkan perenderan ulang, sedangkan `useRef` tidak menyebabkan perenderan ulang.
- `useRef` berjalan secara synchronous sedangkan `useState` berjalan secara asynchronous

Perhatikan kode dibawah ini:
```tsx
const refInitialValue = React.useRef<any>({
    username: 'alfinsurya',
    version: 'v17.0.1'
});

// Won't be re-rendered
React.useEffect(() => {
    refInitialValue.current.username = 'benjamin';
    refInitialValue.current.version = 'v16.8.1';
}, []);
```
Dalam contoh diatas, ref berusaha diperbarui dalam `useEffect` ketika komponen di mount, namun ketika dilihat di DOM perubahan tidak sesuai/tidak muncul. Penyebabnya adalah karena perubahan nilai pada properti `.current` tidak akan menyebabkan perenderan ulang. Ini merupakan cara kerja hooks `useRef`.
 
> Keep in mind `useRef`  doesn't notify you when its content changes. Mutating `.current` the property doesn't cause a re-render.

Biasanya yang paling umum `useRef` digunakan untuk: 
- Menyimpan data yang tidak membutuhkan render ulang.
- Mengakses DOM seperti mengambil nilai input, mengatur fokus, dll