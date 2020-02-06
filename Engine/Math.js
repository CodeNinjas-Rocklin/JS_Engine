/* eslint-env es6 */
/*eslint-disable*/
// ----- Vector ----- //

class Vector2
{
    constructor(x, y)
    {
        if(y == undefined)
        {
            this.x = x.x;
            this.y = x.y;
        }
        else
        {
            this.x = x;
            this.y = y;  
        }
    }
    
    get magnitude() { return Math.sqrt((this.x * this.x) + (this.y * this.y)); }
    set magnitude(s)
    {
        let m = this.magnitude;
        if(m != 0)
        {
            this.x /= m;
            this.y /= m;
            this.x *= s;
            this.y *= s;
        }
    }
    
    get angle() { return (Math.atan2(this.y, this.x) * 57.2958) - 270; }
    
    Add(v)
    {
        this.x += v.x;
        this.y += v.y;
    }
    
    Subtract(v)
    {
        this.x -= v.x;
        this.y -= v.y;
    }
    
    Scale(v)
    {
        this.x *= v;
        this.y *= v;
    }
        
    Equals(v)
    {
        this.x = v.x;
        this.y = v.y;
    }
    
    Set(x, y)
    {
        this.x = x;
        this.y = y;
    }
    
    Copy(s)
    {
        let r = new Vector2(this.x, this.y);
        if(s != undefined) { r.magnitude = s; }
        return r;
    }
    
    GetPerpendicular(s)
    {
        let r = new Vector2(-this.y, this.x);
        r.magnitude = s;
        return r;
    }
}

function VectorAddition(a, b, s)
{
    let r = a.Copy();
    r.Add(b);
    if(s != undefined) { r.magnitude = s; }
    return r;
}

function VectorSubtraction(a, b, s)
{
    let r = a.Copy();
    r.Subtract(b);
    if(s != undefined) { r.magnitude = s; }
    return r;
}

function Lerp(a, b, f)
{
    return (a * (1 - f)) + (b * f);
}

function VectorLerp(a, b, f)
{
    let r = VectorSubtraction(b, a);
    r.Scale(f);
    r.Add(a);
    return r;
}

function GetVectorFromAngle(a, s)
{
    a -= 90;
    a *= 0.0174533;
    let r = new Vector2(Math.cos(a), Math.sin(a));
    if(s != undefined) { r.magnitude = s; }
    return r;
}

function Restrain(v, s, e)
{
    if(v < s) { v = s; }
    if(v > e) { v = e; }
    return v;
}

function RestrainAngle(a)
{
    if(a < 0) { a += 360; }
    else if(a > 360) { a -= 360; }
    return a;
}

function GetDistance(a, b)
{
    let c = new Vector2(0,0);
    let d = new Vector2(0,0);
    if(a._anim != undefined) { c = a.position; }
    else { c = a; }
    if(b._anim != undefined) { d = b.position; }
    else { d = b; }
    return VectorSubtraction(c, d).magnitude;
}

