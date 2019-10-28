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

export default class fghfghfghfghfghfhfg extends Phaser.State {

    private NEXT = 'Dress';
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

    private girl: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;
    private cat3: boolean = false;

    private g1: Phaser.Sprite = null;
    private g2: Phaser.Sprite = null;
    private g3: Phaser.Sprite = null;
    private moreB: Phaser.Button = null;
    private moreState: number = 0;
    private phase: number = 0;

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
        this.moreState = -1;
        this.phase = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.decorBg = new DecorBackground()
            .sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName())
            .layer('sub_b')
                .item(381, 282,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Sub1)
                .item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)
                .item(572, 321,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Sub3)
                /*.item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)*/
            .build()
            .layer('food')
                .item(0, 187,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Food1)
                .item(0, 152,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Food2)
                .item(0, 69,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Food3)
                /*.item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)*/
            .build()
            .layer('cup')
                .item(511, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').Frames.Cup1)
                .item(568, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').Frames.Cup2)
                .item(421, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').Frames.Cup3)
                /*.item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)*/
            .build()
            .layer('sub')
                .item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)
                .item(143, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Sub2)
                .item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)
                /*.item(557, 75,
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy)*/
            .build();

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                211, 587, 1,
                'cup', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.CupBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                343, 587, 1,
                'food', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.FoodBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                474, 587, 1,
                'sub', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.SubBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                605, 587, 1,
                'mmmm', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.MmmmBtn,
                GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
                GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;

        this.girl = this.game.add.sprite(419 + 700, 48,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gr1);
        this.cloud = this.game.add.sprite(65, 215,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Cl1);
        this.cloud.alpha = 0;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreB = this.gui.addExtraMore(960 - 173, 720 - 173,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            this.g1 = this.game.add.sprite(960 - 178 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr1);
            this.g1.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g1, 0);
            this.g2 = this.game.add.sprite(960 - 168 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr2);
            this.g2.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g2, 0);
            this.g3 = this.game.add.sprite(960 - 168 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr3);
            this.g3.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g3, 0);
            this.g1.scale.setTo(0);
            this.g2.scale.setTo(0);
            this.g3.scale.setTo(0);
            this.g1.alpha = 0;
            this.g2.alpha = 0;
            this.g3.alpha = 0;
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextMore, this);
        }
        this.playBtn = this.gui.addPlayBtn(() => {
            if (this.phase === 0) {
                this.phase++;
                TweenUtils.fadeAndScaleOut(this.playBtn);
                TweenUtils.moveOut(this.btn1, this.btn1.x, this.btn1.y + 500, 1000, 300);
                TweenUtils.moveOut(this.btn2, this.btn2.x, this.btn2.y + 500, 1000, 300);
                TweenUtils.moveOut(this.btn3, this.btn3.x, this.btn3.y + 500, 1000, 300);
                TweenUtils.moveOut(this.btn4, this.btn4.x, this.btn4.y + 500, 1000, 300, () => {
                    TweenUtils.fadeAndScaleIn(this.playBtn, 750);
                }, this);
            }
            else {
                this.nextState();
            }
        });
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        const goBtn = this.gui.addExtraBtn(268, 528,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.GoBtn, () => {
                TweenUtils.fadeAndScaleOut(goBtn);
                TweenUtils.fadeOut(this.cloud, 500, 1000);
                TweenUtils.slideOut(this.girl, 419 + 700, 1000, 1500, () => {
                    TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0);
                    TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0.3);
                    TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0.6);
                    TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0.9);
                }, this);
            });
        goBtn.scale.setTo(0);
        goBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.slideIn(this.girl, 419, 1000, 1000);
        TweenUtils.fadeIn(this.cloud, 500, 2000);
        TweenUtils.fadeAndScaleIn(goBtn, 750, 3000);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // ADS
        if (GameConfig.PUB_MODE === PublishMode.NORMAL || GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
            AdUtils.playAds();
        }
    }

    private nextMore() {
        this.moreState++;
        if (this.moreState > 2) {
            this.moreState = 0;
        }
        if (this.moreState === 0) {
            TweenUtils.customFadeAndScaleIn(this.g1, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        if (this.moreState === 1) {
            TweenUtils.customFadeAndScaleIn(this.g2, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        if (this.moreState === 2) {
            TweenUtils.customFadeAndScaleIn(this.g3, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 5, this.nextMore, this);
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        this.decorBg.next(name);
        if (name === 'sub')
            this.decorBg.next(name + '_b');
        if (name === 'cup') this.cat1 = true;
        if (name === 'food') this.cat2 = true;
        if (name === 'sub') this.cat3 = true;
        if (this.cat1 && this.cat2 && this.cat3) {
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
        this.girl.destroy(true);
        this.cloud.destroy(true);

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
        GameConfig.CURRENT_STATE++;
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

