import {SaverAnimations} from './enum.saver';
import {GameConfig} from '../../config/game.config';

export class SaverAnimation {
    private _anim: SaverAnimation = null;
    private _list: Array<ISaverAnimationStep> = [];

    constructor() {
        this._anim = this;
    }

    public add(
        target: any,
        type: SaverAnimations, params: {},
        duration: number = Phaser.Timer.SECOND * 1,
        delay: number = 0,
        easing: Function = Phaser.Easing.Linear.None): SaverAnimation {

        this._list.push({
            target: target,
            type: type,
            params: params,
            duration: duration,
            delay: delay,
            easing: easing
        });
        return this._anim;
    }

    public animate(callback?: Function): void {
        const game = GameConfig.GAME;
        let tw: Phaser.Tween;
        for (let step of this._list) {
            tw = game.add.tween(step.target).to( step.params, step.duration, step.easing, true, step.delay);
        }
        if (callback && tw)
            tw.onComplete.addOnce(callback);
    }
}

interface ISaverAnimationStep {
    target: any;
    type: SaverAnimations;
    params: {};
    duration: number;
    delay: number;
    easing: Function;
}