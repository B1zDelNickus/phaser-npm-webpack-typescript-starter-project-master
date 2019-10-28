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

export default class Ljjdfjdfjdfjdfjkj extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private cindy: Doll = null;
    private chest: Chest = null;
    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private arBtn: Phaser.Button = null;
    private ciBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private arielDressed: boolean = false;
    private cindyDressed: boolean = false;

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

        this.ariel = null;
        this.cindy = null;
        this.changing = false;
        this.arielDressed = false;
        this.cindyDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        // Chests
        this.chest = new Chest(this, 750)
            .background(259, 57,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .item(748, 227, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1,
                    this.onItem)
                .item(713, 231, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2,
                    this.onItem)
                .item(655, 232, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3,
                    this.onItem)
                .item(571, 237, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4,
                    this.onItem)
                .item(519, 240, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot5,
                    this.onItem)
                .item(423, 244, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot6,
                    this.onItem)
                .item(358, 247, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot7,
                    this.onItem)
                .item(247, 254, 'bot8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot8,
                    this.onItem)
                .item(752, 53, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1,
                    this.onItem)
                .item(681, 51, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3,
                    this.onItem)
                .item(614, 49, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top4,
                    this.onItem)
                .item(541, 53, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top5,
                    this.onItem)
                .item(492, 52, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2,
                    this.onItem)
                .item(419, 49, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top6,
                    this.onItem)
                .item(318, 47, 'top8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top8,
                    this.onItem)
                .item(265, 50, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top7,
                    this.onItem)
                .item(780, 470, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe1,
                    this.onItem)
                .item(691, 431, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe7,
                    this.onItem)
                .item(611, 491, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe2,
                    this.onItem)
                .item(521, 501, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe8,
                    this.onItem)
                .item(438, 516, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe3,
                    this.onItem)
                .item(354, 535, 'shoe9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe9,
                    this.onItem)
            .build()
            .page()
                .item(778, 228, 'bot10',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot10,
                    this.onItem)
                .item(718, 232, 'bot11',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot11,
                    this.onItem)
                .item(650, 232, 'bot12',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot12,
                    this.onItem)
                .item(582, 238, 'bot13',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot13,
                    this.onItem)
                .item(457, 241, 'bot14',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot14,
                    this.onItem)
                .item(441, 244, 'bot15',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot15,
                    this.onItem)
                .item(346, 247, 'bot16',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot16,
                    this.onItem)
                .item(263, 250, 'bot17',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot17,
                    this.onItem)
                .item(761, 52, 'top15',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top15,
                    this.onItem)
                .item(688, 53, 'top10',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top10,
                    this.onItem)
                .item(610, 51, 'top11',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top11,
                    this.onItem)
                .item(547, 51, 'top12',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top12,
                    this.onItem)
                .item(479, 51, 'top13',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top13,
                    this.onItem)
                .item(401, 51, 'top14',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top14,
                    this.onItem)
                .item(329, 51, 'top9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top9,
                    this.onItem)
                .item(262, 51, 'top16',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top16,
                    this.onItem)
                .item(339, 515, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe4,
                    this.onItem)
                .item(691, 485, 'shoe10',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe10,
                    this.onItem)
                .item(603, 485, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe5,
                    this.onItem)
                .item(511, 506, 'shoe11',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe11,
                    this.onItem)
                .item(778, 472, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe6,
                    this.onItem)
                .item(430, 469, 'shoe12',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe12,
                    this.onItem)
            .build()
            .page()
                .item(779, 229, 'bot9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot9,
                    this.onItem)
                .item(734, 229, 'bot22',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot22,
                    this.onItem)
                .item(643, 232, 'bot18',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot18,
                    this.onItem)
                .item(593, 235, 'bot19',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot19,
                    this.onItem)
                .item(502, 240, 'bot20',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot20,
                    this.onItem)
                .item(458, 246, 'bot21',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot21,
                    this.onItem)
                .item(374, 248, 'bot23',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot23,
                    this.onItem)
                .item(272, 255, 'bot24',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot24,
                    this.onItem)
                .item(780, 54, 'top21',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top21,
                    this.onItem)
                .item(701, 52, 'top17',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top17,
                    this.onItem)
                .item(647, 50, 'top18',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top18,
                    this.onItem)
                .item(584, 51, 'top19',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top19,
                    this.onItem)
                .item(518, 49, 'top20',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top20,
                    this.onItem)
                .item(440, 52, 'top22',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top22,
                    this.onItem)
                .item(336, 46, 'top23',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top23,
                    this.onItem)
                .item(255, 46, 'top24',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top24,
                    this.onItem)
                .item(780, 470, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe1,
                    this.onItem)
                .item(691, 431, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe7,
                    this.onItem)
                .item(611, 491, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe2,
                    this.onItem)
                .item(521, 501, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe8,
                    this.onItem)
                .item(438, 516, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe3,
                    this.onItem)
                .item(354, 535, 'shoe9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe9,
                    this.onItem)
            .build()
            .page()
                .item(727, 230, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack3,
                    this.onItem)
                .item(630, 232, 'jack7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack7,
                    this.onItem)
                .item(527, 234, 'jack8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack8,
                    this.onItem)
                .item(426, 240, 'jack9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack9,
                    this.onItem)
                .item(316, 245, 'jack10',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack10,
                    this.onItem)
                .item(686, 50, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack1,
                    this.onItem)
                .item(589, 49, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack2,
                    this.onItem)
                .item(511, 49, 'jack6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack6,
                    this.onItem)
                .item(423, 50, 'jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack4,
                    this.onItem)
                .item(322, 50, 'jack5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack5,
                    this.onItem)
                .item(339, 515, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe4,
                    this.onItem)
                .item(691, 485, 'shoe10',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe10,
                    this.onItem)
                .item(603, 485, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe5,
                    this.onItem)
                .item(511, 506, 'shoe11',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe11,
                    this.onItem)
                .item(778, 472, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe6,
                    this.onItem)
                .item(430, 469, 'shoe12',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe12,
                    this.onItem)
            .build()
            .leftArrow(507, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(613, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        // Dolls
        if (GameConfig.DOLL_1 !== null) {
            this.ariel = GameConfig.DOLL_1.insert();
            this.cindy = GameConfig.DOLL_2.insert();
            this.ariel.setPosition(10, 64);
            this.cindy.setPosition(-6, 60);
        }
        else {
            this.ariel = new Doll(this, 10, 64)
                .layer(0, 0, 'acs_b',
                    'AtlasesDollAriel',
                    'AcB', null, true)
                .layer(0, 0, 'bag_b',
                    'AtlasesDollArielBag',
                    'BbB', null, true)
                .layer(0, 0, 'hat_b',
                    'AtlasesDollAriel',
                    'HtB', null, true)
                .layer(0, 0, 'hair_b',
                    'AtlasesDollArielHair',
                    'HB', 'HB')
                .layer(0, 0, 'jew_b',
                    'AtlasesDollArielJew',
                    'JB', null, true)
                .layer(0, 0, 'jack_b',
                    'AtlasesDollArielJack',
                    'JkB', null, true)
                .layer(0, 0, 'top_b',
                    'AtlasesDollArielTop',
                    'TB', null)
                .layer(0, 0, 'bot_b',
                    'AtlasesDollArielBot',
                    'BB', null)
                .layer(0, 0, 'body',
                    'AtlasesDollAriel',
                    null, 'Body')
                .layer(0, 0, 'acs',
                    'AtlasesDollAriel',
                    'Ac', null, true)
                .layer(0, 0, 'shoe',
                    'AtlasesDollArielShoe',
                    'S', null, false, [7, 12])
                .layer(0, 0, 'bot',
                    'AtlasesDollArielBot',
                    'B', 'B')
                .layer(0, 0, 'shoe_f',
                    'AtlasesDollArielShoe',
                    'S', null, false, [1, 2, 3, 4, 5, 6, 8, 9, 10, 11])
                .layer(0, 0, 'bot_f',
                    'AtlasesDollArielBot',
                    'BF', null)
                .layer(0, 0, 'top',
                    'AtlasesDollArielTop',
                    'T', 'T')
                .layer(0, 0, 'bot_t',
                    'AtlasesDollArielBot',
                    'BT', null)
                .layer(0, 0, 'acs_f',
                    'AtlasesDollAriel',
                    'AcF', null, true)
                .layer(0, 0, 'jew',
                    'AtlasesDollArielJew',
                    'J', null, true)
                .layer(0, 0, 'jack',
                    'AtlasesDollArielJack',
                    'Jk', null, true)
                .layer(0, 0, 'hair',
                    'AtlasesDollArielHair',
                    'H', 'H')
                .layer(0, 0, 'jew_f',
                    'AtlasesDollArielJew',
                    'JF', null, true)
                .layer(0, 0, 'glass',
                    'AtlasesDollAriel',
                    'Gs', null, true)
                .layer(0, 0, 'hat',
                    'AtlasesDollAriel',
                    'Ht', null, true)
                .layer(0, 0, 'bag',
                    'AtlasesDollArielBag',
                    'Bb', null, true);

            this.cindy = new Doll(this, -6, 60)
                .layer(0, 0, 'acs_b',
                    'AtlasesDollCindy',
                    'AcB', null, true)
                .layer(0, 0, 'bag_b',
                    'AtlasesDollCindyBag',
                    'BbB', null, true)
                .layer(0, 0, 'hat_b',
                    'AtlasesDollCindy',
                    'HtB', null, true)
                .layer(0, 0, 'hair_b',
                    'AtlasesDollCindyHair',
                    'HB', 'HB')
                .layer(0, 0, 'jew_b',
                    'AtlasesDollCindyJew',
                    'JB', null, true)
                .layer(0, 0, 'jack_b',
                    'AtlasesDollCindyJack',
                    'JkB', null, true)
                .layer(0, 0, 'top_b',
                    'AtlasesDollCindyTop',
                    'TB', null)
                .layer(0, 0, 'bot_b',
                    'AtlasesDollCindyBot',
                    'BB', null)
                .layer(0, 0, 'body',
                    'AtlasesDollCindy',
                    null, 'Body')
                .layer(0, 0, 'acs',
                    'AtlasesDollCindy',
                    'Ac', null, true)
                .layer(0, 0, 'shoe',
                    'AtlasesDollCindyShoe',
                    'S', null, false, [7, 12])
                .layer(0, 0, 'bot',
                    'AtlasesDollCindyBot',
                    'B', 'B')
                .layer(0, 0, 'shoe_f',
                    'AtlasesDollCindyShoe',
                    'S', null, false, [1, 2, 3, 4, 5, 6, 8, 9, 10, 11])
                .layer(0, 0, 'bot_f',
                    'AtlasesDollCindyBot',
                    'BF', null)
                .layer(0, 0, 'top',
                    'AtlasesDollCindyTop',
                    'T', 'T')
                .layer(0, 0, 'bot_t',
                    'AtlasesDollCindyBot',
                    'BT', null)
                .layer(0, 0, 'acs_f',
                    'AtlasesDollCindy',
                    'AcF', null, true)
                .layer(0, 0, 'jew',
                    'AtlasesDollCindyJew',
                    'J', null, true)
                .layer(0, 0, 'jack',
                    'AtlasesDollCindyJack',
                    'Jk', null, true)
                .layer(0, 0, 'hair',
                    'AtlasesDollCindyHair',
                    'H', 'H')
                .layer(0, 0, 'jew_f',
                    'AtlasesDollCindyJew',
                    'JF', null, true)
                .layer(0, 0, 'glass',
                    'AtlasesDollCindy',
                    'Gs', null, true)
                .layer(0, 0, 'hat',
                    'AtlasesDollCindy',
                    'Ht', null, true)
                .layer(0, 0, 'bag',
                    'AtlasesDollCindyBag',
                    'Bb', null, true);
        }

        this.ariel.show(true);
        this.cindy.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        const moreBtn = this.gui.addExtraMore(
            960 - 124, 720 - 200,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeLightRotateAnimation(moreBtn, Phaser.Timer.SECOND * .8);
        this.arBtn = this.gui.addExtraBtn(2, 401,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn,
            this.changeDoll
        );
        this.ciBtn = this.gui.addExtraBtn(2, 401,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.CinBtn,
            this.changeDoll
        );
        this.arBtn.scale.setTo(0);
        this.arBtn.alpha = 0;
        this.ciBtn.scale.setTo(0);
        this.ciBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentDoll = this.ariel;

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
            this.chest.show();
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }, this);

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
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            // this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
            this.currentDoll.on('top_b', index);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('bot_b', index);
            this.currentDoll.on('bot_f', index);
            this.currentDoll.on('bot_t', index);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
            this.currentDoll.on('shoe_f', index);
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
            this.currentDoll.on('jack_b', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index)) {
                // this.chest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }

        if (this.currentDoll === this.ariel) this.arielDressed = true;
        if (this.currentDoll === this.cindy) this.cindyDressed = true;

        if (this.playBtn.alpha === 0 && this.arielDressed && this.cindyDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.arBtn && this.currentDoll === this.ariel) return;
        if (sprite === this.ciBtn && this.currentDoll === this.cindy) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.ariel) {
            this.currentDoll = this.cindy;
            TweenUtils.fadeAndScaleOut(this.ciBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        } else {
            this.currentDoll = this.ariel;
            TweenUtils.fadeAndScaleOut(this.arBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }
        this.game.time.events.add(Phaser.Timer.SECOND * .5, () => {
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

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.ariel.extract();
        GameConfig.DOLL_2 = this.cindy.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        if (GameConfig.CURRENT_STATE === 0) GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.move(this.currentDoll.getBody(), this.currentDoll.getBody().x + 300, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
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

