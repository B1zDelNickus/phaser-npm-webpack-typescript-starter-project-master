import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {EffectUtils} from '../utils/effect.utils';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {Chest} from './template/dress/chest';
import {Doll} from './template/dress/doll';
import {AdUtils} from '../utils/ad/ad.utils';
import {isNull} from 'util';
import {ImageUtils} from '../utils/images/image.utils';

export default class Zxcddfgdfgdfgdfgd extends Phaser.State {

    private NEXT = 'Dress3';
    private nextPrepared = false;
    private changing = false;

    private currentChest: Chest = null;
    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private anna: Doll = null;
    private elza: Doll = null;
    private chestAnna: Chest = null;
    private chestElza: Chest = null;
    private cloud: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private mmmmContainer: Phaser.Group = null;
    private mmmm: Phaser.Button = null;

    private lArrow: Phaser.Button = null;
    private rArrow: Phaser.Button = null;
    private beginBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private annaDressed: boolean = false;
    private elzaDressed: boolean = false;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DRESS_STATE);
                break;
            }
        }

        this.anna = null;
        this.elza = null;

        this.anna = args[0] as Doll;
        this.elza = args[1] as Doll;

        this.changing = false;
        this.annaDressed = false;
        this.elzaDressed = false;
    }

    public preload(): void {
    }

    public create(): void {
        this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Bg2);

        // Chests
        this.chestAnna = new Chest(this)
            .background(9, 19,
                ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Chest2)
            .static()
                .item(49, 139, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(151, 142, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(244, 137, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(333, 131, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(37, 274, 'bag5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(146, 269, 'bag6',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(261, 272, 'bag7',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(355, 276, 'bag8',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnBag8,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(45, 421, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(138, 399, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(244, 409, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(354, 415, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(102, 569, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(198, 570, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(290, 566, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(380, 564, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.AnShoe8,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .build();

        this.chestElza = new Chest(this)
            .background(9, 19,
                ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Chest2)
            .static()
                .item(46, 123, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(131, 134, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(244, 138, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(369, 106, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(43, 274, 'bag5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(154, 270, 'bag6',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(252, 268, 'bag7',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(378, 246, 'bag8',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElBag8,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(41, 424, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(142, 457, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(250, 419, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(360, 415, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(108, 581, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(197, 573, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(285, 600, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(370, 606, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.ElShoe8,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .build();

        // Dolls
        this.anna.insert();
        this.elza.insert();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.mmmmContainer = this.game.add.group();
            this.mmmm = GuiUtils.makeButton(this, this.mmmmContainer,
                831, 140, 1, '',
                ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Mmmm,
                false, true, true,
                GuiUtils.goLinkInMoreGames,
                GuiUtils.addCustomOverHandler(0xffff66),
                GuiUtils.addCustomOutHandler()
            );
        }

        this.cloud = this.game.add.sprite(415 + 25, 142 + 20,
            ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Cl4);

        this.cloud.alpha = 0;
        this.anna.show(true);
        this.elza.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 182,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.EMore,
            GuiUtils.addOverScaleHandler,
            GuiUtils.addOutScaleHandler
        );
        this.lArrow = this.gui.addExtraBtn(460, 340,
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.LArrFgc,
            this.changeDoll,
            GuiUtils.addCustomOverHandler(0xffff66, .79),
            GuiUtils.addCustomOutHandler(.75)
        );
        this.rArrow = this.gui.addExtraBtn(740, 340,
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.RArrFgc,
            this.changeDoll,
            GuiUtils.addCustomOverHandler(0xffff66, .79),
            GuiUtils.addCustomOutHandler(.75)
        );
        this.beginBtn = this.gui.addExtraBtn(735 + 25, 396 + 20,
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.DoneFgc,
            () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn, Phaser.Timer.SECOND * .5)[1]
                    .onComplete.addOnce(() => {
                        this.beginBtn.visible = false;
                    }, this);
                new Animation()
                    .add(this.cloud, { alpha: 0 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0)
                    .animate(() => {
                        this.chestAnna.show();
                        TweenUtils.customFadeAndScaleIn(this.lArrow, 1, .75, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                        TweenUtils.customFadeAndScaleIn(this.rArrow, 1, .75, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
                            this.mmmm.inputEnabled = true;
                            this.mmmm.filters = [EffectUtils.makeGlowAnimation(0xffff66)];
                        }
                    }, this);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;
        this.lArrow.scale.setTo(0);
        this.lArrow.alpha = 0;
        this.rArrow.scale.setTo(0);
        this.rArrow.alpha = 0;
        moreBtn.filters = [EffectUtils.makeGlowAnimation(0xff33ff)];
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

        // Initalizations
        this.currentChest = this.chestAnna;
        this.currentDoll = this.anna;

        // Animations goes here
        new Animation()
            .add(this.cloud, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5)
            .animate(() => {
                TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
            }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress3State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            AdUtils.playAds();
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;

        if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('shoe', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
        }

        if (this.currentDoll === this.anna) this.annaDressed = true;
        if (this.currentDoll === this.elza) this.elzaDressed = true;

        if (this.playBtn.alpha === 0 && this.annaDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(): void {
        if (this.changing) return;
        this.changing = true;

        this.currentDoll.hide();
        this.currentChest.hide();

        if (this.currentDoll === this.anna) {
            this.currentDoll = this.elza;
            this.currentChest = this.chestElza;
        } else {
            this.currentDoll = this.anna;
            this.currentChest = this.chestAnna;
        }

        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDoll.show();
            this.currentChest.show();

            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    private nextPage(): void {
        this.currentChest.nextPage();
    }

    private prevPage(): void {
        this.currentChest.prevPage();
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentDoll = null;
        this.currentChest = null;

        this.chestAnna.dispose();
        this.chestElza.dispose();

        this.cloud.destroy(true);
        if (!isNull(this.mmmmContainer)) this.mmmmContainer.destroy(true);
        if (!isNull(this.mmmm)) this.mmmm.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.anna.extract();
        this.elza.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chestAnna.disable();
        this.chestElza.disable();
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
            this.game.state.start(this.NEXT, true, false, this.anna, this.elza);
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

