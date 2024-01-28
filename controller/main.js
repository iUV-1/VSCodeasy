
console.log("Running script"); 
// bet the canvas to draw on

    var canvas = document.getElementById("main_canvas");
    console.log(canvas)
    console.log("Got Canvas");

    // @ts-ignore
    var canvas_api = canvas.getContext('2d');
    console.log(canvas_api);

    var pos = {x: 0, y: 0};

    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", draw);
    document.addEventListener("mousedown", setPosition); 
    document.addEventListener("mouseenter", setPosition);
    console.log("Entered script");
    //canvas_api.canvas.width = window.innerWidth;
    //canvas_api.height = window.innerHeight; 
    
    function resize(e) {
        canvas_api.canvas.width = window.innerWidth;
        canvas_api.canvas.height = window.innerHeight;
      }
    // @ts-ignore
    function setPosition(e) {

        var rect = canvas.getBoundingClientRect();

        pos.x = e.offsetX        
        pos.y = e.offsetY         

    }
    

    function draw(e) {

        if (e.buttons !== 1) {
            return;
        }

        canvas_api.beginPath()
        canvas_api.lineCap = 'round';

        canvas_api.moveTo(pos.x, pos.y); 
        setPosition(e);
        canvas_api.lineTo(pos.x, pos.y);

        canvas_api.stroke();
        
    }
    
