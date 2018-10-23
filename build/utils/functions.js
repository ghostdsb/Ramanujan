"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fdx(coeffs) {
    let ddx = [];
    for (let i = 0; i < coeffs.length; i++) {
        ddx.push(coeffs[i] * (i));
    }
    ddx = ddx.slice(1);
    return ddx;
}
exports.fdx = fdx;
function fox(coeffs, x) {
    let y = 0;
    for (let i = 0; i < coeffs.length; i++) {
        y += coeffs[i] * Math.pow(x, i);
    }
    return Number(y.toFixed(4));
}
exports.fox = fox;
function getDegree(coeffs) {
    let dud = 0;
    for (let i = coeffs.length - 1; i >= 0; i--) {
        if (coeffs[i] == 0) {
            dud += 1;
        }
        else {
            break;
        }
    }
    let degree = coeffs.length - 1 - dud;
    return degree;
}
exports.getDegree = getDegree;
function cleanCoeffs(coeffs) {
    let cleanCoeffs = [];
    let dud = 0;
    for (let i = coeffs.length - 1; i >= 0; i--) {
        if (coeffs[i] == 0) {
            dud += 1;
        }
        else {
            break;
        }
    }
    cleanCoeffs = coeffs.slice(0, coeffs.length - dud);
    return cleanCoeffs;
}
exports.cleanCoeffs = cleanCoeffs;
function longDivisionTemp(cfsDividend, cfsDivisor) {
    let cQuo = [];
    let cDnd = cfsDividend.reverse();
    let cDvr = cfsDivisor.reverse();
    for (let i = 0; i < cDnd.length - 1; i++) {
        let _q = cDnd[i] / cDvr[0];
        cQuo.push(_q);
        cDnd[i + 1] = cDnd[i + 1] - (_q * cDvr[1]);
    }
    cQuo = cQuo.reverse();
    return cQuo;
}
exports.longDivisionTemp = longDivisionTemp;
