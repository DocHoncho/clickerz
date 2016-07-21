(function () {
	var _cl = console.log;

	function sCircle(ctx, x, y, r) {
		ctx.arc(x, y, r, 0, Math.PI+(Math.PI*2)/2, true);		
	}

	function circle(canvas, x, y, r, opts) {
		var ctx = canvas.getContext('2d');
		var defaults = {
			'fillStyle': 'black',
			'strokeStyle': 'black',
			fill: false,
			stroke: true
		}
		var opts = $.extend((typeof opts !== 'undefined') ?  opts : {}, defaults);

		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI+(Math.PI*2)/2, true);

		if (opts.stroke) {
			var old = ctx.strokeStyle;
			ctx.strokeStyle = opts.strokeStyle;
			ctx.stroke();
			ctx.strokeStyle = old;
		}

		if (opts.fill) {
			var old = ctx.fillStyle;
			ctx.fillStyle = opts.fillStyle;
			ctx.fill();
			ctx.fillStyle = old;
		}
	}

	function polygon(canvas, points, opts) {
		var ctx = canvas.getContext('2d');
		var defaults = {
			'fillStyle': 'black',
			'strokeStyle': 'black',
			fill: false,
			stroke: true
		}
		var opts = $.extend((typeof opts !== 'undefined') ?  opts : {}, defaults);
		
		if (points.length < 1)
			return;

		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		points.forEach(function(p) {
			ctx.lineTo(p[0], p[1]);
		});

		if (opts.stroke) {
			var old = ctx.strokeStyle;
			ctx.strokeStyle = opts.strokeStyle;
			ctx.stroke();
			ctx.strokeStyle = old;
		} 

		if (opts.fill) {
			var old = ctx.fillStyle;
			ctx.fillStyle = opts.fillStyle;
			ctx.fill();
			ctx.fillStyle = old;
		}
	}

	function calcPoly(x, y, sides, length, rot) {
		var cx = x, 
			cy = y;
		var data = [];

		var ang = (180 * (sides - 2)) / sides;
		var angRad = (360/sides) * (Math.PI / 180);

		for (var p = 0; p <= sides; p++) {
			var nAng = angRad * p;
			data.push([x+Math.cos(nAng+rot) * length, y+Math.sin(nAng+rot) *length]);
		}

		return data;
	}

	var app = {
		circles: [
			{
				name: 'group',
				color: 'blue',
				radius: 50
			},
			{ 
				name: 'light',
				radius: 50,
				color: 'white',
			},
			{
				name: 'noise-active',
				radius: 40,
				color: '#994444',
			},		
			{
				name: 'noise',
				radius: 10,
				color: '#990000',
			},
			{
				name: 'max-spawn',
				radius: 100,
				color: 'gray'
			},
			],
		scale: 1,
		canvas: undefined,
		mousePos: {x: 0, y: 0},

		init: function (canvas) {
			this.canvas = canvas;

			$(canvas).bind('mousemove', $.proxy(this.canvasOnMove, this));
			//this.canvas.addEventListener('mousemove', this.canvasOnMove);
		},

		update: function () {

		},

		drawRadius: function (ctx, radius, center) {
			ctx.beginPath();
			sCircle(ctx, center.x, center.y, radius);
			ctx.fill();
			ctx.stroke();
		},

		drawGroup: function (ctx, center) {

		},

		draw: function () {
			var ctx = this.canvas.getContext('2d');
			var center = {
				x: this.canvas.width / 2,
				y: this.canvas.height / 2
			};
			ctx.strokeStyle="black";
			ctx.fillStyle="black";
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			ctx.save();

			ctx.lineWidth = 2;
			ctx.strokeStyle = 'black';

			var stack = [];
			var totRad = 0;

			for (var i = 0; i < this.circles.length; i++) {
				var circle = this.circles[i];

				totRad += circle.radius;
				stack.push({
					color: circle.color,
					radius: totRad,
				});
			}
			var k = 1;
			while (stack.length > 0) {
				var k = stack.pop();
				ctx.fillStyle = k.color;
				this.drawRadius(ctx, k.radius*this.scale, center);
			}

			ctx.restore();
		},

		getMousePos: function (c, evt) {
	        var rect = this.canvas.getBoundingClientRect();
	        var k = {
	          x: evt.clientX - rect.left,
	          y: evt.clientY - rect.top
	        };
	        return k;
	  	},

	  	canvasOnMove: function (e) {
			this.mousePos = this.getMousePos(this.canvas, e); 

			var sx = signum(e.movementX),
				sy = signum(e.movementY);
			var s = (sx > 0 || sy > 0) ? 1 : -1;

			this.dashPhase += s * this.dashSpeed;
		},

		setupUI: function () {
			var self = this;
			this.circles.forEach (function (obj, idx) {
				var $obj = $('#'+obj.name);
				$obj.on('change', function (evt) {
					self.circles[idx].radius = parseInt(this.value);
				});

				$obj.attr('value', obj.radius);
			});
		},
	}

	function signum(x) {
		return x / Math.abs(x);
	}

	$(function () {
		var canvas = document.getElementById('test-canvas');
		var ctx = canvas.getContext('2d');
		app.init(canvas);
		app.setupUI();

		setInterval(function () {
			app.update();
			app.draw();
		}, 30/1000);
		app.draw();

	});
})();

/*
ctx.beginPath();
ctx.moveTo(50,20);
ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
ctx.stroke();

ctx.fillStyle = 'blue';
// start point
ctx.fillRect(50, 20, 10, 10);
// end point
ctx.fillRect(50, 100, 10, 10);

ctx.fillStyle = 'red';
// control point one
ctx.fillRect(230, 30, 10, 10);
// control point two
ctx.fillRect(150, 60, 10, 10);
*/