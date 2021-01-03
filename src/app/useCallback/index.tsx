import * as React from 'react';

/**
 * Memoisasi adalah istilah yang menggambarkan teknik pengoptimalan tempat Anda menyimpan hasil yang dihitung sebelumnya, dan mengembalikan hasil yang di-cache ketika perhitungan yang sama diperlukan lagi.
 * 
 * Memoize adalah tindakan menyimpan hasil masukan dan mengembalikan hasil saat masukan muncul lagi
 * 
 * useCallback() mengembalikan/menyimpan cache callback atau fungsi itu sendiri
 * 
 * Saat tepat:
 *  keadaan mungkin menjadi lebih buruk: ketika tidak menggunakan useCallback, fungsi lama Anda akan dikumpulkan sampahnya, tetapi dengan useCallback itu akan tetap ada di memori, jika salah satu dependensi akan benar lagi untuk mengembalikan versi fungsi lama itu.
 * 
 * Saat tidak tepat:
 * Ketika Anda benar-benar melihat bahwa tidak menggunakannya akan merugikan kinerja Anda, atau akan mengakibatkan eksekusi fungsi yang sangat besar dan tidak perlu (bayangkan dalam demo useCallback, bahwa fungsi ini melakukan panggilan API, dan tidak hanya menambahkan angka. Ini adalah sesuatu yang perlu dicegah).
 * 
 * 
*/

const functionLogs = new Set();
const functionLogsReset = new Set();

const functionLogsWCallback = new Set();
const functionLogsResetWCallback = new Set();

const UseCallback = () => {
    const staticData = ['Item 1', 'Item 2', 'Item 3'];
    const [items, setItems] = React.useState({
        lists: staticData
    });

    const [itemsWCallback, setItemsWCallback] = React.useState({
        lists: staticData
    });


    const addItems = () => {
        let _placeArray: any = [];
        _placeArray.push(`Item ${items.lists.length + 1}`);

        setItems({
            lists: [...items.lists.concat(_placeArray)]
        })
    }

    // Recreate addItemsWCallback on every change of itemsWCallback.lists!
    const addItemsWCallback = React.useCallback(() => {
        let _placeArrayWCallback = [];
        _placeArrayWCallback.push(`Item ${itemsWCallback.lists.length + 1}`)

        setItemsWCallback({
            lists: [...itemsWCallback.lists.concat(_placeArrayWCallback)]
        })
    }, [itemsWCallback.lists]);


    const reset = () => {
        setItems({
            lists: staticData
        })
    }

    const resetWCallback = React.useCallback(() => {
        setItemsWCallback({
            lists: staticData
        })
    }, [itemsWCallback.lists]);



    // Debug process
    functionLogs.add(addItems);
    functionLogsReset.add(reset);
    functionLogsWCallback.add(addItemsWCallback);
    functionLogsResetWCallback.add(resetWCallback);

    // Ketika salah satu function lain dipanggil, maka function yang tanpa menggunakan callback, akan dibuat ulang
    console.log(`Without callback addItems(), created: `, functionLogs.size, ' times');
    console.log(`Without callback reset(), created: `, functionLogsReset.size, ' times');

    // Hanya dibuat ulang ketika nilai itemsWCallback.lists berubah (tidak dibuat ulang ketika function lain dipanggil)
    console.log(`With callback addItemsWCallback(), created: `, functionLogsWCallback.size, ' times');
    console.log(`With callback resetWCallback(), created: `, functionLogsResetWCallback.size, ' times');


    // Divider
    console.log('');

    return (
        <>
            <h1>useCallback()</h1>
            <div className="list-groups" style={{ 
                display: 'flex', 
                flexDirection: 'row',
            }}>
                <div className="list-groups-items">
                    <h2>without useCallback()</h2>
                    <ul>
                        {items.lists.map((item: any, index: number) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>

                    <button onClick={() => addItems()}>Add item</button>
                    <button onClick={() => reset()}>Reset item</button>

                    <div style={{ margin: '20px 0' }}>
                        {JSON.stringify(`Without callback addItems(), created: ${functionLogs.size} times`)} <br />
                        {JSON.stringify(`Without callback reset(), created: ${functionLogsReset.size}  times`)}
                    </div>
                </div>

                <div className="list-groups-items" style={{ marginLeft: '50px' }}>
                    <h2>with useCallback()</h2>
                    <ul>
                        {itemsWCallback.lists.map((item: any, index: number) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>

                    <button onClick={addItemsWCallback}>Add item</button>
                    <button onClick={resetWCallback}>Reset item</button>

                    <div style={{ margin: '20px 0' }}>
                        {JSON.stringify(`With callback addItemsWCallback(), created: ${functionLogsWCallback.size} times`)} <br />
                        {JSON.stringify(`With callback resetWCallback(), created: ${functionLogsResetWCallback.size}  times`)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UseCallback;