import {
    erastosthenes
    } from "./utils/primeSieves"
import {
    newtonRaphson
    } from "./utils/convergence"
import {
    solve0Degree,
    solve1Degree,
    solve2Degree,
    solve3Degree
    } from "./utils/equationSolvers"
import {
    fdx,
    fox,
    getDegree,
    cleanCoeffs,
    longDivisionTemp,
    pDivision,
    pMultiplication,
    pAddition 
    } from "./utils/functions"

import { FUNC } from "./utils/funcEnums"

const PRIMELIST = erastosthenes(Math.pow(10,7))

const api = {

    // util(funcId:FUNC,funcParams){
    //   switch (funcId){
    //       case FUNC.DEGREE:
    //         return getDegree(funcParams.cfs)
    //       case FUNC.FDX:
    //         return fdx(funcParams.cfs)
    //       case FUNC.FOX:
    //         return fox(funcParams.cfs,funcParams.x)
    //       case FUNC.LONG_DIVISION:
    //         return longDivisionTemp(funcParams.cfsDvd,funcParams.cfsDvr)
    //   }  
    // },

    isEven(val: number):boolean{
        if(val%2===0) return true
        return false
    },

    isPrime(val:number):boolean{
        if(PRIMELIST.indexOf(val)!==-1)return true
        return false
    },

    getPrimeList(lengthOfList:number):number[]{
        return PRIMELIST.slice(0,lengthOfList)
    },

    getPrimesBetween(lowerLimit:number,upperLimit:number):number[]{
        let primeList:number[] = []
        for (let i = 0; i < PRIMELIST.length; i++){
            if(lowerLimit<PRIMELIST[i]){
                lowerLimit = PRIMELIST[i]
                primeList.push(PRIMELIST[i])
            }
            if(lowerLimit>upperLimit){
                primeList.pop()
                break
            }
        }
        return primeList
    },

    primeFactors(val:number):number[]{
        let primeFactors:number[] = []
        if(PRIMELIST.indexOf(val) !== -1){
            primeFactors = [val]
        }else{
            let currentPrime:number = PRIMELIST[0]
            let valCopy:number = val

            while(valCopy !== 1){
                if(valCopy%currentPrime===0){
                    valCopy/=currentPrime
                    if(primeFactors.indexOf(currentPrime)===-1){
                        primeFactors.push(currentPrime)
                    }
                }else if(PRIMELIST.indexOf(valCopy) !== -1){
                    currentPrime = valCopy
                }else{
                    currentPrime = PRIMELIST[PRIMELIST.indexOf(currentPrime)+1]
                }
            }
        }
        return primeFactors
    },

    primeFactorisation(val:number):Object{
        let factorisation:Object = {}
        if(PRIMELIST.indexOf(val) !== -1){
            factorisation[val] = 1
        }else{
            let currentPrime:number = PRIMELIST[0]
            let valCopy:number = val

            while(valCopy !== 1){
                if(valCopy%currentPrime===0){
                    valCopy/=currentPrime
                    if(Object.keys(factorisation).indexOf(String(currentPrime))===-1){
                        factorisation[currentPrime] = 1
                    }else{
                        factorisation[currentPrime] += 1
                    }
                }else if(PRIMELIST.indexOf(valCopy) !== -1){
                    currentPrime = valCopy
                }else{
                    currentPrime = PRIMELIST[PRIMELIST.indexOf(currentPrime)+1]
                }
            }
        }
        return factorisation
    },

    totient(val:number):number{
        let phi:number = val
        if (val === 1) return phi
        if (PRIMELIST.indexOf(val) !== -1) return phi - 1
        let primeFactors:number[] = this.primeFactors(val)
        for(let i = 0 ;i<primeFactors.length;i++){
            phi = (phi*(primeFactors[i]-1))/primeFactors[i]
        }
        return phi
    },

    hcf(val1:number, val2:number):number{
        if(val1<=0 || val2<=0) return
        let dividend = Math.max(val1,val2)
        let divisor = Math.min(val1,val2)
        let remainder = dividend%divisor
        while(remainder!==0){
            dividend = divisor
            divisor = remainder
            remainder = dividend%divisor
        }
        return divisor
    },

    gcd(val1:number, val2:number):number{
        return this.hcf(val1,val2)
    },

    lcm(val1:number,val2:number):number{
        if(val1<=0 || val2<=0) return 
        return val1*val2/this.hcf(val1,val2)
    },

    findRoots(coeffs:number[]):number[]{
        let degree: number = getDegree(coeffs)
        coeffs = cleanCoeffs(coeffs)
        switch (degree){
            case 0:
                return solve0Degree(coeffs)
            case 1:
                return solve1Degree(coeffs)
            case 2:
                return solve2Degree(coeffs)
            case 3:
                return solve3Degree(coeffs)
            default:
                return []
        }
    },

    newtonRaphson(coeffs:number[],x0:number):number{
        let x1:number = newtonRaphson(coeffs,x0)
        return x1
    },

    polynomialDivision(cfsDividend:number[],cfsDivisor:number[]):number[][]{
        return pDivision(cfsDividend,cfsDivisor)
    },

    polynomialMultiplication(pol1:number[],pol2:number[]):number[]{
        return pMultiplication(pol1,pol2)
    },

    polynomialAddition(pol1:number[],pol2:number[]):number[]{
        return pAddition(pol1,pol2)
    }

}

module.exports.api = api
