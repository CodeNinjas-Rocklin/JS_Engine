/* eslint-env es6 */
/*eslint-disable*/
// ----- Entity ----- //
class Entity 
{
    constructor(sprite, x, y, w, h)
    {
        //NEVER ACCESS DIRECTLY
        if(sprite.length != undefined) { sprite = "images/" + sprite + ".png"; }
        this._sprite = PIXI.Sprite.from(sprite);
        app.stage.addChild(this._sprite);
        this._sprite.x = x; 
        this._sprite.y = y;
        this._sprite.width = w; 
        this._sprite.height = h;
        this._sprite.anchor.set(.5);
        this._originalTexture = this._sprite.texture;
        this._originalScale = undefined;
        
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this.offset = new Vector2(0,0);
        
        this.rotateWithParent = true;
        
        this._anim = new Animator();
        
        this._children = [];
        this.tag = 0;
        
        entities.push(this);
    }
    
    get x() { return this.position.x; }
    set x(x) { this.position.x = x; }
    
    get y() { return this.position.y; }
    set y(y) { this.position.y = y; }
    
    get w() { return this._sprite.width; }
    set w(w) { this._sprite.width = w; }
    
    get h() { return this._sprite.height; }
    set h(h) { this._sprite.height = h; }
    
    get flipped() { return this._sprite.scale.x < 0; }
    set flipped(f) { 
        if(this._originalScale == undefined) { this._originalScale = this._sprite.scale.x; }
        if(f){ this._sprite.scale.x = -this._originalScale; } 
        else { this._sprite.scale.x = this._originalScale; }
    }
    
    get angle() { return this._sprite.angle; }
    set angle(a) { this._sprite.angle = a; }

    get z() { return this._sprite.zIndex; }
    set z(zi) { this._sprite.zIndex = zi; }
    
    get tint() { return this._sprite.tint; }
    set tint(c) { this._sprite.tint = c; }
    
    ChangeSize(w, h)
    {
        this.w = w;
        if(h == undefined) { this.h = w; }
        else { this.h = h; }
    }
    SetAnchor(x, y)
    {
        this._sprite.anchor.set(x,y);
    }
    MoveTowards(o, s) 
    { 
        if(o._anim != undefined) { this.velocity = VectorSubtraction(o.position, this.position, s); }
        else { this.velocity = VectorSubtraction(o, this.position, s); }  
    }
    MoveForward(s) 
    { 
        this.velocity = GetVectorFromAngle(this.angle, s); 
    }
    RotateTowards(o) 
    {  
        if(o == undefined) { this.angle = this.velocity.angle; }
        else if(o._anim != undefined) { this.angle = VectorSubtraction(o.position, this.position).angle; }
        else if(o.magnitude != undefined){ this.angle = VectorSubtraction(o, this.position).angle; }
    }
    AddAnimation(name, sprite, s, e, transition)
    {
        this._anim.AddAnimation(new Animation(sprite, s, e), name, transition);
    }
    AddAnimationCached(name, anim, transition)
    {
        this._anim.AddAnimation(anim, name, transition);
    }
    PlayAnimation(name)
    {
        this._anim.PlayAnimation(name);
    } 
    StopAnimation()
    {
        this._anim.enabled = false;
    }
    GetAnimation(name)
    {
        if(this._anim._animations[name] != undefined)
        {
            return this._anim._animations[name]._animation;
        }
    } 
    ResetTexture()
    {
        this._sprite.texture = this._originalTexture;
    }
    Update()
    {     
        if(this._anim.enabled)
        {
            let f = this._anim.Update();
            if(f == 0) { this._sprite.texture = this._originalTexture; }
            else { this._sprite.texture = this._anim._exposedTexture; }
        }
        this.position.Add(this.velocity);
        this._sprite.x = this.position.x + this.offset.x;
        this._sprite.y = this.position.y + this.offset.y;
            
        for(let i = 0; i < this._children.length; ++i)
        {
            if(this._children[i].rotateWithParent) 
            { 
                this._children[i].angle = this.angle; 
            }
            this._children[i].position = this.position.Copy();
        }
    }    
    AddChild(c)
    {
        this._children.push(c);
        return this.GetLastChild();
    }   
    GetChild(c)
    {
        if(c >= 0 && c < this._children.length)
        {
            return this._children[c];
        }
        return undefined;
    }
    GetLastChild()
    {
        if(this._children.length > 0) { return this._children[this._children.length - 1]; }
    }
    DeleteChildren()
    {
        for(let i = 0; i < this._children.length; ++i)
        {
            DeleteEntity(this._children[i]);
        }
    }
}

function UpdateAll()
{
    /*for(let i = entities.length - 1; i > -1; --i)
    {
        if(entities[i].tag == -1)
        {
            entities.splice(i, 1);
        }
        else
        {
            entities[i].Update();           
        }
    }*/
    cleanup = []
    for(let i = 0; i < entities.length; i++)
    {
        if(entities[i].tag == -1) { cleanup.push(i); }
        else { entities[i].Update(); }
    }
}

function DeleteEntity(e)
{
    let ent = e;
    if(e[0] != undefined) { ent = e[0]; }
    ent.DeleteChildren();
    app.stage.removeChild(ent._sprite);
    ent._sprite.destroy(false, true, false);
    ent.tag = -1;
}