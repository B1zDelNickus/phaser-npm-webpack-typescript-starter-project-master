import {GameConfig} from '../../../config/game.config';
import {CrossBlock} from './cross.block';
import {GuiUtils} from '../../../utils/gui.utils';
import {isString} from 'util';
export class CrossBlockPage {

    private owner: CrossBlock = null;
    private game: Phaser.Game = null;
    private state: Phaser.State = null;

    private container: Phaser.Group = null;
    private banners: Phaser.Button[] = [];

    constructor(owner: CrossBlock, state: Phaser.State, container: Phaser.Group) {
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.state = state;
        this.container = this.game.add.group();
        container.add(this.container);
    }

    disable(): void {
        for (let ban of this.banners) {
            ban.inputEnabled = false;
        }
    }

    hide(): void {
        this.container.visible = false;
    }

    show(): void {
        this.container.visible = true;
    }

    banner(x: number, y: number, name: string, asset: string, frames?: any|any[],
           callback?: Function,
           overHandler: Function = GuiUtils.addOverGlowHandler,
           outHandler: Function = GuiUtils.addOutGlowHandler): CrossBlockPage {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.banners.push(
            GuiUtils.makeButton(
                this.state, this.container,
                x, y, 1,
                name, asset, frames,
                true, true, false, callback, overHandler, outHandler)
        );

        return this;
    }

    build(): CrossBlock {
        if (this.banners.length > 0) this.banners[0].visible = true;
        return this.owner;
    }

    dispose(): void {
        for (let ban of this.banners) {
            ban.destroy(true);
        }
        this.container.destroy(true);
    }
}