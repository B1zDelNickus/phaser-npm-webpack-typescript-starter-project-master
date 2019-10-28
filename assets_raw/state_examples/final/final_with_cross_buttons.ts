import * as Assets from '../assets';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {TweenUtils} from '../utils/tween.utils';
import {Doll} from './template/dress/doll';
import {CrossBlock} from './template/final/cross.block';
import {ImageUtils} from '../utils/images/image.utils';
import {CrossDollButton} from './template/final/cross.doll.button';

export default class Nbfffghfghfghfg extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private cross1: CrossDollButton = null;
    private cross2: CrossDollButton = null;
    private cross3: CrossDollButton = null;
    private label: Phaser.Sprite = null;

    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.FINAL_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {
        this.bg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
            ImageUtils.getAtlasClass('AtlasesFinalState').Frames.Bg6);

        this.cross1 = new CrossDollButton(this, 'http://mycutegames.com/Games/Princess/Princess-Urban-Fashion-Statement.html');
        this.cross2 = new CrossDollButton(this, 'http://mycutegames.com/Games/Princess/Princess-Style-Guide-Sporty-Chic.html');
        this.cross3 = new CrossDollButton(this, 'http://mycutegames.com/Games/Princess/Freshman-Party-at-Princess-College.html');

        this.cross1.getBody().x -= 700;
        this.cross2.getBody().y += 700;
        this.cross3.getBody().x += 700;

        const doll1 = this.cross1
            .buttonAndReturn(27, 98, 1,
                ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
                ImageUtils.getAtlasClass('AtlasesFinalState').Frames.Cross1, null, null);
        const doll2 = this.cross2
            .buttonAndReturn(395, 168, 1,
                ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
                ImageUtils.getAtlasClass('AtlasesFinalState').Frames.Cross2, null, null);
        const doll3 = this.cross3
            .buttonAndReturn(667, 94, 1,
                ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
                ImageUtils.getAtlasClass('AtlasesFinalState').Frames.Cross3, null, null);

        const btn1 = this.cross1
            .buttonAndReturn(103, 496, 1.1,
                ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getName(),
                [0, 1, 0],
                GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
        const btn2 = this.cross2
            .buttonAndReturn(387, 578, 1.1,
                ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getName(),
                [0, 1, 0],
                GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
        const btn3 = this.cross3
            .buttonAndReturn(682, 513, 1.1,
                ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getName(),
                [0, 1, 0],
                GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        this.label = this.game.add.sprite(262, 34 - 600,
            ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
            ImageUtils.getAtlasClass('AtlasesFinalState').Frames.Label);

        // GUI Buttons
        this.gui.addGui(false);
        this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 125, 720 - 199,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE11919931').getName(),
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.moveIn(this.label, 262, 34, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.moveIn(this.cross1.getBody(), this.cross1.getBody().x + 700, this.cross1.getBody().y, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.moveIn(this.cross2.getBody(), this.cross2.getBody().x, this.cross2.getBody().y - 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2.5);
        TweenUtils.moveIn(this.cross3.getBody(), this.cross3.getBody().x - 700, this.cross3.getBody().y, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3,
            () => {
                doll1.filters = [EffectUtils.makeGlowAnimation()];
                doll2.filters = [EffectUtils.makeGlowAnimation()];
                doll3.filters = [EffectUtils.makeGlowAnimation()];
                EffectUtils.makeScaleAnimation(btn1, 1.15, Phaser.Timer.SECOND * .6);
                EffectUtils.makeScaleAnimation(btn2, 1.15, Phaser.Timer.SECOND * .6);
                EffectUtils.makeScaleAnimation(btn3, 1.15, Phaser.Timer.SECOND * .6);
            }, this);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.bg.destroy(true);
        this.label.destroy(true);
        this.cross1.dispose();
        this.cross2.dispose();
        this.cross3.dispose();

        if (this.spinner) this.spinner.destroy(true);
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        if (this.saver) {
            this.saver.setOnOutCallback(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.reallyGoNextState(true);
            });
            this.saver.fadeOut();
        } else {
            this.blocker = this.game.add.graphics(0, 0);
            this.blocker.beginFill(0);
            this.blocker.drawRect(0, 0, 960, 720);
            this.blocker.inputEnabled = true;
            this.blocker.alpha = 0;
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.game.camera.fade(0x000000, 1, true, 0);
                this.blocker.alpha = .85;
                this.reallyGoNextState(true);
            }, this);
            this.game.camera.fade(0x000000, 500, true, .85);
        }
    }

    private reallyGoNextState(addLoader: boolean = false): void {
        if (this.nextPrepared) {
            this.game.state.start(this.NEXT);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    ImageUtils.getImageClass('ImagesSpin').getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

