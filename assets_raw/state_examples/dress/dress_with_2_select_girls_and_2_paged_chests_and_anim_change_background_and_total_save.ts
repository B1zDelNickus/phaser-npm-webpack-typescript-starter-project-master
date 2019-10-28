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
import {IParticle} from './spec-effects/particle/i.particle';
import {SnowMiddleParticles} from './spec-effects/particle/snow.middle.particle';
import {FilterUtils} from '../utils/filter.utils';
import {SnowBackParticles} from './spec-effects/particle/snow.back.particle';
import {SnowFrontParticles} from './spec-effects/particle/snow.front.particle';

export default class Iooosdjsdsdhsdjsdj extends Phaser.State {

    private NEXT = 'Final';
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
    private bg: Phaser.Sprite = null;
    private fg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private snowB: IParticle = null;
    private snowM: IParticle = null;
    private snowF: IParticle = null;
    private playBtn: Phaser.Button = null;
    private picture: Phaser.Group = null;

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
        this.snowB = null;
        this.snowM = null;
        this.snowF = null;
        this.anna = null;
        this.elza = null;
        this.changing = false;
        this.annaDressed = false;
        this.elzaDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.picture = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());
        this.picture.add(this.bg);

        this.snowB = new SnowBackParticles();
        this.snowB.init(null, null);
        this.snowB.addToContainer(this.picture);
        this.snowB.start();
        this.snowM = new SnowMiddleParticles();
        this.snowM.init(null, null);
        this.snowM.addToContainer(this.picture);
        this.snowM.start();
        this.snowF = new SnowFrontParticles();
        this.snowF.init(null, null);
        this.snowF.addToContainer(this.picture);
        this.snowF.start();

        this.fg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg4').getName());
        this.picture.add(this.fg);

        // Chests
        this.chestAnna = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(532, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(618, 101,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(594, 103, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnTop1,
                    this.onItem)
                .item(685, 102, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnTop2,
                    this.onItem)
                .item(821, 96, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnTop3,
                    this.onItem)
                .item(628, 309, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnBot1,
                    this.onItem)
                .item(710, 307, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnBot2,
                    this.onItem)
                .item(795, 309, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnBot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(618, 101,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(585, 101, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnJack1,
                    this.onItem)
                .item(757, 98, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnJack2,
                    this.onItem)
            .build()
            .page()
                .pageShelf(602, 218,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(690, 121, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnShoe1,
                    this.onItem)
                .item(805, 132, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnShoe2,
                    this.onItem)
                .item(632, 263, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnShoe3,
                    this.onItem)
                .item(731, 270, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnShoe4,
                    this.onItem)
                .item(840, 351, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnShoe5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(602, 218,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(630, 134, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnGlove1,
                    this.onItem)
                .item(721, 101, 'glove2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnGlove2,
                    this.onItem)
                .item(810, 124, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnHat1,
                    this.onItem)
                .item(606, 354, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnHat2,
                    this.onItem)
                .item(708, 319, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnJew1,
                    this.onItem)
                .item(795, 309, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.AnAcs1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(602, 435,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf3)
                .compoundItem(5, 1, -1, 679, 132, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'AnHair',
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .item(649, 121, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cross,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Big-Sale-Rush.html'))
                .item(700, 455, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Big-Sale-Rush.html'),
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
                .build()
            .leftArrow(574, 437,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(875, 460,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        this.chestElza = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(532, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(618, 101,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(555, 111, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElTop1,
                    this.onItem)
                .item(676, 105, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElTop2,
                    this.onItem)
                .item(782, 101, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElTop3,
                    this.onItem)
                .item(614, 302, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElBot1,
                    this.onItem)
                .item(692, 306, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElBot2,
                    this.onItem)
                .item(830, 311, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElBot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(618, 101,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(591, 101, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElJack1,
                    this.onItem)
                .item(741, 98, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElJack2,
                    this.onItem)
            .build()
            .page()
                .pageShelf(602, 218,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(617, 142, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElShoe1,
                    this.onItem)
                .item(722, 138, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElShoe2,
                    this.onItem)
                .item(833, 73, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElShoe3,
                    this.onItem)
                .item(676, 356, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElShoe4,
                    this.onItem)
                .item(769, 339, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElShoe5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(602, 218,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(817, 130, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElGlove1,
                    this.onItem)
                .item(705, 174, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElGlass1,
                    this.onItem)
                .item(578, 110, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElHat1,
                    this.onItem)
                .item(740, 268, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElBag1,
                    this.onItem)
                .item(616, 289, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElJew1,
                    this.onItem)
                .item(818, 289, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElAcs1,
                    this.onItem)
            .build()
            .page()
            .pageShelf(602, 435,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf3)
            .compoundItem(5, 1, -1, 679, 132, 'hair',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'ElHair',
                this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
            .item(649, 121, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cross,
                GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Perfect-Wedding.html'))
            .item(700, 455, 'mmmm_btn',
                ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Perfect-Wedding.html'),
                GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
            .build()
            .leftArrow(574, 437,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(875, 460,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.chestElza.findItem('mmmm_btn').scale.setTo(.9);
            EffectUtils.makeScaleAnimation(this.chestElza.findItem('mmmm_btn'), .96, 500);
            this.chestAnna.findItem('mmmm_btn').scale.setTo(.9);
            EffectUtils.makeScaleAnimation(this.chestAnna.findItem('mmmm_btn'), .96, 500);
        }

        // Dolls
        this.anna = new Doll(this, 386, 53, -1, 1)
            .enableListeners()
            .layer(0, 86, 'jack_b',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'JkB', null, true)
            .layer(101, 8, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'HB', 'HB')
            .layer(0, 66, 'body',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                null, 'Body')
            .layer(53, 243, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'Ac', null, true)
            .layer(58, 213, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'B', null)
            .layer(44, 467, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'S', null)
            .layer(39, 88, 'top',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'T', null)
            .layer(0, 86, 'jack',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'Jk', null, true)
            .layer(126, 7, 'head',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                null, 'Head')
            .layer(95, 85, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'J', null, true)
            .layer(34, 221, 'glove',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'Gl', null, true, [], ['jack'])
            .layer(93, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'H', 'H')
            .layer(114, -9, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnna').Frames,
                'Ht', null, true)
            .setListeners(this, this.changeDoll, GuiUtils.addOverGlowParentHandler, GuiUtils.addOutGlowParentHandler);

        this.elza = new Doll(this, 317, 19)
            .enableListeners()
            .layer(55, 0, 'hat_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HtB', null, true)
            .layer(58, 42, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HB', 'HB')
            .layer(0, 110, 'jack_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'JkB', null, true)
            .layer(15, 96, 'body',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Body')
            .layer(62, 280, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Ac', null, true)
            .layer(32, 257, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'B', null)
            .layer(74, 498, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'S', null)
            .layer(6, 114, 'top',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'T', null)
            .layer(0, 110, 'jack',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Jk', null, true)
            .layer(164, 237, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Bb', null, true)
            .layer(48, 249, 'glove',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Gl', null, true, [], ['jack'])
            .layer(59, 113, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'J', null, true)
            .layer(68, 41, 'head',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Head')
            .layer(49, 11, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'H', 'H')
            .layer(62, 78, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Gs', null, true)
            .layer(55, 0, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Ht', null, true)
            .setListeners(this, this.changeDoll, GuiUtils.addOverGlowParentHandler, GuiUtils.addOutGlowParentHandler);

        this.picture.add(this.elza.getBody());
        this.picture.add(this.anna.getBody());

        this.anna.show(true);
        this.elza.show(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 148, 720 - 173,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeScaleAnimation(moreBtn, 1.05, Phaser.Timer.SECOND * .5);
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
        this.currentDoll.disableListeners();
        this.currentDoll.getBody().filters = [FilterUtils.makeFilter(0xffff66)];

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
            this.currentChest.show();
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
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
        else if (name.indexOf('pill') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('pill', index);
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

        if (this.currentDoll === this.anna) this.annaDressed = true;
        if (this.currentDoll === this.elza) this.elzaDressed = true;

        if (this.playBtn.alpha === 0 && this.annaDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        this.currentDoll.enableListeners();
        this.currentDoll.getBody().filters = null;
        this.currentChest.hide();

        if (this.currentDoll === this.anna) {
            this.currentDoll = this.elza;
            this.currentChest = this.chestElza;
        } else {
            this.currentDoll = this.anna;
            this.currentChest = this.chestAnna;
        }

        this.currentDoll.disableListeners();
        this.currentChest.show();
        TweenUtils.delayedCall(20, () => {
            this.currentDoll.getBody().filters = [FilterUtils.makeFilter(0xffff66)];
        }, this);
    }

    public update(): void {
        super.update(this.game);
        if (this.snowM) this.snowM.update();
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentDoll = null;
        this.currentChest = null;

        this.chestAnna.dispose();
        this.chestElza.dispose();

        if (this.snowB) this.snowB.dispose();
        if (this.snowM) this.snowM.dispose();
        if (this.snowF) this.snowF.dispose();

        if (this.fg) this.fg.destroy(true);
        // if (this.bg) this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.CONT_2 = this.picture;
        this.game.world.remove(GameConfig.CONT_2);

        // GameConfig.DOLL_1 = this.elza.extract();
        // GameConfig.DOLL_2 = this.anna.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.currentChest.disable();
        this.currentChest.hide();
        this.elza.disableListeners();
        this.elza.getBody().filters = null;
        this.anna.disableListeners();
        this.anna.getBody().filters = null;
        TweenUtils.fadeAndScaleOut(this.playBtn);
        TweenUtils.fadeOut(this.fg, Phaser.Timer.SECOND * 1);
        // TweenUtils.moveOut(this.fg, -960, 0, Phaser.Timer.SECOND * 1.5);
        TweenUtils.moveInOut(this.anna.getBody(), 516, this.anna.getBody().y, Phaser.Timer.SECOND * 2);
        TweenUtils.moveInOut(this.elza.getBody(), 447, this.elza.getBody().y, Phaser.Timer.SECOND * 2);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 4, () => {
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

