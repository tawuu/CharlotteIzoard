const { CanvasRenderingContext2D } = require("canvas");


module.exports = class CanvasUtils {
    static start() {
        CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, width, height, radius, fill, stroke) {
            if (typeof stroke === 'undefined') {
              stroke = true;
            }
            if (typeof radius === 'undefined') {
              radius = 5;
            }
            if (typeof radius === 'number') {
              radius = {tl: radius, tr: radius, br: radius, bl: radius};
            } else {
              var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
              for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
              }
            }
            this.beginPath();
            this.moveTo(x + radius.tl, y);
            this.lineTo(x + width - radius.tr, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
            this.lineTo(x + width, y + height - radius.br);
            this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
            this.lineTo(x + radius.bl, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
            this.lineTo(x, y + radius.tl);
            this.quadraticCurveTo(x, y, x + radius.tl, y);
            this.closePath();
            if (fill) {
              this.fill();
            }
            if (stroke) {
              this.stroke();
            }
    
        }    
        CanvasRenderingContext2D.prototype.blur = function (blur) {
            const delta = 5
            const alphaLeft = 1 / (2 * Math.PI * delta * delta)
            const step = blur < 3 ? 1 : 2
            let sum = 0
            for (let y = -blur; y <= blur; y += step) {
              for (let x = -blur; x <= blur; x += step) {
                let weight = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta))
                sum += weight
              }
            }
            for (let y = -blur; y <= blur; y += step) {
              for (let x = -blur; x <= blur; x += step) {
                this.globalAlpha = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur
                this.drawImage(this.canvas, x, y)
              }
            }
            this.globalAlpha = 1
        }
        CanvasRenderingContext2D.prototype.drawBlurredImage = function (image, blur, imageX, imageY, w = image.width, h = image.height) {
            const canvas = createCanvas(w, h)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, w, h)
            ctx.blur(blur)
            this.drawImage(canvas, imageX, imageY, w, h)
        }
        CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
          stroke = true;
        }
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        this.beginPath();
        this.moveTo(x + radius.tl, y);
        this.lineTo(x + width - radius.tr, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.lineTo(x + width, y + height - radius.br);
        this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.lineTo(x + radius.bl, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.lineTo(x, y + radius.tl);
        this.quadraticCurveTo(x, y, x + radius.tl, y);
        this.closePath();
        if (fill) {
          this.fill();
        }
        if (stroke) {
          this.stroke();
        }

    }    
      
    }
}