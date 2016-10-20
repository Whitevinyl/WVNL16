

var TWEEN;


function RGBA(r,g,b,a) {
    this.R = r || 0;
    this.G = g || 0;
    this.B = b || 0;
    this.A = a || 0;
}
RGBA.prototype.copy = function() {
    return new RGBA(this.R,this.G,this.B,this.A);
};

var paletteTweens = [];

var paletteDark = [new RGBA(26,14,26,1),new RGBA(255,255,255,1),new RGBA(0,226,186,1),new RGBA(221,85,255,1)];
var paletteLight = [new RGBA(250,250,240,1),new RGBA(10,10,11,1),new RGBA(250,45,55,1),new RGBA(0,140,230,1)];

var c1 = paletteDark[0].copy();
var c2 = paletteDark[1].copy();
var c3 = paletteDark[2].copy();
var c4 = paletteDark[3].copy();




// SET CSS COLOR //
function setCSSColor(col,name,bg) {
    var h;
    var c = "rgb("+Math.round(col.R)+","+Math.round(col.G)+","+Math.round(col.B)+")";

    if (bg) {
        var bgs = document.getElementsByClassName(name);
        for (h=0; h<bgs.length; h++) {
            bgs[h].style.backgroundColor = c;
        }
    }
     else {
        var cols = document.getElementsByClassName(name);
        for (h=0; h<cols.length; h++) {
            cols[h].style.color = c;
        }
    }
}




function init() {
    var t = 1.5;
    var d = 0;/*
    //changePalette(1.5);
    //colourToColour(c1,new RGBA(250,200,185,1),1.5,0,'bg',true);
    colourToColour(c1,new RGBA(210,211,215,1),t,0,'bg',true);
    //colourToColour(c1,new RGBA(43,40,50,1),t,0,'bg',true);
    colourToColour(c2,new RGBA(10,10,11,1),t,d,'foreground');
    colourToColour(c3,new RGBA(0,160,170,1),t,d,'highlight1');
    colourToColour(c4,new RGBA(110,0,255,1),t,d,'highlight2');
    // 255,100,80,1*/

    //colourToColour(c1,new RGBA(5,0,5,1),1.5,0,'bg',true);

    scrollInit();

    var e = document.getElementById('logoSvg');
    e.onmouseover = function() {animIn();};
    e.onmouseout = function() {animOut();};

    draw();
}


function animIn() {
    console.log('enter');
    animateLogo('in',0.5);
}
function animOut() {
    console.log('leave');
    animateLogo('out',0.6);
}


function changePalette(palette,t,d) {
    clearPaletteTweens();
    colourToColour(c1,palette[0],t,d,'bg',true);
    colourToColour(c2,palette[1],t,d,'foreground');
    colourToColour(c3,palette[2],t,d,'highlight1');
    colourToColour(c4,palette[3],t,d,'highlight2');
}






function colourToColour(col,col2,t,d,name,bg) {

    t = t || 1;
    d = d || 0;

    var pos = {r: col.R, g: col.G, b: col.B, a: col.A };

    var tween = new TWEEN.Tween(pos);
    paletteTweens.push(tween);
    tween.to({ r: col2.R, g: col2.G, b: col2.B, a: col2.A  }, t*1000);
    tween.delay(d*1000);
    tween.start();

    tween.onUpdate(function() {
        col.R = this.r;
        col.G = this.g;
        col.B = this.b;
        col.A = this.a;
        if (name) {
            setCSSColor(col,name,bg);
        }
    });

    tween.easing( TWEEN.Easing.Cubic.InOut );
}


function clearPaletteTweens() {
    for (var h=0; h<paletteTweens.length; h++) {
        paletteTweens[h].stop();
    }
    paletteTweens = [];
}




//-------------------------------------------------------------------------------------------
//  LOOP
//-------------------------------------------------------------------------------------------


function draw() {
    update();
    requestAnimationFrame(draw);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------


function update() {
    if (TWEEN) {
        TWEEN.update();
    }
}