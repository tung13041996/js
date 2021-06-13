let arr = [1, 9, 6, 8, 15, 3, 8, 48, 626, 15, 23, 40],
    l = arr.length,
    screen = document.getElementById("screen"),
    button = document.getElementById("button"),
    result = document.getElementById('result');
screen.innerHTML = "Mảng ban đầu:" + arr;

function swap(array, index_a, index_b) {
    return array;
}

function sortArrNormal(array) {
    let length = array.length,
        count = 0;
    console.log("Mảng ban đầu: " + array)
    for (let i = 0; i < length - 1; i++) {
        console.log("** Mảng sau lần lặp thứ " + (i + 1) + ":");
        for (let j = i + 1; j < length; j++) {
            let tem;
            count++;
            if (array[i] > array[j]) {
                tem = array[i];
                array[i] = array[j];
                array[j] = tem;
                //array=swap(array,i,j);
                console.log("-----Đổi vị trí thứ " + i + " cho vị trí thứ " + j + ", ta được mảng mới:");
                console.log(array);
            }
        }
    }
    console.log("Mảng sau khi sắp xếp tăng dần: " + array);
    console.log("Số lần lặp:" + count);
    return array;
}

function sort_selection(array) {
    let length = array.length,
        count = 0;

    for (let i = 0; i < length; i++) {
        count++;
        console.log("***********Star loop " + (i + 1) + "************** \r\n");
        let min_index, min_number, min_number_index, temp;
        min_index = i;
        min_number_index = i
        min_number = array[i];

        //find min number and index of min number in (min_index -> length)
        for (let j = min_index; j < length; j++) {
            count++;
            if (array[j] < min_number) {
                min_number_index = j;
                min_number = array[j];
            }
        }
        console.log("Smallest number in (array[" + min_index + "] --> array[" + length + "]) is: " + min_number);

        //swap position of index current and index of smallest number
        temp = array[min_index];
        array[min_index] = array[min_number_index];
        array[min_number_index] = temp;


        console.log("==> newArray[" + min_index + "]=" + array[min_index]);
        console.log("New array after loop " + (i + 1) + " is: " + array);
        console.log("***********Finish loop " + (i + 1) + "************** \r\n");
    }


    console.log("Array after doing selection-sort: " + array);
    console.log("Count loop:" + count);
    return array;
}

function sort_bubble(array) {
    let length = array.length,
        count = 0,
        swap = false;

    //1 2 5 6 6 3 8
    // 2 3 4 5 6 7


    for (let i = 0; i < length; i++) {
        console.log("***********Star loop " + (i + 1) + "************** \r\n");
        swap = false;
        for (let j = 0; j < length - i; j++) {
            let tem;
            count++;
            if (array[j] > array[j + 1]) {
                console.log("Because array[" + j + "]=" + array[j] + " > array[" + (j + 1) + "]=" + array[j + 1] + ", so we change index together, we have a new array: ");

                tem = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tem;

                swap = true;
                console.log(array);
            }
            //after this loop, biggest number is in the end of array
        }
        console.log("***********Finish loop " + (i + 1) + "************** \r\n");
        if (!swap) {
            break;
        }
    }
    console.log("Array after doing bubble-sort: " + array);
    console.log("Count loop:" + count);

    return array;
}

function sort_insertion(array) {
    let length = array.length,
        count = 0,
        j, temVal;
    console.log("Default array: " + array);

    for (let i = 1; i < length; i++) {
        console.log("***********Star loop " + i + "************** \r\n");
        let is_increase;
        console.log("Get value array[" + i + "] = " + array[i] + ", start insertion:");
        j = i - 1;
        temVal = array[i];
        count++;
        is_increase = 0;
        //1 5 6 9 7 8 10 5
        //0 1 2 3 4 5 6  7

        //arr=1 5 6 7 8 9
        //temVal = 8

        while (j >= 0 && array[j] > temVal) {
            console.log("Because array[" + j + "]=" + array[j] + " > array[" + (j + 1) + "]=" + array[j + 1] + ", so we change index together, we have a new array: ");
            array[j + 1] = array[j];
            j--;
            count++;
            is_increase++;
            array[j + 1] = temVal;
            console.log(array);
        }
        /*for (let j = i - 1; j >= 0 && array[j] > temVal; j -= 1) {

        }*/

        if (is_increase === 0) {
            console.log("Because value array[" + i + "] = " + array[i] + " bigger than before value --> Finish loop.")
        }
        console.log("Finish loop " + i + ", we have new array:")
        console.log(array);
        console.log("***********Finish loop " + i + "************** \r\n");
    }
    console.log("--------DONE----------------")

    console.log("Array after doing insertion sort: " + array);
    console.log("Count loop:" + count);
    return array;
}

function quick_sort(array) {
    let length = array.length,
        count = 0,
        arrayLeft = [],
        arrayRight = [],
        newArray = [];
    const pivot = array[length - 1];
    console.log(pivot)

    //array has only 1 value ==> array sorted
    if (length <= 1) {
        return array;
    }

    for (let i = 0; i < length - 1; i++) {
        if (array[i] < pivot) {
            arrayLeft.push(array[i]);
        } else {
            arrayRight.push(array[i]);
        }
    }

    quick_sort(arrayLeft);
    quick_sort(arrayRight);


    console.log(newArray);

    // console.log(arrayLeft);
    // console.log(arrayRight);
    // console.log(arrayLeft + pivot + arrayRight);
    // quick_sort(arrayLeft + pivot + arrayRight);

    // console.log("Array after doing bubble-sort: " + array);
    // console.log("Count loop:" + count);

    return array;
}


function new_quick_sort(array) {
    // stop
    if (array.length <= 1) {
        // left < right
        console.log("Stop recursion: ", array);
        return array; // left + pivot + right
    }

    // find pivot
    let pivot = array[array.length - 1],
        left = [],
        right = [];

    // split array into left and right
    console.log("-------------");
    console.log(`Begin recursion: `, array);
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] <= pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    console.log("After recursion: ");
    //console.log("-- Left: ", new_quick_sort(left, 'left'));
    console.log("-- pivot: ", pivot);
    //console.log("-- right: ", new_quick_sort(right, 'right'));

    // combine left + pivot + right
    let result = new_quick_sort(left);
    result.push(pivot);
    result.concat(new_quick_sort(right));
    //console.log(new_quick_sort(left));

    console.log("End with result: ", result);
    return result;
}


console.log(sort_bubble(arr));


// button.addEventListener("click", function() {
//     result.innerHTML = "Mảng sau khi sắp xếp tăng dần: " + sort_insertion(arr);
// })