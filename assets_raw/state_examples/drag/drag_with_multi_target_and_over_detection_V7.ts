import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {Chest} from './template/dress/chest';
import {AdUtils} from '../utils/ad/ad.utils';

export default class Ggdfgdfgdfgddg extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private chest: Chest = null;

    private curTar: Phaser.Graphics = null;
    private curDrag: Phaser.Button = null;
    private curItem: Phaser.Sprite = null;
    private cont1: Phaser.Sprite = null;
    private cont2: Phaser.Sprite = null;
    private cont3: Phaser.Sprite = null;
    private tar1: Phaser.Graphics = null;
    private tar2: Phaser.Graphics = null;
    private tar3: Phaser.Graphics = null;
    private cloud: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private ready: boolean = false;
    private beginBtn: Phaser.Button = null;
    private skipBtn: Phaser.Button = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private prevX: number = 0;
    private prevY: number = 0;
    private curW: number = 0;
    private curH: number = 0;
    private total: number = 0;

    private g1: Phaser.Sprite = null;
    private g2: Phaser.Sprite = null;
    private g3: Phaser.Sprite = null;
    private moreB: Phaser.Button = null;
    private moreState: number = 0;

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
        this.curTar = null;
        this.total = 0;
        this.moreState = -1;
        this.ready = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        this.cont1 = this.game.add.sprite(137, 423,
            ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.OrgCont);
        this.cont2 = this.game.add.sprite(364, 423,
            ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.PapCont);
        this.cont3 = this.game.add.sprite(592, 423,
            ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.GlaCont);
        this.tar1 = this.game.add.graphics(250, 490);
        this.tar1.beginFill(0xff0000);
        this.tar1.drawCircle(0, 0, 95);
        this.tar2 = this.game.add.graphics(480, 490);
        this.tar2.beginFill(0xff0000);
        this.tar2.drawCircle(0, 0, 95);
        this.tar3 = this.game.add.graphics(710, 490);
        this.tar3.beginFill(0xff0000);
        this.tar3.drawCircle(0, 0, 95);
        this.tar1.alpha = 0;
        this.tar2.alpha = 0;
        this.tar3.alpha = 0;

        this.chest = new Chest(this, 0)
            .static()
                .item(460, 235, 'paper1',
                    ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Paper1,
                    null)
                .item(356, 177, 'org2',
                    ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Org2,
                    null)
                .item(166, 62, 'paper2',
                    ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Paper2,
                    null)
                .item(476, 0, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Glass1,
                    null)
                .item(89, 190, 'glass2',
                    ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Glass2,
                    null)
                .item(82, 239, 'org1',
                    ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Org1,
                    null)
            .build()
            .build();

        this.chest.findItem('paper1').input.enableDrag(false, false, true, 10);
        this.chest.findItem('paper1').events.onInputDown.add(this.onDown, this);
        this.chest.findItem('paper1').events.onInputUp.add(this.onUp, this);
        this.chest.findItem('org2').input.enableDrag(false, false, true, 10);
        this.chest.findItem('org2').events.onInputDown.add(this.onDown, this);
        this.chest.findItem('org2').events.onInputUp.add(this.onUp, this);
        this.chest.findItem('paper2').input.enableDrag(false, false, true, 10);
        this.chest.findItem('paper2').events.onInputDown.add(this.onDown, this);
        this.chest.findItem('paper2').events.onInputUp.add(this.onUp, this);
        this.chest.findItem('glass1').input.enableDrag(false, false, true, 10);
        this.chest.findItem('glass1').events.onInputDown.add(this.onDown, this);
        this.chest.findItem('glass1').events.onInputUp.add(this.onUp, this);
        this.chest.findItem('glass2').input.enableDrag(false, false, true, 10);
        this.chest.findItem('glass2').events.onInputDown.add(this.onDown, this);
        this.chest.findItem('glass2').events.onInputUp.add(this.onUp, this);
        this.chest.findItem('org1').input.enableDrag(false, false, true, 10);
        this.chest.findItem('org1').events.onInputDown.add(this.onDown, this);
        this.chest.findItem('org1').events.onInputUp.add(this.onUp, this);

        this.girl = this.game.add.sprite(101 - 700, 63,
            ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Gr1);
        this.cloud = this.game.add.sprite(360, 211,
            ImageUtils.getAtlasClass('AtlasesStateDrag').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDrag').Frames.Cl1);
        this.cloud.alpha = 0;
        this.chest.disable();

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
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        this.beginBtn = this.gui.addExtraBtn(566, 527,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.GoBtn, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
                TweenUtils.slideOut(this.girl, 101 - 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                this.chest.enable();
                TweenUtils.customFadeAndScaleIn(this.skipBtn, 1, .77, 750, 1000);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;
        this.skipBtn = this.gui.addExtraBtn(-32, 580,
            ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.SkipDu, this.nextState,
            GuiUtils.addCustomOverHandler(0xffffff, .80),
            GuiUtils.addCustomOutHandler(.77)
        );
        this.skipBtn.scale.setTo(0);
        this.skipBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.slideIn(this.girl, 101, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4);

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
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

    private onDown(sprite: Phaser.Button) {
        sprite.filters = null;
        this.prevX = sprite.x;
        this.prevY = sprite.y;
        this.curW = sprite.width;
        this.curH = sprite.height;
        this.curDrag = sprite;
        // const scale = 150 / sprite.height;
        // TweenUtils.scale(sprite, scale < 1 ? scale : 1.1, Phaser.Timer.SECOND * .5, 0);
        if (sprite.name === 'paper1' || sprite.name === 'paper2') {
            this.curTar = this.tar2;
        }
        else if (sprite.name === 'org1' || sprite.name === 'org2') {
            this.curTar = this.tar1;
        }
        else if (sprite.name === 'glass1' || sprite.name === 'glass2') {
            this.curTar = this.tar3;
        }
        // EffectUtils.makeAlphaAnimation(this.curTar, 1, 750);
    }

    private onUp(sprite: Phaser.Button) {
        if (this.ready) {
            this.chest.disable();
            TweenUtils.fadeAndScaleOut(this.curDrag, 750, 0, () => {
                this.curDrag.visible = false;
                this.curDrag.inputEnabled = false;
                this.curTar = null;
                this.curDrag = null;
                this.curItem = null;
                this.ready = false;
                this.chest.enable();
            }, this);
            let cc: Phaser.Sprite;
            if (this.curTar === this.tar1) {
                cc = this.cont1;
            }
            else if (this.curTar === this.tar2) {
                cc = this.cont2;
            }
            else if (this.curTar === this.tar3) {
                cc = this.cont3;
            }
            cc.filters = [EffectUtils.makeLightGlowAnimation(0x00ff00, 250, true, 2)];
            TweenUtils.delayedCall(3000, () => {
                this.total++;
                if (this.total === 6) {
                    this.nextState();
                    TweenUtils.fadeAndScaleOut(this.skipBtn);
                }
            }, this);
        }
        else {
            TweenUtils.scale(sprite, 1);
            TweenUtils.moveInOut(sprite, this.prevX, this.prevY);
            // TweenUtils.kill(this.curTar);
            // TweenUtils.fadeOut(this.curTar);
            this.curTar = null;
            this.curDrag = null;
            this.curItem = null;
            this.ready = false;
        }
    }

    public update(): void {
        super.update(this.game);
        if (this.curTar !== null) {
            let boundA = new Phaser.Rectangle(
                this.curDrag.x + this.curW / 2 - this.curW * .2,
                this.curDrag.y + this.curH / 2 - this.curH * .2,
                this.curW * .4, this.curH * .4);
            let boundB = new Phaser.Rectangle(
                this.curTar.x + this.curTar.width / 2,
                this.curTar.y + this.curTar.height / 2,
                this.curTar.width, this.curTar.height);
            if (Phaser.Rectangle.intersects(boundA, boundB)) {
                this.ready = true;
                if (this.curDrag.scale.x === 1) {
                    // TweenUtils.scale(this.curDrag, .65, Phaser.Timer.SECOND * .75, 0);
                    this.game.add.tween(this.curDrag.scale).to({ x: .65, y: .65 }, 750, Phaser.Easing.Linear.None, true);
                }
                /*TweenUtils.kill(this.curTar);
                TweenUtils.fadeOut(this.curTar);
                this.curTar = null;
                this.curDrag.inputEnabled = false;
                TweenUtils.fadeAndScaleOut(this.curDrag);
                TweenUtils.fadeIn(this.curItem);
                this.total++;
                if (this.total === 8) {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * 2.5, this.nextState, this);
                }*/
            }
            else {
                this.ready = false;
                if (this.curDrag.scale.x === .65) {
                    this.game.add.tween(this.curDrag.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);
                }
            }
        }
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.chest) this.chest.dispose();

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

