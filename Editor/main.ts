

var canvas : HTMLCanvasElement;
var ctx : CanvasRenderingContext2D;

var WIDTH : number;
var HEIGHT : number;

var row = 15, column = 9;
var gridSize = 64;

var lightmap : Array<Array<number>>;

window.onload = () => {
    canvas = document.querySelector('#screen');

    canvas.width = row * gridSize;
    canvas.height = column * gridSize;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    WIDTH = canvas.clientWidth;
    HEIGHT = canvas.clientHeight;

    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', event =>
      draw(event.offsetX, event.offsetY)
    );

    lightmap = Array<Array<number>>(row);
    for(var i=0; i<row; ++i)
    {
        lightmap[i] = Array<number>(column);
    }
}

function draw(x, y) 
{
    resetGrid();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    var t = ScreenToEdge(x, y);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(t.x * gridSize, t.y * gridSize, 10, 0, 360);
    ctx.fill();
    ctx.closePath();
    console.log(t.x * gridSize, t.y * gridSize);
    x = t.x * gridSize;
    y = t.y * gridSize;
    calculateLine(x, y);
    for(var i=0; i<lightmap.length; ++i)
    {
        for(var j=0; j<lightmap[i].length; ++j)
        {
            drawGrid(i, j, lightmap[i][j]);
        }
    }
    drawLine(x, y);
    calculateLine(x, y);

}

function drawLine(x, y)
{
    ctx.beginPath();
    ctx.moveTo(gridSize / 2, gridSize / 2);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawGrid(x, y, block)
{
    ctx.beginPath();
    if(block == 1)
    {
        ctx.fillStyle = "orange";
        ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
    }
    if(block == 2)
    {
        ctx.fillStyle = "red";
        ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
    }
    if(block == 3)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
    }
    else
        ctx.strokeRect(x*gridSize, y*gridSize, gridSize, gridSize);
    ctx.closePath();
}

function calculateLine(x, y)
{
    ctx.fillStyle = "pink";
    var incline = (y-gridSize/2) / (x-gridSize/2);
    console.log(x, y, incline);
    if(incline > 1 || incline <= 0 || x < 0)
        return;
    var pre = f2g(0.5 * incline);
    for(var i=1; i<x / gridSize; ++i)
    {
        ctx.beginPath();
        ctx.arc((i+0.5) * gridSize + gridSize / 2, (i+0.5) * gridSize * incline + gridSize / 2, 5, 0, 360);
        ctx.fill();
        ctx.closePath();
        var cur = f2g((i+0.5) * incline);
        if(pre-0.5 >= y / gridSize)
            continue;
        console.log(cur, (i+0.5) * incline);
        if(pre == cur)
        {
            lightmap[i][pre-0.5] += 2;
            if(lightmap[i][pre-0.5] == 3)
                break;
        }
        else if(cur == (i+0.5)*incline+1)
        {
            lightmap[i][pre-0.5] += 2;
            if(lightmap[i][pre-0.5] == 3)
                break;
        }
        else
        {
            lightmap[i][pre-0.5] += 2;
            if(lightmap[i][pre-0.5] == 3)
                break;
            lightmap[i][cur-0.5] += 2;
            if(lightmap[i][cur-0.5] == 3)
                break;

        }
        pre = cur;
    }
}

function f2g(f)
{
    return Math.round(f) + 0.5
}

function ScreenToEdge(x, y)
{
    x /= gridSize;
    y /= gridSize;
    return {x:Math.round(x), y:Math.round(y)};
}

function resetGrid()
{
    for(var i=0; i<row; ++i)
    {
        for(var j=0; j<column; ++j)
            lightmap[i][j] = 0;
    }
    lightmap[3][2] = 1;
    lightmap[3][5] = 1;
    lightmap[6][3] = 1;
    lightmap[8][5] = 1;
}