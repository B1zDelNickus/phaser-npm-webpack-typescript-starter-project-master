import {GuiUtils} from '../../../utils/gui.utils';
import {isString} from 'util';
import {GameConfig} from '../../../config/game.config';
import {ChestItemBase} from './chest.item.base';

export class ChestCompoundItem extends ChestItemBase {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    public button: Phaser.Button = null;
    public name: string = null;
    private asset: string = null;
    private prefix: string = null;
    private frameClass: any = null;
    private emptyState: number = -1;
    private length: number = 0;
    private current: number = 0;

    constructor(state: Phaser.State, container: Phaser.Group,
                length: number, showFrom: number, emptyState: number,
                x: number, y: number, name: string,
                asset: string, frameClass: any, prefix: string,
                callback?: Function, overHandler?: Function, outHandler?: Function) {

        super();

        this.game = GameConfig.GAME;
        this.state = state;
        this.name = name;
        this.prefix = prefix;
        this.asset = asset;
        this.frameClass = frameClass;
        this.emptyState = emptyState;
        this.length = length;
        this.current = showFrom;

        const frame = frameClass[prefix + showFrom];
        const frames = [frame, frame, frame];

        this.button =
            GuiUtils.makeButton(
                this.state, container,
                x, y, 1,
                `${name}${showFrom}`, asset, frames,
                true, true, true, callback, overHandler, outHandler);

        this.button.events.onInputUp.add(this.onClick, this);
    }

    private onClick() {
        this.current++;
        if (this.current > this.length) this.current = 1;

        this.button.name = this.name + this.current;
        // this.button.loadTexture(this.asset, this.frameClass[this.prefix + this.current]);
        this.button.setFrames(
            this.frameClass[this.prefix + this.current],
            this.frameClass[this.prefix + this.current],
            this.frameClass[this.prefix + this.current],
            this.frameClass[this.prefix + this.current]
        );
    }

    disable(): void {
        this.button.inputEnabled = false;
        this.button.filters = null;
    }

    enable(): void {
        this.button.inputEnabled = true;
    }

    dispose(): void {
        this.button.events.onInputUp.remove(this.onClick, this);
        this.button.destroy(true);
    }
}