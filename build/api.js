"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primeSieves_1 = require("./utils/primeSieves");
const equationSolvers_1 = require("./utils/equationSolvers");
const functions_1 = require("./utils/functions");
const funcEnums_1 = require("./utils/funcEnums");
const PRIMELIST = primeSieves_1.erastosthenes(Math.pow(10, 7));
const api = {
    util(funcId, funcParams) {
        switch (funcId) {
            case funcEnums_1.FUNC.DEGREE:
                return functions_1.getDegree(funcParams.cfs);
            case funcEnums_1.FUNC.FDX:
                return functions_1.fdx(funcParams.cfs);
            case funcEnums_1.FUNC.FOX:
                return functions_1.fox(funcParams.cfs, funcParams.x);
            case funcEnums_1.FUNC.LONG_DIVISION:
                return functions_1.longDivisionTemp(funcParams.cfsDvd, funcParams.cfsDvr);
        }
    },
    isEven(val) {
        if (val % 2 === 0)
            return true;
        return false;
    },
    isPrime(val) {
        if (PRIMELIST.indexOf(val) !== -1)
            return true;
        return false;
    },
    getPrimeList(lengthOfList) {
        return PRIMELIST.slice(0, lengthOfList);
    },
    getPrimesBetween(lowerLimit, upperLimit) {
        let primeList = [];
        for (let i = 0; i < PRIMELIST.length; i++) {
            if (lowerLimit < PRIMELIST[i]) {
                lowerLimit = PRIMELIST[i];
                primeList.push(PRIMELIST[i]);
            }
            if (lowerLimit > upperLimit) {
                primeList.pop();
                break;
            }
        }
        return primeList;
    },
    primeFactors(val) {
        let primeFactors = [];
        if (PRIMELIST.indexOf(val) !== -1) {
            primeFactors = [val];
        }
        else {
            let currentPrime = PRIMELIST[0];
            let valCopy = val;
            while (valCopy !== 1) {
                if (valCopy % currentPrime === 0) {
                    valCopy /= currentPrime;
                    if (primeFactors.indexOf(currentPrime) === -1) {
                        primeFactors.push(currentPrime);
                    }
                }
                else if (PRIMELIST.indexOf(valCopy) !== -1) {
                    currentPrime = valCopy;
                }
                else {
                    currentPrime = PRIMELIST[PRIMELIST.indexOf(currentPrime) + 1];
                }
            }
        }
        return primeFactors;
    },
    primeFactorisation(val) {
        let factorisation = {};
        if (PRIMELIST.indexOf(val) !== -1) {
            factorisation[val] = 1;
        }
        else {
            let currentPrime = PRIMELIST[0];
            let valCopy = val;
            while (valCopy !== 1) {
                if (valCopy % currentPrime === 0) {
                    valCopy /= currentPrime;
                    if (Object.keys(factorisation).indexOf(String(currentPrime)) === -1) {
                        factorisation[currentPrime] = 1;
                    }
                    else {
                        factorisation[currentPrime] += 1;
                    }
                }
                else if (PRIMELIST.indexOf(valCopy) !== -1) {
                    currentPrime = valCopy;
                }
                else {
                    currentPrime = PRIMELIST[PRIMELIST.indexOf(currentPrime) + 1];
                }
            }
        }
        return factorisation;
    },
    totient(val) {
        let phi = val;
        if (val === 1)
            return phi;
        if (PRIMELIST.indexOf(val) !== -1)
            return phi - 1;
        let primeFactors = this.primeFactors(val);
        for (let i = 0; i < primeFactors.length; i++) {
            phi = (phi * (primeFactors[i] - 1)) / primeFactors[i];
        }
        return phi;
    },
    hcf(val1, val2) {
        if (val1 <= 0 || val2 <= 0)
            return;
        let dividend = Math.max(val1, val2);
        let divisor = Math.min(val1, val2);
        let remainder = dividend % divisor;
        while (remainder !== 0) {
            dividend = divisor;
            divisor = remainder;
            remainder = dividend % divisor;
        }
        return divisor;
    },
    gcd(val1, val2) {
        return this.hcf(val1, val2);
    },
    lcm(val1, val2) {
        if (val1 <= 0 || val2 <= 0)
            return;
        return val1 * val2 / this.lcm(val1, val2);
    },
    findRoots(coeffs) {
        let degree = functions_1.getDegree(coeffs);
        coeffs = functions_1.cleanCoeffs(coeffs);
        switch (degree) {
            case 0:
                return equationSolvers_1.solve0Degree(coeffs);
            case 1:
                return equationSolvers_1.solve1Degree(coeffs);
            case 2:
                return equationSolvers_1.solve2Degree(coeffs);
            case 3:
                return equationSolvers_1.solve3Degree(coeffs);
            default:
                return [];
        }
    }
};
module.exports.api = api;
