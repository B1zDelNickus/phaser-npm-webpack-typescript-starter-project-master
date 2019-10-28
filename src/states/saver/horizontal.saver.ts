import {ISaver} from './i.saver';
import {GameConfig, PublishMode} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {Animation} from '../../utils/animation/anim';
import {ImageUtils} from '../../utils/images/image.utils';

export class HorizontalSaver implements ISaver {

    private game: Phaser.Game;
    private state: Phaser.State;
    private onInCallback?: Function;
    private onOutCallback?: Function;
    private container: Phaser.Group = null;
    private vs: Phaser.Button = null;
    private blocker: Phaser.Graphics = null;
    private part1: Phaser.Sprite = null;
    private part2: Phaser.Sprite = null;
    private inAnimation: Animation = null;
    private outAnimation: Animation = null;
    static initialized: boolean = false;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(state: Phaser.State, vsX: number = 480, vsY: number = 360): void {
        this.state = state;
        this.container = this.game.add.group();
        this.container.add(this.blocker = this.game.add.graphics(0, 0));
        this.blocker.beginFill(0, 0);
        this.blocker.drawRect(0, 0, 960, 720);
        this.blocker.inputEnabled = true;
        this.container.add(
            this.container.add(this.part1 = this.game.make.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesSaver').getName(),
                ImageUtils.getAtlasClass('AtlasesSaver').Frames.Part1
            ))
        );
        this.container.add(
            this.container.add(this.part2 = this.game.make.sprite(0, 360,
                ImageUtils.getAtlasClass('AtlasesSaver').getName(),
                ImageUtils.getAtlasClass('AtlasesSaver').Frames.Part2
            ))
        );
        this.vs = GuiUtils.makeButton(
            this.state, this.container,
            0, 0, 1,
            '', ImageUtils.getAtlasClass('AtlasesSaver').getName(),
            ImageUtils.getAtlasClass('AtlasesSaver').Frames.Vs,
            GameConfig.PUB_MODE === PublishMode.NORMAL ? true : false,
            false, true, GameConfig.PUB_MODE === PublishMode.NORMAL ? GuiUtils.goLinkMainLogo : null);

        this.vs.position.setTo(vsX, vsY);
        this.part1.position.setTo(0, 0);
        this.part2.position.setTo(960 - this.part2.width, 0);

        if (HorizontalSaver.initialized) {
            this.inAnimation = new Animation()
                .add(this.blocker, { x: 960 }, Phaser.Timer.SECOND * 0.0001, Phaser.Timer.SECOND * 1.8)
                .add(this.part1, { x: -this.part1.width }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Circular.In)
                .add(this.part2, { x: 960 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Circular.In)
                .add(this.vs.scale, { x: 0, y: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Linear.None)
                .add(this.vs, { alpha: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Linear.None);
        } else {
            this.blocker.x = 960;
            this.part1.x = -this.part1.width;
            this.part2.x = 960;
            this.vs.scale.setTo(0);
            this.vs.alpha = 0;

            this.inAnimation = new Animation();

            HorizontalSaver.initialized = true;
        }

        this.outAnimation = new Animation()
            .add(this.blocker, { x: 0 }, Phaser.Timer.SECOND * 0.0001, Phaser.Timer.SECOND * 0)
            .add(this.part1, { x: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Circular.Out)
            .add(this.part2, { x: 960 - this.part2.width }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Circular.Out)
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
        if (this.part1) this.part1.destroy(true);
        if (this.part2) this.part2.destroy(true);
        if (this.vs) this.vs.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        if (this.container) this.container.destroy(true);
    }
}