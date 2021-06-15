let arr = [1, 9, 6, 8, 15, 3, 8, 48, 626, 15, 23, 40],
    l = arr.length,
    screen = document.getElementById("screen"),
    button = document.getElementById("button"),
    result = document.getElementById('result');
screen.innerHTML = "Mảng ban đầu:" + arr;

function swap(arr, index_a, index_b) {
    let temp;
    temp = arr[index_a];
    arr[index_a] = arr[index_b];
    arr[index_b] = temp;

    return arr;
}

function sortArrNormal(array) {
    let length = array.length,
        count = 0;
    console.log("Mảng ban đầu: " + array)
    for (let i = 0; i < length - 1; i++) {
        console.log("** Mảng sau lần lặp thứ " + (i + 1) + ":");
        for (let j = i + 1; j < length; j++) {
            count++;
            if (array[i] > array[j]) {
                swap(array, i, j);
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
        let min_number, min_number_index;
        min_number_index = i
        min_number = array[i];

        //find min number and index of min number in (min_index -> length)
        for (let j = i; j < length; j++) {
            count++;
            if (array[j] < min_number) {
                min_number_index = j;
                min_number = array[j];
            }
        }
        console.log("Smallest number in (array[" + i + "] --> array[" + length + "]) is: " + min_number);

        //swap position of index current and index of smallest number
        swap(array, i, min_number_index);


        console.log("==> newArray[" + i + "]=" + array[i]);
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
        is_swap = false;

    for (let i = 0; i < length; i++) {
        console.log("***********Star loop " + (i + 1) + "************** \r\n");
        is_swap = false;
        for (let j = 0; j < length - i; j++) {
            count++;
            if (array[j] > array[j + 1]) {
                console.log("Because array[" + j + "]=" + array[j] + " > array[" + (j + 1) + "]=" + array[j + 1] + ", so we change index together, we have a new array: ");
                swap(array, j, j + 1);
                is_swap = true;
                console.log(array);
            }
            //after this loop, biggest number is in the end of array
        }
        console.log("***********Finish loop " + (i + 1) + "************** \r\n");
        if (!is_swap) {
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

        while (j >= 0 && array[j] > temVal) {
            console.log("Because array[" + j + "]=" + array[j] + " > array[" + (j + 1) + "]=" + array[j + 1] + ", so we change index together, we have a new array: ");
            array[j + 1] = array[j];
            j--;
            count++;
            is_increase++;
            array[j + 1] = temVal;
            console.log(array);
        }

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
    console.log("Xét mảng: " + array);
    //array has only 1 value ==> array sorted
    if (length <= 1) {
        console.log("Mảng có ít hơn 1 phần tử nên không cần sắp xếp => mảng mới: " + array);
        return array;
    }

    for (let i = 0; i < length - 1; i++) {
        if (array[i] < pivot) {
            arrayLeft.push(array[i]);
        } else {
            arrayRight.push(array[i]);
        }
    }
    console.log("pivot=" + pivot);
    console.log("Mảng các số nhỏ hơn pivot=" + pivot + " là: " + arrayLeft);
    console.log("Mảng các số lớn hơn pivot=" + pivot + " là: " + arrayRight);
    console.log("-----------------");
    newArray = quick_sort(arrayLeft).concat([pivot], quick_sort(arrayRight));

    console.log("Mảng sau khi sắp xếp: " + newArray);
    console.log("-----Finish-------")
    return newArray;
}

console.log(quick_sort(arr));