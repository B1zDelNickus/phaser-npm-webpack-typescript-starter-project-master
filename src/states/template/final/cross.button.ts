import {GameConfig} from '../../../config/game.config';
import {GuiUtils} from '../../../utils/gui.utils';
import {isString} from 'util';

export class CrossButton {

    private state: Phaser.State = null;
    private game: Phaser.Game = null;
    private url: string = '';
    private container: Phaser.Group = null;
    private btns: Phaser.Button[] = [];
    private sprites: Phaser.Sprite[] = [];

    constructor(state: Phaser.State, crossUrl: string = '') {
        this.state = state;
        this.game = GameConfig.GAME;
        this.url = crossUrl;
        this.container = this.game.add.group();
    }

    link(url: string): CrossButton {
        this.url = url;
        return this;
    }

    sprite(): CrossButton {
        return this;
    }

    animatedSprite(): CrossButton {
        return this;
    }

    button(x: number, y: number, scale: number, asset: string, frames?: any|any[],
        overHandler: Function = GuiUtils.addOverHandler,
        outHandler: Function = GuiUtils.addOutHandler): CrossButton {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.btns.push(GuiUtils.makeButton(
            this.state, this.container,
            x, y, scale,
            '', asset, frames,
            true, true, true, GuiUtils.goCross(this.url), overHandler, outHandler));

        return this;
    }

    buttonAndReturn(x: number, y: number, scale: number, asset: string, frames?: any|any[],
           overHandler: Function = GuiUtils.addOverHandler,
           outHandler: Function = GuiUtils.addOutHandler): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn = GuiUtils.makeButton(
            this.state, this.container,
            x, y, scale,
            '', asset, frames,
            true, true, true, GuiUtils.goCross(this.url), overHandler, outHandler);

        this.btns.push(btn);

        return btn;
    }

    getBody(): Phaser.Group {
        return this.container;
    }

    dispose() {
        for (let btn of this.btns) {
            btn.destroy(true);
        }
        for (let spr of this.sprites) {
            spr.destroy(true);
        }
        this.container.destroy(true);
    }
}