/* eslint-env es6 */
/*eslint-disable*/
// ----- Text ----- //
class Text
{
    constructor(text, x, y)
    {
        this._obj = new PIXI.Text(text);
        this._obj.x = x;
        this._obj.y = y;
        app.stage.addChild(this._obj);
    }
    
    SetAnchor(x, y)
    {
        Restrain(x, 0, 1);
        if(y == undefined) { y = x; }
        else { Restrain(y, 0, 1); }
        this._obj.anchor.set(x, y);
    }
    
    get x() { return this._obj.x; }
    set x(x) { this._obj.x = x; }
    get y() { return this._obj.y; }
    set y(y) { this._obj.y = y; }
    set z(z) { this._obj.zIndex = z; }
    
    get text() { return this._obj.text; }
    set text(t) { this._obj.text = t; }
    
    set color(c) { this._obj.style.fill = c; }
    get size() { return this._obj.style.fontSize; }
    set size(s) { this._obj.style.fontSize = s; }
    set bold(b) 
    {
        if(b) { this._obj.style.fontWeight = "bold"; }
        else { this._obj.style.fontWeight = "normal"; }
    }
    set outlineColor(c) { this._obj.style.stroke = c; }
    set outlineWidth(w) { this._obj.style.strokeThickness = w; }
    
}

function CreateGenericFancyText(m, x, y)
{
    let text = new Text(m, x, y);
    text.color = "0x0000FF";
    text.bold = true;
    text.size = 50;
    text.outlineColor = "0x000000";
    text.outlineWidth = 10;
    text.renderOrder = 50;
    return text;
}
