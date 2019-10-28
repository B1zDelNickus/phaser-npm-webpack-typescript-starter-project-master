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

export default class Kllljjdhdhdhdh extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private currentDecor: DecorBackground = null;
    private decorCindy: DecorBackground = null;
    private decorBelle: DecorBackground = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private cindy: Phaser.Button = null;
    private belle: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;

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
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        this.decorCindy = new DecorBackground()
            .layer('bot')
                .item(58, 74,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot1)
                .item(113, 24,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot2)
                .item(115, 109,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot3)
                .item(32, 58,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot4)
            .build()
            .layer('top')
                .item(578, 110,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top1)
                .item(553, 95,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top2)
                .item(579, 108,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top3)
                .item(577, 98,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top4)
            .build()
            .layer('acs')
                .item(350, 8,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs1)
                .item(350, 84,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs2)
                .item(352, 13,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs3)
                .item(348, 52,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs4)
            .build()
            .layer('shoe')
                .item(376, 318,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe1)
                .item(360, 324,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe2)
                .item(382, 319,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe3)
                .item(363, 335,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe4)
            .build();

        this.decorBelle = new DecorBackground()
            .layer('bot')
            .item(58, 74,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot1)
            .item(113, 24,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot2)
            .item(115, 109,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot3)
            .item(32, 58,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Bot4)
            .build()
            .layer('top')
            .item(578, 110,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top1)
            .item(553, 95,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top2)
            .item(579, 108,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top3)
            .item(577, 98,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Top4)
            .build()
            .layer('acs')
            .item(350, 8,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs1)
            .item(350, 84,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs2)
            .item(352, 13,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs3)
            .item(348, 52,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Acs4)
            .build()
            .layer('shoe')
            .item(376, 318,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe1)
            .item(360, 324,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe2)
            .item(382, 319,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe3)
            .item(363, 335,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Shoe4)
            .build();

        this.decorCindy.show(true);
        this.decorBelle.hide(true);

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                190, 603, 1,
                'top', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.TopBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                307, 603, 1,
                'bot', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.BotBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                421, 603, 1,
                'shoe', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ShoeBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                535, 603, 1,
                'acs', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.AcsBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                648, 603, 1,
                'mmmm', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Mmmm,
                GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
                GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.cindy =
            GuiUtils.makeButton(
                this, this.btnContainer,
                -36 - 500, 351 + 500, 1,
                'cindy', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gr7,
                false, true, true,
                this.onSelect, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.belle =
            GuiUtils.makeButton(
                this, this.btnContainer,
                777 + 500, 364 + 500, 1,
                'belle', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gr8,
                false, true, true,
                this.onSelect, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn5.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;
        this.btn5.alpha = 0;

        // Initiations
        this.currentDecor = this.decorCindy;

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
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
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.9);
        TweenUtils.fadeAndScaleIn(this.btn5, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.2);
        TweenUtils.moveIn(this.cindy, 96, 590, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3);
        TweenUtils.moveIn(this.belle, 914, 595, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3.5, () => {
            this.cindy.filters = [EffectUtils.makeGlowAnimation(0xffff66)];
            this.belle.inputEnabled = true;
            TweenUtils.moveInOut(this.cindy, this.cindy.x, this.cindy.y - 40, Phaser.Timer.SECOND * 1);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    onSelect(sprite: Phaser.Button) {
        if (sprite === this.cindy && this.currentDecor === this.decorCindy) return;
        if (sprite === this.belle && this.currentDecor === this.decorBelle) return;

        if (sprite === this.cindy) {
            this.currentDecor = this.decorCindy;
            this.decorBelle.hide();
            this.cindy.inputEnabled = false;
            this.belle.filters = null;
            this.belle.inputEnabled = true;
            TweenUtils.moveInOut(this.belle, this.belle.x, this.belle.y + 40, Phaser.Timer.SECOND * 1);
            TweenUtils.moveInOut(this.cindy, this.cindy.x, this.cindy.y - 40, Phaser.Timer.SECOND * 1);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, () => {
                this.decorCindy.show();
                this.cindy.filters = [EffectUtils.makeGlowAnimation(0xffff66)];
                /*this.belle.inputEnabled = true;
                TweenUtils.moveInOut(this.belle, this.belle.x, this.belle.y + 40, Phaser.Timer.SECOND * 1);
                TweenUtils.moveInOut(this.cindy, this.cindy.x, this.cindy.y - 40, Phaser.Timer.SECOND * 1);*/
            }, this);
        }
        else {
            this.currentDecor = this.decorBelle;
            this.decorCindy.hide();
            this.belle.inputEnabled = false;
            this.cindy.filters = null;
            this.cindy.inputEnabled = true;
            TweenUtils.moveInOut(this.belle, this.belle.x, this.belle.y - 40, Phaser.Timer.SECOND * 1);
            TweenUtils.moveInOut(this.cindy, this.cindy.x, this.cindy.y + 40, Phaser.Timer.SECOND * 1);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, () => {
                this.decorBelle.show();
                this.belle.filters = [EffectUtils.makeGlowAnimation(0xffff66)];
                /*this.cindy.inputEnabled = true;
                TweenUtils.moveInOut(this.belle, this.belle.x, this.belle.y - 40, Phaser.Timer.SECOND * 1);
                TweenUtils.moveInOut(this.cindy, this.cindy.x, this.cindy.y + 40, Phaser.Timer.SECOND * 1);*/
            }, this);
        }
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        this.currentDecor.next(name);
        if (this.currentDecor === this.decorCindy) this.cat1 = true;
        if (this.currentDecor === this.decorBelle) this.cat2 = true;
        if (this.cat1 && this.cat2) {
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
        this.btn5.destroy(true);
        this.belle.destroy(true);
        this.cindy.destroy(true);
        this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DECOR_1 = this.decorCindy.extract();
        GameConfig.DECOR_2 = this.decorBelle.extract();
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

