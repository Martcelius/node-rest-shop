let arr = [{
        name: 'martcleius',
        age: 23
    },
    {
        name: 'rachel',
        age: 23
    },
    {
        name: 'misel',
        age: 23
    },
    {
        name: 'janet',
        age: 23
    },
];

let test = arr.map(arr => {
    return {
        name: arr.name
    };
});

console.log(test);