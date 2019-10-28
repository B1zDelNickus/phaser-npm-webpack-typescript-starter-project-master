import {GameConfig} from '../../../config/game.config';
import {GuiUtils} from '../../../utils/gui.utils';
import {CrossPhonePage} from './cross.phone.page';
import {isNull, isString} from 'util';


export class CrossPhone {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    private container: Phaser.Group = null;
    private _mask: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
    private lb: Phaser.Button = null;
    private rb: Phaser.Button = null;
    private currentPage: number = 0;
    private pages: CrossPhonePage[] = [];

    /**
     * @param state
     */
    constructor(state: Phaser.State, x: number = -1, y: number = -1) {
        this.game = GameConfig.GAME;
        this.state = state;
        this.container = this.game.add.group();
        if (x !== -1) {
            this.container.x = x;
        }
        if (y !== -1) {
            this.container.y = y;
        }
    }

    disable(): void {
        for (let page of this.pages) {
            page.disable();
        }
    }

    private listPage(sprite: Phaser.Button): void {
        if (sprite.name === 'lb') {
            this.currentPage--;
            if (this.currentPage < 0) this.currentPage = this.pages.length - 1;
        }
        else {
            this.currentPage++;
            if (this.currentPage > this.pages.length - 1) this.currentPage = 0;
        }
        for (let page of this.pages) {
            page.hide();
        }
        this.pages[this.currentPage].show();
    }

    background(x: number, y: number, asset: string, frame?: any): CrossPhone {
        /*let con = this.game.add.group();
        this.container.add(con);*/
        this.bg = this.game.add.sprite(x, y, asset, frame, this.container);
        return this;
    }

    leftArrow(x: number, y: number, scale: number, asses: string, frames?: any|any[]): CrossPhone {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.lb =
            GuiUtils.makeButton(
                this, this.container,
                x, y, scale,
                'lb', asses, frames,
                true, true, true, this.listPage,
                GuiUtils.addCustomOverHandler(0xffff66, scale * 1.05), GuiUtils.addCustomOutHandler(scale));
        return this;
    }

    mask(x: number, y: number, w: number, h: number, angle: number): CrossPhone {
        this._mask = this.game.add.graphics(x, y, this.container);
        this._mask.beginFill(0xfff000);
        this._mask.drawRect(0, 0, w, h);
        this._mask.angle = angle;
        return this;
    }

    rightArrow(x: number, y: number, scale: number, angle: number, asses: string, frames?: any|any[]): CrossPhone {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.rb =
            GuiUtils.makeButton(
                this, this.container,
                x, y, scale,
                'rb', asses, frames,
                true, true, true, this.listPage,
                GuiUtils.addCustomOverHandler(0xffff66, scale * 1.05), GuiUtils.addCustomOutHandler(scale));
        this.rb.angle = angle;
        return this;
    }

    /*animatedTitle(x: number, y: number, asset: string, frameRate: number = 30): CrossBlock {
        this.title = this.container.add(this.game.add.sprite(x, y, asset));
        this.title.animations.add('title');
        this.frameRate = frameRate;
        return this;
    }*/

    page(show: boolean = true): CrossPhonePage {
        const page = new CrossPhonePage(this, this.state, this.container, this._mask);
        this.pages.push(page);
        return page;
    }

    /*static(): CrossPhonePage {
        return this.staticPage = new CrossPhonePage(this, this.state, this.container);
    }*/

    build(): CrossPhone {
        if (this.pages.length > 1) {
            for (let i = 1; i < this.pages.length; i++) {
                this.pages[i].hide();
            }
        }
        return this;
    }

    dispose(): void {
        // if (!isNull(this.staticPage)) this.staticPage.dispose();
        if (!isNull(this.bg)) this.bg.destroy(true);
        if (!isNull(this._mask)) this._mask.destroy(true);
        for (let page of this.pages) {
            page.dispose();
        }
        this.container.destroy(true);
    }

    getContainer(): Phaser.Group {
        return this.container;
    }
}