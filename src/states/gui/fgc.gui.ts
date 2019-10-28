import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {isNull, isString} from 'util';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {ImageUtils} from '../../utils/images/image.utils';
import {TweenUtils} from '../../utils/tween.utils';

export class GuiFgc implements IGui {

    private game: Phaser.Game;
    private state: Phaser.State;
    private type: StateType;

    private guiContainer: Phaser.Group = null;
    private playButton: Phaser.Button = null;
    private musonButton: Phaser.Button = null;
    private musoffButton: Phaser.Button = null;
    private logoButton: Phaser.Button = null;
    private moreButton: Phaser.Button = null;
    private moreButton2: Phaser.Sprite = null;
    private reverse: boolean;

    private extras: Array<Phaser.Button> = [];
    private extras2: Array<Phaser.Sprite> = [];

    constructor(state: Phaser.State, type: StateType) {
        this.game = GameConfig.GAME;
        this.state = state;
        this.type = type;
    }

    addGui(defaultGui: boolean = true, reverse: boolean = false): void {
        this.guiContainer = this.game.add.group();
        this.reverse = reverse;

        if (defaultGui)
            this.addMoreBtn();

        this.addLogoBtn();
        this.addMusicBtns();
    }

    addPlayBtn(callback?: Function, x: number = -1, y: number = -1): Phaser.Button {
        let frame: string;
        let X: number = -5;
        let Y: number = 593;

        if (this.type === StateType.START_STATE) {
            frame = ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.StartFgc;
            X = 3;
            Y = 577;
        }
        else if (this.type === StateType.FINAL_STATE) {
            frame = ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.ReplayFgc;
        }
        else {
            frame = ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.DoneFgc;
        }

        if (x !== -1) {
            X = x;
        }
        if (y !== -1) {
            Y = y;
        }

        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                X, Y, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                [frame, frame, frame],
                true, false, true, callback, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.playButton;
    }

    addExtraMore(x: number, y: number, asset: string, frames?: any|any[],
                 overHandler: Function = GuiUtils.addOverHandler,
                 outHandler: Function = GuiUtils.addOutHandler,
                 callback: Function = GuiUtils.goLinkMainMoreGames): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton;
    }

    addExtraMoreAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number = 10, loop: boolean = true,
                         overHandler: Function = GuiUtils.addOverHandler,
                         outHandler: Function = GuiUtils.addOutHandler,
                         callback: Function = GuiUtils.goLinkMainMoreGames): Phaser.Sprite {

        this.moreButton2 =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton2;
    }

    addMoreBtn(): Phaser.Button {
        this.moreButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                833, 593, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.MoreFgc,
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.moreButton;
    }

    addLogoBtn(): Phaser.Button {
        this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                this.reverse ? 0 : 710, 0, .8,
                '', ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.LogoFgc,
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerFgc, GuiUtils.addOutHandlerFgc);

        return this.logoButton;
    }

    addMusicBtns(): Array<Phaser.Button> {
        this.musonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                this.reverse ? 840 : -6, -9, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.SoundOnFgc,
                true, false, SoundUtils.isSoundEnabled(), SoundUtils.mainThemeSwitch, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.musoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                this.reverse ? 840 : -6, -9, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.SoundOffFgc,
                true, false, !SoundUtils.isSoundEnabled(), SoundUtils.mainThemeSwitch, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        SoundUtils.onSwitchAudio.add(() => {
            this.musonButton.visible = !this.musonButton.visible;
            this.musoffButton.visible = !this.musoffButton.visible;
        }, this);

        return [this.musonButton, this.musoffButton];
    }

    addExtraBtn(x: number, y: number, asset: string, frames?: any|any[],
                callback?: Function,
                overHandler: Function = GuiUtils.addOverHandler,
                outHandler: Function = GuiUtils.addOutHandler): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.extras.push(btn);

        return btn;
    }

    addExtraBtnAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number = 10, loop: boolean = true,
                callback?: Function,
                overHandler: Function = GuiUtils.addOverHandler,
                outHandler: Function = GuiUtils.addOutHandler): Phaser.Sprite {

        const btn =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.extras2.push(btn);

        return btn;
    }

    hideStandart(): void {
        this.musonButton.visible = false;
        this.musonButton.visible = false;
        this.logoButton.visible = false;
        if (this.moreButton) this.moreButton.visible = false;
        if (this.moreButton2) this.moreButton2.visible = false;
        if (this.playButton) this.playButton.visible = false;
    }

    hideAll(): void {
    }

    disable(): void {
        for (let btn of this.extras) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        for (let btn of this.extras2) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        if (!isNull(this.playButton)) {
            this.playButton.inputEnabled = false;
            this.playButton.filters = null;
            TweenUtils.fadeAndScaleOut(this.playButton);
        }
        this.musonButton.inputEnabled = false;
        this.musonButton.filters = null;
        this.musoffButton.inputEnabled = false;
        this.musoffButton.filters = null;
    }

    dispose(): void {
        SoundUtils.onSwitchAudio.removeAll(this);
        if (!isNull(this.playButton)) this.playButton.destroy(true);
        this.musonButton.destroy(true);
        this.musoffButton.destroy(true);
        if (!isNull(this.moreButton)) this.moreButton.destroy(true);
        if (!isNull(this.moreButton2)) this.moreButton2.destroy(true);
        for (let btn of this.extras) {
            btn.destroy(true);
        }
        for (let btn of this.extras2) {
            btn.destroy(true);
        }
        this.guiContainer.destroy(true);
    }
}