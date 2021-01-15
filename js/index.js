import {
    saveAs
} from 'file-saver';

require('./text-to-arc.js');

export default class Wheel {

    defaultConfig = {
        radius: 200,
        levels: 10,
        fontSize: 15,
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

            if (!this.config.fontSize) {
                this.config.fontSize = this.defaultConfig.fontSize;
            }

            if (!this.config.radius) {
                this.config.radius = this.defaultConfig.radius;
            }

            if (!this.config.levels) {
                this.config.levels = this.defaultConfig.levels;
            }
        } else {
            this.config = this.defaultConfig;
        }

        const width = canvas.width;
        const height = canvas.height;

        this.config.center = {
            x: width / 2,
            y: height / 2
        };

        const maxRadius = Math.min(width, height) / 2 - this.config.fontSize;
        this.config.radius = Math.min(this.config.radius, maxRadius);

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

        this.canvas.style.font = ctx.font;
        this.canvas.style.fontSize = this.config.fontSize + "px";
        ctx.font = this.canvas.style.font;
        ctx.textBaseline = "middle";

        this.drawSegments(ctx, this.config.center, this.config.segments, this.radiansPerSegment, this.step);
        this.drawCircles(ctx, this.config.center, this.config.levels, this.step, this.config.segments.length);
        this.drawTexts(ctx, this.config.center, this.config.segments, this.radiansPerSegment, this.config.radius, this.config.fontSize);
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

    drawSegments(ctx, center, segments, radiansPerSegment, step) {

        for (var i = 0; i < segments.length; i++) {
            const startAngle = i * radiansPerSegment;
            const endAngle = startAngle + radiansPerSegment;

            const segment = segments[i];
            const dataItem = this.data[i];

            this.drawSegment(ctx, center, step * dataItem.level, startAngle, endAngle, segment.color);
        }
    };

    drawTexts(ctx, center, segments, radiansPerSegment, radius, fontSize) {
        for (var i = 0; i < segments.length; i++) {

            const segment = segments[i];

            const startAngle = i * radiansPerSegment;
            const endAngle = startAngle + radiansPerSegment;
            let centerAngel = (startAngle + endAngle) / 2;

            const textAngularWidth = ctx.measureCircleText(segment.text, radius).angularWidth;
            if (centerAngel >= Math.PI) {
                centerAngel -= textAngularWidth / 2;
            } else {
                centerAngel += textAngularWidth / 2;
            }

            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.fillStyle = segment.color;
            ctx.fillCircleText(segment.text, center.x, center.y, radius + fontSize / 1.5, centerAngel);

            ctx.fill();
            ctx.closePath();
        }
    };

    drawSegment(ctx, center, radius, startAngle, endAngle, color) {
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.arc(center.x, center.y, radius, startAngle, endAngle, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };

    drawCircles(ctx, center, levels, step, segmentsCount) {

        for (let i = 1; i <= segmentsCount; i++) {
            const radians = i * (360 / segmentsCount) / 180 * Math.PI;
            const endX = center.x + levels * step * Math.cos(radians);
            const endY = center.y - levels * step * Math.sin(radians);

            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
        }

        let currentR = step;

        for (let i = 0; i < levels; i++) {

            ctx.beginPath();
            ctx.arc(center.x, center.y, currentR, 0, 2 * Math.PI);
            ctx.strokeStyle = "#808080";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();

            currentR += step;
        }
    };

    setLevel(canvas, e) {
        const {
            dx,
            dy
        } = this.calculateLineEnd(canvas, this.config.center, e);

        const degrees = this.calculateLineAngel(dx, dy);
        const segmentId = Math.floor(degrees / this.degreesPerSegment);
        let dataItem = this.data[segmentId];

        const pointRadius = Math.sqrt(dx * dx + dy * dy);
        const length = Math.min(pointRadius, this.config.radius);
        dataItem.level = length / this.step;

        this.redraw();
    };

    calculateLineEnd(canvas, center, e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        return {
            dx: x - center.x,
            dy: y - center.y,
        };
    };

    calculateLineAngel(dx, dy) {
        let radians = Math.atan(dy / dx); // wrong, in [-1/2 pi, 1/2 pi]

        if (1 / dx < 0) radians += Math.PI; // fixed, in [-1/2 pi, 3/2 pi]
        if (1 / radians < 0) radians += 2 * Math.PI; // fixed, in [+0, 2 pi]

        return radians * 180 / Math.PI;
    };
}

window.Wheel = Wheel;