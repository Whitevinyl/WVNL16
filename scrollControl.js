

var posts = [];
var lastPos = 0;
var scrollEnabled = true;
var scrollTweens = [];

function scrollInit() {
    posts = document.getElementsByClassName('project');
    document.addEventListener('scroll',function(e){scrollCheck(e);},false);

    lastPos = document.body.scrollTop;
    scrollCheck();
}


function scrollCheck(e) {

    var screen = document.body.scrollTop;
    var height, threshold, top, h;


    // DOWN //
    if (screen>lastPos) {
        if (scrollEnabled) {

            height = window.innerHeight;
            threshold = document.body.scrollTop + Math.min(680,height);

            for (h=0; h<posts.length; h++) {
                top = posts[h].offsetTop;

                if (top > screen && top < threshold) {
                    scrollEnabled = false;
                    scrollTo(screen,top,1);
                    changePalette(paletteLight,1.1,0);
                }
            }

        }
    }


    // UP //
    if (screen<lastPos) {

        clearScrollTweens();

        if (scrollEnabled) {
            height = window.innerHeight;
            threshold = document.body.scrollTop + height;

            for (h = 0; h < posts.length; h++) {
                top = posts[h].offsetTop;

                if (top > (screen + (height / 2)) && top < threshold) {
                    changePalette(paletteDark, 0.6, 0);
                }
            }
        }
    }


    // stop scroll while tweening //
    if (!scrollEnabled && e) {
        e.preventDefault();
    }


    lastPos = screen;
}

function scrolling(y) {
    document.body.scrollTop = y;
    lastPos = document.body.scrollTop;
}

function scrollComplete() {
    scrollEnabled = true;
}


function scrollTo(val,to,t) {
    t = t || 1;

    var tween = new TWEEN.Tween({y: val });
    scrollTweens.push(tween);
    tween.to({ y: to  }, t*1000);
    tween.start();

    var callback = scrolling;
    tween.onUpdate(function() {callback(this.y);});
    tween.onComplete(scrollComplete);

    tween.easing( TWEEN.Easing.Exponential.Out );
}


function clearScrollTweens() {
    for (var h=0; h<scrollTweens.length; h++) {
        scrollTweens[h].stop();
    }
    scrollTweens = [];
    scrollEnabled = true;
}