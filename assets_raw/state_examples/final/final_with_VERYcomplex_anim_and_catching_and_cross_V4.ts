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
import {LikeDrop} from './template/result/like.drop';
import {IParticle} from './spec-effects/particle/i.particle';
import {WinnerParticles} from './spec-effects/particle/winner.particle';
import {Photo} from './template/result/photo.card';

export default class Hjfjfjfhfjfjjfjfjf extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private crossContainer: Phaser.Group = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private hrt1: Phaser.Sprite = null;
    private hrt2: Phaser.Sprite = null;
    private pad: Phaser.Sprite = null;
    private playBtn: Phaser.Button = null;
    private skipBtn: Phaser.Button = null;
    private doneBtn: Phaser.Button = null;
    private cross1: Phaser.Button = null;
    private cross2: Phaser.Button = null;
    private goBtn: Phaser.Button = null;
    private cindyDrop: LikeDrop = null;
    private belleDrop: LikeDrop = null;
    private cindyPart: IParticle = null;
    private bellePart: IParticle = null;
    private card1: Photo = null;
    private card2: Photo = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private skipped: boolean = false;

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
        this.skipped = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.cindyPart = new WinnerParticles(1, 1.5, 200, 45, -30, 30, 20, 70);
        this.cindyPart.init(
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lp4,
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lp5,
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lp6,
            ],
            300, 300
        );
        this.bellePart = new WinnerParticles(1, 1.5, 200, 45, -30, 30, 20, 70);
        this.bellePart.init(
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lp4,
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lp5,
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lp6,
            ],
            300, 660
        );

        this.card1 = new Photo(45 - 700, 125)
            .addBg(-30, -5, .35, 1, ImageUtils.getImageClass('ImagesBg3').getName(), null)
            .addContent(GameConfig.DECOR_1.getBody(), -30, -5, .35)
            .addMask(4, 4, 242, 242)
            .addFrame(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Photo);
        this.card2 = new Photo(691 + 700, 188)
            .addBg(-30, -5, .35, 1, ImageUtils.getImageClass('ImagesBg3').getName(), null)
            .addContent(GameConfig.DECOR_2.getBody(), -30, -5, .35)
            .addMask(4, 4, 242, 242)
            .addFrame(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Photo);
        this.card1.setAngle(15 - 120);
        this.card2.setAngle(-15 + 120);

        GameConfig.DOLL_4.insert();
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_1.insert();

        GameConfig.DOLL_1.setPosition(395, 92);
        GameConfig.DOLL_2.setPosition(492, 92);
        GameConfig.DOLL_3.setPosition(383, 94);
        GameConfig.DOLL_4.setPosition(493, 94);

        GameConfig.DOLL_1.setScale(.4);
        GameConfig.DOLL_2.setScale(.4);
        GameConfig.DOLL_3.setScale(.4);
        GameConfig.DOLL_4.setScale(.4);

        GameConfig.DOLL_1.setAlpha(0);
        GameConfig.DOLL_2.setAlpha(0);
        GameConfig.DOLL_3.setAlpha(0);
        GameConfig.DOLL_4.setAlpha(0);

        this.girl1 = this.game.add.sprite(270, 140 + 700,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr3);
        this.girl2 = this.game.add.sprite(380, 156 + 700,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr4);
        this.cloud1 = this.game.add.sprite(22, 178,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(653, 178,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cl2);
        this.label = this.game.add.sprite(231, 25,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Label);
        this.hrt1 = this.game.add.sprite(43, 481,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hrt1);
        this.hrt2 = this.game.add.sprite(773, 486,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hrt2);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        GuiUtils.centrize(this.hrt1);
        GuiUtils.centrize(this.hrt2);
        this.hrt1.alpha = 0;
        this.hrt2.alpha = 0;
        this.hrt1.scale.setTo(0);
        this.hrt2.scale.setTo(0);

        this.cindyDrop = new LikeDrop(100, 600,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hrt1, .75, 1);
        this.belleDrop = new LikeDrop(310, 790,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hrt2, .75, 1);

        this.crossContainer = this.game.add.group();
        this.crossContainer.add(this.game.add.sprite(
            32, 92,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Pad
        ));
        this.cross1 =
            GuiUtils.makeButton(
                this, this.crossContainer,
                176, 204, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross2 =
            GuiUtils.makeButton(
                this, this.crossContainer,
                490, 205, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.crossContainer.y = 720;

        this.btnContainer = this.game.add.group();
        this.doneBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                -5, 593, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.DoneFgc,
                true, false, true, this.showCross, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.skipBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                1, 593, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Skip,
                true, false, true, this.forceFinish, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.goBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                393, 557, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Go,
                true, false, true, this.begin, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.doneBtn.scale.setTo(0);
        this.doneBtn.alpha = 0;
        this.skipBtn.scale.setTo(0);
        this.skipBtn.alpha = 0;
        this.goBtn.scale.setTo(0);
        this.goBtn.alpha = 0;

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
        TweenUtils.moveIn(this.girl1, 270, 140, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.moveIn(this.girl2, 380, 156, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.5);
        TweenUtils.fadeAndScaleIn(this.goBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3.5);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    private showCross() {
        TweenUtils.fadeAndScaleOut(this.doneBtn);
        TweenUtils.moveIn(this.crossContainer, 0, 0, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
        TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
    }

    private begin() {
        TweenUtils.fadeOut(this.cloud1);
        TweenUtils.fadeOut(this.cloud2);
        TweenUtils.fadeAndScaleOut(this.goBtn);
        TweenUtils.fadeOut(this.label);
        TweenUtils.moveInOut(this.girl1, 13, 327, Phaser.Timer.SECOND * 1);
        TweenUtils.moveInOut(this.girl2, 628, 322, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.hrt1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1, () => {
            EffectUtils.makeScaleAnimation(this.hrt1, 1.2, 750);
        }, this);
        TweenUtils.fadeAndScaleIn(this.hrt2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1, () => {
            EffectUtils.makeScaleAnimation(this.hrt2, 1.25, 750);
        }, this);
        TweenUtils.fadeAndScaleIn(this.skipBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.delayedCall(4.5, () => {
            this.cindyDrop.start();
            this.belleDrop.start();
            this.stepOne();
        }, this);
    }

    private stepOne() {
        if (this.skipped) return;
        TweenUtils.fadeIn(GameConfig.DOLL_1.getBody(), Phaser.Timer.SECOND * .5, 0);
        TweenUtils.fadeIn(GameConfig.DOLL_2.getBody(), Phaser.Timer.SECOND * .5, 0, () => {
            TweenUtils.moveAndScaleIn(GameConfig.DOLL_1.getBody(), 213, 60, 1, Phaser.Timer.SECOND * 4, 0);
            TweenUtils.moveAndScaleIn(GameConfig.DOLL_2.getBody(), 485, 66, 1, Phaser.Timer.SECOND * 4, 0, () => {
                TweenUtils.moveOut(GameConfig.DOLL_1.getBody(), -600, 60, Phaser.Timer.SECOND * 1, 0);
                TweenUtils.moveOut(GameConfig.DOLL_2.getBody(), 1000, 66, Phaser.Timer.SECOND * 1, 0);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.stepTwo, this);
            }, this);
        }, this);
    }

    private stepTwo() {
        if (this.skipped) return;
        TweenUtils.fadeIn(GameConfig.DOLL_3.getBody(), Phaser.Timer.SECOND * .5, 0);
        TweenUtils.fadeIn(GameConfig.DOLL_4.getBody(), Phaser.Timer.SECOND * .5, 0, () => {
            TweenUtils.moveAndScaleIn(GameConfig.DOLL_3.getBody(), 200, 51, 1, Phaser.Timer.SECOND * 4, 0);
            TweenUtils.moveAndScaleIn(GameConfig.DOLL_4.getBody(), 484, 35, 1, Phaser.Timer.SECOND * 4, 0, () => {
                TweenUtils.moveOut(GameConfig.DOLL_3.getBody(), -600, 51, Phaser.Timer.SECOND * 1, 0);
                TweenUtils.moveOut(GameConfig.DOLL_4.getBody(), 1000, 35, Phaser.Timer.SECOND * 1, 0);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.stepThree, this);
            }, this);
        }, this);
    }

    private stepThree() {
        if (this.skipped) return;
        TweenUtils.moveAndRotate(this.card1.getBody(), 45, 125, 15, Phaser.Timer.SECOND * 1, 0);
        TweenUtils.moveAndRotate(this.card2.getBody(), 691, 188, -15, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.finish, this);
        }, this);
    }

    private finish() {
        if (this.skipped) return;
        this.cindyDrop.stop();
        this.belleDrop.stop();
        TweenUtils.kill(this.hrt1);
        TweenUtils.kill(this.hrt2);
        TweenUtils.fadeAndScaleOut(this.hrt1);
        TweenUtils.fadeAndScaleOut(this.hrt2);
        TweenUtils.fadeAndScaleOut(this.skipBtn);
        TweenUtils.moveIn(this.girl1, 170, 140, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
        TweenUtils.moveIn(this.girl2, 480, 156, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        if (this.cindyDrop.getTotal() > this.belleDrop.getTotal()) {
            this.cindyPart.start();
        }
        else {
            this.bellePart.start();
        }
        TweenUtils.fadeAndScaleIn(this.doneBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
    }

    private forceFinish() {
        this.skipped = true;
        this.cindyDrop.stop();
        this.belleDrop.stop();
        TweenUtils.kill(this.hrt1);
        TweenUtils.kill(this.hrt2);
        TweenUtils.fadeAndScaleOut(this.hrt1);
        TweenUtils.fadeAndScaleOut(this.hrt2);
        TweenUtils.fadeAndScaleOut(this.skipBtn);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.showCross, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.girl1) this.girl1.destroy(true);
        if (this.girl2) this.girl2.destroy(true);
        if (this.pad) this.pad.destroy(true);
        if (this.cross1) this.cross1.destroy(true);
        if (this.cross2) this.cross2.destroy(true);
        if (this.cloud1) this.cloud1.destroy(true);
        if (this.cloud2) this.cloud2.destroy(true);
        if (this.label) this.label.destroy(true);
        if (this.hrt1) this.hrt1.destroy(true);
        if (this.hrt2) this.hrt2.destroy(true);
        if (this.goBtn) this.goBtn.destroy(true);
        if (this.skipBtn) this.skipBtn.destroy(true);
        if (this.doneBtn) this.doneBtn.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.crossContainer) this.crossContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.cindyDrop.dispose();
        this.belleDrop.dispose();
        this.cindyPart.dispose();
        this.bellePart.dispose();

        GameConfig.DECOR_1.dispose();
        GameConfig.DECOR_2.dispose();
        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_4.dispose();

        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3 = null;
        GameConfig.DOLL_4 = null;
        GameConfig.DECOR_1 = null;
        GameConfig.DECOR_2 = null;
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.GAME_COMPLETED = true;
        GameConfig.CURRENT_STATE = 0;
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

