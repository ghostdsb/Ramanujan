"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function erastosthenes(limit) {
    let primes = [];
    let cache = new Array(limit + 1).fill(true);
    cache[0] = false;
    cache[1] = false;
    for (let i = 2; i < Math.sqrt(limit + 1); i++) {
        if (cache[i]) {
            for (let j = Math.pow(i, 2); j < (limit + 1); j += i) {
                cache[j] = false;
            }
        }
    }
    for (let i = 0; i < cache.length; i++) {
        if (cache[i]) {
            primes.push(i);
        }
    }
    return primes;
}
exports.erastosthenes = erastosthenes;
