import {GameConfig} from '../../../config/game.config';
import {DecorBackground} from './decor.background';
import {TweenUtils} from '../../../utils/tween.utils';
import {isUndefined} from 'util';

export class DecorLayer {

    private owner: DecorBackground = null;
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private sprites: Phaser.Sprite[] = [];
    private current: number = -1;
    private emptySlotModifier: number = 0;

    constructor(owner: DecorBackground, container: Phaser.Group, allowEmpty: boolean = true) {
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.container = container;
        this.emptySlotModifier = allowEmpty ? 0 : 1;
        // this.current = startFromFirst ? 0 : -1;
    }

    item(x: number, y: number, asset: string, frame?: any): DecorLayer {
        this.sprites.push(this.game.add.sprite(x, y, asset, frame, this.container));
        return this;
    }

    next(): void {
        if (!isUndefined(this.sprites[this.current])) { // (this.current !== this.sprites.length - this.emptySlotModifier) {
            this.game.tweens.removeFrom(this.sprites[this.current]);
            TweenUtils.fadeOut(this.sprites[this.current]);
        }

        this.current++;
        if (this.current > this.sprites.length - this.emptySlotModifier) this.current = 0;

        if (!isUndefined(this.sprites[this.current])) {
            TweenUtils.fadeIn(this.sprites[this.current]);
        }
    }

    getCurrent(): number {
        return this.current;
    }

    build(): DecorBackground {
        for (let sp of this.sprites) {
            sp.alpha = 0;
        }
        if (this.emptySlotModifier === 1) {
            this.next();
        }
        /*if (this.emptySlotModifier === 1) {
            this.next();
        }
        else {
            this.current = this.sprites.length;
        }*/
        return this.owner;
    }

    dispose(): void {
        for (let sp of this.sprites) {
            sp.destroy(true);
        }
    }
}