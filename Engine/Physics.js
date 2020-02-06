/* eslint-env es6 */
/*eslint-disable*/
// ----- Physics ----- //
function IsTouching(a, b)
{
   return  a.x - a.w/2 < b.x + b.w/2 &&
           a.x + a.w/2 > b.x - b.w/2 &&
           a.y - a.h/2 < b.y + b.h/2 &&
           a.y + a.h/2 > b.y - b.h/2;
}

function IsTouchingPoint(a, b)
{
    return a.x - a.w/2 < b.x &&
           a.x + a.w/2 > b.x &&
           a.y - a.h/2 < b.y &&
           a.y + a.h/2 > b.y;
}

function PredictiveCollision(a, b)
{
    return  a.x + a.velocity.x - a.w/2 < b.x + b.w/2 &&
            a.x + a.velocity.x + a.w/2 > b.x - b.w/2 &&
            a.y + a.velocity.y - a.h/2 < b.y + b.h/2 &&
            a.y + a.velocity.y + a.h/2 > b.y - b.h/2;
}

function GetSide(a, b)
{
    if(a.x - a.w/2 < b.x + b.w/2 && a.x + a.w/2 > b.x - b.w/2) { if(a.y <= b.y){ return 1; } else { return 2; } }
    if(a.y - a.h/2 < b.y + b.h/2 && a.y + a.h/2 > b.y - b.h/2) { if(a.x <= b.x){ return 3; } else { return 4; } }
    return 0;
}