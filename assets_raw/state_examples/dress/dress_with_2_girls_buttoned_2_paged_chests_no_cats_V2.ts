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

export default class Qwerwdfdfgdfgdfgdf extends Phaser.State {

    private NEXT = 'Result';
    private nextPrepared = false;
    private changing = false;

    private currentChest: Chest = null;
    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private belle: Doll = null;
    private elza: Doll = null;
    private chestBelle: Chest = null;
    private chestElza: Chest = null;
    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private blBtn: Phaser.Button = null;
    private elBtn: Phaser.Button = null;
    private beginBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private belleDressed: boolean = false;
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

        this.belle = null;
        this.elza = null;
        this.changing = false;
        this.belleDressed = false;
        this.elzaDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chestBelle = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(428, 16,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(475, 94,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(458, 79, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                    this.onItem)
                .item(630, 81, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                    this.onItem)
                .item(726, 81, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(475, 96,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(451, 84, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top1,
                    this.onItem)
                .item(577, 85, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top2,
                    this.onItem)
                .item(676, 84, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top3,
                    this.onItem)
                .item(813, 85, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top4,
                    this.onItem)
                .pageShelf(475, 311,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(467, 299, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top5,
                    this.onItem)
                .item(612, 297, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top6,
                    this.onItem)
                .item(772, 296, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top7,
                    this.onItem)
            .build()
            .page()
                .pageShelf(475, 96,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(464, 86, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot1,
                    this.onItem)
                .item(592, 87, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot2,
                    this.onItem)
                .item(681, 86, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot3,
                    this.onItem)
                .item(787, 81, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot4,
                    this.onItem)
                .pageShelf(475, 311,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(501, 298, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot5,
                    this.onItem)
                .item(655, 298, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot6,
                    this.onItem)
                .item(788, 300, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot7,
                    this.onItem)
            .build()
            .page()
                .pageShelf(475, 94,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(501, 84, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack1,
                    this.onItem)
                .item(713, 81, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack2,
                    this.onItem)
                .pageShelf(475, 348,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(493, 338, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack3,
                    this.onItem)
                .item(715, 337, 'jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack4,
                    this.onItem)
            .build()
            .page()
                .pageShelf(476, 147,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .pageShelf(476, 279,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .pageShelf(476, 429,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(501, 84, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass1,
                    this.onItem)
                .item(657, 67, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat1,
                    this.onItem)
                .item(492, 328, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Sock1,
                    this.onItem)
                .item(647, 474, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(821, 103, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag1,
                    this.onItem)
                .item(502, 157, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag2,
                    this.onItem)
                .item(812, 190, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag3,
                    this.onItem)
                .item(806, 317, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag4,
                    this.onItem)
                .compoundItem(6, 1, -1, 597, 155, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'BlHair',
                    this.onItem)
            .build()
            .page()
                .pageShelf(476, 246,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .pageShelf(476, 411,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(470, 128, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe1,
                    this.onItem)
                .item(624, 165, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe2,
                    this.onItem)
                .item(790, 122, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe3,
                    this.onItem)
                .item(482, 317, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe4,
                    this.onItem)
                .item(635, 301, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe5,
                    this.onItem)
                .item(778, 299, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe6,
                    this.onItem)
                .item(475, 522, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe7,
                    this.onItem)
                .item(616, 525, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe8,
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .item(534, 82, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Mmmm,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'))
                .item(644, 480, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.MmmmPlay,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'),
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
                .build()
            .leftArrow(385, 307,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(385, 178,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        this.chestElza = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(428, 16,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
            .pageShelf(475, 94,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(458, 79, 'dress1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                this.onItem)
            .item(630, 81, 'dress2',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                this.onItem)
            .item(726, 81, 'dress3',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                this.onItem)
            .build()
            .page()
            .pageShelf(475, 96,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(451, 84, 'top1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top1,
                this.onItem)
            .item(577, 85, 'top2',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top2,
                this.onItem)
            .item(676, 84, 'top3',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top3,
                this.onItem)
            .item(813, 85, 'top4',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top4,
                this.onItem)
            .pageShelf(475, 311,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(467, 299, 'top5',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top5,
                this.onItem)
            .item(612, 297, 'top6',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top6,
                this.onItem)
            .item(772, 296, 'top7',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top7,
                this.onItem)
            .build()
            .page()
            .pageShelf(475, 96,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(464, 86, 'bot1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot1,
                this.onItem)
            .item(592, 87, 'bot2',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot2,
                this.onItem)
            .item(681, 86, 'bot3',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot3,
                this.onItem)
            .item(787, 81, 'bot4',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot4,
                this.onItem)
            .pageShelf(475, 311,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(501, 298, 'bot5',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot5,
                this.onItem)
            .item(655, 298, 'bot6',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot6,
                this.onItem)
            .item(788, 300, 'bot7',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot7,
                this.onItem)
            .build()
            .page()
            .pageShelf(475, 94,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(501, 84, 'jack1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack1,
                this.onItem)
            .item(713, 81, 'jack2',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack2,
                this.onItem)
            .pageShelf(475, 348,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
            .item(493, 338, 'jack3',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack3,
                this.onItem)
            .item(715, 337, 'jack4',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack4,
                this.onItem)
            .build()
            .page()
            .pageShelf(476, 147,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
            .pageShelf(476, 279,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
            .pageShelf(476, 429,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
            .item(501, 84, 'glass1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass1,
                this.onItem)
            .item(657, 67, 'hat1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat1,
                this.onItem)
            .item(492, 328, 'sock1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Sock1,
                this.onItem)
            .item(647, 474, 'jew1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                this.onItem)
            .item(821, 103, 'bag1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag1,
                this.onItem)
            .item(502, 157, 'bag2',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag2,
                this.onItem)
            .item(812, 190, 'bag3',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag3,
                this.onItem)
            .item(806, 317, 'bag4',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag4,
                this.onItem)
            .compoundItem(6, 1, -1, 597, 155, 'hair',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'ElHair',
                this.onItem)
            .build()
            .page()
            .pageShelf(476, 246,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
            .pageShelf(476, 411,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
            .item(470, 128, 'shoe1',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe1,
                this.onItem)
            .item(624, 165, 'shoe2',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe2,
                this.onItem)
            .item(790, 122, 'shoe3',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe3,
                this.onItem)
            .item(482, 317, 'shoe4',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe4,
                this.onItem)
            .item(635, 301, 'shoe6',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe5,
                this.onItem)
            .item(778, 299, 'shoe5',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe6,
                this.onItem)
            .item(475, 522, 'shoe7',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe7,
                this.onItem)
            .item(616, 525, 'shoe8',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe8,
                this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
            .item(534, 82, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Mmmm,
                GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'))
            .item(644, 480, 'mmmm_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.MmmmPlay,
                GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'),
                GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
            .build()
            .leftArrow(385, 307,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(385, 178,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            EffectUtils.makeScaleAnimation(this.chestBelle.findItem('mmmm_btn'), 1.05, 500);
            EffectUtils.makeScaleAnimation(this.chestElza.findItem('mmmm_btn'), 1.05, 500);
        }

        // Dolls
        this.elza = new Doll(this, 112, 36)
            .layer(66, 2, 'hat_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HtB', null, true)
            .layer(92, 22, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HB', 'HB')
            .layer(0, 72, 'body',
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').Frames,
                null, 'Body')
            .layer(75, 264, 'sock',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Sk', null, true)
            .layer(108, 495, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'S', 'S')
            .layer(-3, 105, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').Frames,
                'D', null)
            .layer(41, 226, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'B', null)
            .layer(33, 98, 'top',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'T', null)
            .layer(32, 104, 'jack',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Jk', null, true)
            .layer(104, 19, 'head',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Head')
            .layer(86, 111, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'J', null, true)
            .layer(65, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'H', 'H')
            .layer(101, 54, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Gs', null, true)
            .layer(66, 2, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Ht', null, true)
            .layer(-29, 111, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Bb', null, true);

        this.belle = new Doll(this, 394, 31, -1, 1)
            .layer(66, 2, 'hat_b',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'HtB', null, true)
            .layer(92, 22, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'HB', 'HB')
            .layer(0, 72, 'body',
                ImageUtils.getAtlasClass('AtlasesDollBelleBody').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelleBody').Frames,
                null, 'Body')
            .layer(77, 264, 'sock',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'Sk', null, true)
            .layer(108, 495, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'S', 'S')
            .layer(-3, 105, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'D', null)
            .layer(41, 226, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'B', null)
            .layer(33, 98, 'top',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'T', null)
            .layer(32, 104, 'jack',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'Jk', null, true)
            .layer(104, 19, 'head',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                null, 'Head')
            .layer(86, 111, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'J', null, true)
            .layer(65, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'H', 'H')
            .layer(101, 54, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'Gs', null, true)
            .layer(66, 2, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'Ht', null, true)
            .layer(-29, 111, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'Bb', null, true);

        this.cloud = this.game.add.sprite(44, 154,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cl5);

        this.cloud.alpha = 0;
        this.belle.show(true);
        this.elza.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 199,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreBg,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        let gl: Phaser.Sprite;
        moreBtn.addChild(gl =
            this.game.add.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreSt)
        );
        moreBtn.anchor.setTo(.5, .70);
        gl.anchor.setTo(.5, .65);
        gl.alpha = 0;
        gl.inputEnabled = false;
        EffectUtils.makeAlphaAnimation(gl, 1, 1000);
        this.blBtn = this.gui.addExtraBtn(3, 150,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.BlBtn,
            this.changeDoll
        );
        this.elBtn = this.gui.addExtraBtn(3, 255,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElBtn,
            this.changeDoll
        );
        this.beginBtn = this.gui.addExtraBtn(185, 495,
            ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.GoMcg, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.currentChest.show, this.currentChest);
                TweenUtils.fadeAndScaleIn(this.blBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                TweenUtils.fadeAndScaleIn(this.elBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
            },
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;
        this.blBtn.scale.setTo(0);
        this.blBtn.alpha = 0;
        this.elBtn.scale.setTo(0);
        this.elBtn.alpha = 0;
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
        this.currentChest = this.chestBelle;
        this.currentDoll = this.belle;

        // Animations goes here
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot'))
                this.currentChest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            // this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.currentChest.onEquiped(name, 'top', 'dress');
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.currentChest.onEquiped(name, 'bot', 'dress');
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.currentChest.onEquiped(name, 'shoe');
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
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index)) {
                // this.currentChest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }

        if (this.currentDoll === this.belle) this.belleDressed = true;
        if (this.currentDoll === this.elza) this.elzaDressed = true;

        if (this.playBtn.alpha === 0 && this.belleDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.blBtn && this.currentDoll === this.belle) return;
        if (sprite === this.elBtn && this.currentDoll === this.elza) return;
        if (this.changing) return;
        this.changing = true;

        this.currentDoll.hide();
        this.currentChest.hide();

        if (this.currentDoll === this.belle) {
            this.currentDoll = this.elza;
            this.currentChest = this.chestElza;
        } else {
            this.currentDoll = this.belle;
            this.currentChest = this.chestBelle;
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

        this.chestBelle.dispose();
        this.chestElza.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.belle.extract();
        GameConfig.DOLL_2 = this.elza.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.currentChest.disable();
        this.currentChest.hide();
        TweenUtils.move(this.currentDoll.getBody(), this.currentDoll.getBody().x + 235, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
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

