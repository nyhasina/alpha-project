export function computePowerOf2(x: number): number {
    if (x <= 0) {
        // If x <= 0, directly return 2 to the 0 power
        return 1;
    } else if ((x & (x - 1)) == 0) {
        // Judging by the "bitwise AND" operation, if x is a power of 2, directly return x
        return x;
    } else {
        // Calculate the smallest integer greater than the logarithm of x with base 2
        // For example, x = 25, the logarithm of 25 with 2 as the base is 4.643..., the result of forcibly converting to int and adding 1 is 5
        const n = Math.trunc(Math.log(x) / Math.log(2)) + 1;
        return Math.pow(2, n);
    }
}
