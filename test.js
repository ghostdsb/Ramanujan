let ramanujan = require("./index")

// console.log(ramanujan.findRoots([-6,3,-6,1]))
// // console.log(ramanujan.findRoots([0,0,0,1]))

// console.log(ramanujan.util(0,{
//     cfs:[-6,3,-6,1],
//     x:5.6571788267928484
// }))

// console.log(ramanujan.polynomialDivision([4,5,1,2,3,1],[1,3,2,2]))

let dvd = [4,5,1,2,3,1]
let dvr = [1,3,2,2]

let sol = ramanujan.polynomialDivision(dvd,dvr)


let quo = sol[0]
let rem = sol[1]

let dvrxquo = ramanujan.polynomialMultiplication(dvr,quo)

let dvrxquoprem = ramanujan.polynomialAddition(dvrxquo,rem)

console.log(dvd)
console.log(dvr)
console.log(quo)
console.log(rem)
console.log(dvrxquo)
console.log(dvrxquoprem)