function sort_array(array) {
    let length = array.length,
        loop_run = 0,
        swap_run = 0;

    console.log('--- BEGIN');
    console.log(array);

    for (let i = 0; i < length - 1; i++) {
        loop_run++;
        //console.log("** Mảng sau lần lặp thứ " + (i+1) + ":");

        for (let j = i + 1; j < length; j++) {
            loop_run++;

            let tem;

            console.log(`#${loop_run} Compare i(${i})v[${array[i]}] > i(${j})v[${array[j]}]`);
            if (array[i] > array[j]) {
                tem = array[i];
                array[i] = array[j];
                array[j] = tem;

                swap_run++;
                console.log(`--- #${swap_run} SWAP v[${array[i]}] & v[${array[j]}]`);
                console.log(array);


                //console.log("-----Đổi vị trí thứ " + i + " cho vị trí thứ " + j + ", ta được mảng mới:");
                //console.log(array);
            }
        }
    }

    console.log('run ' + loop_run + ' times');
    console.log('--- END');

    return array;
}


console.log(sort_array([1, 9, 6, 8, 15, 3, 8, 48, 626, 15, 23, 40]));


function sort_insertion() {
}

function sort_selection() {
}

function sort_bubble() {
}

function sort_quick() {
}

function sort_heap() {
}