import {ILaser} from './i.laser';
import {GameConfig} from '../../../config/game.config';

export class DoubleLaser implements ILaser {

    private game: Phaser.Game = null;

    private container: Phaser.Group = null;
    private laser1: Phaser.Sprite = null;
    private laser2: Phaser.Sprite = null;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(asset: string, frame?: string): void {
        this.container = this.game.add.group();
        this.container.add(
            this.laser1 = this.game.add.sprite(63, -50, asset, frame)
        );
        this.container.add(
            this.laser2 = this.game.add.sprite(861, -46, asset, frame)
        );

        this.laser1.anchor.setTo(.5, 0);
        this.laser2.anchor.setTo(.5, 0);

        this.laser1.angle = -31;
        this.laser2.angle = 29;
    }

    getContainer(): Phaser.Group {
        return this.container;
    }

    start(): void {
        this.game.add.tween(this.laser1).to({ angle: 25 }, Phaser.Timer.SECOND * 2, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser2).to({ angle: -20 }, Phaser.Timer.SECOND * 2.3, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
    }

    dispose(): void {
        this.game.tweens.removeFrom(this.laser1);
        this.game.tweens.removeFrom(this.laser2);
        this.laser1.destroy(true);
        this.laser2.destroy(true);
        this.container.destroy(true);
    }

}