/**
 * @author   Ikaros Kappler
 * @date     2017-05-18
 * @version  1.0.0
 **/

$( document ).ready( function() {

    var $canvas = $( 'canvas#my_canvas' );
    var ctx = $canvas[0].getContext('2d');

    var canvas_width = 820;
    var canvas_height = 540;
    
    var n = 7;
    var sc = 7.0;
    var hsh = 34;
    var vsh = 42;
    var color = 'green';
    var line_width = 2;
    
    var draw = function() {
	sc = getFloatInput('cell_size');
	line_width = getFloatInput('line_width');
	draw_dragon(ctx);
    };
    
    function draw_dragon(ctx) {
	/*
	var n   = document.getElementById('ord').value;
	var sc  = document.getElementById('sci').value;
	var hsh = document.getElementById('hshi').value;
	var vsh = document.getElementById('vshi').value;
	var clr = document.getElementById('cli').value;
	*/
	n =  getIntegerInput('iterations');
	//console.log( 'n=' + n + ', sc='+sc + ', vsh=' + vsh + ', hsh=' + hsh );
	var c = c1=c2=c2x=c2y=x=y=0;
	var d = 1;
	var n = Math.pow(2,n); 

	x=hsh; 
	y=vsh; 
	// Cleaning canvas, init plotting
	ctx.fillStyle='black';
	//ctx.translate(0.5,0.5); // Fix for the half-pixel issue
	ctx.fillRect(0,0,canvas_width,canvas_height);

	var old_x = x, old_y = y;
	for( i = 0; i <= n; ) {
	    ctx.beginPath();
	    ctx.moveTo( hsh + old_x*sc, vsh + old_y*sc );
	    ctx.lineTo( hsh + x*sc,     vsh + y*sc );
	    ctx.strokeStyle = colors[ mrand_i(colors.length+2) ];
	    ctx.lineWidth = line_width;
	    ctx.lineCap = 'round';
	    ctx.stroke();
	    c1=c&1; c2=c&2;
	    c2x=1*d;
	    if(c2>0) 
		c2x=(-1)*d
	    
	    c2y=(-1)*c2x;

	    old_x = x;
	    old_y = y;
	    
	    if(c1>0) y+=c2y
	    else     x+=c2x
	    
	    i++;
	    c+=i/(i&-i);
	}
    }

    var colors = [ '#00ff00', '#00a800', '#006800', '#00a8a8' ];
    
    var paint = function(ctx) {
        c_curve(x, y, len, alpha_angle, iteration_n, ctx);
    };

    var mrand_i = function(max) {
	return Math.floor( Math.random()*max );
    };

    draw();

    $( 'input#iterations' ).change( draw );
    $( 'input#cell_size' ).change( draw );
    $( 'input#line_width' ).change( draw );

    var canvasPosition2Complex = function(event) {
	var rect = $canvas[0].getBoundingClientRect();
        var x = event.clientX - rect.left,
	    y = event.clientY - rect.top;

	return { x : x/3, y : y/3 };
    };

    var mouseDown = false;
    var mouseDownPosition = null;
    $canvas.mousedown( function(event) {
	mouseDown = true;
	mouseDownPosition = canvasPosition2Complex(event);
	draw();
    } );
    $canvas.mouseup( function(event) {
	mouseDown = false;
	mouseDownPosition = null;
    } );
    $canvas.mousemove( function(event) {
	if( !mouseDown )
	    return;
	var z = canvasPosition2Complex(event);

	vsh += (z.y - mouseDownPosition.y);
	hsh += (z.x - mouseDownPosition.x);
	mouseDownPosition = z;
	
	draw();
    } );
   
} );


var getFloatInput = function(id) {
    return parseFloat( document.getElementById(id).value );
}

var getIntegerInput = function(id) {
    return parseInt( document.getElementById(id).value );
}

