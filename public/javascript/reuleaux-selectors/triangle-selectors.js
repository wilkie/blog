Raphael.fn.reuleaux = function(x, y, r) {
	r = r || 1;

	var cir_r = 2*r*r*(1-Math.cos(2/3*Math.PI));
	cir_r = Math.sqrt(cir_r);

	var points = getPoints(x,y,r);

	var start = 2*Math.PI+(Math.PI/3);
	var pathstr = "M" + points[0].x + " " + points[0].y;

	for (var i=0;i<3;i++) {
		var next_point = points[(i + 1) % 3];
		pathstr += "A" + [cir_r, cir_r, 0, 0, 0, next_point.x, next_point.y].join(',');
		start -= 2 * Math.PI/3;
	}

	pathstr += "z";

	return this.path(pathstr);
};

Raphael.fn.triangle = function(x,y,r) {
	r = r || 1;
	
	var points = getPoints(x,y,r);
	
	var pathstr = "M" + points[0].x + " " + points[0].y;
	for(var i=1;i<3;i++) {
		pathstr += "L" + points[i].x + " " + points[i].y;
	}
	pathstr += "z";
	
	return this.path(pathstr);
}

// Returns an array of 3 points that define the corners of the
//  triangle/reuleaux
function getPoints(x,y,r) {
	r = r || 1;

	var points = new Array();
	points[0] = {x:x,y:y-r};
	var diff_x = r * 0.5 * Math.sqrt(3);
	points[1] = {x:x-diff_x,y:y+(0.5 * r)};
	points[2] = {x:x+diff_x,y:points[1].y};
	
	return points;
}

function addAreaKnob(paper, selector, x, y) {
  if (selector.knobs == undefined) {
    selector.knobs = new Array();
  }

  var knob = {};
  knob.radius = 5;
  knob.area = paper.circle(x,y,knob.radius).attr({"stroke-opacity": 0.0, fill: "#44f", "fill-opacity": 0.5});
  knob.move_handle = paper.circle(x,y,5).attr({stroke: "#AA88AA", "stroke-width": 2, fill: "#fff", "fill-opacity": 0.0});
  knob.moved = false;

  var distance = knob.radius * Math.sqrt(2) * 0.5;
  knob.scale_handle = paper.circle(x + distance, y + distance,3).attr({fill: "#333", "fill-opacity": 0.6, "stroke-opacity": 0.0});

  knob.move_handle.drag(
    // on move
    function (dx, dy) {
      var newx = this.ox + dx;
      var newy = this.oy + dy;

      this.attr({cx: newx, cy: newy});

      distance = knob.radius * Math.sqrt(2) * 0.5;
      knob.scale_handle.attr({cx: newx+distance, cy: newy+distance});
      knob.area.attr({cx: newx, cy: newy});
      if (!knob.moved) {
        addAreaKnob(paper, selector, x, y);
        knob.moved = true;
      }

      this.attr({opacity: 0.5});
    },
    // on start
    function() {
      // storing original coordinates
      this.ox = this.attr("cx");
      this.oy = this.attr("cy");

      this.attr({opacity: 0.5});
    },
    // when done
    function() {
      this.attr({opacity: 1.0});
    });

  knob.scale_handle.drag(
      // on move
      function (dx, dy) {
        // determine distance to area center, establish as knob_radius
        var newx = this.ox + dx;
        var newy = this.oy + dy;

        var centerx = knob.move_handle.attr("cx")
        var centery = knob.move_handle.attr("cy")

        var distance = (newx - centerx) * (newx - centerx);
        distance = distance + (newy - centery) * (newy - centery);
        distance = Math.sqrt(distance);

        if (knob.moved == false && distance < 5) {
          distance = 5;
        }

        knob.radius = distance;

        knob.area.attr({r: distance});

        distance = knob.radius * Math.sqrt(2) * 0.5;

        this.attr({cx: centerx+distance, cy: centery+distance});
      },
      // on start
      function () {
        this.ox = this.attr("cx");
        this.oy = this.attr("cy");
      },
      // on end
      function () {
        if (knob.radius < 5 && knob.moved) {
          // destroy
          knob.area.remove();
          knob.move_handle.remove();
          knob.scale_handle.remove();
        }
      });

  selector.knobs.push(knob);

  for(var i = 0; i < selector.knobs.length; i++) {
    selector.knobs[i].move_handle.toFront();
    selector.knobs[i].scale_handle.toFront();
  }
}

// Draws the selector
// paper: canvas
// x, y: coordinate to position the center of the selector
// size: radius of the reuleaux
// attr_outer: style of outer reuleaux
// attr_inner: style of inner reuleaux
// caption: text that appears under the selector
// labels: hash of labels for corners and center
//				 ex: {middle: "none", top: "all", left: "female", right: "male"}
// Rest are optional...
// start_x, start_y: value of knob (when not given, set to x,y)
// is_point_selector: true when it is a point selector, false when it is an area selector (default: true)
// inner_size: relative size of center hole (when not given, set to 0.17)
function drawSelector(paper, x, y, size, attr_outer, attr_inner, caption, labels, start_x, start_y, is_point_selector, inner_size) {
	var tri_fit = 0.98;
	if (inner_size == undefined) inner_size = 0.17;
  if (is_point_selector == undefined) is_point_selector = true;

	var selector = {};

	selector.update = function(x,y) {
		selector.x = x;
		selector.y = y;
	};

	// an event for when the knob moves (initially, do nothing)
	selector.updated = function(x,y) {};

	selector.tris = {};
	selector.tris.outer = paper.reuleaux(x, y, size*tri_fit).attr(attr_outer);
	selector.tris.inner = paper.reuleaux(x, y, size*tri_fit*inner_size).attr(attr_inner);

	selector.inBig = false;
	selector.inSmall = false;

	// draw non-colliding gender labels
	// TODO: make these coords relative to the size! scale if necessary!
	selector.labels = {};
	selector.labels.middle = paper.text(x,y,labels.middle)
	selector.labels.top = paper.text(x,20+(y-size), labels.top)
	selector.labels.left = paper.text((0.40*size)+(x-size),(0.40*size)+y,labels.left)
	selector.labels.right = paper.text((0.65*size)+x,(0.40*size)+y, labels.right)
	selector.caption = paper.text(x,(0.8*size)+y,caption);

	// Set knob coords
	if (start_x) {
		selector.x = start_x;
	}
	else {
		selector.x = x;
	}

	if (start_y) {
		selector.y = start_y;
	}
	else {
		selector.y = y;
	}

  if (is_point_selector) {
    // selector
    selector.knob = paper.circle(selector.x,selector.y,5).attr({stroke: "#AA88AA", "stroke-width": 2, fill: "#fff", "fill-opacity": 0.0});

    // add drag events to knob

    // What happens when the knob is dragged
    selector.knob.drag(
      // on move
      function (dx, dy) {
        var newx = this.ox + dx;
        var newy = this.oy + dy;

        // Snap to the middle of the small triangle if inside
        selector.inSmall = selector.tris.inner.isPointInside(newx, newy)
        if(selector.inSmall){
          newx = x;
          newy = y;
        }

        selector.inBig = selector.tris.outer.isPointInside(newx, newy)
        if(!selector.inBig) {
          // collide with edge
          intersectionPoint = intersectReuleaux(newx, newy, x, y, size);
          newx = intersectionPoint.x;
          newy = intersectionPoint.y;
        }

        this.attr({cx: newx, cy: newy});

        this.attr({opacity: 0.5});
        selector.updated(newx, newy);
      },
      // on start
      function() {
        // storing original coordinates
        this.ox = this.attr("cx");
        this.oy = this.attr("cy");
        this.attr({opacity: 0.5});
      },
      // when done
      function() {
          this.attr({opacity: 1.0});
      });
  }
  else {
    var half_width  = size;
    var half_height = size;
    addAreaKnob(paper, selector, selector.x, selector.y);
  }

	return selector;
}

function intersectCircle(focal, cir_r, newx, newy, endx, endy) {
	// Transform such that the center of the circle is the origin
	var fx = focal.x;
	var fy = focal.y;

	var nx = newx - fx;
	var ny = fy - newy;

	var cx = endx - fx;
	var cy = fy - endy;

	// The focal point is the center, and the origin now
	fx = 0;
	fy = 0;

	// scale down
	fx /= cir_r;
	fy /= cir_r;
	cx /= cir_r;
	cy /= cir_r;
	nx /= cir_r;
	ny /= cir_r;

	// intersect line with circle
	// circle is unit radius thanks to scaling, and at origin
	// CIRCLE: 1 = x^2 + y^2

	// Parametric equations for the line are needed
	// P(x,y) = StartPoint + t*Dir(x,y)

	// Good ole direction vector
	var dx,dy;
	dx = cx-nx;
	dy = cy-ny;

	// COOL!
	// Px = nx+t*dx
	// Py = ny+t*dy

	// We have some vector for the Ray from center of circle
	// to the end point (nx,ny)
	var gx = nx-fx;
	var gy = ny-fy;

	// Substitute in for x and y... do a lot of math... end up with:
	// 	t^2*(Dir . Dir) + 2*t*(Dir . Ray) + (Ray . Ray) - r^2 = 0

	// Solve with the good ole quadratic formula
	var a = (dx*dx)+(dy*dy); // Dir . Dir
	var b = 2*((gx*dx) + (gy*dy)); // Ray . Dir
	var c = (gx*gx)+(gy*gy) - 1*1; // (Ray . Ray) - r^2

	var discriminate = b*b - 4*a*c;
	discriminate = Math.sqrt(discriminate);
	var t1 = (-b + discriminate)/(2*a);
	var t2 = (-b - discriminate)/(2*a);

	// Go back to our actual coordinate system
	nx = newx;
	ny = newy;
	dx = endx-nx;
	dy = endy-ny;

	// Find the first point
	var x1 = nx+t2*dx;
	var y1 = ny+t2*dy;

	// It just so happens that this is the correct point!
	// We can throw away the other intersection point

	return {x:x1,y:y1};
}

function intersectReuleaux(newx, newy, x, y, size) {
	var points = getPoints(x,y,size);
	focal = points[0];

	// Make the center of the reuleaux the origin
	nx = newx-x;
	ny = y-newy;

	fx = focal.x-x;
	fy = y-focal.y;

	// Find the distance from the point of concern to the center
	d = Math.sqrt(nx*nx+ny*ny);

	var cx,cy;

	// Find the distance from the focal point to the center
	var l = Math.sqrt(fx*fx+fy*fy);

	// Get the angle between the two vectors
	var dot = (nx*fx)+(ny*fy);
	var mag = (d*l);
	var ang = Math.acos(dot/mag);

	// Take into account angles > 180 degrees
	if (nx > fx) ang = (2*Math.PI)-ang;

	var tx, ty;

	// Find the radius of the outer circles
	var cir_r = 2*size*size*(1-Math.cos(2/3*Math.PI));
	cir_r = Math.sqrt(cir_r);

	var x1,y1,x2,y2;

	// origin is at focal point of concern
	// We need to know which quadrant we are in (ok, yeah, of the *three*)
	// But, hey! We know the angle!

	var q = 0;
	if (ang >= 0 && ang <= (2/3)*Math.PI) {
		q = 2;
	}
	else if (ang >= (2/3)*Math.PI && ang <= (4/3)*Math.PI) {
		q = 0;
	}
	else {
		q = 1;
	}

	// Get angle within the 'quadrant'
	var max_angle = (2/3)*Math.PI * (((q+1)%3)+1);
	var inner_ang = max_angle - ang;

	// Ok, We pick the circle from the quadrant.
	focal = points[q];

	// Find intersection with outer reuleaux
	var outerPoint = intersectCircle(focal, cir_r, newx, newy, x, y);

  return outerPoint;
}

function transformPoint(newx, newy, x,y,size,size_inner) {
	// Transform
	// Need the distance normal to the inner reuleaux

	/*

		Consider a third:

	           .*
	         .` |      *---.---*---*
	        .   |      ^   |   ^   ^- center point
	       /    |      |   |   ------ boundary of inner reuleaux
	      `    .`      |   ---------- point of concern
	     `    . |      -------------- boundary of outer reuleaux
	    .    _`-*
        | _-`
	    *`

		Distance from boundary of inner reuleaux to inner focal point
		is the radius of the inner circle (icr)

		Distance from the boundary of the outer reuleaux to outer focal
		point is the radius of the outer circle (ocr)

		The line from the point of concern to the opposite focal point
		is also normal to both reuleaux curves.

		We will get the angle and then the distance from the point of
		concern to the boundary of the inner reuleaux and divide that
		into the total distance of the normal line between the inner
		and outer reuleaux triangles.

	*/

	// Need the angle from the internal center

	// Angle between two vectors (one from point of concern to center,
	// other from focal point to center) is simply:
	// arccos((a . b) / (|a|*|b|))
	var points = getPoints(x,y,size);
	focal = points[0];

	// Make the center of the reuleaux the origin
	nx = newx-x;
	ny = y-newy;

	fx = focal.x-x;
	fy = y-focal.y;

	// Find the distance from the point of concern to the center
	d = Math.sqrt(nx*nx+ny*ny);

	var cx,cy;

	// Find the distance from the focal point to the center
	var l = Math.sqrt(fx*fx+fy*fy);

	// Get the angle between the two vectors
	var dot = (nx*fx)+(ny*fy);
	var mag = (d*l);
	var ang = Math.acos(dot/mag);

	// Take into account angles > 180 degrees
	if (nx > fx) ang = (2*Math.PI)-ang;

	var tx, ty;

	// Find the radius of the outer circles
	var cir_r = 2*size*size*(1-Math.cos(2/3*Math.PI));
	cir_r = Math.sqrt(cir_r);

	// Find the radius of the inner circles
	var cir_r_inner = 2*size_inner*size_inner*(1-Math.cos(2/3*Math.PI));
	cir_r_inner = Math.sqrt(cir_r_inner);

	var x1,y1,x2,y2;

	// origin is at focal point of concern
	// We need to know which quadrant we are in (ok, yeah, of the *three*)
	// But, hey! We know the angle!

	var q = 0;
	if (ang >= 0 && ang <= (2/3)*Math.PI) {
		q = 2;
	}
	else if (ang >= (2/3)*Math.PI && ang <= (4/3)*Math.PI) {
		q = 0;
	}
	else {
		q = 1;
	}

	// Get angle within the 'quadrant'
	var max_angle = (2/3)*Math.PI * (((q+1)%3)+1);
	var inner_ang = max_angle - ang;

	// Ok, We pick the circle from the quadrant.
	focal = points[q];

	// Find intersection with outer reuleaux
	var outerPoint = intersectCircle(focal, cir_r, newx, newy, x, y);

	var inner_points = getPoints(x,y,size_inner);
	focal = inner_points[q];

	// Do the same for the inner reuleaux... painfully
	var innerPoint = intersectCircle(focal, cir_r_inner, newx, newy, x, y);

	// Find the distance between the two intersection points.
	// This is the length between the inner and outer reuleaux
	dx = (innerPoint.x-outerPoint.x);
	dx = dx * dx;

	dy = (innerPoint.y-outerPoint.y);
	dy = dy * dy;

	d = Math.sqrt(dx+dy);

	// Also find the distance from the point of concern to the inner
	// reuleaux.
	fx = (newx-innerPoint.x);
	fx = fx * fx;

	fy = (newy-innerPoint.y);
	fy = fy * fy;

	var f = Math.sqrt(fx + fy);

	// How far from the center to the edge normal to the curve are we?
	// We then go that far along the diagonal of the triangle for 
	// our transformation.
	var diff = f / d;

	// Are we in the inner reuleaux?
	// Collision is easy, make sure distance from point to center
	// of each of the three defining circles is greater than the radius
	var in_inner = true;
	for(var i=0;i<3;i++) {
		dx = (newx-inner_points[i].x);
		dx = dx * dx;
		dy = (newy-inner_points[i].y);
		dy = dy * dy;
		d = Math.sqrt(dx+dy);

		if (d >= cir_r_inner) {
			in_inner = false;
			break;
		}
	}

	// Find the point on the boundary of the triangle that is normal
	// to the triangle edge and goes through the centroid point

	dx = (points[0].x - x);
	dx = dx * dx;

	dy = (points[0].y - y);
	dy = dy * dy;

	// The length of the proper triangle's radius
	d = Math.sqrt(dx+dy);

	/*
			LAW OF SINES

		               ,/
		             -`/ <-- angle is inner_ang
		         d -` / r
		         -`  /
		  /--> -` ,,- <--- angle is PI - inner_ang - PI/6
		PI/6 ..--``

		r = d * sin(PI/6) / sin(PI - inner_ang - PI/6)

	*/

	var r = d * Math.sin(Math.PI / 6);
	r /= Math.sin(Math.PI - inner_ang - Math.PI/6);

	if (in_inner) {
		tx = 0;
		ty = 0;
	}
	else {
		// Get end point on the triangle
		tx = -(r*diff) * Math.sin(ang);
		ty = -(r*diff) * Math.cos(ang);
	}

	tx += x;
	ty += y;
	
	return {x: tx, y: ty};
}

window.onload = function() {
	var gender = {};
  var gender2 = {};
  var gender3 = {};
	var sexuality = {};
	var sexualitySimple = {};
	var attr = {};

	attr.outer = {fill: "#ccf", stroke: "#225", "stroke-width": "1.35"};
	attr.inner = {fill: "#fff", stroke: "#558", "stroke-width": "1.15"};

	gender2.paper = Raphael("genderTriFieldIllustration", 400, 200);
	gender2.selector = drawSelector(gender2.paper,
	                            100, 100, 100,
							   attr.outer, attr.inner,
							   "Gender Identity",
							   {middle: "none", top: "all", left: "female", right: "male"},
	                              parseInt(document.getElementById("genderXPosI").value),
	                              parseInt(document.getElementById("genderYPosI").value));

	var lastline;
	var lasttriline;
	var lastcir1;
	var lastcir2;
	var lastreport;

	gender2.selector.updated = function(newx,newy) {
		document.getElementById("genderXPosI").value = newx;
		document.getElementById("genderYPosI").value = newy;

		var point = transformPoint(newx,newy,100,100,98,98*0.17);

		if (lastcir1) lastcir1.remove();
		lastcir1 = gender2.paper.circle(point.x+200,point.y,3);
	}

	gender.tri = gender2.paper.triangle(300,100,98).attr(attr.outer);
	gender.foo = gender2.paper.circle(300,100,1).attr(attr.inner);

	gender.paper = Raphael("genderTriField", 200, 200);
	gender.selector = drawSelector(gender.paper,
	                           100, 100, 100,
							   attr.outer, attr.inner,
							   "I Identity As",
							   {middle: "none", top: "all", left: "female", right: "male"},
	                              parseInt(document.getElementById("genderXPos").value),
	                              parseInt(document.getElementById("genderYPos").value));

	gender3.paper = Raphael("genderTriField2", 200, 200);
	gender3.selector = drawSelector(gender3.paper,
	                           100, 100, 100,
							   attr.outer, attr.inner,
							   "I Identity As",
							   {middle: "none", top: "all", left: "female", right: "male"},
	                              parseInt(document.getElementById("genderXPos2").value),
	                              parseInt(document.getElementById("genderYPos2").value));

	var lastline;
	var lasttriline;
	var lastcir1;
	var lastcir2;
	var lastreport;
	gender.selector.updated = function(newx,newy) {
		document.getElementById("genderXPos").value = newx;
		document.getElementById("genderYPos").value = newy;

		var triple = {}; // stores (a)ll, (f)emale, (m)ale "values"

		var point = transformPoint(newx,newy,100,100,98,98*0.17);
		var points = getPoints(100,100,98);

		// length of a side of the triangle
		var MAX = Math.sqrt(Math.pow(points[0].x - points[1].x, 2) + Math.pow(points[0].y - points[1].y, 2));
		
		if(newx == 100 && newy == 100){
			// inside the hole
			triple.a = 0;
			triple.f = 0;
			triple.m = 0;
		} else {
			triple.a = ((MAX - Math.sqrt(Math.pow(points[0].x - point.x, 2) + Math.pow(points[0].y - point.y, 2)))/MAX) * 100;
			triple.f = ((MAX - Math.sqrt(Math.pow(points[1].x - point.x, 2) + Math.pow(points[1].y - point.y, 2)))/MAX) * 100;
			triple.m = ((MAX - Math.sqrt(Math.pow(points[2].x - point.x, 2) + Math.pow(points[2].y - point.y, 2)))/MAX) * 100;
		}

		document.getElementById("genderVal").value = JSON.stringify(triple);
	}

	sexualitySimple.paper = Raphael("sexualityTriFieldSimple", 200, 200);
	sexualitySimple.selector = drawSelector(sexualitySimple.paper,
	                              100, 100, 100,
								  attr.outer, attr.inner,
								  "I'm Attracted To",
		  					      {middle: "none", top: "all", left: "women", right: "men"},
	                              parseInt(document.getElementById("sexualityXPosSimple").value),
	                              parseInt(document.getElementById("sexualityYPosSimple").value));

	sexualitySimple.selector.updated = function(newx,newy) {
		document.getElementById("sexualityXPos").value = newx;
		document.getElementById("sexualityYPos").value = newy;
  }

	sexuality.paper = Raphael("sexualityTriField", 200, 200);
	sexuality.selector = drawSelector(sexuality.paper,
	                              100, 100, 100,
								  attr.outer, attr.inner,
								  "I'm Attracted To",
                  {middle: "none", top: "all", left: "female", right: "male"},
	                              parseInt(document.getElementById("sexualityXPos").value),
	                              parseInt(document.getElementById("sexualityYPos").value),
                                false);

	sexuality.selector.updated = function(newx,newy) {
		document.getElementById("sexualityXPosSimple").value = newx;
		document.getElementById("sexualityYPosSimple").value = newy;
		var triple = {}; // stores (a)ll, (w)omen, (m)en "values"

		var point = transformPoint(newx,newy,100,100,98,98*0.17);
		var points = getPoints(100,100,98);

		// length of a side of the triangle
		var MAX = Math.sqrt(Math.pow(points[0].x - points[1].x, 2) + Math.pow(points[0].y - points[1].y, 2));
		
		if(newx == 100 && newy == 100){
			// inside the hole
			triple.a = 0;
			triple.w = 0;
			triple.m = 0;
		} else {
			triple.a = ((MAX - Math.sqrt(Math.pow(points[0].x - point.x, 2) + Math.pow(points[0].y - point.y, 2)))/MAX) * 100;
			triple.w = ((MAX - Math.sqrt(Math.pow(points[1].x - point.x, 2) + Math.pow(points[1].y - point.y, 2)))/MAX) * 100;
			triple.m = ((MAX - Math.sqrt(Math.pow(points[2].x - point.x, 2) + Math.pow(points[2].y - point.y, 2)))/MAX) * 100;
		}

		document.getElementById("sexualityVal").value = JSON.stringify(triple);
	}
}
