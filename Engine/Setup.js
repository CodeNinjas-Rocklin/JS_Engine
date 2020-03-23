/* eslint-env es6 */
/*eslint-disable*/

let pause = 0;
let screen = CreateScreen(1400, 700);

function GameLoop()
{
    Update(); 
    CleanKeys();
    if(pause == 0) { UpdateAll(); }
}