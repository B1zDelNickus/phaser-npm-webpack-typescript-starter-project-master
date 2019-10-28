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

export default class Ghgjghjghjghjgh extends Phaser.State {

    private NEXT = 'Dress1';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private mmmmBtn: Phaser.Sprite = null;
    private boxAriel: Chest = null;
    private boxEric: Chest = null;

    private curTar: Phaser.Sprite = null;
    private curDrag: Phaser.Button = null;
    private curItem: Phaser.Sprite = null;
    private ar1: Phaser.Sprite = null;
    private ar2: Phaser.Sprite = null;
    private ar3: Phaser.Sprite = null;
    private ar4: Phaser.Sprite = null;
    private er1: Phaser.Sprite = null;
    private er2: Phaser.Sprite = null;
    private er3: Phaser.Sprite = null;
    private er4: Phaser.Sprite = null;
    private arCont1: Phaser.Sprite = null;
    private arCont2: Phaser.Sprite = null;
    private arCont3: Phaser.Sprite = null;
    private arCont4: Phaser.Sprite = null;
    private erCont1: Phaser.Sprite = null;
    private erCont2: Phaser.Sprite = null;
    private erCont3: Phaser.Sprite = null;
    private erCont4: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private prevX: number = 0;
    private prevY: number = 0;
    private total: number = 0;

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
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        this.ar1 =
            this.game.add.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Ar1);
        this.ar2 =
            this.game.add.sprite(241, 622,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Ar2);
        this.ar3 =
            this.game.add.sprite(231, 385,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Ar3);
        this.ar4 =
            this.game.add.sprite(230, 235,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Ar4);
        this.er2 =
            this.game.add.sprite(551, 214,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Er2);
        this.er4 =
            this.game.add.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Er4);
        this.er1 =
            this.game.add.sprite(23, 344,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Er1);
        this.er3 =
            this.game.add.sprite(11, 500,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Er3);
        this.ar1.alpha = 0;
        this.ar2.alpha = 0;
        this.ar3.alpha = 0;
        this.ar4.alpha = 0;
        this.er1.alpha = 0;
        this.er2.alpha = 0;
        this.er3.alpha = 0;
        this.er4.alpha = 0;

        this.btnContainer = this.game.add.group();
        this.mmmmBtn =
            GuiUtils.makeSpritesheetButton(this, this.btnContainer,
                373, 207, 1, 8, true, '',
                ImageUtils.getSpritesheetClass('SpritesheetsMmmm1612035').getName(), null,
                GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
                GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.arCont1 =
            this.game.add.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArCon1);
        this.arCont2 =
            this.game.add.sprite(241, 615,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArCon2);
        this.arCont3 =
            this.game.add.sprite(223, 373,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArCon3);
        this.arCont4 =
            this.game.add.sprite(220, 224,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArCon4);
        this.erCont2 =
            this.game.add.sprite(543, 203,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErCon2);
        this.erCont4 =
            this.game.add.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErCon4);
        this.erCont1 =
            this.game.add.sprite(12, 333,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErCon1);
        this.erCont3 =
            this.game.add.sprite(0, 488,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErCon3);
        this.arCont1.alpha = 0;
        this.arCont2.alpha = 0;
        this.arCont3.alpha = 0;
        this.arCont4.alpha = 0;
        this.erCont1.alpha = 0;
        this.erCont2.alpha = 0;
        this.erCont3.alpha = 0;
        this.erCont4.alpha = 0;

        this.boxAriel = new Chest(this, 700)
            .static()
                .pageShelf(461, 471,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box11)
                .item(663, 404, 'ar_item3',
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArItem3,
                    null)
                .item(746, 346, 'ar_item2',
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArItem2,
                    null)
                .pageShelf(593, 487,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box12)
                .item(572, 482, 'ar_item4',
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArItem4,
                    null)
                .pageShelf(593, 584,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box13)
                .item(690, 571, 'ar_item1',
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArItem1,
                    null)
                .pageShelf(593, 605,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box14)
            .build()
            .build();
        this.boxEric = new Chest(this, -700)
            .static()
            .pageShelf(48, 466,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box21)
            .item(63, 404, 'er_item4',
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErItem4,
                null)
            .item(158, 368, 'er_item2',
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErItem2,
                null)
            .pageShelf(88, 480,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box22)
            .item(199, 483, 'er_item1',
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErItem1,
                null)
            .pageShelf(91, 581,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box23)
            .item(133, 565, 'er_item3',
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ErItem3,
                null)
            .pageShelf(91, 603,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Box24)
            .build()
            .build();
        this.boxAriel.findItem('ar_item1').input.enableDrag(false, false, true, 10);
        this.boxAriel.findItem('ar_item1').events.onInputUp.add(this.onUp, this);
        this.boxAriel.findItem('ar_item1').events.onInputDown.add(this.onDown, this);
        this.boxAriel.findItem('ar_item2').input.enableDrag(false, false, true, 10);
        this.boxAriel.findItem('ar_item2').events.onInputUp.add(this.onUp, this);
        this.boxAriel.findItem('ar_item2').events.onInputDown.add(this.onDown, this);
        this.boxAriel.findItem('ar_item3').input.enableDrag(false, false, true, 10);
        this.boxAriel.findItem('ar_item3').events.onInputUp.add(this.onUp, this);
        this.boxAriel.findItem('ar_item3').events.onInputDown.add(this.onDown, this);
        this.boxAriel.findItem('ar_item4').input.enableDrag(false, false, true, 10);
        this.boxAriel.findItem('ar_item4').events.onInputUp.add(this.onUp, this);
        this.boxAriel.findItem('ar_item4').events.onInputDown.add(this.onDown, this);
        this.boxEric.findItem('er_item1').input.enableDrag(false, false, true, 10);
        this.boxEric.findItem('er_item1').events.onInputUp.add(this.onUp, this);
        this.boxEric.findItem('er_item1').events.onInputDown.add(this.onDown, this);
        this.boxEric.findItem('er_item2').input.enableDrag(false, false, true, 10);
        this.boxEric.findItem('er_item2').events.onInputUp.add(this.onUp, this);
        this.boxEric.findItem('er_item2').events.onInputDown.add(this.onDown, this);
        this.boxEric.findItem('er_item3').input.enableDrag(false, false, true, 10);
        this.boxEric.findItem('er_item3').events.onInputUp.add(this.onUp, this);
        this.boxEric.findItem('er_item3').events.onInputDown.add(this.onDown, this);
        this.boxEric.findItem('er_item4').input.enableDrag(false, false, true, 10);
        this.boxEric.findItem('er_item4').events.onInputUp.add(this.onUp, this);
        this.boxEric.findItem('er_item4').events.onInputDown.add(this.onDown, this);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            const moreBtn = this.gui.addExtraMore(799, 460,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            TweenUtils.callEvery(Phaser.Timer.SECOND * 2, () => {
                EffectUtils.makeRotateAnimation(moreBtn, 100, -10);
            }, this);
            const fl1 = this.game.add.sprite(799, 460,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
            const fl2 = this.game.add.sprite(799, 460,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
            fl1.alpha = 0;
            fl2.alpha = 0;
            EffectUtils.makeAlphaAnimation(fl1);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, () => {
                EffectUtils.makeAlphaAnimation(fl2);
            }, this);
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
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
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.boxEric.show, this.boxEric);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, this.boxAriel.show, this.boxAriel);

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private onDown(sprite: Phaser.Button) {
        sprite.filters = null;
        this.prevX = sprite.x;
        this.prevY = sprite.y;
        this.curDrag = sprite;
        if (sprite.name === 'ar_item1') {
            this.curTar = this.arCont1;
            this.curItem = this.ar1;
        }
        else if (sprite.name === 'ar_item2') {
            this.curTar = this.arCont2;
            this.curItem = this.ar2;
        }
        else if (sprite.name === 'ar_item3') {
            this.curTar = this.arCont3;
            this.curItem = this.ar3;
        }
        else if (sprite.name === 'ar_item4') {
            this.curTar = this.arCont4;
            this.curItem = this.ar4;
        }
        else if (sprite.name === 'er_item1') {
            this.curTar = this.erCont1;
            this.curItem = this.er1;
        }
        else if (sprite.name === 'er_item2') {
            this.curTar = this.erCont2;
            this.curItem = this.er2;
        }
        else if (sprite.name === 'er_item3') {
            this.curTar = this.erCont3;
            this.curItem = this.er3;
        }
        else if (sprite.name === 'er_item4') {
            this.curTar = this.erCont4;
            this.curItem = this.er4;
        }
        EffectUtils.makeAlphaAnimation(this.curTar, 1, 750);
    }

    private onUp(sprite: Phaser.Button) {
        TweenUtils.moveInOut(sprite, this.prevX, this.prevY);
        TweenUtils.kill(this.curTar);
        TweenUtils.fadeOut(this.curTar);
        this.curTar = null;
        this.curDrag = null;
        this.curItem = null;
    }

    public update(): void {
        super.update(this.game);
        if (this.curTar !== null) {
            if (Phaser.Rectangle.intersects(
                new Phaser.Rectangle(
                    this.curTar.x + this.curTar.width / 2 - this.curTar.width * .2,
                    this.curTar.y + this.curTar.height / 2 - this.curTar.height * .2,
                    this.curTar.width * .4, this.curTar.height * .4),
                new Phaser.Rectangle(
                    this.curDrag.x - 5,
                    this.curDrag.y - 5, 10, 10))) { // this.curDrag.getBounds() as any)) {
                TweenUtils.kill(this.curTar);
                TweenUtils.fadeOut(this.curTar);
                this.curTar = null;
                this.curDrag.inputEnabled = false;
                TweenUtils.fadeAndScaleOut(this.curDrag);
                TweenUtils.fadeIn(this.curItem);
                this.total++;
                if (this.total === 8) {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * 2.5, this.nextState, this);
                }
            }
        }
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.mmmmBtn) this.mmmmBtn.destroy(true);
        if (this.arCont1) this.arCont1.destroy(true);
        if (this.arCont2) this.arCont2.destroy(true);
        if (this.arCont3) this.arCont3.destroy(true);
        if (this.arCont4) this.arCont4.destroy(true);
        if (this.erCont1) this.erCont1.destroy(true);
        if (this.erCont2) this.erCont2.destroy(true);
        if (this.erCont3) this.erCont3.destroy(true);
        if (this.erCont4) this.erCont4.destroy(true);
        if (this.boxAriel) this.boxAriel.dispose();
        if (this.boxEric) this.boxEric.dispose();

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

