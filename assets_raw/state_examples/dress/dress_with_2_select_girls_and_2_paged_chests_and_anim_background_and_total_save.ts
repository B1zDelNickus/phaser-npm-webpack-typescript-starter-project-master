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

export default class Jhghdfhdfhfdhhdf extends Phaser.State {

    private NEXT = 'Select';
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
    private snowM: IParticle = null;
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
        this.snowM = null;
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
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());
        this.picture.add(this.bg);

        this.snowM = new SnowMiddleParticles();
        this.snowM.init(null, null);
        this.snowM.addToContainer(this.picture);
        this.snowM.start();

        this.fg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg4').getName());
        this.picture.add(this.fg);

        // Chests
        this.chestElza = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(650, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(706, 223,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(744, 118, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElTop1,
                    this.onItem)
                .item(715, 257, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElTop2,
                    this.onItem)
                .item(790, 380, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElTop3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 223,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(729, 117, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElBot1,
                    this.onItem)
                .item(723, 247, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElBot2,
                    this.onItem)
                .item(764, 394, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElBot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 223,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(769, 156, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe1,
                    this.onItem)
                .item(771, 287, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe2,
                    this.onItem)
                .item(775, 429, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 223,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(715, 160, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElGlass1,
                    this.onItem)
                .item(819, 121, 'pill1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElPill1,
                    this.onItem)
                .item(712, 288, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElSock1,
                    this.onItem)
                .item(770, 350, 'sock2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElSock2,
                    this.onItem)
                .item(839, 262, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElAcs1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 368,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .compoundItem(5, 1, -1, 769, 119, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'ElHair',
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .item(754, 122, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Big-Sale-Rush.html'))
                .item(775, 440, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Big-Sale-Rush.html'),
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
                .build()
            .leftArrow(717, 470,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(871, 485,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        this.chestAnna = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(650, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(726, 110,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf4)
                .item(692, 101, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnDress1,
                    this.onItem)
                .item(804, 96, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnDress2,
                    this.onItem)
                .item(760, 302, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnDress3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 187,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf5)
                .item(723, 102, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnBot1,
                    this.onItem)
                .item(785, 253, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnBot2,
                    this.onItem)
                .item(728, 394, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnBot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 187,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf5)
                .item(768, 131, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnShoe1,
                    this.onItem)
                .item(783, 244, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnShoe2,
                    this.onItem)
                .item(776, 403, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnShoe3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(706, 223,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf3)
                .pageShelf(706, 344,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf3)
                .pageShelf(706, 465,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf3)
                .item(723, 129, 'pill1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnPill1,
                    this.onItem)
                .item(838, 106, 'pill2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnPill2,
                    this.onItem)
                .item(756, 235, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnSock1,
                    this.onItem)
                .item(832, 248, 'sock2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnSock2,
                    this.onItem)
                .item(806, 370, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AnAcs1,
                    this.onItem)
            .build()
            .page()
            .pageShelf(706, 368,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
            .compoundItem(5, 1, -1, 769, 119, 'hair',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'AnHair',
                this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
            .item(754, 122, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Big-Sale-Rush.html'))
            .item(775, 440, 'mmmm_btn',
                ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Big-Sale-Rush.html'),
                GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
            .build()
            .leftArrow(717, 470,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(871, 485,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.chestElza.findItem('mmmm_btn').scale.setTo(.655);
            EffectUtils.makeScaleAnimation(this.chestElza.findItem('mmmm_btn'), .7, 500);
            this.chestAnna.findItem('mmmm_btn').scale.setTo(.655);
            EffectUtils.makeScaleAnimation(this.chestAnna.findItem('mmmm_btn'), .7, 500);
        }

        // Dolls
        this.elza = new Doll(this, -44, 279)
            .enableListeners()
            .layer(389, 40, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'HB', 'HB')
            .layer(4, 16, 'body',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                null, 'Body')
            .layer(3, 15, 'sock',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'Sk', null, true)
            .layer(48, 71, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'B', null)
            .layer(0, 7, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'S', null)
            .layer(241, 89, 'top',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'T', null)
            .layer(417, 39, 'head',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                null, 'Head')
            .layer(291, 102, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'Ac', null, true)
            .layer(377, 6, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'H', 'H')
            .layer(411, 34, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'Gs', null, true)
            .layer(262, 139, 'pill',
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHome').Frames,
                'Pl', null, true)
            .setListeners(this, this.changeDoll, GuiUtils.addOverGlowParentHandler, GuiUtils.addOutGlowParentHandler);

        this.anna = new Doll(this, 312, 185)
            .enableListeners()
            .layer(214, 6, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'HB', 'HB')
            .layer(13, 64, 'body',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                null, 'Body')
            .layer(13, 267, 'sock',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'Sk', null, true)
            .layer(53, 199, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'B', null)
            .layer(0, 324, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'S', null)
            .layer(182, 100, 'top',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'T', null)
            .layer(239, 5, 'head',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                null, 'Head')
            .layer(206, -3, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'H', 'H')
            .layer(254, 157, 'pill',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'Pl', null, true)
            .layer(301, 214, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAnnaHome').Frames,
                'Ac', null, true)
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
        this.currentChest = this.chestElza;
        this.currentDoll = this.elza;
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
            // PreloaderUtils.preloadResultState();
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

        if (this.snowM) this.snowM.dispose();

        // if (this.fg) this.fg.destroy(true);
        // if (this.bg) this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.CONT_1 = this.picture;
        this.game.world.remove(GameConfig.CONT_1);

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

