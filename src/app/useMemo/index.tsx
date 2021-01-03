import * as React from 'react';

/**
 * Render multiple times with another component
 * useMemo untuk fungsi, memo untuk component
 * 
 * useMemo() mengembalikan/menyimpan cache nilai / hasil 
 * 
 * kapan pun Anda mencoba mencegah menjalankan kembali fungsi yang mahal, yang berjalan banyak waktu, atau menggunakan banyak sumber daya. Mengapa? Karena useMemo menyimpan hasil eksekusi fungsi dalam memori, dan ini berpotensi menjadi besar dan secara ironis merusak kinerja Aplikasi Anda.
 * 
 * React.memo memungkinkan Anda untuk menghindari menjalankan fungsi render anak jika komponen induk merender anak tersebut dengan props yang sama. Jika rekonsiliasi menggantikan induk dengan komponen baru, induk baru tidak akan menggunakan kembali komponen memo yang sama bahkan jika itu merender anak yang sama sebagai induk terakhir.
 * 
 * https://stackoverflow.com/questions/61377100/why-my-header-render-every-time-already-use-react-memo
 * 
 * Dengan memoization, kami dapat mencegah fungsi kami memanggil fungsi yang menghitung ulang hasil yang sama berulang kali. 
 * 
 * useCallback  mencegah fungsi dibuat ulang lagi, berdasarkan daftar dependensi. Ini mengembalikan fungsi itu sendiri. Gunakan saat Anda ingin menyebarkannya ke komponen turunan, dan mencegah dari fungsi yang mahal untuk berjalan kembali.
 * 
 * useMemo  menjaga fungsi agar tidak dijalankan lagi jika tidak menerima sekumpulan parameter yang sebelumnya digunakan. Ini mengembalikan hasil dari suatu fungsi. Gunakan saat Anda ingin mencegah beberapa operasi berat atau mahal dipanggil pada setiap render.
 */

function fibonacci(n: any): any {
    console.log('fibonacci() called');

    if (n <= 1) {
        return 1
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

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

function UseMemo() {
    const [state, setState] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);

    const [name, setName] = React.useState('Alfin');

    const incrementVal = () => {
        setState(state - 1)
    }

    const decrementVal = () => {
        setState(state + 1)
    }

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    // Mengembalikan hasil
    const fmt = React.useMemo(() => {
        return fibonacci(state)
    }, [state]);

    return (
        <div>
            <div className="usememo">
                <h1>useMemo()</h1>
                <p>{JSON.stringify(fmt)}</p>
                <button onClick={() => incrementVal()}>Increment</button>
                <button onClick={() => decrementVal()}>Decrement</button>
                <button onClick={() => toggleHandler()}>Set Toggle</button>

                <div className="keterangan">
                    <p>(fibonacci() akan dipanggil jika nilai state berubah. Jika tanpa useMemo() ketika button Set Toggle di klik, maka fungsi yang harusnya tidak berkaitan, akan dipanggil juga.)</p>
                </div>
            </div>
            <div className="memo">
                <h1>React.memo</h1>
                <DetailsMemoized name={name} title="Judul" memo={true} />
                <Details name={name} title="Judul" memo={false} />

                <button onClick={() => setName('Surya')}>Change Name</button>
                <br/>
                <br/>
                <div className="keterangan">
                    <p>
                        (Ketika button increment / decrement di klik maka komponen details tanpa memoisasi akan dipanggil berulang2)
                </p>
                    <p>
                        (Namun pada komponen details dengan memoisasi hanya akan dipanggil jika nilai propsnya berubah. Coba klik button change name)
                </p>
                </div>
            </div>
        </div>
    )
}



export default UseMemo;