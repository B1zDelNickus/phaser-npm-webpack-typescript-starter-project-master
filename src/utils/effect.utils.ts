import {LaserType} from '../states/spec-effects/laser/enum.laser';
import {ILaser} from '../states/spec-effects/laser/i.laser';
import {DoubleLaser} from '../states/spec-effects/laser/double.laser';
import {FilterUtils} from './filter.utils';
import {GameConfig} from '../config/game.config';
import {TripleLaser} from '../states/spec-effects/laser/triple.laser';
import {PentaLaser} from '../states/spec-effects/laser/penta.laser';

export class EffectUtils {

    public static makeLaser(type: LaserType): ILaser {
        let laser: ILaser;
        switch (type) {
            case LaserType.DOUBLE_LASER: {
                laser = new DoubleLaser();
                break;
            }
            case LaserType.TRIPLE_LASER: {
                laser = new TripleLaser();
                break;
            }
            case LaserType.PENTA_LASER: {
                laser = new PentaLaser();
                break;
            }
        }
        return laser;
    }

    public static makeGlowAnimation(color: number = 0xffffff, period: number = 1000, loop: boolean = true, repeat: number = 99999, dist: number = 350): Phaser.Filter {
        const f = FilterUtils.makeFilter(color, dist, dist);
        (f as any).outerStrength = 0;
        (f as any).innerStrength = 0;
        const game = GameConfig.GAME;
        game.add.tween(f).to({ outerStrength: 3, innerStrength: 2 },
            period, Phaser.Easing.Linear.None, true, 0, repeat)
            .yoyo(loop);
        return f;
    }

    public static makeLightGlowAnimation(color: number = 0xffffff, period: number = 1000, loop: boolean = true, repeat: number = 99999, dist: number = 350): Phaser.Filter {
        const f = FilterUtils.makeFilter(color, dist, dist);
        (f as any).outerStrength = 0;
        (f as any).innerStrength = 0;
        const game = GameConfig.GAME;
        game.add.tween(f).to({ outerStrength: 2, innerStrength: 1 },
            period, Phaser.Easing.Linear.None, true, 0, repeat)
            .yoyo(loop);
        return f;
    }

    public static makeVeryLightGlowAnimation(color: number = 0xffffff, period: number = 1000, loop: boolean = true, repeat: number = 99999, dist: number = 350): Phaser.Filter {
        const f = FilterUtils.makeFilter(color, dist, dist);
        (f as any).outerStrength = 0;
        (f as any).innerStrength = 0;
        const game = GameConfig.GAME;
        game.add.tween(f).to({ outerStrength: 1, innerStrength: .5 },
            period, Phaser.Easing.Linear.None, true, 0, repeat).yoyo(loop);
        return f;
    }

    public static makeScaleAnimation(target: any, scale: number = 1.05, period: number = 1000, loop: boolean = true, dist: number = 350): Phaser.Tween {
        const game = GameConfig.GAME;
        return game.add.tween(target.scale).to({ x: scale, y: scale },
            period, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(loop);
    }

    public static makeShootAnimation(target: any, period: number = 300): Phaser.Tween {
        const game = GameConfig.GAME;
        if (target.alpha !== 0) target.alpha = 0;
        return game.add.tween(target).to({ alpha: 1 },
            period, Phaser.Easing.Linear.None, true, 0, 0)
            .yoyo(true);
    }

    public static makeAlphaAnimation(target: any, alpha: number = 1, period: number = 500, loop: boolean = true): Phaser.Tween {
        const game = GameConfig.GAME;
        return game.add.tween(target).to({ alpha: alpha },
            period, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(loop);
    }

    public static makeMoveAnimation(target: any, x: number, y: number, period: number = 500, loop: boolean = true): Phaser.Tween {
        const game = GameConfig.GAME;
        return game.add.tween(target).to({ x: x, y: y },
            period, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(loop);
    }

    public static makeLightRotateAnimation(sprite: any, duration: number = 400, angle: number = 10): void {
        const game = GameConfig.GAME;
        const _tween1 = game.add.tween(sprite).to({ angle: angle }, duration, Phaser.Easing.Linear.None, true);
        const _tween2 = game.add.tween(sprite).to({ angle: -angle }, duration * 2, Phaser.Easing.Linear.None, false);
        const _tween3 = game.add.tween(sprite).to({ angle: 0 }, duration, Phaser.Easing.Linear.None, false);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween1);
    }

    public static makeRotateAnimation(sprite: any, duration: number = 400, angle: number = 10, times: number = 4): void {
        const game = GameConfig.GAME;
        const _tween1 = game.add.tween(sprite).to({ angle: angle }, duration, Phaser.Easing.Linear.None, true, 0, times, true);
    }

    public static makeNeonAnimation(sprite: any, time: number = 250): void {
        const game = GameConfig.GAME;
        const _tween1 = game.add.tween(sprite).to({ alpha: .25 }, time * 3, Phaser.Easing.Linear.None, true);
        const _tween2 = game.add.tween(sprite).to({ alpha: 1 }, time * 3, Phaser.Easing.Bounce.InOut, false);
        const _tween3 = game.add.tween(sprite).to({ alpha: .05 }, time, Phaser.Easing.Linear.None, false, 500);
        const _tween4 = game.add.tween(sprite).to({ alpha: 1 }, time * 5, Phaser.Easing.Bounce.InOut, false);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween4);
        _tween4.chain(_tween1);
    }
}