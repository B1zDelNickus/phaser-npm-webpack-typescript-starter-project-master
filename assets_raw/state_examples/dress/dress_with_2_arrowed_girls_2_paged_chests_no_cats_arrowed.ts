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

export default class Bfghfghfghfghfghfghfg extends Phaser.State {

    private NEXT = 'Dress2';
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

        if (!isNull(args[0]) && !isUndefined(args[0])) {
            this.anna = args[0] as Doll;
            this.elza = args[1] as Doll;
        }

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
            .background(-17, -5,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Chest)
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(252, 101, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(172, 91, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(73, 86, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(250, 100, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(118, 92, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(73, 85, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(191, 97, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.DressMore,
                    GuiUtils.goLinkInMoreGames,
                    GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(80, 87, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnDress7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf2)
                .item(335, 293, 'top6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnTop6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(200, 288, 'top5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnTop5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(84, 285, 'top4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnTop4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(266, 104, 'top3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnTop3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(133, 91, 'top2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnTop2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(64, 85, 'top1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnTop1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf2)
                .item(306, 296, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnBot6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(185, 293, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnBot5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(82, 292, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnBot4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(312, 103, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnBot3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(195, 99, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnBot2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(83, 87, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.AnBot1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .button(105, 549, 'lb',
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Lb,
                this.prevPage,
                GuiUtils.addCustomOverHandler(0xffff66),
                GuiUtils.addCustomOutHandler())
            .button(332, 526, 'rb',
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Rb,
                this.nextPage,
                GuiUtils.addCustomOverHandler(0xffff66),
                GuiUtils.addCustomOutHandler())
            .build();

        this.chestElza = new Chest(this)
            .background(-17, -5,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Chest)
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(306, 90, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(175, 89, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(74, 80, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(256, 91, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(186, 81, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(72, 75, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(191, 97, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.DressMore,
                    GuiUtils.goLinkInMoreGames,
                    GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(106, 84, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElDress7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf2)
                .item(325, 294, 'top6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElTop6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(222, 288, 'top5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElTop5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(85, 288, 'top4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElTop4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(289, 99, 'top3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElTop3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(185, 93, 'top2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElTop2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(69, 84, 'top1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElTop1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .page()
                .pageShelf(66, 95,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf2)
                .item(301, 297, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElBot6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(186, 291, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElBot5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(96, 282, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElBot4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(298, 102, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElBot3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(186, 97, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElBot2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(67, 87, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ElBot1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .button(105, 549, 'lb',
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Lb,
                this.prevPage,
                GuiUtils.addCustomOverHandler(0xffff66),
                GuiUtils.addCustomOutHandler())
            .button(332, 526, 'rb',
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Rb,
                this.nextPage,
                GuiUtils.addCustomOverHandler(0xffff66),
                GuiUtils.addCustomOutHandler())
            .build();

        // Dolls
        if (isNull(this.anna)) {
            this.anna = new Doll(this, 528, 16)
                .layer(70, 6, 'hair_b',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'HB', 'HB')
                .layer(0, 7, 'body',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    null, 'Body')
                .layer(81, 564, 'shoe',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'S', 'S')
                .layer(47, 221, 'bot',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'B', null)
                .layer(34, 105, 'top',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'T', null)
                .layer(-7, 109, 'dress',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'D', null)
                .layer(118, 68, 'jew',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'J', null, true)
                .layer(72, -12, 'hair',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'H', 'H')
                .layer(179, 68, 'bag',
                    ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                    'Bb', null, true);

            this.elza = new Doll(this, 499, 17)
                .layer(34, -10, 'hair_b',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'HB', 'HB')
                .layer(0, 78, 'body',
                    ImageUtils.getAtlasClass('AtlasesDollElza2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza2').Frames,
                    null, 'Body')
                .layer(44, 579, 'shoe',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'S', 'S')
                .layer(63, 228, 'bot',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'B', null)
                .layer(66, 102, 'top',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'T', null)
                .layer(36, 109, 'dress',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'D', null)
                .layer(178, 316, 'bag',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'Bb', null, true)
                .layer(124, 12, 'head',
                    ImageUtils.getAtlasClass('AtlasesDollElza2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza2').Frames,
                    null, 'Head')
                .layer(121, 77, 'jew',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'J', null, true)
                .layer(67, -19, 'hair',
                    ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                    'H', 'H');
        }
        else {
            this.anna.insert();
            this.elza.insert();
            this.elza.setPosition(499, 17);
            this.anna.setPosition(528, 16);
        }

        this.cloud = this.game.add.sprite(450, 180,
            ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Cl3);

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
        this.beginBtn = this.gui.addExtraBtn(753, 434,
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
            PreloaderUtils.preloadDress2State();
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

        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('dress', index, 'top', 'bot');
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('top', index, 'dress');
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bot', index, 'dress');
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

