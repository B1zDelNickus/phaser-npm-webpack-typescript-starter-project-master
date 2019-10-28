import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {AdUtils} from '../utils/ad/ad.utils';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Kkdfdfjjdfjdfhdf extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private flash: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private sel1: Phaser.Button = null;
    private sel2: Phaser.Button = null;
    private sel3: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.SELECT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.SELECT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.SELECT_STATE);
                break;
            }
        }

        if (GameConfig.CURRENT_STATE === 0) this.NEXT = 'Decor';
        if (GameConfig.CURRENT_STATE === 1) this.NEXT = 'Dress1';
        if (GameConfig.CURRENT_STATE === 2) this.NEXT = 'Dress2';
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        this.girl1 = this.game.add.sprite(117 - 700, 53,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Gr5);
        this.girl2 = this.game.add.sprite(443 + 700, 65,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Gr6);
        this.label = this.game.add.sprite(188, 363,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Title);
        this.flash = this.game.add.sprite(377, -2,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Flash);

        GuiUtils.centrize(this.label);
        GuiUtils.centrize(this.flash);

        this.label.scale.setTo(0);
        this.flash.scale.setTo(0);

        this.container = this.game.add.group();

        this.sel1 = GuiUtils.makeButton(
            this, this.container, 239, 214, 1,
            'sel1', ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Sel1,
            GameConfig.CURRENT_STATE === 0, true, true,
            this.nextState, null, null
        );
        this.sel2 = GuiUtils.makeButton(
            this, this.container, 279, 375, 1,
            'sel2', ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Sel2,
            GameConfig.CURRENT_STATE === 1, true, true,
            this.nextState, null, null
        );
        this.sel3 = GuiUtils.makeButton(
            this, this.container, 233, 539, 1,
            'sel3', ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Sel3,
            GameConfig.CURRENT_STATE === 2, true, true,
            this.nextState, null, null
        );
        this.sel1.scale.setTo(0);
        this.sel2.scale.setTo(0);
        this.sel3.scale.setTo(0);
        this.sel1.alpha = 0;
        this.sel2.alpha = 0;
        this.sel3.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const moreBtn = this.gui.addExtraMore(
            960 - 148, 720 - 173,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeScaleAnimation(moreBtn, 1.05, Phaser.Timer.SECOND * .5);

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        if (GameConfig.CURRENT_STATE === 0) {
            TweenUtils.fadeAndScaleIn(this.label, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
            TweenUtils.moveIn(this.girl1, 117, 53, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
            TweenUtils.moveIn(this.girl2, 443, 65, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2.5);
            TweenUtils.fadeAndScaleIn(this.flash, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3.5, () => {
                this.flash.filters = [EffectUtils.makeGlowAnimation(0xff0000, Phaser.Timer.SECOND * .75, true, 1, 250)];
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.moveInOut(this.girl1, 23, 53, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * .5);
                    TweenUtils.moveInOut(this.girl2, 583, 65, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * .5);
                    TweenUtils.fadeAndScaleOut(this.flash, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
                    TweenUtils.moveAndScaleOut(this.label, 487, 112, .768, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
                        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
                            TweenUtils.fadeAndScaleIn(this.sel1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0);
                            TweenUtils.fadeAndScaleIn(this.sel2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
                            TweenUtils.fadeAndScaleIn(this.sel3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                                this.sel1.filters = [EffectUtils.makeGlowAnimation(0xffff99)];
                                EffectUtils.makeScaleAnimation(this.sel1);
                            }, this);
                        }, this);
                    }, this);
                }, this);
            }, this);
        }
        else {
            TweenUtils.moveIn(this.girl1, 23, 53, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
            TweenUtils.moveIn(this.girl2, 583, 65, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
            TweenUtils.moveAndScaleOut(this.label, 487, 112, .768, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
            TweenUtils.fadeAndScaleIn(this.sel1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
            TweenUtils.fadeAndScaleIn(this.sel2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
            TweenUtils.fadeAndScaleIn(this.sel3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2, () => {
                if (GameConfig.CURRENT_STATE === 0) this.sel1.filters = [EffectUtils.makeGlowAnimation(0xffff99)];
                if (GameConfig.CURRENT_STATE === 0) EffectUtils.makeScaleAnimation(this.sel1);
                if (GameConfig.CURRENT_STATE === 1) this.sel2.filters = [EffectUtils.makeGlowAnimation(0xffff99)];
                if (GameConfig.CURRENT_STATE === 1) EffectUtils.makeScaleAnimation(this.sel2);
                if (GameConfig.CURRENT_STATE === 2) this.sel3.filters = [EffectUtils.makeGlowAnimation(0xffff99)];
                if (GameConfig.CURRENT_STATE === 2) EffectUtils.makeScaleAnimation(this.sel3);
            }, this);
        }

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            if (GameConfig.CURRENT_STATE === 0) PreloaderUtils.preloadDecorState();
            if (GameConfig.CURRENT_STATE === 1) PreloaderUtils.preloadDress1State();
            if (GameConfig.CURRENT_STATE === 2) PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL || GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
            AdUtils.playAds();
        }
        else if (GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD && GameConfig.CURRENT_STATE === 1) {
            AdUtils.playAds();
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.bg.destroy(true);
        this.sel1.destroy(true);
        this.sel2.destroy(true);
        this.sel3.destroy(true);
        this.container.destroy(true);
        this.girl1.destroy(true);
        this.girl2.destroy(true);
        this.label.destroy(true);
        this.flash.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

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

