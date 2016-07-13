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

		canvas.addEventListener('mousemove', function(e){
			if(mousedown){
				paint(e);
			}
		}, false);

		canvas.addEventListener('mouseclick', function(e){
			paint(e);
		});
	
		function paint(e){
			var point = findxy(e);
			point[0] -= canvas.offsetLeft
			point[1] -= canvas.offsetTop
			ctx.moveTo(point[0], point[1]);
			ctx.lineTo(point[0]+1, point[1]+1);
			ctx.stroke();
			ctx.fill();
		}

	}
}

function findxy(e){
	return [e.clientX, e.clientY];
}