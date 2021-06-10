function sort_object(array, key, asc) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i][key]);
    }
}

let json_url = 'http://fossil.mochisandbox.com/wp-content/uploads/2021/06/itviec-20201103.json',
    array = [];

sort_object(array, 'point', true);