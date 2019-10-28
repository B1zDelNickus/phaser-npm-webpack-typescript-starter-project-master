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

export default class Sasdfsfsdseefsfsdf extends Phaser.State {

    private NEXT = 'Select';
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

        SoundUtils.play('salsa');
    }

    public preload(): void {
    }

    public create(): void {
        this.bg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Bg3);

        // Chests
        this.chest = new Chest(this)
	        .configure({hideSelected: true})
            .background(32, 27,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Chest)
            .page()
                .pageShelf(81, 105,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(288, 103, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress4,
                    this.onItem)
                .item(184, 103, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress3,
                    this.onItem)
                .item(86, 96, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress2,
                    this.onItem)
                .item(76, 94, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 105,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(244, 103, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress7,
                    this.onItem)
                .item(76, 97, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress6,
                    this.onItem)
                .item(79, 93, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Dress5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 278,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf2)
                .item(107, 123, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hair1,
                    this.onItem)
                .item(209, 131, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hair2,
                    this.onItem)
                .item(85, 316, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hair3,
                    this.onItem)
                .item(180, 340, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hair4,
                    this.onItem)
                .item(272, 313, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hair5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 203,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf3)
                .item(92, 389, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Jew1,
                    this.onItem)
                .item(186, 387, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Jew2,
                    this.onItem)
                .item(274, 389, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Jew3,
                    this.onItem)
                .item(255, 250, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Glove1,
                    this.onItem)
                .item(98, 125, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hat1,
                    this.onItem)
                .item(238, 165, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hat2,
                    this.onItem)
                .item(98, 319, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Hat3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 191,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf4)
                .item(109, 119, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe1,
                    this.onItem)
                .item(232, 128, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe2,
                    this.onItem)
                .item(113, 258, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe3,
                    this.onItem)
                .item(241, 241, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe4,
                    this.onItem)
                .item(113, 399, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe5,
                    this.onItem)
                .item(237, 411, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe6,
                    this.onItem)
                .item(178, 545, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shoe7,
                    this.onItem)
            .build()
            .category('dresses', true, 0, 1, 390, 128,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.DressBtn)
            .category('hairs', false, 2, 2, 390, 220,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.HairBtn)
            .category('jews', false, 3, 3, 390, 315,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.JewBtn)
            .category('shoes', false, 4, 4, 390, 408,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ShoeBtn)
            .categoryLeftArrow(92, 547,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Lb)
            .categoryRightArrow(290, 547,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Rb)
            .button(390, 501, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.MmmmBtn,
                GuiUtils.goLinkInMoreGames)
            .build();

        // Dolls
        this.doll = new Doll(this, 428, 21)
            .layer(179, 63, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'HB', 'HB')
            .layer(0, -1, 'body',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                null, 'Body')
            .layer(27, 602, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'S', null)
            .layer(70, 192, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'D', null)
            .layer(245, 154, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'J', null, true)
            .layer(144, 16, 'glove',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'Gl', null, true)
            .layer(174, 66, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'H', 'H')
            .layer(206, 94, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAriel').Frames,
                'Ht', null, true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 125, 720 - 199,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE11919931').getName(),
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
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

    private nextPage(): void {
        this.chest.nextPage();
    }

    private prevPage(): void {
        this.chest.prevPage();
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
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
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

