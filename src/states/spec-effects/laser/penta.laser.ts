import {ILaser} from './i.laser';
import {GameConfig} from '../../../config/game.config';
import {isString} from 'util';

export class PentaLaser implements ILaser {

    private game: Phaser.Game = null;

    private container: Phaser.Group = null;
    private laser1: Phaser.Sprite = null;
    private laser2: Phaser.Sprite = null;
    private laser3: Phaser.Sprite = null;
    private laser4: Phaser.Sprite = null;
    private laser5: Phaser.Sprite = null;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(asset: string, frame?: any|any[]): void {
        if (frame) {
            if (isString(frame)) {
                frame = [frame, frame, frame, frame, frame];
            }
        }
        else {
            frame = [null, null, null, null, null];
        }
        this.container = this.game.add.group();
        this.container.add(
            this.laser1 = this.game.add.sprite(-37, -25 - 25, asset, frame[0])
        );
        this.container.add(
            this.laser2 = this.game.add.sprite(354, -21 - 25, asset, frame[1])
        );
        this.container.add(
            this.laser3 = this.game.add.sprite(490, -33 - 25, asset, frame[2])
        );
        this.container.add(
            this.laser4 = this.game.add.sprite(615, -21 - 25, asset, frame[3])
        );
        this.container.add(
            this.laser5 = this.game.add.sprite(989, -5 - 25, asset, frame[4])
        );

        this.laser1.anchor.setTo(.5, 0);
        this.laser2.anchor.setTo(.5, 0);
        this.laser3.anchor.setTo(.5, 0);
        this.laser4.anchor.setTo(.5, 0);
        this.laser5.anchor.setTo(.5, 0);

        this.laser1.angle = -26;
        this.laser2.angle = 22;
        this.laser3.angle = -10;
        this.laser4.angle = -29;
        this.laser5.angle = 21;
    }

    getContainer(): Phaser.Group {
        return this.container;
    }

    start(): void {
        this.game.add.tween(this.laser1).to({ angle: 5 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser2).to({ angle: 11 }, Phaser.Timer.SECOND * 1.3, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser3).to({ angle: 10 }, Phaser.Timer.SECOND * 1.1, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser4).to({ angle: -5 }, Phaser.Timer.SECOND * 1.2, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser5).to({ angle: 0 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
    }

    dispose(): void {
        this.game.tweens.removeFrom(this.laser1);
        this.game.tweens.removeFrom(this.laser2);
        this.game.tweens.removeFrom(this.laser3);
        this.game.tweens.removeFrom(this.laser4);
        this.game.tweens.removeFrom(this.laser5);
        this.laser1.destroy(true);
        this.laser2.destroy(true);
        this.laser3.destroy(true);
        this.laser4.destroy(true);
        this.laser5.destroy(true);
        this.container.destroy(true);
    }

}