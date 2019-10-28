import {GameConfig} from '../../config/game.config';
import {isArray} from 'util';

export class Animation {

    private _anim: Animation = null;
    private _list: Array<IAnimationStep> = [];

    constructor() {
        this._anim = this;
    }

    public add(
        target: any,
        params: {},
        duration?: number,
        delay?: number,
        easing?: Function,
        onCompleteAnimation?: Animation,
        onCompleteCallback?: Function,
        onCompleteCallbackContext?: any): Animation {

        if (duration == null)
            duration = Phaser.Timer.SECOND * 1;
        if (delay == null)
            delay = 0;
        if (easing == null)
            easing = Phaser.Easing.Linear.None;

        this._list.push({
            target: target,
            params: params,
            duration: duration,
            delay: delay,
            easing: easing,
            onCompleteAnimation: onCompleteAnimation,
            onCompleteCallback: onCompleteCallback,
            onCompleteCallbackContext: onCompleteCallbackContext
        });
        return this._anim;
    }

    public animate(callback?: Function|Function[], context?: any): number {
        const game = GameConfig.GAME;
        let tw: Phaser.Tween;
        let totalDuration: number = 0;
        // let additionalDuration: number = 0;
        // let tempDuration: number = 0;
        for (let step of this._list) {
            tw = game.add.tween(step.target).to( step.params, step.duration, step.easing, true, step.delay);
            tw.onComplete.addOnce(() => {
                if (step.onCompleteAnimation != null) {
                    // tempDuration =
                        step.onCompleteAnimation.animate();
                    /*if (additionalDuration < tempDuration)
                        additionalDuration = tempDuration;
                    console.log(`Child total duration: ${additionalDuration}`);*/
                }
                if (step.onCompleteCallback != null) {
                    step.onCompleteCallback.call(null);
                }
            }, step.onCompleteCallbackContext);
            /*if (totalDuration < (step.duration + step.delay + additionalDuration))
                totalDuration = step.duration + step.delay + additionalDuration;*/
            if (totalDuration < (step.duration + step.delay))
                totalDuration = step.duration + step.delay;
        }

        if (callback) {
            if (isArray(callback)) {
                for (let call of callback) {
                    game.time.events.add(totalDuration, call, context);
                }
            } else {
                game.time.events.add(totalDuration, callback, context);
            }
        }

        // tw.onComplete.addOnce(callback);
        // console.log(`Parent total duration: ${totalDuration}`);
        return totalDuration;
    }

    public kill(): void {
        const game = GameConfig.GAME;
        for (let step of this._list) {
            game.tweens.removeFrom(step.target.scale);
            game.tweens.removeFrom(step.target);
            if (step.onCompleteAnimation != null) {
                step.onCompleteAnimation.kill();
            }
        }
    }
}

interface IAnimationStep {
    target: any;
    params: {};
    duration: number;
    delay: number;
    easing: Function;
    onCompleteAnimation: Animation;
    onCompleteCallback: Function;
    onCompleteCallbackContext: any;
}