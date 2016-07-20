
var socket = io();

function draw(){
	var canvas = document.getElementById('canvas');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		// ctx.fillStyle = 'rgb(200, 0, 0)';
		// ctx.fillRect(10, 10, 50, 50);

		var mousedown = false;

		canvas.addEventListener('mousedown', function(){
			mousedown = true;
		});

		canvas.addEventListener('mouseup', function(){
			mousedown = false;
		});

		canvas.addEventListener('mouseout', function(){
			mousedown = false;
		})

		canvas.addEventListener('mousemove', function(e){
			if(mousedown){
				paint(e);
				// console.log(point[0] - canvas.offsetLeft, point[1] - canvas.offsetTop);
			}
		}, false);

		canvas.addEventListener('mouseclick', function(e){
			paint(e);
			console.log('clicked');
		});
	
		function paint(e){
			var point = findxy(e);
			point[0] -= canvas.offsetLeft
			point[1] -= canvas.offsetTop
			
			socket.emit('request_paint', point);
		}

		socket.on('paint_on_client', function(data){
			ctx.moveTo(data[0], data[1]);
			ctx.lineTo(data[0]+1, data[1]+1);
			ctx.stroke();
			ctx.fill();	
		});
	}
}

function findxy(e){
	return [e.clientX, e.clientY];
}