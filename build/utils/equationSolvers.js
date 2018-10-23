"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const convergence_1 = require("./convergence");
function solve0Degree(coeffs) {
    return [coeffs[0]];
}
exports.solve0Degree = solve0Degree;
function solve1Degree(coeffs) {
    return [-coeffs[1] / coeffs[0]];
}
exports.solve1Degree = solve1Degree;
function solve2Degree(coeffs) {
    let roots = [];
    let a = coeffs[2];
    let b = coeffs[1];
    let c = coeffs[0];
    if (a > 0 && -b * b + 4 * a * c > 0 || a < 0 && -b * b + 4 * a * c < 0) {
        roots = [undefined, undefined];
    }
    else if (-b * b + 4 * a * c === 0) {
        roots = [-b / (2 * a), -b / (2 * a)];
    }
    else {
        roots = [
            (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a),
            (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        ];
    }
    return roots;
}
exports.solve2Degree = solve2Degree;
function solve3Degree(coeffs) {
    let roots = [];
    let criticalPoints = this.solve2Degree(functions_1.fdx(coeffs));
    let cp1 = Math.min(criticalPoints[0], criticalPoints[1]);
    let cp2 = Math.max(criticalPoints[0], criticalPoints[1]);
    let fcp1 = functions_1.fox(coeffs, cp1);
    let fcp2 = functions_1.fox(coeffs, cp2);
    if (fcp1 * fcp2 > 0) {
        let zero;
        if (fcp1 > 0) {
            if (coeffs[3] > 0) {
                console.log("graph 1");
                zero = convergence_1.newtonRaphson(coeffs, cp1 - 0.1);
            }
            else {
                console.log("graph 2");
                zero = convergence_1.newtonRaphson(coeffs, cp2 + 0.1);
            }
        }
        else {
            if (coeffs[3] > 0) {
                console.log("graph 3");
                zero = convergence_1.newtonRaphson(coeffs, cp2 + 0.1);
            }
            else {
                console.log("graph 4");
                zero = convergence_1.newtonRaphson(coeffs, cp1 - 0.1);
            }
        }
        roots = [zero, undefined, undefined];
    }
    else if (fcp1 * fcp2 === 0) {
        let zero;
        if (fcp1 === 0) {
            console.log("graph 5");
            zero = convergence_1.newtonRaphson(coeffs, cp2 + 0.1);
            roots = [cp1, cp1, zero];
        }
        else if (fcp2 === 0) {
            console.log("graph 6");
            zero = convergence_1.newtonRaphson(coeffs, cp1 - 0.1);
            roots = [cp2, cp2, zero];
        }
        roots = roots.sort();
    }
    else if (fcp1 * fcp2 < 0) {
        console.log("graph 7");
        let root0 = convergence_1.newtonRaphson(coeffs, cp1 + 0.1);
        let quadCoeffs = functions_1.longDivisionTemp(coeffs, [-root0, 1]);
        let otherRoots = this.solve2Degree(quadCoeffs);
        roots = [root0, otherRoots[0], otherRoots[1]];
    }
    return roots;
}
exports.solve3Degree = solve3Degree;
