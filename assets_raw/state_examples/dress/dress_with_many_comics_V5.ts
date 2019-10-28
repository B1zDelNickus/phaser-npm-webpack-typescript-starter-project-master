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

export default class Kklflldflhll extends Phaser.State {

    private NEXT = 'Pread';
    private nextPrepared = false;
    private changing = false;

    private currentChest: Chest = null;
    private currentDoll: Doll = null;

    private bg: Phaser.Sprite = null;
    private cindy: Phaser.Sprite = null;
    private avrora: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private cloud3: Phaser.Sprite = null;
    private cloud4: Phaser.Sprite = null;
    private gui: IGui = null;
    private saver: ISaver = null;
    private rap: Doll = null;
    private elza: Doll = null;
    private chestRap: Chest = null;
    private chestElza: Chest = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private arrow: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private crossBtn: Phaser.Button = null;

    private rapDressed: boolean = false;
    private elzaDressed: boolean = false;
    private comState: number = 0;

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

        this.rap = null;
        this.elza = null;
        this.changing = false;
        this.rapDressed = false;
        this.elzaDressed = false;
        this.comState = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        // Chests
        this.chestRap = new Chest(this)
            .background(45, 15,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(56, 65,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf1)
                .pageShelf(52, 544,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf2)
                .item(103, 424, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpShoe1,
                    this.onItem)
                .item(129, 563, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpShoe2,
                    this.onItem)
                .item(342, 410, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpShoe3,
                    this.onItem)
                .item(242, 564, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpShoe4,
                    this.onItem)
                .item(220, 418, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpShoe5,
                    this.onItem)
                .item(361, 562, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpShoe6,
                    this.onItem)
                .item(9, 61, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpDress1,
                    this.onItem)
                .item(101, 60, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpDress3,
                    this.onItem)
                .item(235, 62, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpDress2,
                    this.onItem)
                .item(307, 62, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpJack2,
                    this.onItem)
            .build()
            .page()
                .pageShelf(56, 65,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf1)
                .item(5, 70, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpTop1,
                    this.onItem)
                .item(108, 65, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpJack1,
                    this.onItem)
                .item(211, 61, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpBot3,
                    this.onItem)
                .item(259, 58, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpBot2,
                    this.onItem)
                .pageShelf(56, 427,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf1)
                .item(43, 422, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpBot1,
                    this.onItem)
                .item(137, 423, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpTop3,
                    this.onItem)
                .item(315, 423, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpTop2,
                    this.onItem)
            .build()
            .page()
                .pageShelf(52, 557,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf2)
                .item(328, 285, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpAcs1,
                    this.onItem)
                .item(219, 602, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpBag2,
                    this.onItem)
                .item(58, 393, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpHat1,
                    this.onItem)
                .item(259, 413, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpJew1,
                    this.onItem)
                .item(78, 540, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpBag1,
                    this.onItem)
                .item(197, 521, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.RpGlass1,
                    this.onItem)
                .compoundItem(5, 2, -1, 132, 70, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames, 'RpHair',
                    this.onItem)
            .build()
            .leftArrow(0, 323,
                ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Lb)
            .rightArrow(484, 323,
                ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Rb)
            .build();
        this.chestElza = new Chest(this)
            .background(45, 15,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(56, 65,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf1)
                .pageShelf(52, 544,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf2)
                .item(41, 60, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElDress1,
                    this.onItem)
                .item(129, 62, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElDress2,
                    this.onItem)
                .item(233, 62, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElDress3,
                    this.onItem)
                .item(306, 64, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElJack1,
                    this.onItem)
                .item(100, 456, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElShoe1,
                    this.onItem)
                .item(211, 456, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElShoe2,
                    this.onItem)
                .item(346, 433, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElShoe3,
                    this.onItem)
                .item(82, 563, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElShoe4,
                    this.onItem)
                .item(192, 573, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElShoe5,
                    this.onItem)
                .item(320, 564, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElShoe6,
                    this.onItem)
            .build()
            .page()
                .pageShelf(56, 65,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf1)
                .item(319, 59, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElBot1,
                    this.onItem)
                .item(186, 60, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElBot2,
                    this.onItem)
                .item(134, 65, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElJack2,
                    this.onItem)
                .item(68, 63, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElTop2,
                    this.onItem)
                .pageShelf(56, 427,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf1)
                .item(61, 403, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElTop3,
                    this.onItem)
                .item(196, 401, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElTop1,
                    this.onItem)
                .item(320, 400, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElBot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(52, 557,
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shelf2)
                .item(343, 284, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElAcs1,
                    this.onItem)
                .item(49, 336, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElHat1,
                    this.onItem)
                .item(281, 470, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElGlass1,
                    this.onItem)
                .item(185, 457, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElBag1,
                    this.onItem)
                .item(220, 519, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElJew2,
                    this.onItem)
                .item(110, 519, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ElJew1,
                    this.onItem)
                .compoundItem(5, 2, -1, 132, 70, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames, 'ElHair',
                    this.onItem)
            .build()
            .leftArrow(0, 323,
                ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Lb)
            .rightArrow(484, 323,
                ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Rb)
            .build();

        // Dolls
        this.rap = new Doll(this, 471, 27)
            .layer(0, 0, 'hat_b',
                'AtlasesDollRap',
                'HtB', null, true)
            .layer(0, 0, 'hair_b',
                'AtlasesDollRap',
                'HB', 'HB1')
            .layer(0, 0, 'body',
                'AtlasesDollRap',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollRap',
                'D', 'D')
            .layer(0, 0, 'acs',
                'AtlasesDollRap',
                'Ac', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollRap',
                'S', null)
            .layer(0, 0, 'bot',
                'AtlasesDollRap',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollRap',
                'T', null)
            .layer(0, 0, 'dress',
                'AtlasesDollRap',
                'D', null)
            .layer(0, 0, 'jack',
                'AtlasesDollRap',
                'Jk', null, true)
            .layer(0, 0, 'jew_b',
                'AtlasesDollRap',
                'JB', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollRap',
                'Head', 'Head')
            .layer(0, 0, 'rum',
                'AtlasesDollRap',
                'Rm', 'Rm' + GameConfig.FREE_RESULT.rapRum)
            .layer(0, 0, 'lip',
                'AtlasesDollRap',
                'Lp', 'Lp' + GameConfig.FREE_RESULT.rapLip)
            .layer(0, 0, 'shad',
                'AtlasesDollRap',
                'Sh', 'Sh' + GameConfig.FREE_RESULT.rapShad)
            .layer(0, 0, 'eyes',
                'AtlasesDollRap',
                'Eyes', 'Eyes')
            .layer(0, 0, 'jew',
                'AtlasesDollRap',
                'J', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollRap',
                'H', 'H1')
            .layer(0, 0, 'res',
                'AtlasesDollRap',
                'Rs', 'Rs' + GameConfig.FREE_RESULT.rapRes)
            .layer(0, 0, 'glass',
                'AtlasesDollRap',
                'Gs', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollRap',
                'Bb', null, true)
            .layer(0, 0, 'hat',
                'AtlasesDollRap',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollRap',
                'Hand', 'Hand');
        this.elza = new Doll(this, 532, 36)
            .layer(0, 0, 'hat_b',
                'AtlasesDollElza',
                'HtB', null, true)
            .layer(0, 0, 'hair_b',
                'AtlasesDollElza',
                'HB', 'HB1')
            .layer(0, 0, 'jack_b',
                'AtlasesDollElza',
                'Jk', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollElza',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollElza',
                'D', 'D')
            .layer(0, 0, 'acs',
                'AtlasesDollElza',
                'Ac', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollElza',
                'S', null)
            .layer(0, 0, 'bot',
                'AtlasesDollElza',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollElza',
                'T', null)
            .layer(0, 0, 'dress',
                'AtlasesDollElza',
                'D', null)
            .layer(0, 0, 'jack',
                'AtlasesDollElza',
                'Jk', null, true)
            .layer(0, 0, 'jew_b',
                'AtlasesDollElza',
                'JB', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollElza',
                'Head', 'Head')
            .layer(0, 0, 'rum',
                'AtlasesDollElza',
                'Rm', 'Rm' + GameConfig.FREE_RESULT.elRum)
            .layer(0, 0, 'lip',
                'AtlasesDollElza',
                'Lp', 'Lp' + GameConfig.FREE_RESULT.elLip)
            .layer(0, 0, 'shad',
                'AtlasesDollElza',
                'Sh', 'Sh' + GameConfig.FREE_RESULT.elShad)
            .layer(0, 0, 'eyes',
                'AtlasesDollElza',
                'Eyes', 'Eyes')
            .layer(0, 0, 'jew',
                'AtlasesDollElza',
                'J', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollElza',
                'H', 'H1')
            .layer(0, 0, 'res',
                'AtlasesDollElza',
                'Rs', 'Rs' + GameConfig.FREE_RESULT.elRes)
            .layer(0, 0, 'glass',
                'AtlasesDollElza',
                'Gs', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollElza',
                'Bb', null, true)
            .layer(0, 0, 'hat',
                'AtlasesDollElza',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollElza',
                'Hand', 'Hand');
        this.cindy = this.game.add.sprite(122, 446 + 500,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Gr8);
        this.avrora = this.game.add.sprite(764 + 500, 289,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Gr9);

        this.cloud1 = this.game.add.sprite(265, 435,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Cl9);
        this.cloud2 = this.game.add.sprite(750, 85,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Cl10);
        this.cloud3 = this.game.add.sprite(750, 85,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Cl11);
        this.cloud4 = this.game.add.sprite(750, 85,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Cl12);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;
        this.cloud4.alpha = 0;

        this.rap.show(true);
        this.elza.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.gui.addExtraMoreAnimated(
            960 - 168, 720 - 173,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1781833').getName(), 1 / 3, true,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        this.arrow = this.gui.addExtraBtn(657, 637,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.ArrBtn,
            this.changeDoll);
        this.arrow.scale.setTo(0);
        this.arrow.alpha = 0;
        this.crossBtn = this.gui.addExtraBtn(398, 609,
            ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Cross,
            GuiUtils.goCross('http://mycutegames.com/Games/Princess/Cinderellas-Bridal-Fashion-Collection.html'));
        this.crossBtn.scale.setTo(0);
        this.crossBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentChest = this.chestRap;
        this.currentDoll = this.rap;

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
            this.currentChest.show();
            TweenUtils.fadeAndScaleIn(this.arrow, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 4, this.nextComic, this);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    private nextComic() {
        if (this.comState === 0) {
            TweenUtils.moveIn(this.avrora, 764, 289, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                TweenUtils.fadeOut(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.avrora, 764 + 500, 289, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        else if (this.comState === 1) {
            this.crossBtn.inputEnabled = true;
            TweenUtils.moveIn(this.cindy, 122, 446, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
            TweenUtils.fadeAndScaleIn(this.crossBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 1.5, () => {
                TweenUtils.fadeAndScaleOut(this.crossBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.fadeOut(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.cindy, 122, 446 + 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    this.crossBtn.inputEnabled = false;
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        else if (this.comState === 2) {
            TweenUtils.moveIn(this.avrora, 764, 289, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                TweenUtils.fadeOut(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.avrora, 764 + 500, 289, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        else if (this.comState === 3) {
            TweenUtils.moveIn(this.avrora, 764, 289, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                TweenUtils.fadeOut(this.cloud4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.avrora, 764 + 500, 289, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        this.comState++;
        if (this.comState > 3) this.comState = 0;
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot', 'und'))
                this.currentChest.onEquiped(name, 'dress', 'top', 'bot');
            this.currentDoll.on('dress_b', index);
            this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.currentChest.onEquiped(name, 'top', 'dress');
            this.currentDoll.on('top_b', index);
            this.currentDoll.on('top_f', index);
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.currentChest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('bot_b', index);
            this.currentDoll.on('bot_f', index);
            this.currentDoll.on('bot_t', index);
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.currentChest.onEquiped(name, 'shoe');
            this.currentDoll.on('shoe_f', index);
            this.currentDoll.on('shoe_b', index);
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
            this.currentDoll.on('jew_b', index);
            this.currentDoll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('hat', index);
            this.currentDoll.on('hat_b', index);
            this.currentDoll.on('hat_f', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
            this.currentDoll.on('acs_f', index);
            this.currentDoll.on('acs_b', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            this.currentDoll.on('bag_b', index);
            this.currentDoll.on('bag_f', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
            this.currentDoll.on('glove_b', index);
            this.currentDoll.on('glove_f', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('sock', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('jack', index);
            this.currentDoll.on('jack_b', index);
            this.currentDoll.on('jack_f', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index)) {
                this.currentChest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
            this.currentDoll.on('hair_f', index);
        }
        if (this.currentDoll === this.rap) this.rapDressed = true;
        if (this.currentDoll === this.elza) this.elzaDressed = true;
        if (this.playBtn.alpha === 0 && this.rapDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(): void {
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        this.currentChest.hide();
        if (this.currentDoll === this.rap) {
            this.currentDoll = this.elza;
            this.currentChest = this.chestElza;
        } else {
            this.currentDoll = this.rap;
            this.currentChest = this.chestRap;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDoll.show();
            this.currentChest.show();
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
        this.currentChest = null;

        this.chestRap.dispose();
        this.chestElza.dispose();

        this.arrow.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.rap.extract();
        GameConfig.DOLL_2 = this.elza.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chestRap.disable();
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

