import {
    saveAs
} from 'file-saver';

require('./text-to-arc.js');
require('./canvas-toBlob.js');

export default class Wheel {

    defaultConfig = {
        radius: 200,
        levels: 10,
        segments: [{
                color: "#97CC64",
                text: "Section 1",
                level: 10
            },
            {
                color: "#4569BC",
                text: "Section 2",
                level: 10
            },
            {
                color: "#A955B8",
                text: "Section 3",
                level: 10
            }
        ]
    };

    constructor(canvas, config) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw "First argument should be of type HTMLCanvasElement";
         }

        this.canvas = canvas;

        if (config) {
            this.config = config;
        } else {
            this.config = this.defaultConfig;
        }

        this.step = this.config.radius / this.config.levels;
        this.degreesPerSegment = 360 / this.config.segments.length;
        this.radiansPerSegment = this.degreesPerSegment / 180 * Math.PI;
        this.data = this.config.segments.map(s => ({
            level: s.level
        }));

        this.canvas.onmousedown = event => this.setLevel(canvas, event);
    }

    draw = function () {
        const ctx = this.canvas.getContext('2d');

        this.drawSegments(ctx, this.config.segments, this.radiansPerSegment, this.step);
        this.drawCircles(ctx, this.config.levels, this.step, this.config.segments.length);
        this.drawTexts(ctx, this.config.segments, this.radiansPerSegment, this.config.radius);
    };

    download = function () {
        this.canvas.toBlob(function (blob) {
            saveAs(blob, "wheel-of-balance.jpg");
        }, "image/jpeg");
    };

    clear = function () {
        this.data = this.config.segments.map(s => ({
            level: s.level || this.config.levels
        }));

        this.redraw();
    };

    redraw() {
        this.clean();
        this.draw();
    };

    clean() {
        const context = this.canvas.getContext('2d');

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.closePath();
    };

    drawSegments(ctx, segments, radiansPerSegment, step) {

        for (var i = 0; i < segments.length; i++) {
            const startAngle = i * radiansPerSegment;
            const endAngle = startAngle + radiansPerSegment;

            const segment = segments[i];
            const dataItem = this.data[i];

            this.drawSegment(ctx, step * dataItem.level, startAngle, endAngle, segment.color);
        }
    };

    drawTexts(ctx, segments, radiansPerSegment, radius) {
        for (var i = 0; i < segments.length; i++) {
            const startAngle = i * radiansPerSegment;
            const endAngle = startAngle + radiansPerSegment;
            const center = (startAngle + endAngle) / 2;

            const segment = segments[i];

            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.fillStyle = segment.color;
            ctx.fillCircleText(segment.text, 250, 250, radius + 10, center, null);
            ctx.fill();
            ctx.closePath();
        }
    };

    drawSegment(ctx, radius, startAngle, endAngle, color) {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, radius, startAngle, endAngle, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };

    drawCircles(ctx, levels, step, segmentsCount) {
        let currentR = step;

        for (let i = 0; i < levels; i++) {

            ctx.beginPath();
            ctx.arc(250, 250, currentR, 0, 2 * Math.PI);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.closePath();

            currentR += step;
        }

        for (let i = 1; i <= segmentsCount; i++) {
            const radians = i * (360 / segmentsCount) / 180 * Math.PI;
            const endX = 250 + levels * step * Math.cos(radians);
            const endY = 250 - levels * step * Math.sin(radians);

            ctx.beginPath();
            ctx.moveTo(250, 250)
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.closePath();
        }
    };

    setLevel(canvas, e) {
        const {
            dx,
            dy
        } = this.calculateLineEnd(canvas, e);

        const degrees = this.calculateLineAngel(dx, dy);
        const segmentId = Math.floor(degrees / this.degreesPerSegment);
        let dataItem = this.data[segmentId];

        const pointRadius = Math.sqrt(dx * dx + dy * dy);
        const length = Math.min(pointRadius, this.config.radius);
        dataItem.level = length / this.step;

        this.redraw();
    };

    calculateLineEnd(canvas, e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        return {
            dx: x - 250,
            dy: y - 250,
        };
    };

    calculateLineAngel(dx, dy) {
        let radians = Math.atan(dy / dx); // wrong, in [-1/2 pi, 1/2 pi]

        if (1 / dx < 0) radians += Math.PI; // fixed, in [-1/2 pi, 3/2 pi]
        if (1 / radians < 0) radians += 2 * Math.PI; // fixed, in [+0, 2 pi]

        return radians * 180 / Math.PI;
    };

    hexToRgbA(hex, opacity) {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
        }
        throw new Error('Bad Hex');
    };
}

window.Wheel = Wheel;