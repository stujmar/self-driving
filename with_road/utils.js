/**
 * Linear interpolation
 * @param {*} A Start point
 * @param {*} B End point
 * @param {*} t t is a value between 0 and 1
 * @returns This returns a value between A and B
 */ 
function lerp(A, B, t){
    return A + ( B - A ) * t;
}


function toggleDash(i, laneCount, ctx) {
    if (i > 0 && i < laneCount) {
        ctx.setLineDash([20, 20]);
    } else {
        ctx.setLineDash([]);
    }
}
