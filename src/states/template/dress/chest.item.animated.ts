import {GuiUtils} from '../../../utils/gui.utils';
import {isString} from 'util';
import {GameConfig, PublishMode} from '../../../config/game.config';
import {ChestItem} from './chest.item';
import {ChestItemBase} from './chest.item.base';

export class AnimatedChestItem extends ChestItemBase {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    public button: Phaser.Sprite = null;
    public name: string = null;

    constructor(state: Phaser.State, container: Phaser.Group,
                x: number, y: number, name: string,
                asset: string, frames?: any|any[],
                frameRate: number = 10, loop: boolean = true,
                callback?: Function, overHandler?: Function, outHandler?: Function) {

        super();

        this.game = GameConfig.GAME;
        this.state = state;
        this.name = name;

        let visible = true;
        if  ((name.indexOf('mmmm') !== -1) || (name.indexOf('cross') !== -1)) {
            if (GameConfig.PUB_MODE !== PublishMode.NORMAL)
                visible = false;
        }

        this.button =
            GuiUtils.makeSpritesheetButton(
                this.state, container,
                x, y, 1, frameRate, loop,
                name, asset, frames,
                true, true, visible, callback, overHandler, outHandler);
    }

    disable(): void {
        this.button.inputEnabled = false;
        this.button.filters = null;
    }

    enable(): void {
        this.button.inputEnabled = true;
    }

    dispose(): void {
        this.button.destroy(true);
    }
}