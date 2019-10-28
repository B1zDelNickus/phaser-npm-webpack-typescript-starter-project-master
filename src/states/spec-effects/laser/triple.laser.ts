import {ILaser} from './i.laser';
import {GameConfig} from '../../../config/game.config';

export class TripleLaser implements ILaser {

    private game: Phaser.Game = null;

    private container: Phaser.Group = null;
    private laser1: Phaser.Sprite = null;
    private laser2: Phaser.Sprite = null;
    private laser3: Phaser.Sprite = null;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(asset: string, frame?: string): void {
        this.container = this.game.add.group();
        this.container.add(
            this.laser1 = this.game.add.sprite(476, -8, asset, frame)
        );
        this.container.add(
            this.laser2 = this.game.add.sprite(159, -6, asset, frame)
        );
        this.container.add(
            this.laser3 = this.game.add.sprite(829, -7, asset, frame)
        );

        this.laser1.anchor.setTo(.5, 0);
        this.laser2.anchor.setTo(.5, 0);
        this.laser3.anchor.setTo(.5, 0);

        this.laser1.angle = -22;
        this.laser2.angle = -18;
        this.laser3.angle = 17;
    }

    getContainer(): Phaser.Group {
        return this.container;
    }

    start(): void {
        this.game.add.tween(this.laser1).to({ angle: 27 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser2).to({ angle: 6 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser3).to({ angle: -7 }, Phaser.Timer.SECOND * 1.25, Phaser.Easing.Linear.None, true, 400, 99999)
            .yoyo(true);
    }

    dispose(): void {
        this.game.tweens.removeFrom(this.laser1);
        this.game.tweens.removeFrom(this.laser2);
        this.game.tweens.removeFrom(this.laser3);
        this.laser1.destroy(true);
        this.laser2.destroy(true);
        this.laser3.destroy(true);
        this.container.destroy(true);
    }

}