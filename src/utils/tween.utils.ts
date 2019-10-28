import {GameConfig} from '../config/game.config';
import {isNull, isUndefined} from 'util';

export class TweenUtils {

    public static kill(target: any) {
        const game = GameConfig.GAME;
        game.tweens.removeFrom(target);
    }

    public static frameChangeAnimation(target: any, asset: string, frame1: any, frame2: any) {

    }

    public static delayedCall(delay: number, callback: Function, context?: any, args?: any) {
        const game = GameConfig.GAME;
        game.time.events.add(delay, callback, context, args);
    }

    public static callEvery(period: number, callback: Function, context?: any, args?: any) {
        const game = GameConfig.GAME;
        game.time.events.loop(period, callback, context, args);
    }

    public static rotate(
        target: any, amount: number, duration: number = 1000, delay: number = 0, repeat: number = 0, loop: boolean = false,
        easing: Function = Phaser.Easing.Linear.None, callBack?: Function, context?: any): Phaser.Tween {

        if (repeat === -1) repeat = 99999;
        const game = GameConfig.GAME;
        return game.add.tween(target).to({ angle: amount }, duration, easing, true, delay, repeat, loop);
    }

    public static fadeOut(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static fadeIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static fade(target: any, alpha: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ alpha: alpha }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static scale(target: any, scale: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target.scale).to({ x: scale, y: scale }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static scaleIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target.scale).to({ x: 1, y: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static moveOut(target: any, x: number, y: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Circular.In, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static moveIn(target: any, x: number, y: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Circular.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static moveInOut(target: any, x: number, y: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Circular.InOut, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static move(target: any, x: number, y: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static moveAndRotate(target: any, x: number, y: number, angle: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any, disableMouse: boolean = true): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (disableMouse && target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x, y: y, angle: angle }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static bounceIn(target: any, x: number, y: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Bounce.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static scaleOut(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target.scale).to({ x: 0, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static fadeAndScaleIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: 1, y: 1 }, duration * 2, Phaser.Easing.Elastic.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static fadeAndScale(target: any, scale: number, alpha: number, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ alpha: alpha }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: scale, y: scale }, duration * 2, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static blow(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;

        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay + duration - 50);
        const tw2 = game.add.tween(target.scale).to({ x: 3, y: 3 }, duration * 2, Phaser.Easing.Elastic.In, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static moveAndScaleIn(target: any, x: number, y: number, scale: number = 1, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: scale, y: scale }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static moveAndScaleOut(target: any, x: number, y: number, scale: number = 0, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ x: x, y: y }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: scale, y: scale }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static fadeAndScaleOut(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: 0, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static customFadeAndScaleIn(target: any, alpha: number = 1, scale: number = 1, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }
        const tw1 = game.add.tween(target).to({ alpha: alpha }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: scale, y: scale }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static slideIn(target: any, x: number, duration: number = 1000, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x }, duration, Phaser.Easing.Circular.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static slideOut(target: any, x: number, duration: number = 1000, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ x: x }, duration, Phaser.Easing.Circular.In, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static downIn(target: any, y: number, duration: number = 1000, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ y: y }, duration, Phaser.Easing.Circular.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static downOut(target: any, y: number, duration: number = 1000, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tween = game.add.tween(target).to({ y: y }, duration, Phaser.Easing.Circular.In, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static moveAndScaleAndFade(target: any, x: number, y: number, scale: number = 1, alpha: number = 1, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        this.kill(target);
        if (target.inputEnabled) {
            target.inputEnabled = false;
            TweenUtils.delayedCall(duration + delay + 5, () => {
                target.inputEnabled = true;
            }, this);
        }

        const tw1 = game.add.tween(target).to({ x: x, y: y, alpha: alpha }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: scale, y: scale }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }
}