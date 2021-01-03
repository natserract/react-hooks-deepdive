# `useMemo()`

Hook ini memiliki kesamaan dengan hooks `useCallback` yaitu sama-sama untuk optimisasi performance. Perbedaannya [useMemo()](https://reactjs.org/docs/hooks-reference.html#usememo) mengembalikan hasil dari suatu fungsi (ex: `fmt(){ return 'hasil' }`) sedangkan `useCallback` mengembalikan fungsi itu sendiri.

`useMemo()` memiliki 2 parameter `function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;` mirip seperti `useEffect`. Hook ini akan berjalan jika salah satu dependensinya berubah. Perhatikan kode dibawah ini:

```tsx
function fibonacci(n: any): any {
    console.log('fibonacci() called');
    
    if (n <= 1) {
        return 1
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

const toggleHandler = () => {
    setToggle(!toggle);
}

const fmt = React.useMemo(() => fibonacci(state), [state]);
```
Cara kerja pada kode diatas adalah ketika nilai pada `state` berubah, maka fungsi `fibonacci()` akan dipanggil. Lalu `useMemo` akan mengembalikan hasil dari fungsi `fibonacci()` tersebut `return fibonacci(n - 1) + fibonacci(n - 2);` dan akan menyimpannya dalam memori untuk mencegah fungsi berjalan kembali (ini disebut memoisasi). Dan ketika fungsi `toggleHandler` dijalankan, fungsi `fibonacci()` tidak akan dibuat ulang/dipanggil.

Yang perlu ditekankan disini, gunakan `useMemo` untuk menjalankan fungsi yang menghabiskan banyak waktu dan memori (expensive function), dan untuk operasi yang berat. Artinya fungsi tersebut memang membutuhkan optimisasi agar tidak merusak kinerja aplikasi.

## `React.memo`
[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) merupakan hoc (higher order components) yang tujuannya untuk optimisasi rendering. `React.memo` digunakan dengan tujuan untuk menghindari fungsi render yang berulang-ulang dengan `props` yang sama, jadi kalau `props` atau hasil dari komponen tersebut sama, React akan melewatinya (tidak merender ulang). Namun ketika `props` atau hasilnya berbeda dengan hasil render sebelumnya barulah komponen di render ulang lalu hasilnya di simpan ke dalam memori.

```tsx
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

<DetailsMemoized name={name} title="Judul" memo={true} />
<Details name={name} title="Judul" memo={false} />
```
Untuk lihat hasilnya, kamu bisa coba lihat example bagaiamana proses render dari komponen yang di memoisasi dan yang tidak.

## Notes
- Semua hooks ini `useMemo`, `useCallback`, `React.memo` tujuannya adalah untuk pengoptimalan kinerja, gunakan dengan tepat jangan terlalu bergantung pada ini.
- Perbedaan `useMemo`, & `React.memo` adalah: `useMemo` untuk optimisasi fungsi, sedangkan `React.memo` untuk optimisasi komponen.