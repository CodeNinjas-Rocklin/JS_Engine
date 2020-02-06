/* eslint-env es6 */
/*eslint-disable*/

//Global variables
let player = new Entity("ship", screen.w/2, screen.h - 100, 90, 90);
let premadeBulletTexture = CreateTexture("bullet");
let bulletList = new List();

//Runs once
function Start()
{
    SetBackgroundColor("0xcc80cc");
    player.speed = 2;
    player.z = 5;
}

//Runs 50 times per second
function Update()
{
    if(IsKeyDown('a')) { player.velocity.x -= player.speed; }
    if(IsKeyDown('d')) { player.velocity.x += player.speed; }
    if(!IsKeyDown('a') && !IsKeyDown('d')) { player.velocity.x *= .75; }
    if(IsKeyPressed(' '))
    {
        bulletList.Add(new Entity(premadeBulletTexture, player.x, player.y, 50, 50));
        bulletList.GetLast().velocity = GetVectorFromAngle(player.angle, 15);
        bulletList.GetLast().velocity.Add(bulletList.GetLast().velocity.GetPerpendicular((Math.random() - .5) * 5));
        player.angle = RestrainAngle(bulletList.GetLast().velocity.angle);
        player.velocity.y += 20;
    }

    player.y = Lerp(player.y, screen.h - 100, .35);
    player.velocity.y *= .75;
    player.angle = Lerp(player.angle, 0, .1);
    
    SideWallBounce(player);
    for(let i = bulletList.end; i > -1; --i)
    {
        SideWallBounce(bulletList.Peek(i));
        if(!IsTouching(screen, bulletList.Peek(i)))
        {
            DeleteEntity(bulletList.Remove(i));
        }
    }
}

function SideWallBounce(e)
{
    if(e.velocity.x + e.x < 0)
    {
        e.x = 0; 
        e.velocity.x *= -.5;
    }
    if(e.velocity.x + e.x > screen.w)
    {
        e.x = screen.w;
        e.velocity.x *= -.5;
    }
}

