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
import {DecorBackground} from './template/decor/decor.background';

export default class Ljdfjhdfhhh extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private decorBg: DecorBackground = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;
    private cat3: boolean = false;
    private cat4: boolean = false;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DECOR_STATE);
                break;
            }
        }
        this.cat1 = false;
        this.cat2 = false;
        this.cat3 = false;
        this.cat4 = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        this.decorBg = new DecorBackground(223, 84)
            .layer('ground', false)
                .item(-11, -17,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Ground1)
                .item(-11, -17,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Ground2)
                .item(-11, -17,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Ground3)
            .build()
            .layer('gliter', false)
                .item(14, 11,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Gliter1)
                .item(14, 11,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Gliter2)
                .item(14, 11,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Gliter3)
            .build()
            .layer('rose', false)
                .item(68, 61,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Rose1)
                .item(68, 61,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Rose2)
                .item(68, 61,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Rose3)
            .build()
            .layer('text', false)
                .item(73, 125,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Text1)
                .item(73, 125,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Text2)
                .item(73, 125,
                    ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                    ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Text3)
            .build();

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                44, 118, 1,
                'gliter', ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Cat1,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler, this.onDown, this.onUp);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                44, 370, 1,
                'text', ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Cat2,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler, this.onDown, this.onUp);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                736, 118, 1,
                'rose', ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Cat3,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler, this.onDown, this.onUp);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                736, 370, 1,
                'ground', ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').Frames.Cat4,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler, this.onDown, this.onUp);

        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 144, 720 - 144,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getName(), 7, true,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.9);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    onDown(sprite: Phaser.Button) {
        this.game.tweens.removeFrom(sprite);
        sprite.y = (sprite.name === 'gliter' || sprite.name === 'rose') ? 118 + 179 / 2 : 370 + 179 / 2;
        this.game.add.tween(sprite).to({ y: (sprite.name === 'gliter' || sprite.name === 'rose') ? 123 + 179 / 2 : 375 + 179 / 2 }, 150, Phaser.Easing.Circular.In, true).yoyo(true);
    }

    onUp(sprite: Phaser.Button) {
        // this.game.tweens.removeFrom(sprite);
        // this.game.add.tween(sprite).to({ y: (sprite.name === 'gliter' || sprite.name === 'rose') ? 118 + 179 / 2 : 370 + 179 / 2 }, 150, Phaser.Easing.Circular.In, true);
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        this.decorBg.next(name);
        if (name === 'ground') this.cat1 = true;
        if (name === 'gliter') this.cat2 = true;
        if (name === 'rose') this.cat3 = true;
        if (name === 'text') this.cat4 = true;
        if (this.cat1 && this.cat2 && this.cat3 && this.cat4) {
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DECOR_1 = this.decorBg.extract();
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
        GameConfig.CURRENT_STATE++;
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

