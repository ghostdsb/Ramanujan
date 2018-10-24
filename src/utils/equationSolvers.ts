import {
    fox,
    fdx,
    getDegree,
    pDivision,
    pMultiplication,
    pAddition
    } from "./functions"

import {
    newtonRaphson
    } from "./convergence"

export function solve0Degree(coeffs:number[]):number[]{
    return [coeffs[0]]
}

export function solve1Degree(coeffs:number[]):number[]{
    return [-coeffs[1]/coeffs[0]]
}

export function solve2Degree(coeffs:number[]):number[]{
    let roots :number[] = []
    let a:number = coeffs[2]
    let b:number = coeffs[1]
    let c:number = coeffs[0]

    if(a>0 && -b*b+4*a*c>0 || a<0 && -b*b+4*a*c<0){
        roots = [undefined,undefined]
    }else if(-b*b+4*a*c === 0){
        roots = [-b/(2*a),-b/(2*a)]
    }else{
        roots = [
            (-b-Math.sqrt(b*b-4*a*c))/(2*a),
            (-b+Math.sqrt(b*b-4*a*c))/(2*a)
        ]
    }
    return roots
}

export function solve3Degree(coeffs:number[]):number[]{
    let roots:number[] = []
    let criticalPoints:number[] = this.solve2Degree(fdx(coeffs))
    let cp1:number = Math.min(criticalPoints[0],criticalPoints[1])
    let cp2:number = Math.max(criticalPoints[0],criticalPoints[1])
    
    let fcp1:number = fox(coeffs,cp1)
    let fcp2:number = fox(coeffs,cp2)
    
    if(fcp1*fcp2>0){
        let zero: number
        if(fcp1>0){
            if(coeffs[3]>0){
                // console.log("graph 1")
                zero = newtonRaphson(coeffs,cp1-0.1)
            }else{
                // console.log("graph 2")
                zero = newtonRaphson(coeffs,cp2+0.1)
            }
        }else{
            if(coeffs[3]>0){
                // console.log("graph 3")
                zero = newtonRaphson(coeffs,cp2+0.1)
            }else{
                // console.log("graph 4")
                zero = newtonRaphson(coeffs,cp1-0.1)
            }
        }
       roots = [zero,undefined,undefined]
    }else if(fcp1*fcp2 === 0){
        let zero:number
        if(fcp1 === 0){
            // console.log("graph 5")
            zero = newtonRaphson(coeffs,cp2+0.1)
            roots = [cp1,cp1,zero]
        }else if(fcp2 === 0){
            // console.log("graph 6")
            zero = newtonRaphson(coeffs,cp1-0.1)
            roots = [cp2,cp2,zero]
        }
        roots = roots.sort()
    }else if(fcp1*fcp2 < 0){
        // console.log("graph 7")
        let root0:number = newtonRaphson(coeffs,cp1+0.1)
        let quadCoeffs: number[] = pDivision(coeffs,[-root0,1])[0]
        let otherRoots:number[] = this.solve2Degree(quadCoeffs)

        roots = [root0,otherRoots[0],otherRoots[1]]
        // roots = roots.sort()
    }

    return roots
}