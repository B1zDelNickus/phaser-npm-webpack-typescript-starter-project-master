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
import {isNull, isUndefined} from 'util';
import {AdUtils} from '../utils/ad/ad.utils';
import {ImageUtils} from '../utils/images/image.utils';

export default class Kkfdkdkdfkdfkdfkdfkkdfk extends Phaser.State {

    private NEXT = 'Dress';
    private nextPrepared = false;

    private bg: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private backetS: Phaser.Sprite = null;
    private backet: Phaser.Sprite = null;
    private gui: IGui = null;
    private saver: ISaver = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private playBtn: Phaser.Button = null;
    private moreBtn: Phaser.Button = null;
    private skipBtn: Phaser.Button = null;
    private crossBtn: Phaser.Sprite = null;

    private total: number;

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
        this.girl = null;
        this.cloud = null;
        this.chest = null;
        this.total = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .static()
                .pageShelf(6, 0,
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Shelf4)
                .item(443, 2, 'no31',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No31,
                    null, null, null)
                .item(353, -3, 'no30',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No30,
                    null, null, null)
                .item(259, -2, 'yes29',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes29,
                    this.onItem)
                .item(148, -3, 'yes28',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes28,
                    this.onItem)
                .item(15, 0, 'no27',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No27,
                    null, null, null)
                .pageShelf(23, 217,
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Shelf3)
                .item(426, 206, 'no26',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No26,
                    null, null, null)
                .item(350, 208, 'yes25',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes25,
                    this.onItem)
                .item(300, 217, 'no24',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No24,
                    null, null, null)
                .item(206, 221, 'yes23',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes23,
                    this.onItem)
                .item(118, 224, 'no22',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No22,
                    null, null, null)
                .item(30, 233, 'yes21',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes21,
                    this.onItem)
                .item(449, 505, 'no20',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No20,
                    null, null, null)
                .item(350, 508, 'no19',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No19,
                    null, null, null)
                .item(223, 411, 'yes18',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes18,
                    this.onItem)
                .item(121, 573, 'yes17',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes17,
                    this.onItem)
                .item(77, 414, 'yes16',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes16,
                    this.onItem)
            ////// next
                .pageShelf(407, 3,
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Shelf2)
                .item(803, 66, 'no15',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No15,
                    null, null, null)
                .item(728, 65, 'yes14',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes14,
                    this.onItem)
                .item(646, 60, 'no13',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No13,
                    null, null, null)
                .item(553, 53, 'yes12',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes12,
                    this.onItem)
                .item(452, 64, 'no11',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No11,
                    null, null, null)
                .pageShelf(473, 251,
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Shelf1)
                .item(821, 226, 'yes10',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes10,
                    this.onItem)
                .item(733, 241, 'yes9',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes9,
                    this.onItem)
                .item(654, 251, 'no8',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No8,
                    null, null, null)
                .item(553, 251, 'no7',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No7,
                    null, null, null)
                .item(459, 251, 'yes6',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes6,
                    this.onItem)
                .item(494, 544, 'yes5',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes5,
                    this.onItem)
                .item(838, 574, 'no4',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No4,
                    null, null, null)
                .item(743, 583, 'no3',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.No3,
                    null, null, null)
                .item(657, 601, 'yes2',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes2,
                    this.onItem)
                .item(568, 609, 'yes1',
                    ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Yes1,
                    this.onItem)
                .build()
            .build();

        this.backetS = this.game.add.sprite(298, 580,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.BasketS);
        this.backet = this.game.add.sprite(341, 560,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Basket);
        this.girl = this.game.add.sprite(118 - 700, 264,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Gr1);
        this.cloud = this.game.add.sprite(368, 127,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Cl1);

        this.cloud.alpha = 0;
        this.chest.disable();

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreBtn = this.gui.addExtraMore(
                960 - 191, 720 - 148,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2,
            );
            this.addAnimation(this.moreBtn);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextMore, this);
        }
        this.crossBtn = this.gui.addExtraBtnAnimated(613, 438,
            ImageUtils.getSpritesheetClass('SpritesheetsMmmm17116911').getName(), 10, true,
            GuiUtils.goCross('http://mycutegames.com/Games/Princess/Cinderellas-Bridal-Fashion-Collection.html'),
            GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        // this.crossBtn.scale.setTo(0);
        // this.crossBtn.alpha = 0;
        this.skipBtn = this.gui.addExtraBtn(5, 720 - 91,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Skip,
            this.nextState,
            GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.skipBtn.scale.setTo(0);
        this.skipBtn.alpha = 0;
        this.playBtn = this.gui.addExtraBtn(530, 290,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Go,
            () => {
                TweenUtils.fadeAndScaleOut(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
                TweenUtils.moveOut(this.girl, 118 - 700, 264, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.fadeAndScaleIn(this.skipBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5, () => {
                    this.chest.enable();
                }, this);
            },
            GuiUtils.addOverHandler, GuiUtils.addOutHandler);
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

        // Animations goes here
        TweenUtils.moveIn(this.girl, 118, 264, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    private counter: number = 0;
    private sp1: Phaser.Sprite = null;
    private sp2: Phaser.Sprite = null;
    private sp3: Phaser.Sprite = null;
    private sp4: Phaser.Sprite = null;

    private addAnimation(sprite) {
        this.sp1 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp2 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp3 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp3);
        this.sp4 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp4);
        this.sp1.alpha = 0;
        this.sp2.alpha = 0;
        this.sp3.alpha = 0;
        this.sp4.alpha = 0;
        this.sp1.anchor.setTo(.5);
        this.sp2.anchor.setTo(.5);
        this.sp3.anchor.setTo(.5);
        this.sp4.anchor.setTo(.5);
        sprite.addChild(this.sp1);
        sprite.addChild(this.sp2);
        sprite.addChild(this.sp3);
        sprite.addChild(this.sp4);
    }
    private nextMore() {
        this.counter++;
        if (this.counter > 1) this.counter = 0;
        if (this.counter === 1) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            const t1 = this.game.add.tween(this.sp1).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, true).yoyo(true);
            const t2 = this.game.add.tween(this.sp2).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t3 = this.game.add.tween(this.sp3).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t4 = this.game.add.tween(this.sp4).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            t1.chain(t2);
            t2.chain(t3);
            t3.chain(t4);
            this.game.time.events.add(Phaser.Timer.SECOND *  2, this.nextMore, this);
        }
        else if (this.counter === 0) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2);
            this.game.time.events.add(Phaser.Timer.SECOND *  3, this.nextMore, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        (item.parent as Phaser.Group).setChildIndex(item, (item.parent as Phaser.Group).children.length - 1);
        this.total++;
        // this.chest.disable();
        const scale = 150 / item.height;
        TweenUtils.scale(item, scale < 1 ? scale : 1.1, Phaser.Timer.SECOND * .5, 0, () => {
            TweenUtils.moveOut(item, 445, 650, Phaser.Timer.SECOND * 1, 0, () => {
                if (this.total === 16) {
                    this.nextState();
                }
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

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
        this.chest.disable();
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

