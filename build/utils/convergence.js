"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
function newtonRaphson(funcCoeffs, x0) {
    let root;
    let x1 = x0 - functions_1.fox(funcCoeffs, x0) / functions_1.fox(functions_1.fdx(funcCoeffs), x0);
    if (Math.floor(x1 * Math.pow(10, 3)) - Math.floor(x0 * Math.pow(10, 3)) !== 0) {
        root = newtonRaphson(funcCoeffs, x1);
    }
    else {
        root = Number(x1.toFixed(4));
    }
    return root;
}
exports.newtonRaphson = newtonRaphson;
