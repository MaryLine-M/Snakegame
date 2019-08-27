window.onload = function ()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 300;
    var snaky;
    
    init();
    
    
    function init ()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snaky = new snake([[6,4],[5,4],[4,4]], "right");
        apply = new Apple([10,10]); /*10 10 = place du bloc*/
        refreshCanvas();
    }
    
    function refreshCanvas()
    {
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        snaky.advance();
        snaky.draw();
        apply.draw();
        setTimeout(refreshCanvas,delay);
    }
    
    
    function drawBlock(ctx, position)
        {
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            ctx.fillRect(x,y, blockSize, blockSize);
        }
    
    
    function snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function() /* "dessiner" le serpent*/
        {
            ctx.save();
            ctx.fillStyle = "#107060"; /*couleur*/
            for(var i = 0; i < this.body.length; i++)
                {
                    drawBlock(ctx, this.body[i]);
                }
              ctx.restore();
        };
        
    this.advance = function()
        {
            var nextposition = this.body[0].slice();
            switch(this.direction)
                {
                    case "left":
                        nextposition[0] -= 1;
                        break;
                    case "right":
                        nextposition[0] += 1;
                        break;
                    case "down":
                        nextposition[1] += 1;
                        break;
                    case "up":
                        nextposition[1] -= 1;
                        break;
                    default:
                        throw("Invalid Direction");
                }
            this.body.unshift(nextposition);
            this.body.pop();
        };
    this.setDirection = function(newDirection)
        {
            var allowDirections;
            switch(this.direction)
                {
                    case "left":
                    case "right":
                        allowDirections = ["up", "down"];
                        break;
                    case "down":
                    case "up":
                        allowDirections = ["left", "right"];
                        break;
                    default:
                        throw("Invalid Direction");
                }
             if(allowDirections.indexOf(newDirection) > -1)
                {
                 this.direction = newDirection;   
                }
        };
    
    }
    
    function Apple(position)
    {
        this.position = position;
        this.draw = function() /* "dessiner la pomme"*/
        {
            ctx.save();
            ctx.fillStyle = "#ff0060";
            ctx.beginPath();
            var radius = blockSize/2; /* dessiner cercle*/
            var x = position[0]*blockSize + radius;
            var y = position[1]*blockSize + radius;
            ctx.arc(x,y, radius, 0, Math.PI*2, true);
            ctx.fill(); /*remplir le cercle*/
            ctx.restore();
        };
    }
    
    
    document.onkeydown = function handleKeyDown(e)
    {
            var key = e.keyCode;
            var newDirection;
            switch(key)
            {
                case 37:
                    newDirection = "left";
                    break;
                case 38:
                    newDirection = "up";
                    break;
                case 39:
                    newDirection = "right";
                    break;
                case 40:
                    newDirection = "down";
                    break;
                default:
                    return;
            }
             
        snaky.setDirection(newDirection);
    
      }
    
    
}