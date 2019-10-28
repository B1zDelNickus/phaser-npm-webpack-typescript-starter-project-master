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
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Kjhdfjdfjjdfjdf extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private mmmm: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private playBtn: Phaser.Button = null;

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
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .configure({hideSelected: true})
            .background(0, 8,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(104, 85,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(338, 104, 'dress10',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress10,
                    this.onItem)
                .item(276, 93, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress7,
                    this.onItem)
                .item(153, 82, 'dress9',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress9,
                    this.onItem)
                .item(93, 68, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress8,
                    this.onItem)
            .build()
            .page()
                .pageShelf(104, 85,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(268, 98, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress6,
                    this.onItem)
                .item(224, 85, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress5,
                    this.onItem)
                .item(86, 72, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress4,
                    this.onItem)
            .build()
            .page()
                .pageShelf(104, 85,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(327, 103, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                    this.onItem)
                .item(179, 88, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                    this.onItem)
                .item(87, 75, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(101, 259,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(116, 62, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair3,
                    this.onItem)
                .item(212, 58, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair5,
                    this.onItem)
                .item(104, 278, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair6,
                    this.onItem)
                .item(260, 272, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair4,
                    this.onItem)
                .item(287, 450, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair1,
                    this.onItem)
                .item(110, 481, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair2,
                    this.onItem)
            .build()
            .page()
                .pageShelf(102, 225,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf3)
                .item(308, 122, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag1,
                    this.onItem)
                .item(130, 122, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat1,
                    this.onItem)
                .item(97, 290, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(208, 285, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
                    this.onItem)
                .item(316, 279, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew3,
                    this.onItem)
                .item(321, 485, 'jew4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew4,
                    this.onItem)
                .item(211, 495, 'jew6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew6,
                    this.onItem)
                .item(97, 504, 'jew5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew5,
                    this.onItem)
            .build()
            .leftArrow(-5, 297,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Lb)
            .rightArrow(458, 297,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Rb)
            .build();

        this.btnContainer = this.game.add.group();
        this.mmmm =
            GuiUtils.makeSpritesheetButton(this, this.btnContainer, 734, 90, 1, 9, true,
            '', ImageUtils.getSpritesheetClass('SpritesheetsMmmm22362944').getName(),
            GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
            GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        // Dolls
        this.doll = new Doll(this, 521, 35)
            .layer(0, 0, 'bag_b',
                ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJas').Frames,
                'BbB', null, true)
            .layer(0, 0, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollJasHairB').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasHairB').Frames,
                'HB', 'HB1')
            .layer(0, 0, 'dress_b',
                ImageUtils.getAtlasClass('AtlasesDollJasDressB').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasDressB').Frames,
                'DB', null)
            .layer(0, 0, 'body',
                ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJas').Frames,
                null, 'Body')
            .layer(0, 0, 'jew_b',
                ImageUtils.getAtlasClass('AtlasesDollJasJew').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasJew').Frames,
                'JB', null, true)
            .layer(0, 0, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollJasDress').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasDress').Frames,
                'D', null)
            .layer(0, 0, 'und',
                ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJas').Frames,
                null, 'D')
            .layer(0, 0, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJas').Frames,
                'Bb', null, true)
            .layer(0, 0, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollJasJew').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasJew').Frames,
                'J', null, true)
            .layer(0, 0, 'head',
                ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJas').Frames,
                null, 'Head')
            .layer(0, 0, 'jew_f',
                ImageUtils.getAtlasClass('AtlasesDollJasJew').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasJew').Frames,
                'JF', null, true)
            .layer(0, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollJasHair').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJasHair').Frames,
                'H', 'H1')
            .layer(0, 0, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
                ImageUtils.getAtlasClass('AtlasesDollJas').Frames,
                'Ht', null, true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 191, 720 - 202,
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

        // Animations goes here

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        /*if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            AdUtils.playAds();
        }*/
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.doll.on('dress', index, 'top', 'bot', 'und'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            this.doll.on('dress_b', index);
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.doll.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.doll.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'bot', 'dress');
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.doll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('jew', index);
            this.doll.on('jew_b', index);
            this.doll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index);
            this.doll.on('bag_b', index);
            // this.doll.on('bag_f', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('glove', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.doll.on('hair', index))
                this.chest.onEquiped(name, 'hair');
            this.doll.on('hair_b', index);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.mmmm) this.mmmm.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_2 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
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

