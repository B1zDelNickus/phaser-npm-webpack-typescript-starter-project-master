import {GameConfig} from '../../../config/game.config';
import {IFirework} from './i.firework';
import {TweenUtils} from '../../../utils/tween.utils';
import {isArray} from 'util';

export class SimpleFirework implements IFirework {

    private game: Phaser.Game = null;

    private container: Phaser.Group = null;
    private asset: string;
    private frames: any|any[];
    private sprites: Phaser.Sprite[] = [];

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(asset: string, frames?: any|any[]): void {
        this.asset = asset;
        this.frames = frames;
        this.container = this.game.add.group();
    }

    start(): void {
        TweenUtils.delayedCall(this.game.rnd.between(500, 2500), this.spawnFire, this);
    }

    spawnFire() {
        const sp = this.game.add.sprite(this.game.rnd.between(200, 760), this.game.rnd.between(200, 520),
            this.asset, isArray(this.frames) ?
                this.frames[this.game.rnd.between(0, this.frames.length - 1)] : this.frames, this.container);
        sp.anchor.setTo(.5);
        sp.alpha = 0;
        sp.scale.setTo(0);
        this.sprites.push(sp);
        TweenUtils.fadeAndScale(sp, 1, 1, Phaser.Timer.SECOND * 1, 0, () => {
            TweenUtils.fadeOut(sp, Phaser.Timer.SECOND * .25);
        }, this);
        TweenUtils.delayedCall(this.game.rnd.between(500, 2500), this.spawnFire, this);
    }

    dispose(): void {
        for (let sp of this.sprites) {
            this.game.tweens.removeFrom(sp);
            sp.destroy(true);
        }
        this.container.destroy(true);
    }

}