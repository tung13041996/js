let arr= [
        {id:"4359", name:"John", point:8.1},
        {id:"4513", name:"David", point:9.6},
        {id:"7862", name:"Peter", point:9.15},
        {id:"5623", name:"Harry", point:9.3},
        {id:"4652", name:"Frank", point:6.0},
        {id:"1234", name:"Steven", point:10},
    ],
    l = arr.length, 
    arrIndex=[], //array has index of arr
    arrPoint=[], //array has point of arr
    outputArr = "",
    screen = document.getElementById("screen"),
    button = document.getElementById("button"),
    result = document.getElementById('result');
    
    //add index and point to an new array
    for (let i = 0; i < l; i++) {
        arrIndex.push(i);
        arrPoint.push(arr[i].point);
    }

    for (let i = 0; i < l; i++) {
        outputArr += "ID: " + arr[arrIndex[i]].id + ", name:  " + arr[arrIndex[i]].name + ", point: " + arr[arrIndex[i]].point + "</br>";
    }
    screen.innerHTML = outputArr;

    //change index together if this point smaller
    for (let i = 0; i < l-1; i++) {
        for (let j = i+1; j < l; j++) {
            let temIndex;
            if (arrPoint[i] < arrPoint[j]) {
                temIndex = arrIndex[i];
                arrIndex[i] = arrIndex[j];
                arrIndex[j] = temIndex;
            }
        }
    }
    resultOut ="";
    for (let i = 0; i < l; i++) {
        console.log("Vị trí thứ " + (i+1) + " là: " + arr[arrIndex[i]].name + " với số điểm: " + arr[arrIndex[i]].point) + "\n";
        resultOut += "Vị trí thứ " + (i+1) + " là: " + arr[arrIndex[i]].name + " với số điểm: " + arr[arrIndex[i]].point + "</br>";
    }

    button.addEventListener("click", function() {
        result.innerHTML = resultOut;
    })
