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

export default class Bhhfhfhfhhfhfhf extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private jas: Doll = null;
    private avrora: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private cindy: Phaser.Sprite = null;
    private belle: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private btnContainer: Phaser.Group = null;
    private bgContainer: Phaser.Group = null;

    private lArrow: Phaser.Button = null;
    private rArrow: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private avroraDressed: boolean = false;
    private jasDressed: boolean = false;

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
        this.jas = null;

        this.changing = true;
        this.avroraDressed = false;
        this.jasDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bgContainer = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName(), null, this.bgContainer);

        // Chests
        this.chest = new Chest(this, 0)
            .background(313, 29,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .item(460, 72, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat1,
                    this.onItem)
                .item(618, 72, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat2,
                    this.onItem)
                .item(376, 162, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                    this.onItem)
                .item(342, 166, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                    this.onItem)
                .item(458, 159, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                    this.onItem)
                .item(546, 161, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress4,
                    this.onItem)
                .item(650, 158, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress5,
                    this.onItem)
                .item(722, 160, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress6,
                    this.onItem)
                .item(426, 408, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(522, 408, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
                    this.onItem)
                .item(611, 408, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
                    this.onItem)
                .item(466, 587, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe1,
                    this.onItem)
                .item(553, 581, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe2,
                    this.onItem)
                .item(630, 581, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe3,
                    this.onItem)
                .item(704, 575, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe4,
                    this.onItem)
            .build()
            .page()
                .item(469, 48, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat3,
                    this.onItem)
                .item(582, 68, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat4,
                    this.onItem)
                .item(386, 164, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress7,
                    this.onItem)
                .item(464, 157, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress8,
                    this.onItem)
                .item(538, 163, 'dress9',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress9,
                    this.onItem)
                .item(538, 158, 'dress10',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress10,
                    this.onItem)
                .item(653, 165, 'dress11',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress11,
                    this.onItem)
                .item(400, 460, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag1,
                    this.onItem)
                .item(530, 460, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glove1,
                    this.onItem)
                .item(453, 572, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe5,
                    this.onItem)
                .item(542, 596, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe6,
                    this.onItem)
                .item(629, 594, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe7,
                    this.onItem)
                .item(715, 588, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe8,
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL, true)
                .item(477, 189, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cross,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'),
                    GuiUtils.addOverScaleHandler, GuiUtils.addOutScaleHandler)
            .build()
            .static()
                .compoundItem(4, 1, -1, 735, 384, 'jhair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'JsHair',
                    this.onItem)
                .compoundItem(4, 1, -1, 735, 384, 'ahair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'AvHair',
                    this.onItem)
            .build()
            .leftArrow(305, 430,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Lb)
            .rightArrow(872, 430,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Rb)
            .build();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.chest.findItem('mmmm').filters = [EffectUtils.makeGlowAnimation(0xffff66, 1500)];
        }

        // Dolls
        this.jas = new Doll(this, 82, 46)
            .layer(121, -36, 'hair_b',
                'AtlasesDollJasTwo',
                'HB', 'HB')
            .layer(33, 55, 'body',
                'AtlasesDollJasTwo',
                null, 'Body')
            .layer(89, 532, 'shoe',
                'AtlasesDollJasTwo',
                'S', null)
            .layer(-152, 93, 'dress',
                'AtlasesDollJasTwoDress',
                'D', null)
            .layer(146, 102, 'jew',
                'AtlasesDollJasTwo',
                'J', null, true)
            .layer(152, 8, 'head',
                'AtlasesDollJasTwo',
                null, 'Head')
            .layer(116, -13, 'hair',
                'AtlasesDollJasTwo',
                'H', 'H')
            .layer(33, 111, 'glove',
                'AtlasesDollJasTwo',
                'Gl', null, true)
            .layer(127, 1, 'hat',
                'AtlasesDollJasTwo',
                'Ht', null, true)
            .layer(0, 278, 'bag',
                'AtlasesDollJasTwo',
                'Bb', null, true);

        this.avrora = new Doll(this, 960, 46)
            .layer(44, 1, 'hair_b',
                'AtlasesDollAvroraTwo',
                'HB', 'HB')
            .layer(0, 60, 'body',
                'AtlasesDollAvroraTwo',
                null, 'Body')
            .layer(74, 536, 'shoe',
                'AtlasesDollAvroraTwo',
                'S', null)
            .layer(-130, 98, 'dress',
                'AtlasesDollAvroraTwoDress',
                'D', null)
            .layer(54, 107, 'jew',
                'AtlasesDollAvroraTwo',
                'J', null, true)
            .layer(54, 15, 'head',
                'AtlasesDollAvroraTwo',
                null, 'Head')
            .layer(41, -25, 'hair',
                'AtlasesDollAvroraTwo',
                'H', 'H')
            .layer(0, 115, 'glove',
                'AtlasesDollAvroraTwo',
                'Gl', null, true)
            .layer(40, 5, 'hat',
                'AtlasesDollAvroraTwo',
                'Ht', null, true)
            .layer(166, 283, 'bag',
                'AtlasesDollAvroraTwo',
                'Bb', null, true);

        this.bgContainer.add(this.jas.getBody());
        this.bgContainer.add(this.avrora.getBody());
        this.bgContainer.add(this.chest.getBody());

        // this.jas.show(true);
        // this.avrora.hide(true);

        this.btnContainer = this.game.add.group();
        this.lArrow = GuiUtils.makeButton(
            this, this.bgContainer, 289, 240, 1,
            'lb', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb,
            true, true, true,
            this.changeDoll, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.rArrow = GuiUtils.makeButton(
            this, this.bgContainer, 853, 240, 1,
            'rb', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb,
            true, true, true,
            this.changeDoll, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.lArrow.scale.setTo(0);
        this.lArrow.alpha = 0;
        this.rArrow.scale.setTo(0);
        this.rArrow.alpha = 0;
        this.cindy = this.game.add.sprite(-42 - 500, 364 + 500,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gr7,
            this.btnContainer);
        this.belle = this.game.add.sprite(785 + 500, 379 + 500,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gr8,
            this.btnContainer);
        this.cindy.scale.setTo(.85);
        this.belle.scale.setTo(.85);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        const moreBtn = this.gui.addExtraMore(
            960 - 148, 720 - 173,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeScaleAnimation(moreBtn, 1.05, Phaser.Timer.SECOND * .5);

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentDoll = this.jas;
        this.chest.findItem('ahair').visible = false;

        // Animations goes here
        // TweenUtils.fadeAndScaleIn(this.lArrow, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.rArrow, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        TweenUtils.moveIn(this.cindy, -42, 364, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2, () => {
            this.changing = false;
        }, this);
        // TweenUtils.moveIn(this.belle, 805, 379, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);

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
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            this.currentDoll.on('dress_b', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index))
                this.chest.onEquiped(name, 'bot', 'dress');
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
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
            this.currentDoll.on('bag_b', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('jack', index);
            this.currentDoll.on('jack_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('neck') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('neck', index);
        }
        else if (name.indexOf('jhair') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('hair', index))
                this.chest.onEquiped(name, 'hair');
            this.currentDoll.on('hair_b', index);
        }
        else if (name.indexOf('ahair') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('hair', index))
                this.chest.onEquiped(name, 'hair');
            this.currentDoll.on('hair_b', index);
        }
        if (this.currentDoll === this.avrora) this.avroraDressed = true;
        if (this.currentDoll === this.jas) this.jasDressed = true;
        if (this.playBtn.alpha === 0 && this.avroraDressed && this.jasDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(): void {
        if (this.changing) return;
        this.changing = true;

        // this.currentDoll.hide();

        if (this.currentDoll === this.jas) {
            this.currentDoll = this.avrora;
            TweenUtils.fadeAndScaleOut(this.rArrow, Phaser.Timer.SECOND *  .75);
            TweenUtils.fadeAndScaleIn(this.lArrow, Phaser.Timer.SECOND *  .75, Phaser.Timer.SECOND *  1);
            TweenUtils.moveInOut(this.bgContainer, -280, 0, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.jas.getBody(), 86 - 120, 46, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.avrora.getBody(), 960 - 75, 46, Phaser.Timer.SECOND *  1);
            TweenUtils.moveOut(this.cindy, -42 - 500, 364 + 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
            TweenUtils.moveIn(this.belle, 805, 379, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
            this.chest.findItem('jhair').visible = false;
            this.chest.findItem('ahair').visible = true;
        } else {
            this.currentDoll = this.jas;
            TweenUtils.fadeAndScaleOut(this.lArrow, Phaser.Timer.SECOND *  .75);
            TweenUtils.fadeAndScaleIn(this.rArrow, Phaser.Timer.SECOND *  .75, Phaser.Timer.SECOND *  1);
            TweenUtils.moveInOut(this.bgContainer, 0, 0, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.jas.getBody(), 86, 46, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.avrora.getBody(), 960, 46, Phaser.Timer.SECOND *  1);
            TweenUtils.moveIn(this.cindy, -42, 364, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
            TweenUtils.moveOut(this.belle, 805 + 500, 379 + 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
            this.chest.findItem('ahair').visible = false;
            this.chest.findItem('jhair').visible = true;
        }

        this.game.time.events.add(Phaser.Timer.SECOND *  1.5, () => {
            this.changing = false;
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentDoll = null;

        GameConfig.DOLL_4 = this.avrora.extract();
        GameConfig.DOLL_3 = this.jas.extract();

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.cindy) this.cindy.destroy(true);
        if (this.belle) this.belle.destroy(true);
        if (this.bgContainer) this.bgContainer.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
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

