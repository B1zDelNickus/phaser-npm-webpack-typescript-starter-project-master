import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {AdUtils} from '../utils/ad/ad.utils';
import {SoundUtils} from '../utils/sound/sound.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';
import {DecorBackground} from './template/decor/decor.background';
import {Doll} from './template/dress/doll';
import {Chest} from './template/dress/chest';

export default class Jjfjdfjfjjkjdfj extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;
    private changing = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private mirror: Phaser.Sprite = null;
    private currentDoll: Doll = null;
    private currentChest: Chest = null;
    private ariel: Doll = null;
    private cindy: Doll = null;
    private chestAriel: Chest = null;
    private chestCindy: Chest = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private arBtn: Phaser.Button = null;
    private ciBtn: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private arielDressed: boolean = false;
    private cindyDressed: boolean = false;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DECOR_STATE);
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

        this.mirror = this.game.add.sprite(442, 43,
            ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Mirror);

        this.ariel = new Doll(this, 442, 43)
            .layer(0, 0, 'hair_b',
                'AtlasesMakeAriel',
                'HB', 'HB')
            .layer(0, 0, 'body',
                'AtlasesMakeAriel',
                null, 'Body')
            .layer(0, 0, 'hair',
                'AtlasesMakeAriel',
                'H', 'H');

        this.cindy = new Doll(this, 442, 43)
            .layer(0, 0, 'hair_b',
                'AtlasesMakeCindy',
                'HB', 'HB')
            .layer(0, 0, 'body',
                'AtlasesMakeCindy',
                null, 'Body')
            .layer(0, 0, 'hair',
                'AtlasesMakeCindy',
                'H', 'H');

        this.ariel.show(true);
        this.cindy.hide(true);

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg3').getName());

        this.chestAriel = new Chest(this, -500)
            .background(0, 96,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Panel)
            .page()
                .item(0, 136, 'hair10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair10,
                    this.onItem)
                .item(131, 136, 'hair11',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair11,
                    this.onItem)
                .item(-3, 291, 'hair12',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair12,
                    this.onItem)
            .build()
            .page()
                .item(113, 145, 'hair7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair7,
                    this.onItem)
                .item(10, 129, 'hair9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair9,
                    this.onItem)
                .item(130, 344, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair5,
                    this.onItem)
            .build()
            .page()
                .item(99, 343, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair3,
                    this.onItem)
                .item(102, 137, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair4,
                    this.onItem)
                .item(3, 137, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair6,
                    this.onItem)
            .build()
            .page()
                .item(87, 280, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair1,
                    this.onItem)
                .item(122, 139, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair2,
                    this.onItem)
                .item(1, 169, 'hair8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArHair8,
                    this.onItem)
            .build()
            .build();

        this.chestCindy = new Chest(this, -500)
            .background(0, 96,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Panel)
            .page()
                .item(4, 128, 'hair9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair9,
                    this.onItem)
                .item(-9, 273, 'hair11',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair11,
                    this.onItem)
                .item(108, 119, 'hair12',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair12,
                    this.onItem)
            .build()
            .page()
                .item(-4, 135, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair5,
                    this.onItem)
                .item(139, 149, 'hair8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair8,
                    this.onItem)
                .item(99, 290, 'hair10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair10,
                    this.onItem)
            .build()
            .page()
                .item(94, 275, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair3,
                    this.onItem)
                .item(9, 204, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair6,
                    this.onItem)
                .item(122, 150, 'hair7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair7,
                    this.onItem)
            .build()
            .page()
                .item(139, 328, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair1,
                    this.onItem)
                .item(7, 336, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair2,
                    this.onItem)
                .item(60, 131, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CiHair4,
                    this.onItem)
            .build()
            .build();

        this.btnContainer = this.game.add.group();
        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                239, 596, 1,
                '0', ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Cat1,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                459, 594, 1,
                '1', ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Cat2,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                659, 598, 1,
                '2', ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Cat3,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                649, 478, 1,
                '3', ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Cat4,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                311, 332, 1,
                'mmmm', ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Mmmm,
                GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
                GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;

        // Initiations
        this.currentDoll = this.ariel;
        this.currentChest = this.chestAriel;

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
        this.arBtn = this.gui.addExtraBtn(131, 526,
            ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.ArBtn,
            this.changeDoll
        );
        this.ciBtn = this.gui.addExtraBtn(131, 526,
            ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.CinBtn,
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

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.9);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, () => {
            this.currentChest.show();
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private onTool(cat: Phaser.Button): void {
        const page = parseInt(cat.name);
        this.currentChest.showPage(page);
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
            this.currentDoll.on('top_b', index);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.currentChest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('bot_b', index);
            this.currentDoll.on('bot_f', index);
            this.currentDoll.on('bot_t', index);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.currentChest.onEquiped(name, 'shoe');
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
            this.currentDoll.on('hair', index);
            this.currentDoll.on('hair_b', index);
            if (this.currentDoll === this.ariel) {
                GameConfig.DOLL_1.on('hair', index);
                GameConfig.DOLL_1.on('hair_b', index);
            }
            if (this.currentDoll === this.cindy) {
                GameConfig.DOLL_2.on('hair', index);
                GameConfig.DOLL_2.on('hair_b', index);
            }
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
        this.currentChest.hide();
        if (this.currentDoll === this.ariel) {
            this.currentDoll = this.cindy;
            this.currentChest = this.chestCindy;
            TweenUtils.fadeAndScaleOut(this.ciBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        } else {
            this.currentDoll = this.ariel;
            this.currentChest = this.chestAriel;
            TweenUtils.fadeAndScaleOut(this.arBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }
        this.game.time.events.add(Phaser.Timer.SECOND * .5, () => {
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

        this.ariel.dispose();
        this.cindy.dispose();

        this.chestAriel.dispose();
        this.chestCindy.dispose();

        if (this.bg) this.bg.destroy(true);
        this.mirror.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.btn5.destroy(true);
        this.arBtn.destroy(true);
        this.ciBtn.destroy(true);

        this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        if (GameConfig.CURRENT_STATE === 2) GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.currentChest.disable();
        this.currentChest.hide();
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

