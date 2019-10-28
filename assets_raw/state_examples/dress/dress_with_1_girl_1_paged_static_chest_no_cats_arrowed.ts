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

export default class Hjhdfjdfjhghh extends Phaser.State {

    private NEXT = 'Dress2';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        // Chests
        this.chest = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(365, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .item(390, 33, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress6,
                    this.onItem)
                .item(438, 37, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress2,
                    this.onItem)
                .item(544, 36, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress4,
                    this.onItem)
                .item(590, 31, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress1,
                    this.onItem)
                .item(610, 31, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress3,
                    this.onItem)
                .item(691, 32, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress5,
                    this.onItem)
            .build()
            .page()
                .compoundItem(5, 1, -1, 499, 26, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Hair',
                    this.onItem)
                .item(432, 334, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew1,
                    this.onItem)
                .item(652, 360, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
                    this.onItem)
                .item(738, 357, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
                    this.onItem)
                .item(762, 34, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
                    this.onItem)
            .build()
            .static()
                .item(550, 554, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe1,
                    this.onItem)
                .item(626, 561, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe2,
                    this.onItem)
                .item(714, 554, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe3,
                    this.onItem)
                .item(448, 545, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe4,
                    this.onItem)
            .build()
            .leftArrow(883, 180,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(884, 261,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(356, -14, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                GuiUtils.goLinkInMoreGames)
            .build();

        // Dolls
        this.doll = new Doll(this, 67, 29)
            .layer(0, 0, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollElzaHairsB').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHairsB').Frames,
                'HB', 'HB')
            .layer(0, 0, 'dress_b',
                ImageUtils.getAtlasClass('AtlasesDollElzaDressesB').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaDressesB').Frames,
                'DB', null)
            .layer(0, 0, 'bag_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'BbB', null, true)
            .layer(0, 0, 'body',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Body')
            .layer(0, 0, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollElzaShoes').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaShoes').Frames,
                'S', null)
            .layer(0, 0, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollElzaDresses').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaDresses').Frames,
                'D', 'D')
            .layer(0, 0, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'J', null, true)
            .layer(0, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollElzaHairs').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaHairs').Frames,
                'H', 'H')
            .layer(0, 0, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Bb', null, true)
            .layer(0, 0, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Ht', null, true)
            .layer(0, 0, 'hand',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Hand');

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 155, 720 - 155,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621626').getName(), 1, false,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
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
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.chest.show, this.chest);

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
            if (this.doll.on('dress', index, 'top', 'bot'))
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
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index);
            this.doll.on('bag_b', index);
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

        this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.move(this.doll.getBody(), 303, this.doll.getBody().y, Phaser.Timer.SECOND * 1);
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

