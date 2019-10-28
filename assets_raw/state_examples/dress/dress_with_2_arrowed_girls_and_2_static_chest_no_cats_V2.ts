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

export default class Lkjhdjhghdfjjj extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;
    private changing = false;

    private currentChest: Chest = null;
    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private elza: Doll = null;
    private avrora: Doll = null;
    private chestElza: Chest = null;
    private chestAvrora: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private lArrow: Phaser.Button = null;
    private rArrow: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private avroraDressed: boolean = false;
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

        this.avrora = null;
        this.elza = null;

        this.changing = false;
        this.avroraDressed = false;
        this.elzaDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        // Chests
        this.chestElza = new Chest(this)
            .background(-15, -12,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .static()
                .item(351, 21, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElDress3,
                    this.onItem) // , GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(214, -25, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElDress2,
                    this.onItem)
                .item(195, -37, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElDress1,
                    this.onItem)
                .compoundItem(4, 1, -1, -1, 338, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'ElHair',
                    this.onItem)
                .item(207, 573, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe1,
                    this.onItem)
                .item(281, 568, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe2,
                    this.onItem)
                .item(344, 549, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe3,
                    this.onItem)
                .item(407, 541, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElShoe4,
                    this.onItem)
                .item(66, 121, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElAcs1,
                    this.onItem)
                .item(50, 278, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElGlass1,
                    this.onItem)
                .item(220, 361, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ElJew1,
                    this.onItem)
                .item(317, 431, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                    GuiUtils.goLinkInMoreGames)
                .build()
            .build();

        this.chestAvrora = new Chest(this)
            .background(-15, -12,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .static()
                .item(357, 49, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvDress3,
                    this.onItem) // , GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(282, 43, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvDress2,
                    this.onItem)
                .item(202, 38, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvDress1,
                    this.onItem)
                .compoundItem(4, 1, -1, 7, 338, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'AvHair',
                    this.onItem)
                .item(199, 569, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe1,
                    this.onItem)
                .item(269, 570, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe2,
                    this.onItem)
                .item(331, 554, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe3,
                    this.onItem)
                .item(394, 586, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe4,
                    this.onItem)
                .item(61, 259, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvAcs1,
                    this.onItem)
                .item(58, 137, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvGlass1,
                    this.onItem)
                .item(205, 361, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvJew1,
                    this.onItem)
                .item(317, 431, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                    GuiUtils.goLinkInMoreGames)
                .build()
            .build();

        // Dolls
        this.elza = new Doll(this, 574, 20)
            .layer(58, 0, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HB', 'HB')
            .layer(0, -1, 'body',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Body')
            .layer(110, 566, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'S', null)
            .layer(-2, 10, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'D', null)
            .layer(77, 73, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'J', null, true)
            .layer(201, 103, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Ac', null, true)
            .layer(26, -3, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'H', 'H')
            .layer(93, 50, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Gs', null, true);

        this.avrora = new Doll(this, 545, 17)
            .layer(115, 20, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'HB', 'HB')
            .layer(0, 21, 'body',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                null, 'Body')
            .layer(40, 115, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'D', null)
            .layer(33, 583, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'S', null)
            .layer(144, 118, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'J', null, true)
            .layer(109, -1, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'H', 'H')
            .layer(119, 274, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'Ac', null, true)
            .layer(164, 44, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'Gs', null, true);

        this.elza.show(true);
        this.avrora.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 144, 720 - 144,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getName(), 7, true,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.lArrow = this.gui.addExtraBtn(510, 268,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb,
            this.changeDoll
        );
        this.rArrow = this.gui.addExtraBtn(830, 268,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb,
            this.changeDoll
        );
        this.lArrow.scale.setTo(0);
        this.lArrow.alpha = 0;
        this.rArrow.scale.setTo(0);
        this.rArrow.alpha = 0;
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

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
            this.chestElza.show();
        }, this);
        TweenUtils.customFadeAndScaleIn(this.lArrow, 1, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3);
        TweenUtils.customFadeAndScaleIn(this.rArrow, 1, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
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
            this.currentDoll.on('dress_b', index);
            if (this.currentDoll === this.avrora) this.avroraDressed = true;
            if (this.currentDoll === this.elza) this.elzaDressed = true;
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.currentChest.onEquiped(name, 'top', 'dress');
            if (this.currentDoll === this.avrora) this.avroraDressed = true;
            if (this.currentDoll === this.elza) this.elzaDressed = true;
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.currentChest.onEquiped(name, 'bot', 'dress');
            if (this.currentDoll === this.avrora) this.avroraDressed = true;
            if (this.currentDoll === this.elza) this.elzaDressed = true;
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
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
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
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index))
                this.currentChest.onEquiped(name, 'hair');
            this.currentDoll.on('hair_b', index);
        }

        if (this.playBtn.alpha === 0 && this.avroraDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(): void {
        if (this.changing) return;
        this.changing = true;

        this.currentDoll.hide();
        this.currentChest.hide();

        if (this.currentDoll === this.elza) {
            this.currentDoll = this.avrora;
            this.currentChest = this.chestAvrora;
        } else {
            this.currentDoll = this.elza;
            this.currentChest = this.chestElza;
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

        this.chestAvrora.dispose();
        this.chestElza.dispose();

        this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_2 = this.avrora.extract();
        GameConfig.DOLL_1 = this.elza.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chestAvrora.disable();
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

