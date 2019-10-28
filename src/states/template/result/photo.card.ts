import {GameConfig} from '../../../config/game.config';
import {isNull, isUndefined} from 'util';

export class Photo {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private mask: Phaser.Graphics = null;
    private frame: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private content: Phaser.Group = null;

    constructor(x: number, y: number) {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.container.position.setTo(x, y);
    }

    public addMask(x: number, y: number, w: number, h: number): Photo {
        this.mask = this.game.add.graphics(x, y, this.container);
        this.mask.beginFill(0);
        this.mask.drawRect(0, 0, w, h);
        if (this.content) this.content.mask = this.mask;
        if (this.bg) this.bg.mask = this.mask;
        return this;
    }

    public addFrame(x: number, y: number, asset: string, frame: any): Photo {
        this.frame = this.game.add.sprite(x, y, asset, frame, this.container);
        return this;
    }

    public addBg(x: number, y: number, scale: number = 1, angle: number = 1, asset: string, frame: any): Photo {
        this.bg = this.game.add.sprite(x, y, asset, frame, this.container);
        this.bg.position.setTo(x, y);
        this.bg.scale.setTo(scale);
        this.bg.angle = angle;
        return this;
    }

    public addContent(target: Phaser.Group, x: number, y: number, scale: number = 1, angle: number = 1, alpha: number = 1): Photo {
        this.container.add(target);
        target.position.setTo(x, y);
        target.scale.setTo(scale);
        target.angle = angle;
        target.alpha = alpha;
        this.content = target;
        return this;
    }

    setPosition(x: number, y: number): void {
        this.container.position.setTo(x, y);
    }

    setScale(val: number, val2?: number): void {
        if (isUndefined(val2) || isNull(val2))
            this.container.scale.setTo(val);
        else
            this.container.scale.setTo(val, val2);
    }

    setAlpha(val: number): void {
        this.container.alpha = val;
    }

    setAngle(val: number): void {
        this.container.angle = val;
    }

    public getBody(): Phaser.Group {
        return this.container;
    }

    public dispose() {
        this.container.destroy(true);
    }
}