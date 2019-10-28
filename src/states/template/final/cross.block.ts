import {GameConfig} from '../../../config/game.config';
import {GuiUtils} from '../../../utils/gui.utils';
import {CrossBlockPage} from './cross.block.page';
import {isNull, isString} from 'util';

export class CrossBlock {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    private container: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private lb: Phaser.Button = null;
    private rb: Phaser.Button = null;
    private title: Phaser.Sprite = null;
    private frameRate: number = 30;
    private currentPage: number = 0;
    private staticPage: CrossBlockPage = null;
    private pages: CrossBlockPage[] = [];

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

    /**
     * @param x
     * @param y
     * @param asset
     * @param frame
     * @returns {CrossBlock}
     */
    background(x: number, y: number, asset: string, frame?: any): CrossBlock {
        this.bg = this.game.add.sprite(x, y, asset, frame, this.container);
        return this;
    }

    leftArrow(x: number, y: number, scale: number, asses: string, frames?: any|any[]): CrossBlock {

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
                true, true, true, this.listPage, GuiUtils.addCustomOverHandler(0xffff66, scale * 1.05), GuiUtils.addCustomOutHandler(scale));
        return this;
    }

    rightArrow(x: number, y: number, scale: number, asses: string, frames?: any|any[]): CrossBlock {

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
                true, true, true, this.listPage, GuiUtils.addCustomOverHandler(0xffff66, scale * 1.05), GuiUtils.addCustomOutHandler(scale));
        return this;
    }

    animatedTitle(x: number, y: number, asset: string, frameRate: number = 30): CrossBlock {
        this.title = this.container.add(this.game.add.sprite(x, y, asset));
        this.title.animations.add('title');
        this.frameRate = frameRate;
        return this;
    }

    page(): CrossBlockPage {
        const page = new CrossBlockPage(this, this.state, this.container);
        this.pages.push(page);
        return page;
    }

    static(): CrossBlockPage {
        return this.staticPage = new CrossBlockPage(this, this.state, this.container);
    }

    build(): CrossBlock {
        if (!isNull(this.title)) this.title.play('title', this.frameRate, true);
        if (this.pages.length > 1) {
            for (let i = 1; i < this.pages.length; i++) {
                this.pages[i].hide();
            }
        }
        return this;
    }

    dispose(): void {
        if (!isNull(this.staticPage)) this.staticPage.dispose();
        if (!isNull(this.bg)) this.bg.destroy(true);
        for (let page of this.pages) {
            page.dispose();
        }
        this.container.destroy(true);
    }

    getContainer(): Phaser.Group {
        return this.container;
    }
}