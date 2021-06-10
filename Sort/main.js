let arr = [1, 9, 6, 8, 15, 3, 8, 48, 626, 15, 23, 40],
    l = arr.length, 
    screen = document.getElementById("screen"),
    button = document.getElementById("button"),
    result = document.getElementById('result');

screen.innerHTML = "Mảng ban đầu: " + arr;
console.log("Mảng ban đầu: " + arr)
for (let i = 0; i < l-1; i++) {
    console.log("** Mảng sau lần lặp thứ " + (i+1) + ":");
    for (let j = i+1; j < l; j++) {
        let tem;
        if (arr[i] > arr[j]) {
            tem = arr[i];
            arr[i] = arr[j];
            arr[j] = tem;
            console.log("-----Đổi vị trí thứ " + i + " cho vị trí thứ " + j + ", ta được mảng mới:");
            console.log(arr);
        }
    }
}

console.log("Mảng sau khi sắp xếp tăng dần: " + arr)

button.addEventListener("click", function() {
    result.innerHTML = "Mảng sau khi sắp xếp tăng dần: " + arr;
})