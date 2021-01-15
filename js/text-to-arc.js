(function () {
    const FILL = 0;        // const to indicate filltext render
    const STROKE = 1;
    var renderType = FILL; // used internal to set fill or stroke text
    const multiplyCurrentTransform = false; // if true Use current transform when rendering
    // if false use absolute coordinates which is a little quicker
    // after render the currentTransform is restored to default transform



    // measure circle text
    // ctx: canvas context
    // text: string of text to measure
    // r: radius in pixels
    //
    // returns the size metrics of the text
    //
    // width: Pixel width of text
    // angularWidth : angular width of text in radians
    // pixelAngularSize : angular width of a pixel in radians
    var measure = function (ctx, text, radius) {
        var textWidth = ctx.measureText(text).width; // get the width of all the text
        return {
            width: textWidth,
            angularWidth: (1 / radius) * textWidth,
            pixelAngularSize: 1 / radius
        };
    }

    // displays text along a circle
    // ctx: canvas context
    // text: string of text to measure
    // x,y: position of circle center
    // r: radius of circle in pixels
    // start: angle in radians to start. 
    // [end]: optional. If included text align is ignored and the text is 
    //        scaled to fit between start and end;
    // [forward]: optional default true. if true text direction is forwards, if false  direction is backward
    var circleText = function (ctx, text, x, y, radius, start, end, forward) {
        var i, textWidth, pA, pAS, a, aw, wScale, aligned, dir, fontSize;
        if (text.trim() === "" || ctx.globalAlpha === 0) { // dont render empty string or transparent
            return;
        }
        if (isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(start) || (end !== undefined && end !== null && isNaN(end))) { // 
            throw TypeError("circle text arguments requires a number for x,y, radius, start, and end.")
        }
        aligned = ctx.textAlign;        // save the current textAlign so that it can be restored at end
        dir = forward ? 1 : forward === false ? -1 : 1;  // set dir if not true or false set forward as true  
        pAS = 1 / radius;               // get the angular size of a pixel in radians
        textWidth = ctx.measureText(text).width; // get the width of all the text
        if (end !== undefined && end !== null) { // if end is supplied then fit text between start and end
            pA = ((end - start) / textWidth) * dir;
            wScale = (pA / pAS) * dir;
        } else {                 // if no end is supplied correct start and end for alignment
            // if forward is not given then swap top of circle text to read the correct direction
            if (forward === null || forward === undefined) {
                if (((start % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) > Math.PI) {
                    dir = -1;
                }
            }
            pA = -pAS * dir;
            wScale = -1 * dir;
            switch (aligned) {
                case "center":       // if centered move around half width
                    start -= (pA * textWidth) / 2;
                    end = start + pA * textWidth;
                    break;
                case "right":// intentionally falls through to case "end"
                case "end":
                    end = start;
                    start -= pA * textWidth;
                    break;
                case "left":  // intentionally falls through to case "start"
                case "start":
                    end = start + pA * textWidth;
            }
        }

        ctx.textAlign = "center";                     // align for rendering
        a = start;                                    // set the start angle
        for (var i = 0; i < text.length; i += 1) {    // for each character
            aw = ctx.measureText(text[i]).width * pA; // get the angular width of the text
            var xDx = Math.cos(a + aw / 2);           // get the yAxies vector from the center x,y out
            var xDy = Math.sin(a + aw / 2);
            if (multiplyCurrentTransform) { // transform multiplying current transform
                ctx.save();
                if (xDy < 0) { // is the text upside down. If it is flip it
                    ctx.transform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
                } else {
                    ctx.transform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
                }
            } else {
                if (xDy < 0) { // is the text upside down. If it is flip it
                    ctx.setTransform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
                } else {
                    ctx.setTransform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
                }
            }
            if (renderType === FILL) {
                ctx.fillText(text[i], 0, 0);    // render the character
            } else {
                ctx.strokeText(text[i], 0, 0);  // render the character
            }
            if (multiplyCurrentTransform) {  // restore current transform
                ctx.restore();
            }
            a += aw;                     // step to the next angle
        }
        // all done clean up.
        if (!multiplyCurrentTransform) {
            ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
        }
        ctx.textAlign = aligned;            // restore the text alignment
    }
    // define fill text
    var fillCircleText = function (text, x, y, radius, start, end, forward) {
        renderType = FILL;
        circleText(this, text, x, y, radius, start, end, forward);
    }
    // define stroke text
    var strokeCircleText = function (text, x, y, radius, start, end, forward) {
        renderType = STROKE;
        circleText(this, text, x, y, radius, start, end, forward);
    }
    // define measure text
    var measureCircleTextExt = function (text, radius) {
        return measure(this, text, radius);
    }
    // set the prototypes
    CanvasRenderingContext2D.prototype.fillCircleText = fillCircleText;
    CanvasRenderingContext2D.prototype.strokeCircleText = strokeCircleText;
    CanvasRenderingContext2D.prototype.measureCircleText = measureCircleTextExt;
})();