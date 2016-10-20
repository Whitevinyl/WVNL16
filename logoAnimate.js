
function Point(x,y) {
    this.x = x || 0;
    this.y = y || 0;
}

var logoTweens = [];

var column1 = [new Point(2.5, 17.7), new Point(41.6, 97.5), new Point(55.9, 97.5), new Point(16.75, 17.7), new Point(2.5, 17.7), new Point(41.6, 97.5), new Point(41.6, 97.5)];
var column1from = [new Point(2.5, 17.7), new Point(41.6, 97.5), new Point(55.9, 97.5), new Point(16.75, 17.7), new Point(2.5, 17.7), new Point(41.6, 97.5), new Point(41.6, 97.5)];
var column1to = [new Point(85, 17.7), new Point(85, 97.5), new Point(85, 97.5), new Point(85, 17.7), new Point(72, 17.7), new Point(72, 97.5), new Point(85, 97.5)];

var column2 = [];


var column3 = [new Point(44.06, 17.7), new Point(83.25, 97.5), new Point(97.5, 97.5), new Point(58.31, 17.7), new Point(44.06, 17.7), new Point(83.25, 97.5), new Point(83.25, 97.5)];
var column3from = [new Point(44.06, 17.7), new Point(83.25, 97.5), new Point(97.5, 97.5), new Point(58.31, 17.7), new Point(44.06, 17.7), new Point(83.25, 97.5), new Point(83.25, 97.5)];
var column3to = [new Point(98, 17.7), new Point(98, 97.5), new Point(98, 97.5), new Point(98, 17.7), new Point(85, 17.7), new Point(85, 97.5), new Point(98, 97.5)];


// format points for SVG //
function pointsToString(points) {

    // first point //
    var string = 'M' + points[0].x + ' '+points[0].y;

    // remaining points //
    for (var i=1; i<points.length; i++) {
        string += ' L' + points[i].x + ' '+points[i].y;
    }
    return string;
}


function animateLogo(type,t) {
    clearLogoTweens();

    if (type=='in') {
        arrayToArray(column1,column1to,t,0,'logoD1');
        arrayToArray(column3,column3to,t,0,'logoD3');
    }
    else {
        arrayToArray(column1,column1from,t,0,'logoD1');
        arrayToArray(column3,column3from,t,0,'logoD3');
    }
}


function arrayToArray(arr1,arr2,t,d,element) {

    t = t || 1;
    d = d || 0;

    var update = null;
    for (var h=0; h<arr2.length; h++) {
        if (h==(arr2.length-1)) {
            update = arr1;
        }
        pointToPoint(arr1[h],arr2[h],t,d,update,element);
    }
}

function pointToPoint(p1,p2,t,d,update,element) {
    t = t || 1;
    d = d || 0;

    var tween = new TWEEN.Tween(p1);
    logoTweens.push(tween);
    tween.to(p2, t * 1000);
    tween.delay(d * 1000);
    tween.start();

    tween.onUpdate(function() {
        p1.x = this.x;
        p1.y = this.y;

        if (update) {
            var c = document.getElementById(element);
            c.setAttribute('d', pointsToString(update));
        }
    });

    tween.easing(TWEEN.Easing.Cubic.InOut);
}

function clearLogoTweens() {
    for (var h=0; h<logoTweens.length; h++) {
        logoTweens[h].stop();
    }
    logoTweens = [];
}