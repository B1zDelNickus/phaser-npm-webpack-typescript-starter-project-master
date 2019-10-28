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
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';

export default class Kjhyyiidjhdhdhd extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private boy1: Phaser.Sprite = null;
    private boy2: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.RESULT_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        GameConfig.DECOR_1.insert();

        this.boy1 = this.game.add.sprite(197, 27,
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.Gr1);
        this.boy2 = this.game.add.sprite(630, 25,
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.Gr2);

        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_1.insert();

        GameConfig.DOLL_1.setPosition(176, 30);
        GameConfig.DOLL_2.setPosition(399, 0);

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                260, 20, 1,
                'one', ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
                ImageUtils.getAtlasClass('AtlasesStateResult').Frames.FeatherBtn,
                true, true, true,
                this.onSelect);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                605, 20, 1,
                'two', ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
                ImageUtils.getAtlasClass('AtlasesStateResult').Frames.FeatherBtn,
                true, true, true,
                this.onSelect);

        this.btn1.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.scale.setTo(0);
        this.btn2.alpha = 0;

        EffectUtils.makeLightRotateAnimation(this.btn1);
        EffectUtils.makeLightRotateAnimation(this.btn2);
        this.btn1.filters = [EffectUtils.makeLightGlowAnimation(0xffff66)];
        this.btn2.filters = [EffectUtils.makeLightGlowAnimation(0xffff66)];

        this.label = this.game.add.sprite(142, 639 - 720,
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.Label);

        // GUI Buttons
        this.gui.addGui(false);
        this.gui.addExtraMoreAnimated(
            960 - 155, 720 - 155,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621626').getName(), 1, false,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
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
        TweenUtils.bounceIn(this.label, 142, 639, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.5);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    onSelect(sprite: Phaser.Button) {
        this.game.tweens.removeFrom(this.btn1);
        this.game.tweens.removeFrom(this.btn2);
        this.game.tweens.removeFrom(this.btn1.scale);
        this.game.tweens.removeFrom(this.btn2.scale);
        if (sprite === this.btn1) {
            TweenUtils.fadeAndScaleOut(this.btn2);
            this.game.add.tween(this.btn1.scale)
                .to({ x: 3, y: 3 },
                    Phaser.Timer.SECOND * 1.5,
                    Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.btn1)
                .to({ x: 480, y: 360, alpha: 0, angle: 720 },
                    Phaser.Timer.SECOND * 1.5,
                    Phaser.Easing.Linear.None, true)
                .onComplete
                .add(() => {
                    this.nextState();
                }, this);
            GameConfig.GAME_RESULT = 1;
        }
        else {
            TweenUtils.fadeAndScaleOut(this.btn1);
            this.game.add.tween(this.btn2.scale)
                .to({ x: 3, y: 3 },
                    Phaser.Timer.SECOND * 1.5,
                    Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.btn2)
                .to({ x: 480, y: 360, alpha: 0, angle: 720 },
                    Phaser.Timer.SECOND * 1.5,
                    Phaser.Easing.Linear.None, true)
                .onComplete
                .add(() => {
                    this.nextState();
                }, this);
            GameConfig.GAME_RESULT = 2;
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.label) this.label.destroy(true);
        if (this.boy1) this.boy1.destroy(true);
        if (this.boy2) this.boy2.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.extract();
        GameConfig.DOLL_2.extract();
        GameConfig.DECOR_1.extract();
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

