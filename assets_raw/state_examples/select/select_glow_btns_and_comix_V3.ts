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

export default class Eerrterfghfghfg extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private glow1: Phaser.Sprite = null;
    private glow2: Phaser.Sprite = null;
    private glow3: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
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

        if (GameConfig.CURRENT_STATE === 0) this.NEXT = 'Dress1';
        if (GameConfig.CURRENT_STATE === 1) this.NEXT = 'Dress2';
        if (GameConfig.CURRENT_STATE === 2) this.NEXT = 'Dress3';
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.glow2 = this.game.add.sprite(377, 10,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Sel2Glow);
        this.glow1 = this.game.add.sprite(94, 34,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Sel1Glow);
        this.glow3 = this.game.add.sprite(459, 34,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Sel3Glow);

        this.container = this.game.add.group();

        this.sel2 = GuiUtils.makeButton(
            this, this.container, 388, 17, 1,
            'sel2', ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Sel2,
            GameConfig.CURRENT_STATE === 1, true, true,
            this.nextState, null, null
        );
        this.sel1 = GuiUtils.makeButton(
            this, this.container, 101, 42, 1,
            'sel1', ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Sel1,
            GameConfig.CURRENT_STATE === 0, true, true,
            this.nextState, null, null
        );
        this.sel3 = GuiUtils.makeButton(
            this, this.container, 468, 41, 1,
            'sel3', ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Sel3,
            GameConfig.CURRENT_STATE === 2, true, true,
            this.nextState, null, null
        );

        this.cloud = this.game.add.sprite(209, 215,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Cl1);

        this.cloud.alpha = 0;
        this.glow1.alpha = 0;
        this.glow2.alpha = 0;
        this.glow3.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(() => {
            TweenUtils.fadeAndScaleOut(playBtn);
            TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5, () => {
                if (GameConfig.CURRENT_STATE === 0) EffectUtils.makeAlphaAnimation(this.glow1, 1, Phaser.Timer.SECOND * 1);
                if (GameConfig.CURRENT_STATE === 1) EffectUtils.makeAlphaAnimation(this.glow2, 1, Phaser.Timer.SECOND * 1);
                if (GameConfig.CURRENT_STATE === 2) EffectUtils.makeAlphaAnimation(this.glow3, 1, Phaser.Timer.SECOND * 1);
            }, this);
        });
        const moreBtn = this.gui.addExtraMore(
            960 - 191, 720 - 202,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeScaleAnimation(moreBtn, 1.05, Phaser.Timer.SECOND * .5);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

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
            TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
            TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
        }
        else {
            if (GameConfig.CURRENT_STATE === 0) EffectUtils.makeAlphaAnimation(this.glow1, 1, Phaser.Timer.SECOND * 1);
            if (GameConfig.CURRENT_STATE === 1) EffectUtils.makeAlphaAnimation(this.glow2, 1, Phaser.Timer.SECOND * 1);
            if (GameConfig.CURRENT_STATE === 2) EffectUtils.makeAlphaAnimation(this.glow3, 1, Phaser.Timer.SECOND * 1);
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

