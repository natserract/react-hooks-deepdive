import * as React from 'react';

/** 
 * Di page ini akan dijelaskan hooks useEffect() dan useLayoutEffect(); 
 * Kedua hooks ini hampir sama, yang berbeda adalah waktu penggunaannya
 * 
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 * 
 * 
 * Ini berhubungan dengan lifecycle (for function component) dan proses render di react. 
 * Sesuai dengan namanya fungsinya adalah untuk side effect, contoh: Pemanggilan API, Perubahan/Manipulasi DOM, Waktu timeOut, dll. 
 * 
 * Jadi diluar ini, disarankan tidak menggunakan hooks useEffect(), karena ada suatu cara yang lebih tepat, 
 * seperti useLayoutEffect(), useMemo(), useCallback()
 * 
 * Terdapat beberapa tahap umum lifecycle di react, yaitu: 
 * componentDidMount(): Tahap sebelum komponen di render, 
 * componentDidUpdate(): Tahap setelah komponen di render
 * componentWillUnmount(): Tahap untuk unmounting/destroying komponen
 * 
 * Magicnya, ketika menggunakan useEffect() hooks, tidak lagi menulis duplikasi kode lagi 
 * Yang pda umumnya dilakukan di componentDidMount() ataupun componentDidUpdate().
 * 
 * Fungsi useEffect() dan useLayoutEffect() ini, mempunyai 2 parameter: 
 * function (effect: EffectCallback, deps?: DependencyList): void;
 *
 * @param effect
 * Parameter pertama, adalah effect, ini sebenernya adalah imperatif function berupa callback, 
 * didalam callback ini terdapat cleanup function/pembersihan cara kerjanya mirip seperti componentWillUnmount()
 * Fungsi clean up ini tujuannya untuk mencegah memory leak / kebocoran memori
 * 
 * Imperatif function artinya memberikan perintah, perintah yang kita inginkan baik sebelum komponen di mount/render, 
 * maupun setelah komponen di unmount
 * 
 * 
 * @param deps
 * Parameter kedua, adalah dependencies, artinya useEffect akan melakukan tugasnya/merender ulang jika salah satu dependensinya berubah. Misal: 
 *
 * const [state, setState] = React.useState(0);
 * 
 *  React.useEffect(() => {
 *     console.log('useEffect() dipanggil')
 *     console.log(state);
 *  }, [state]);
 * 
 * return <button onClick={() => setState(state + 1)}> 
 * 
 * Ketika button di klik, button akan memanggil function setState(), jadi useEffect akan melakukan tugasnya/merender ulang jika 
 * dependencies `state` berubah, bisa coba lihat di console.
 * 
 * 
 * Jika dependencies nya kosong, artinya useEffect hanya akan berjalan sekali saja, saat komponen pertama kali di render.
 * Jika tanpa dependencies, artinya useEffect akan berjalan setelah setiap komponen di render ulang
 * 
 * 
 * Note: 
 * - Hati-hati dengan dependencies, karena jika tidak tepat penggunannya akan menyebabkan bugs pada apps, 
 * ex: infinite loop. Pasang dependencies jika diperlukan saja, sesuaikan dengan kebutuhan.
 * - Dependencies ini mirip seperti watch() di vue, jdi nilai mana yang akan dilacak lalu dirender ulang
 * - Jika melakukan perubahan DOM atau masalah visual, disarankan menggunakan useLayoutEffect(), karena akan lebih cepat, 
 *   dan menghindari pemblokiran visual
 * - synchronous : proses pengguna setelah proses I/O selesai dikerjakan, jadi tidak akan berjalan jika proses pertama blm selesai
 * - asynchronous: proses dijalankan tanpa menunggu proses I/O selesai
 * 
 * 
 * Perbedaan antara useEffect() dan useLayoutEffect(),
 * useEffect(): 
 * - Berjalan secara async setelah perubahan yang terjadi pada DOM telah selesai di render dilayar, 
 * - When to use: Saat pemanggilan api, baca data dari localstorage. dll
 * 
 * useLayoutEffect(): 
 * - Berjalan secara synchronous sebelum perubahan yang terjadi pada DOM dirender dilayar, 
 * - When to use: Saat check scroll position, membaca tata letak dari DOM, render perubahan dom secara sinkron, dll
 * 
 * Masalah yang terjadi jika kita menggunakan useEffect() untuk melakukan perubahan visual,
 * adalah terjadinya perubahan visual yang tidak konsisten
*/

function useEffect() {
    const [effectState, setEffectState] = React.useState(0);
    const [layoutEffectState, setLayoutEffectState] = React.useState(0);

    /**
     * Perbedaan `useEffect()` & `useLayoutEffect()` salah satunya pada time executionnya, 
     * jika dilihat console, yang pertama kali di eksekusi adalah useLayoutEffect.
    */

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


    /**
     * Use Effect dengan cleanup function
     * Clean up akan berjalan, jika component di unmount, coba pindah routes, apa yang terjadi?
     * Jika tanpa cleanup, ketika pindah routes, title tidak berubah.
     * Solusinya adalah melalukan pembersihan, ketika component di unmount kita akan melakukan sesuai dengan yang kita inginkan
    */
    React.useEffect(() => {
        // contoh cleanup
        // Fungsi cleanup?: Membatalkan network request saat terjadi error, mencegah memory leaks, 
        // menghapus fungsi yang udah gakepake (ex: removeEventListener()), subscribe, etc.
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