"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = void 0;
exports.generate = generate;
const MAX_LEN = 5;
function generate() {
    let ans = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
const normalizePath = (path) => {
    return path.replace(/\\/g, '/');
};
exports.normalizePath = normalizePath;
