/* eslint-env es6 */
/*eslint-disable*/
// ----- Textures/Sprites/Animation ----- //
class Animation
{
    constructor(name, s, e)
    {
        this._frames = [];
        let count = e - s + 1;
        let j = 0;
        for(let i = 0; i < count; ++i)
        {
            j = s + i;
            this._frames.push(CreateTexture(name + j.toString()));
        }
        this.framerate = 100;
        this.flag = 1;
    }
}

class AnimationNode
{
    constructor(anim, t)
    {
        this._animation = anim;
        this._transition = t;
    }
}

class Animator
{
    constructor()
    {
        this.enabled = false;
        this._animations = [];
        this._ticks = 0;
        this._index = 0;
        this._currentAnim = undefined;
        this._exposedTexture = undefined;
    }
    AddAnimation(animation, name, transition)
    {
        if(this._animations[name] == undefined) 
        { 
            this._animations[name] = new AnimationNode(animation, transition);
            if(this._currentAnim == undefined) { this._currentAnim = name; }
        }
    }
    PlayAnimation(name)
    {
        this.enabled = true;
        if(this._currentAnim != name)
        {
            this._currentAnim = name;
            this._index = 0;
            this._ticks = 0;
        }
    }
    Update()
    {
        let r = -2;
        ++this._ticks;
        if(this._ticks == this._animations[this._currentAnim]._animation.framerate)
        {
            r = -1;
            this._ticks = 0;
            ++this._index;
            if(this._index == this._animations[this._currentAnim]._animation._frames.length)
            {
                r = this._animations[this._currentAnim]._animation.flag;
                if(this._animations[this._animations[this._currentAnim]._transition] != undefined)
                {
                    this._currentAnim = this._animations[this._currentAnim]._transition;
                }
                else
                {
                    switch(this._animations[this._currentAnim]._animation.flag)
                    {
                        case 0: this.enabled = false; this._currentAnim = undefined;
                        case 2: --this._index; break;
                        case 1: this._index = 0; break;
                    }
                }
            }
        }
        if(r != 0) { this._exposedTexture = this._animations[this._currentAnim]._animation._frames[this._index]; }
        return r;    
    }
}