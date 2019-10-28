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

export default class Kkdfjdfjdfdfhhdfggh extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private jas: Doll = null;
    private poco: Doll = null;
    private chest: Chest = null;
    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private jsBtn: Phaser.Button = null;
    private pcBtn: Phaser.Button = null;
    private beginBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private moreBtn: Phaser.Button = null;

    private jasDressed: boolean = false;
    private pocoDressed: boolean = false;

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

        this.jas = null;
        this.poco = null;
        this.changing = false;
        this.jasDressed = false;
        this.pocoDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chest = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(0, 6,
                ImageUtils.getImageClass('ImagesChest').getName(), null)
            .page()
                .pageShelf(17, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .item(356, 52, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress7,
                    this.onItem)
                .item(283, 50, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress6,
                    this.onItem)
                .item(201, 56, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress5,
                    this.onItem)
                .item(167, 58, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress4,
                    this.onItem)
                .item(124, 60, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress3,
                    this.onItem)
                .item(59, 64, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress2,
                    this.onItem)
                .item(7, 67, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress1,
                    this.onItem)
                .item(35, 424, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe1,
                    this.onItem)
                .item(133, 452, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe2,
                    this.onItem)
                .item(228, 575, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe3,
                    this.onItem)
                .item(319, 566, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe4,
                    this.onItem)
                .item(394, 560, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(17, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .pageShelf(17, 306,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .item(327, 70, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top4,
                    this.onItem)
                .item(198, 70, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3,
                    this.onItem)
                .item(99, 74, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2,
                    this.onItem)
                .item(3, 73, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1,
                    this.onItem)
                .item(321, 290, 'top8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top8,
                    this.onItem)
                .item(205, 288, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top7,
                    this.onItem)
                .item(104, 288, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top6,
                    this.onItem)
                .item(10, 290, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(17, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .pageShelf(17, 306,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .item(354, 279, 'bot8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot8,
                    this.onItem)
                .item(244, 279, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot7,
                    this.onItem)
                .item(133, 281, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot6,
                    this.onItem)
                .item(-3, 279, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot5,
                    this.onItem)
                .item(357, 67, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4,
                    this.onItem)
                .item(210, 67, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3,
                    this.onItem)
                .item(128, 71, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2,
                    this.onItem)
                .item(21, 74, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(17, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .item(22, 260, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Sock1,
                    this.onItem)
                .item(66, 377, 'sock2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Sock2,
                    this.onItem)
                .item(185, 590, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
                    this.onItem)
                .item(288, 582, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag2,
                    this.onItem)
                .item(360, 480, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag3,
                    this.onItem)
                .item(353, 70, 'jack7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack7,
                    this.onItem)
                .item(260, 67, 'jack6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack6,
                    this.onItem)
                .item(208, 67, 'jack5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack5,
                    this.onItem)
                .item(158, 70, 'jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack4,
                    this.onItem)
                .item(104, 69, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack3,
                    this.onItem)
                .item(41, 67, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack2,
                    this.onItem)
                .item(5, 70, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack1,
                    this.onItem)
            .build()
            .page()
                .compoundItem(5, 2, -1, 109, 112, 'js_hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'JsHair',
                    this.onItem)
                .compoundItem(5, 2, -1, 109, 112, 'pc_hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'PcHair',
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .item(54, 124, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cross,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'))
                .item(200, 480, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'),
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
                .build()
            .rightArrow(460, 375,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArrowBtn)
            .build();

        this.chest.findItem('pc_hair').visible = false;

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            // EffectUtils.makeScaleAnimation(this.chestJas.findItem('mmmm_btn'), 1.05, 500);
            EffectUtils.makeScaleAnimation(this.chest.findItem('mmmm_btn'), 1.05, 500);
        }

        // Dolls
        this.jas = new Doll(this, 513, 49)
            .layer(0, 0, 'hat_b',
                'AtlasesDollJas',
                'HtB', null, true)
            .layer(0, 0, 'hair_b',
                'AtlasesDollJas',
                'HB', 'HB1')
            .layer(0, 0, 'neck_b',
                'AtlasesDollJas',
                'NkB', null, true)
            .layer(0, 0, 'jack_b',
                'AtlasesDollJas',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollJas',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollJas',
                'Und', 'Und')
            .layer(0, 0, 'sock',
                'AtlasesDollJas',
                'Sk', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollJas',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollJas',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollJas',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollJas',
                'T', null)
            .layer(0, 0, 'jack',
                'AtlasesDollJas',
                'Jk', null, true)
            .layer(0, 0, 'glass',
                'AtlasesDollJas',
                'Gs', null, true)
            .layer(0, 0, 'neck',
                'AtlasesDollJas',
                'Nk', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollJas',
                'Bb', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollJas',
                'H', 'H1')
            .layer(0, 0, 'hat',
                'AtlasesDollJas',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollJas',
                'Hand', 'Hand')
            .layer(0, 0, 'dress_f',
                'AtlasesDollJas',
                'DF', null);
        this.poco = new Doll(this, 491, 49)
            .layer(0, 0, 'hat_b',
                'AtlasesDollPoc',
                'HtB', null, true)
            .layer(0, 0, 'hair_b',
                'AtlasesDollPoc',
                'HB', 'HB1')
            .layer(0, 0, 'neck_b',
                'AtlasesDollPoc',
                'NkB', null, true)
            .layer(0, 0, 'jack_b',
                'AtlasesDollPoc',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollPoc',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollPoc',
                'Und', 'Und')
            .layer(0, 0, 'sock',
                'AtlasesDollPoc',
                'Sk', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollPoc',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollPoc',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollPoc',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollPoc',
                'T', null)
            .layer(0, 0, 'jack',
                'AtlasesDollPoc',
                'Jk', null, true)
            .layer(0, 0, 'glass',
                'AtlasesDollPoc',
                'Gs', null, true)
            .layer(0, 0, 'neck',
                'AtlasesDollPoc',
                'Nk', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollPoc',
                'Bb', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollPoc',
                'H', 'H1')
            .layer(0, 0, 'hat',
                'AtlasesDollPoc',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollPoc',
                'Hand', 'Hand')
            .layer(0, 0, 'dress_f',
                'AtlasesDollPoc',
                'DF', null);

        this.girl = this.game.add.sprite(168 - 700, 197,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Gr2);
        this.cloud = this.game.add.sprite(445, 108,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cl2);

        this.cloud.alpha = 0;
        this.jas.show(true);
        this.poco.hide(true);
        this.chest.disable();
        this.jas.getBody().x += 700;

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
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.jsBtn = this.gui.addExtraBtn(428, -6,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.JsBtn,
            this.changeDoll
        );
        this.pcBtn = this.gui.addExtraBtn(428, -6,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.PcBtn,
            this.changeDoll
        );
        this.jsBtn.scale.setTo(0);
        this.jsBtn.alpha = 0;
        this.pcBtn.scale.setTo(0);
        this.pcBtn.alpha = 0;
        this.beginBtn = this.gui.addExtraBtn(560, 280,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Go, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
                TweenUtils.moveOut(this.girl, 168 - 700, 197, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.moveIn(this.jas.getBody(), 513, 49, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
                    this.chest.show();
                    this.chest.enable();
                }, this);
                TweenUtils.fadeAndScaleIn(this.pcBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentDoll = this.jas;

        // Animations goes here
        TweenUtils.moveIn(this.girl, 168, 197, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
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
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'top', 'dress');
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'bot', 'dress');
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('hat', index);
            this.currentDoll.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            // this.currentDoll.on('bag_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('sock', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('jack', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(7));
            if (this.currentDoll.on('hair', index)) {
                // this.currentChest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }

        if (this.currentDoll === this.jas) this.jasDressed = true;
        if (this.currentDoll === this.poco) this.pocoDressed = true;

        if (this.playBtn.alpha === 0 && this.jasDressed && this.pocoDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.jsBtn && this.currentDoll === this.jas) return;
        if (sprite === this.pcBtn && this.currentDoll === this.poco) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.jas) {
            TweenUtils.fadeAndScaleIn(this.jsBtn);
            TweenUtils.fadeAndScaleOut(this.pcBtn);
            this.currentDoll = this.poco;
            this.chest.findItem('pc_hair').visible = true;
            this.chest.findItem('js_hair').visible = false;
        } else {
            TweenUtils.fadeAndScaleOut(this.jsBtn);
            TweenUtils.fadeAndScaleIn(this.pcBtn);
            this.currentDoll = this.jas;
            this.chest.findItem('pc_hair').visible = false;
            this.chest.findItem('js_hair').visible = true;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDoll.show();
            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentDoll = null;

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);
        if (this.girl) this.cloud.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.jas.extract();
        GameConfig.DOLL_2 = this.poco.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.fadeAndScaleOut(this.jsBtn);
        TweenUtils.fadeAndScaleOut(this.pcBtn);
        TweenUtils.moveInOut(this.currentDoll.getBody(), this.currentDoll.getBody().x - 170, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
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
        }, this);
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

