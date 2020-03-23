/* eslint-env es6 */
/*eslint-disable*/

// ----- Lists ----- //
class List
{
    constructor()
    {
        this._array = [];
    }
    Peek(v)
    {
        if(v >= 0 && v < this._array.length)
        {
            return this._array[v];
        }
        else { return undefined; }
    }
    GetLast()
    {
        return this.Peek(this.end);
    }
    Add(v)
    {
        this._array.push(v);
    }
    Insert(i, v)
    {
        this._array.splice(i, 0, v);
    }
    Remove(v)
    {
        if(v == undefined) { return this._array.pop(); }
        else { return this._array.splice(v, 1); }
    }
    get end() { return this._array.length - 1; }
    get length() { return this._array.length; }
}

// ----- Timer ----- //
class Timer
{
    constructor(t)
    {
        this.time = t;
        this._originalTime = t;
    }
    
    Tick()
    {
        --this.time;
        if(this.time <= 0)
        {
            this.time = 0;
        }
    }
    
    Reset()
    {
        this.time = this._originalTime;
    }
}

function Print(p)
{
    console.log(p);
}

function CreateScreen(wt, ht)
{
    const screen = 
    { 
        x: wt/2, 
        y: ht/2,
        w: wt,
        h: ht
    };
    return screen;
}

function SetBackgroundColor(color)
{
    app.renderer.backgroundColor = color;
}

function GetMousePosition()
{
    let mp = new Vector2(app.renderer.plugins.interaction.mouse.global);
    if(mp.x < 0) { mp.x = 0; }
    else if(mp.x > screen.w) { mp.x = screen.w; }
    if(mp.y < 0) { mp.y = 0; }
    else if(mp.y > screen.h) { mp.y = screen.h; }
    return mp;
}

function CreateTexture(image)
{
    return PIXI.Texture.from("images/" + image + ".png");
}

function GetStage()
{
    return app.stage;
}
