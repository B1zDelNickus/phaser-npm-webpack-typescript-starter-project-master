import {ISaver} from './i.saver';
import {GameConfig, PublishMode} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {Animation} from '../../utils/animation/anim';
import {ImageUtils} from '../../utils/images/image.utils';

export class VerticalNorthBigSaver implements ISaver {

    private game: Phaser.Game;
    private state: Phaser.State;
    private onInCallback?: Function;
    private onOutCallback?: Function;
    private container: Phaser.Group = null;
    private vs: Phaser.Button = null;
    private blocker: Phaser.Graphics = null;
    private part: Phaser.Sprite = null;
    private inAnimation: Animation = null;
    private outAnimation: Animation = null;
    static initialized: boolean = false;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(state: Phaser.State, Function): void {
        this.state = state;
        this.container = this.game.add.group();
        this.container.add(this.blocker = this.game.add.graphics(0, 0));
        this.blocker.beginFill(0, 0);
        this.blocker.drawRect(0, 0, 960, 720);
        this.blocker.inputEnabled = true;
        this.container.add(
            this.container.add(this.part = this.game.make.sprite(0, 0,
                ImageUtils.getImageClass('ImagesPart').getName()
            ))
        );
        this.vs = GuiUtils.makeButton(
            this.state, this.container,
            0, 0, 1,
            '', ImageUtils.getImageClass('ImagesVs').getName(), null,
            GameConfig.PUB_MODE === PublishMode.NORMAL ? true : false,
            false, true, GameConfig.PUB_MODE === PublishMode.NORMAL ? GuiUtils.goLinkMainLogo : null);

        this.vs.position.setTo(480, 360);
        this.part.position.setTo(0, 0);

        if (VerticalNorthBigSaver.initialized) {
            this.inAnimation = new Animation()
                .add(this.blocker, { x: 960 }, Phaser.Timer.SECOND * 0.0001, Phaser.Timer.SECOND * 1.8)
                .add(this.part, { y: - this.part.height }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Circular.In)
                .add(this.vs.scale, { x: 0, y: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Linear.None)
                .add(this.vs, { alpha: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Linear.None);
        } else {
            this.blocker.x = 960;
            this.part.y = -this.part.height;
            this.vs.scale.setTo(0);
            this.vs.alpha = 0;

            this.inAnimation = new Animation();

            VerticalNorthBigSaver.initialized = true;
        }

        this.outAnimation = new Animation()
            .add(this.blocker, { x: 0 }, Phaser.Timer.SECOND * 0.0001, Phaser.Timer.SECOND * 0)
            .add(this.part, { y: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Circular.Out)
            .add(this.vs.scale, { x: 1, y: 1 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Linear.None)
            .add(this.vs, { alpha: 1 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Linear.None);
    }

    setOnInCallback(callback?: Function): void {
        this.onInCallback = callback;
    }

    setOnOutCallback(callback?: Function): void {
        this.onOutCallback = callback;
    }

    fadeIn(): void {
        this.inAnimation.animate(this.onInCallback);
    }

    fadeOut(): void {
        this.outAnimation.animate(this.onOutCallback);
    }

    dispose(): void {
        if (this.part) this.part.destroy(true);
        if (this.vs) this.vs.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        if (this.container) this.container.destroy(true);
    }
}