/* eslint-env es6 */
/*eslint-disable*/
// ----- Input ----- //
class Key
{
    constructor()
    {
        this.down = false;

        this.pressed = false;
        this.released = false;
    }
    
    Update(val)
    {
        if(val == true) { if(this.down == false) { this.pressed = true; } }
        else { if(this.down == true) { this.released = true; } }
        this.down = val;
    }
    
    Reset()
    {
        this.pressed = false;
        this.released = false;
    }
}

function CleanKeys()
{
    while(usedKeys.length > 0)
    {
        usedKeys[usedKeys.length - 1].Reset();
        usedKeys.pop();
    }
}

function AddKey(key)
{
    if(keyboard[key] == undefined) { keyboard[key] = new Key(); }
}

function RegisterKeyEvent(key, status)
{
    if(keyboard[key] != undefined)
    {
        keyboard[key].Update(status);
        usedKeys.push(keyboard[key]);
    }
}

function RegisterMouseEvent(button, status)
{
    let key;
    switch(button)
    {
        case 0: key = mouse.left; break;
        case 1: key = mouse.right; break;
        default: key = undefined; break;
    }
    if(key != undefined)
    {
        key.Update(status);
        usedKeys.push(key);        
    }
}

function IsKeyDown(key)
{
    if(keyboard[key] == undefined) { AddKey(key); }
    return keyboard[key].down;
}

function IsKeyPressed(key)
{
    if(keyboard[key] == undefined) { AddKey(key); }
    return keyboard[key].pressed;
}