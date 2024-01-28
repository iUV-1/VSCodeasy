
console.log("Running script"); 
// bet the canvas to draw on

    var canvas = document.getElementById("main_canvas");
    console.log(canvas)
    console.log("Got Canvas");

    // get the radio options from dom
    var drawbutton = document.getElementById("drawButton");
    var deleteButton = document.getElementById("deleteButton");

    drawbutton.addEventListener("change",  () => {
        // @ts-ignore
        if (drawbutton.checked) {
           document.addEventListener("mousemove", draw);
           document.addEventListener("mousedown", setPosition);
           document.addEventListener("mouseenter", setPosition);
           
           // remove ol
           document.removeEventListener("mousedown", place);
           document.removeEventListener("mouseup", deleteRec);
           document.removeEventListener("mousemove", moveRec); 
        }
    } );

    deleteButton.addEventListener("change", () => {
        document.addEventListener("mousedown", place);
        document.addEventListener("mousemove", moveRec);
        document.addEventListener("mouseup", deleteRec);

        document.removeEventListener("mousedown", place);
        document.removeEventListener("mousemove", draw);
        document.removeEventListener("mouseenter", place); 

    })

    // @ts-ignore
    var canvas_api = canvas.getContext('2d');
    console.log(canvas_api);

    var pos = {x: 0, y: 0};

    var recStart = {x: 0, y: 0};

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

    // places start of a deleting rectangle
    function place(e) {
        recStart.x = e.clientX;
        recStart.y = e.clientY;
    }

    // function that deletes rectangular area of a canvas
    function deleteRec(e) {
        canvas_api.clear_Rect(recStart.x, recStart.y, e.clientX - recStart.x, e.clientY - recStart.y )

    }

    // function to move rectangle for area to delete
    function moveRec(e) {

        if (e.buttons !== 1) return;
        
        

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
        canvas_api.lineWidth = 2.5; 
        canvas_api.strokeStyle = "#FFFFFF"; 
        canvas_api.stroke();
        
    }
    
