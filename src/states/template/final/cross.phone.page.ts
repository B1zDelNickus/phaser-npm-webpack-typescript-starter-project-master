import {GameConfig} from '../../../config/game.config';
import {GuiUtils} from '../../../utils/gui.utils';
import {CrossPhone} from './cross.phone';
import {isString} from 'util';
import {EffectUtils} from '../../../utils/effect.utils';

export class CrossPhonePage {

    private owner: CrossPhone = null;
    private game: Phaser.Game = null;
    private state: Phaser.State = null;

    private container: Phaser.Group = null;
    private banners: Phaser.Button[] = [];
    private sprites: Phaser.Sprite[] = [];
    private _mask: Phaser.Graphics = null;

    constructor(owner: CrossPhone, state: Phaser.State, container: Phaser.Group, mask: Phaser.Graphics) {
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.state = state;
        this.container = this.game.add.group(container);
        this._mask = mask;
        container.add(this.container);
        // this.game.add.sprite(0, 0, ImageUtils.getAtlasClass('AtlasesStateFinal').getName(), 'phone_1.png', this.container);
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

    existing(target: any, x: number, y: number, scale: number = 1, alpha: number = 1, angle: number = 0): CrossPhonePage {
        target.x = x;
        target.y = y;
        target.scale.setTo(scale);
        target.alpha = alpha;
        target.angle = angle;
        target.mask = this._mask;
        this.container.add(target);
        return this;
    }

    sprite(x: number, y: number, asset: string, frames?: any|any[]): CrossPhonePage {
        this.sprites.push(this.game.add.sprite(x, y, asset, frames, this.container));
        return this;
    }

    banner(x: number, y: number, asset: string, frames?: any|any[],
           callback?: Function): CrossPhonePage {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn = GuiUtils.makeButton(
            this.state, this.container,
            x, y, 1,
            '', asset, frames,
            true, true, true, callback);
        this.banners.push(btn);
        EffectUtils.makeScaleAnimation(btn);

        return this;
    }

    button(x: number, y: number, scale: number, angle: number, asset: string, frames?: any|any[],
           callback?: Function,
           overHandler: Function = GuiUtils.addOverScaleHandler,
           outHandler: Function = GuiUtils.addOutScaleHandler): CrossPhonePage {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn = GuiUtils.makeButton(
            this.state, this.container,
            x, y, scale,
            name, asset, frames,
            true, true, true, callback, overHandler, outHandler);
        this.banners.push(btn);
        btn.angle = angle;
        btn.filters = [EffectUtils.makeGlowAnimation(0xffff66)];

        return this;
    }

    build(): CrossPhone {
        if (this.banners.length > 0)
            this.banners[0].visible = true;
        return this.owner;
    }

    dispose(): void {
        for (let ban of this.banners) {
            ban.destroy(true);
        }
        for (let sp of this.sprites) {
            sp.destroy(true);
        }
        this.container.destroy(true);
    }
}