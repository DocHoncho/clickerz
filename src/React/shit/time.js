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
	
	var createElement = function (tag, attr, contents) {
		var elem = $('<'+tag+'></'+tag+'>');
		for (var x in attr) {
			elem.attr(x, attr[x]);
		}

		if (contents) {
			elem.html(contents);
		}
	
		return elem;
	};

	var Dispatcher = function() {
		var that = {
			listeners: []
		};

		that.addListener = function (name, callback) {
			that.listeners.push({name: name, callback: callback})
		};

		that.removeListener = function (name) {
			// TODO
		};

		that.dispatch = function (args) {
			that.listeners.forEach(function (e) {
				e.callback(args);
			});
		};

		return that;
	};

	var Ball = function (x, y, direction, speed) {
		var that = {
			x: x,
			y: y,
			direction: direction,
			speed: speed
		};

		that.update = function (args) {
			that.x += Math.cos(that.direction) * that.speed;
			that.y += Math.sin(that.direction) * that.speed;
		};

		that.draw = function (args) {

		};

		return that;
	};
	var app = {
		worldEndDate: moment({year: 2092, month: 4, day: 1, hour: 9, minute: 47, second: 32}),
		gameStartDate: moment.duration({months: 4, days: 7, hours: -4, minute: 13, second: 20}),
		gameDate: undefined,
		ticksPerSecond: 60,
		ball: {
			x: 0, 
			y: 0,
			radius: 150,
			speed: 1.25, // m/s,
			pos: 0,
			distance: 4000
		},
		beats: 0,
		beatListeners: Dispatcher(),
		scale: 200, // pixels/meter
		font: '13px Consolas',
		canvas: undefined,
		mousePos: {x: 0, y: 0},

		init: function (canvas) {
			this.canvas = canvas;
			this.gameStartDate = this.worldEndDate.clone().add(this.gameStartDate);
			this.gameDate = this.gameStartDate.clone();
			app.setupUI();

			this.ball.x = canvas.width / 2;
			this.ball.y = canvas.height /2;
		},

		update: function () {
			this.beats += 1;			
			this.gameDate = this.gameStartDate.clone().seconds(this.beats);
			this.beatListeners.dispatch({ 
				beat: this.beats,
				gameDate: this.gameDate
			});

			if (this.ball.pos < this.ball.distance) {
				this.ball.pos += this.ball.speed;
			}
		},

		drawGrid: function () {
			var canvas = this.canvas
			var ctx = canvas.getContext('2d');
			var w = this.scale;

			ctx.beginPath();

			ctx.strokeStyle = 'white';

			for (var x = 0; x <= canvas.width / w; x++) {
				ctx.moveTo(x*w, 0);
				ctx.lineTo(x*w, canvas.height);
			}

			for (var y = 0; y <= canvas.height / w; y++) {
				ctx.moveTo(0, y*w);
				ctx.lineTo(canvas.width, y*w);
			} 
			ctx.stroke();
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

			this.drawGrid();

			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'black';
			ctx.font = this.font;
			ctx.fillText(this.gameDate.format('ddd MMM DD Y HH:mm:ss'), 0, 10);
			ctx.stroke();

			ctx.beginPath();
			ctx.fillStyle='red';
			ctx.strokeStyle='white';

			// var b = this.ball;
			// var bx = b.pos / b.distance * (this.canvas.width-2*this.scale);
			// sCircle(ctx, this.scale+bx, this.ball.y, this.ball.radius*this.scale);
			// ctx.fill();
			// ctx.stroke();

			var b = this.ball;
			var bx = b.pos / b.distance * (this.canvas.width-2);
			sCircle(ctx, bx, this.ball.y, this.ball.radius);
			ctx.fill();
			ctx.stroke();

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
		},

		installTimer: function () {
			this.removeTimer();
			this.timer = setInterval($.proxy(this.update, this), 1000 / this.ticksPerSecond);
		},

		removeTimer: function () {
			if (this.timer) {
				clearInterval(this.timer);
			}			
		},

		setTicksPerSecond: function (k) {
			this.removeTimer();
			this.ticksPerSecond = parseInt(k);
			this.installTimer();
		},

		setupUI: function () {
			var self = this;
			$(this.canvas).bind('mousemove', $.proxy(this.canvasOnMove, this));
			this.installTimer();
		},
	}


	$(function () {
		var canvas = document.getElementById('test-canvas');
		var ctx = canvas.getContext('2d');
		app.init(canvas);

		setInterval(function () {
			app.draw();
		}, 30/1000);
		app.draw();

		var k = createElement('div', {class: 'panel panel-default'})
							.append(createElement('div', {class: 'panel-body'})
							.append(createElement('h3', {}, 'Hi Mom!')));
		$('.container .row .col-sm-2').append(k);
	});
})();
