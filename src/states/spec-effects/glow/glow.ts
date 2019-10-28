export class GlowFilter extends Phaser.Filter {

    /*private _color: number;
    private _textureWidth: number = 350;
    private _textureHeight: number = 350;
    private _distance: number = 5;
    private _outerStrength: number = 2;
    private _innerStrength: number = 1;
    private _quality: number = 1;*/

    constructor(game: Phaser.Game, color: number = 0xffffff, textureWidth: number = 350, textureHeight: number = 350, distance: number = 5, outerStrength: number = 2, innerStrength: number = 1, quality: number = 1) {

        quality = Math.pow(quality, 1 / 3);
        distance *= quality;
        textureWidth *= quality;
        textureHeight *= quality;

        let uniforms = {
            distance: {type: '1f', value: distance},
            outerStrength: {type: '1f', value: null},
            innerStrength: {type: '1f', value: null},
            glowColor: {type: '4f', value: null},
            pixelWidth: {type: '1f', value: null},
            pixelHeight: {type: '1f', value: null},
        };

        let fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'uniform sampler2D texture;',
            'uniform float distance;',
            'uniform float outerStrength;',
            'uniform float innerStrength;',
            'uniform vec4 glowColor;',
            'uniform float pixelWidth;',
            'uniform float pixelHeight;',
            'vec2 px = vec2(pixelWidth, pixelHeight);',
            'void main(void) {',
            '    const float PI = 3.14159265358979323846264;',
            '    vec4 ownColor = texture2D(texture, vTextureCoord);',
            '    vec4 curColor;',
            '    float totalAlpha = 0.;',
            '    float maxTotalAlpha = 0.;',
            '    float cosAngle;',
            '    float sinAngle;',
            '    for (float angle = 0.; angle <= PI * 2.; angle += ' + (1 / quality / distance).toFixed(7) + ') {',
            '       cosAngle = cos(angle);',
            '       sinAngle = sin(angle);',
            '       for (float curDistance = 1.; curDistance <= ' + distance.toFixed(7) + '; curDistance++) {',
            '           curColor = texture2D(texture, vec2(vTextureCoord.x + cosAngle * curDistance * px.x, vTextureCoord.y + sinAngle * curDistance * px.y));',
            '           totalAlpha += (distance - curDistance) * curColor.a;',
            '           maxTotalAlpha += (distance - curDistance);',
            '       }',
            '    }',
            '    maxTotalAlpha = max(maxTotalAlpha, 0.0001);',
            '    ownColor.a = max(ownColor.a, 0.0001);',
            '    ownColor.rgb = ownColor.rgb / ownColor.a;',
            '    float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);',
            '    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;',
            '    float resultAlpha = (ownColor.a + outerGlowAlpha);',
            '    gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);',
            '}'
        ];

        super(game, uniforms, fragmentSrc);

        this.quality = quality;
        this.color = color;
        this.outerStrength = outerStrength;
        this.innerStrength = innerStrength;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
    }

    set color(value: number) {
        let r = ((value & 0xFF0000) >> 16) / 255,
            g = ((value & 0x00FF00) >> 8) / 255,
            b = (value & 0x0000FF) / 255;
        this.uniforms.glowColor.value = {x: r, y: g, z: b, w: 1};
        this.dirty = true;
    }

    set textureWidth(value: number) {
        this.uniforms.pixelWidth.value = 1 / value;
        this.dirty = true;
    }

    set textureHeight(value: number) {
        this.uniforms.pixelHeight.value = 1 / value;
        this.dirty = true;
    }

    set distance(value: number) {
        this.uniforms.distance.value = value;
        this.dirty = true;
    }

    set outerStrength(value: number) {
        this.uniforms.outerStrength.value = value;
        this.dirty = true;
    }

    set innerStrength(value: number) {
        this.uniforms.innerStrength.value = value;
        this.dirty = true;
    }

    set quality(value: number) {
        // this._quality = value;
    }
}

/*
Object.defineProperty(GlowFilter.prototype, 'color', {
    set: function(value) {
        let r = ((value & 0xFF0000) >> 16) / 255,
            g = ((value & 0x00FF00) >> 8) / 255,
            b = (value & 0x0000FF) / 255;
        this.uniforms.glowColor.value = {x: r, y: g, z: b, w: 1};
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'distance', {
    set: function (value) {
        this.uniforms.distance.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'outerStrength', {
    set: function (value) {
        this.uniforms.outerStrength.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'innerStrength', {
    set: function (value) {
        this.uniforms.innerStrength.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'textureWidth', {
    set: function(value) {
        this.uniforms.pixelWidth.value = 1 / value;
        this.dirty = true;
    }
});

Object.defineProperty(GlowFilter.prototype, 'textureHeight', {
    set: function(value) {
        this.uniforms.pixelHeight.value = 1 / value;
        this.dirty = true;
    }
});*/
