import {
    fdx,
    fox
} from './functions'
export function newtonRaphson(funcCoeffs:number[],x0:number):number{
    let root:number
    let x1 = x0 - fox(funcCoeffs,x0)/fox(fdx(funcCoeffs),x0)
    if(Math.floor(x1*10**3) - Math.floor(x0*10**3) !== 0){
        root = newtonRaphson(funcCoeffs,x1)
    }else{
        root = Number(x1.toFixed(4))
    }
    return root
}