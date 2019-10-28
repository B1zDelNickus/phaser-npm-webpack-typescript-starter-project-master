import {GameConfig, PublishMode} from '../../../config/game.config';
import {ChestPage} from './chest.page';
import {GuiUtils} from '../../../utils/gui.utils';
import {isNull, isString, isUndefined} from 'util';
import {TweenUtils} from '../../../utils/tween.utils';
import {ChestCategory} from './chest.category';
import {EffectUtils} from '../../../utils/effect.utils';
import {ChestCompoundItem} from './chest.compound.item';
import {ChestItem} from './chest.item';
import {ChestItemBase} from './chest.item.base';

export class Chest {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;

    private currentPage: number = 0;
    private currentCat: string = null;

    private container: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private pages: Array<ChestPage> = [];
    private categories: Array<ChestCategory> = [];
    private btns: Array<Phaser.Button> = [];
    private catLb: Phaser.Button = null;
    private catRb: Phaser.Button = null;
    private lb: Phaser.Button = null;
    private rb: Phaser.Button = null;
    private staticPage: ChestPage = null;
    private hiddenX: number;

    private config: IChestConfig = null;

    constructor(state: Phaser.State, hiddenX: number = -700) {
        this.game = GameConfig.GAME;
        this.state = state;
        this.hiddenX = hiddenX;
        this.container = this.game.add.group();
        this.container.x = this.hiddenX;
    }

    onEquiped(item: string, ...toOn: string[]) {
        if (!this.config || this.config.hideSelected !== true) return;
        for (let cat of toOn) {
            if (this.staticPage)
                this.staticPage.tryToSetLikeVisibility(cat);
            if (this.pages.length > 0) {
                for (let page of this.pages) {
                    page.tryToSetLikeVisibility(cat);
                }
            }
        }
        if (this.staticPage) {
            this.staticPage.tryToSetVisibility(item);
        }
        if (this.pages.length > 0) {
            for (let page of this.pages) {
                if (page.tryToSetVisibility(item)) {
                    break;
                }
            }
        }
    }

    disable(): void {
        for (let page of this.pages) {
            page.disable();
        }
        if (this.staticPage) {
            this.staticPage.disable();
        }
        if (this.lb) {
            this.lb.inputEnabled = false;
            this.lb.filters = null;
        }
        if (this.rb) {
            this.rb.inputEnabled = false;
            this.rb.filters = null;
        }
    }

    enable(): void {
        for (let page of this.pages) {
            page.enable();
        }
        if (this.staticPage) {
            this.staticPage.enable();
        }
        if (this.lb) {
            this.lb.inputEnabled = true;
        }
        if (this.rb) {
            this.rb.inputEnabled = true;
        }
    }

    findItem(name: string): Phaser.Button|Phaser.Sprite {
        let item: ChestItemBase = null;
        if (this.staticPage !== null) {
            item = this.staticPage.findItem(name);
        }
        if (item === null && this.pages.length > 0) {
            for (let page of this.pages) {
                item = page.findItem(name);
                if (item !== null)
                    break;
            }
        }
        return isUndefined(item) || isNull(item) ? null : item.button;
    }

    show(): void {
        this.disable();
        TweenUtils.slideIn(this.container, 0);
        TweenUtils.delayedCall(1010, this.enable, this);
    }

    hide(): void {
        this.disable();
        TweenUtils.slideOut(this.container, this.hiddenX);
        TweenUtils.delayedCall(1010, this.enable, this);
    }

    public showPage(index: number) {
        this.currentPage = index;
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
        if (this.pages[this.currentPage].hideStatic) {
            if (this.staticPage) this.staticPage.hide();
        }
        else {
            if (this.staticPage) this.staticPage.show();
        }
    }

    private nextPage(): void {
        this.currentPage++;
        if (this.currentPage > this.pages.length - 1) this.currentPage = 0;
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
        if (this.pages[this.currentPage].hideStatic) {
            if (this.staticPage) this.staticPage.hide();
        }
        else {
            if (this.staticPage) this.staticPage.show();
        }
    }

    private prevPage(): void {
        this.currentPage--;
        if (this.currentPage < 0) this.currentPage = this.pages.length - 1;
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
        if (this.pages[this.currentPage].hideStatic) {
            if (this.staticPage) this.staticPage.hide();
        }
        else {
            if (this.staticPage) this.staticPage.show();
        }
    }

    configure(params: IChestConfig): Chest {
        this.config = params;
        return this;
    }

    background(x: number, y: number, asset: string, frame?: any): Chest {
        this.bg = this.game.add.sprite(x, y, asset, frame, this.container);
        return this;
    }

    page(add: boolean = true, hideStatic: boolean = false): ChestPage {
        const page = new ChestPage(this, this.state, this.container, hideStatic);
        if (add)
            this.pages.push(page);
        else
            page.hide();
        return page;
    }

    static(): ChestPage {
        this.staticPage = new ChestPage(this, this.state, this.container, false);
        return this.staticPage;
    }

    category(name: string, arrows: boolean, startPage: number, endPage: number, x: number, y: number, asset: string, frames?: any|any[],
             overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        this.categories[name] = new ChestCategory(name, startPage, endPage, arrows);

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.btns.push(
            GuiUtils.makeButton(
                this, this.container,
                x, y, 1,
                name, asset, frames,
                true, true, true, this.selectCategory, overHandler, outHandler));
        return this;
    }

    categoryLeftArrow(x: number, y: number, asset: string, frames?: any|any[],
                  overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.catLb =
            GuiUtils.makeButton(
                this, this.container,
                x, y, 1,
                'left', asset, frames,
                false, true, true, this.listInCategory, overHandler, outHandler);
        this.catLb.scale.setTo(0);
        this.catLb.alpha = 0;
        return this;
    }

    categoryRightArrow(x: number, y: number, asset: string, frames?: any|any[],
                      overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.catRb =
            GuiUtils.makeButton(
                this, this.container,
                x, y, 1,
                'right', asset, frames,
                false, true, true, this.listInCategory, overHandler, outHandler);
        this.catRb.scale.setTo(0);
        this.catRb.alpha = 0;
        return this;
    }

    leftArrow(x: number, y: number, asset: string, frames?: any|any[],
                      overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.lb =
            GuiUtils.makeButton(
                this, this.container,
                x, y, 1,
                'left', asset, frames,
                true, true, true, this.prevPage, overHandler, outHandler);
        return this;
    }

    rightArrow(x: number, y: number, asset: string, frames?: any|any[],
                       overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.rb =
            GuiUtils.makeButton(
                this, this.container,
                x, y, 1,
                'right', asset, frames,
                true, true, true, this.nextPage, overHandler, outHandler);
        return this;
    }

    button(x: number, y: number, name: string, asset: string, frames?: any|any[],
        callback?: Function, overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        let visible = true;
        if  ((name.indexOf('mmmm') !== -1) || (name.indexOf('cross') !== -1)) {
            if (GameConfig.PUB_MODE !== PublishMode.NORMAL)
                visible = false;
        }

        this.btns.push(
            GuiUtils.makeButton(
                this.state, this.container,
                x, y, 1,
                name, asset, frames,
                true, true, visible, callback, overHandler, outHandler));
        return this;
    }

    build(defaultCat: string = 'dresses'): Chest {
        this.currentPage = 0;
        this.currentCat = defaultCat;
        const curCat: ChestCategory = this.categories[this.currentCat];
        if (!isUndefined(curCat)) {
            if (curCat.withArrows) {
                this.catLb.inputEnabled = true;
                this.catRb.inputEnabled = true;
                TweenUtils.fadeAndScaleIn(this.catLb, Phaser.Timer.SECOND * .5, 0);
                TweenUtils.fadeAndScaleIn(this.catRb, Phaser.Timer.SECOND * .5, 0);
            }
            this.currentPage = curCat.startPage;
            const curBtn = this.findBtnByName(this.currentCat);
            curBtn.inputEnabled = false;
            curBtn.filters = [EffectUtils.makeLightGlowAnimation(0xffff66, 600)];
        }
        if (this.pages.length > 0) {
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i].hide();
            }
            this.pages[this.currentPage].show();
        }

        return this;
    }

    dispose(): void {
        if (!isNull(this.staticPage)) this.staticPage.dispose();
        if (!isNull(this.bg)) this.bg.destroy(true);
        if (!isNull(this.catLb)) this.catLb.destroy(true);
        if (!isNull(this.catRb)) this.catRb.destroy(true);
        if (!isNull(this.lb)) this.lb.destroy(true);
        if (!isNull(this.rb)) this.rb.destroy(true);
        for (let page of this.pages) {
            page.dispose();
        }
        this.container.destroy(true);
    }

    private listInCategory(sprite: Phaser.Button) {
        if (sprite === this.catLb) {
            this.currentPage--;
            if (this.currentPage < this.categories[this.currentCat].startPage)
                this.currentPage = this.categories[this.currentCat].endPage;
        }
        else {
            this.currentPage++;
            if (this.currentPage > this.categories[this.currentCat].endPage)
                this.currentPage = this.categories[this.currentCat].startPage;
        }

        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
    }

    private selectCategory(sprite: Phaser.Button) {
        if (sprite.name === this.currentCat) return;

        const curBtn = this.findBtnByName(this.currentCat);
        curBtn.filters = null;
        curBtn.inputEnabled = true;

        sprite.inputEnabled = false;
        sprite.filters = [EffectUtils.makeLightGlowAnimation(0xffff66, 600)];

        this.currentCat = sprite.name;
        this.currentPage = this.categories[this.currentCat].startPage;

        if (!this.categories[this.currentCat].withArrows && this.catLb.alpha === 1) {
            this.catLb.inputEnabled = false;
            this.catRb.inputEnabled = false;
            TweenUtils.fadeAndScaleOut(this.catLb);
            TweenUtils.fadeAndScaleOut(this.catRb);
        }
        else if (this.categories[this.currentCat].withArrows && this.catLb.alpha === 0) {
            this.catLb.inputEnabled = true;
            this.catRb.inputEnabled = true;
            TweenUtils.fadeAndScaleIn(this.catLb, Phaser.Timer.SECOND * .5, 0);
            TweenUtils.fadeAndScaleIn(this.catRb, Phaser.Timer.SECOND * .5, 0);
        }

        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
    }

    private findBtnByName(name: string): Phaser.Button {
        for (let btn of this.btns) {
            if (btn.name === name)
                return btn;
        }
        return null;
    }

    public getBody(): Phaser.Group {
        return this.container;
    }
}

interface IChestConfig {
    hideSelected?: boolean;
}