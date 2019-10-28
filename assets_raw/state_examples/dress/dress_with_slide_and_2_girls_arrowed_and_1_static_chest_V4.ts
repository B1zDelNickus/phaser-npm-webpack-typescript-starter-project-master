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

export default class Nbbhjhfhfhfhhff extends Phaser.State {

    private NEXT = 'Select';
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
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName(), null, this.bgContainer);

        // Chests
        this.chest = new Chest(this, 0)
            .background(284, 29,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .static()
                .item(385, 56, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
                    this.onItem)
                .item(487, 93, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
                    this.onItem)
                .item(602, 72, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat3,
                    this.onItem)
                .item(685, 95, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass1,
                    this.onItem)
                .item(383, 273, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1,
                    this.onItem)
                .item(470, 273, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2,
                    this.onItem)
                .item(556, 271, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3,
                    this.onItem)
                .item(634, 271, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4,
                    this.onItem)
                .item(370, 174, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1,
                    this.onItem)
                .item(460, 173, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2,
                    this.onItem)
                .item(538, 174, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3,
                    this.onItem)
                .item(613, 172, 'jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top4,
                    this.onItem)
                .item(355, 422, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew1,
                    this.onItem)
                .item(423, 422, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew2,
                    this.onItem)
                .item(495, 478, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
                    this.onItem)
                .item(576, 478, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag2,
                    this.onItem)
                .item(662, 485, 'neck1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Neck1,
                    this.onItem)
                .item(724, 468, 'neck2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Neck2,
                    this.onItem)
                .item(350, 603, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe1,
                    this.onItem)
                .item(409, 607, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe2,
                    this.onItem)
                .item(468, 607, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe3,
                    this.onItem)
                .item(529, 593, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe4,
                    this.onItem)
                .item(580, 562, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe5,
                    this.onItem)
                .item(628, 572, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe6,
                    this.onItem)
                .item(695, 603, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe7,
                    this.onItem)
                .item(753, 598, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe8,
                    this.onItem)
                .compoundItem(4, 1, -1, 710, 292, 'jhair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'JsHair',
                    this.onItem)
                .compoundItem(4, 1, -1, 710, 292, 'ahair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'AvHair',
                    this.onItem)
                .item(715, 152, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                    GuiUtils.goLinkInMoreGames)
                .build()
            .build();

        // Dolls
        this.jas = new Doll(this, 86, 39)
            .layer(77, 8, 'hat_b',
                'AtlasesDollJasOne',
                'HtB', null, true)
            .layer(15, 108, 'jack_b',
                'AtlasesDollJasOne',
                'JkB', null, true)
            .layer(95, -21, 'hair_b',
                'AtlasesDollJasOne',
                'HB', 'HB')
            .layer(0, 86, 'body',
                'AtlasesDollJasOne',
                null, 'Body')
            .layer(33, 241, 'bot',
                'AtlasesDollJasOne',
                'B', null)
            .layer(13, 144, 'dress',
                'AtlasesDollJasOne',
                'D', 'D1', false, [], ['jack'])
            .layer(26, 443, 'shoe',
                'AtlasesDollJasOne',
                'S', null)
            .layer(31, 278, 'bag',
                'AtlasesDollJasOne',
                'Bb', null, true)
            .layer(15, 108, 'jack',
                'AtlasesDollJasOne',
                'Jk', null, true)
            .layer(114, 112, 'jew',
                'AtlasesDollJasOne',
                'J', null, true)
            .layer(74, 102, 'neck',
                'AtlasesDollJasOne',
                'Nk', null, true)
            .layer(118, 24, 'head',
                'AtlasesDollJasOne',
                null, 'Head')
            .layer(70, 2, 'hair',
                'AtlasesDollJasOne',
                'H', 'H', false, [], ['hat_1'])
            .layer(112, 62, 'glass',
                'AtlasesDollJasOne',
                'Gs', null, true)
            .layer(77, 8, 'hat',
                'AtlasesDollJasOne',
                'Ht', null, true);

        this.avrora = new Doll(this, 960, 39)
            .layer(9, 0, 'hat_b',
                'AtlasesDollAvroraOne',
                'HtB', null, true)
            .layer(15, 102, 'jack_b',
                'AtlasesDollAvroraOne',
                'JkB', null, true)
            .layer(14, 6, 'hair_b',
                'AtlasesDollAvroraOne',
                'HB', 'HB')
            .layer(0, 81, 'body',
                'AtlasesDollAvroraOne',
                null, 'Body')
            .layer(43, 234, 'bot',
                'AtlasesDollAvroraOne',
                'B', null)
            .layer(0, 138, 'dress',
                'AtlasesDollAvroraOne',
                'D', 'D1', false, [], ['jack'])
            .layer(63, 438, 'shoe',
                'AtlasesDollAvroraOne',
                'S', null)
            .layer(96, 273, 'bag',
                'AtlasesDollAvroraOne',
                'Bb', null, true)
            .layer(15, 102, 'jack',
                'AtlasesDollAvroraOne',
                'Jk', null, true)
            .layer(57, 106, 'jew',
                'AtlasesDollAvroraOne',
                'J', null, true)
            .layer(36, 97, 'neck',
                'AtlasesDollAvroraOne',
                'Nk', null, true)
            .layer(53, 18, 'head',
                'AtlasesDollAvroraOne',
                null, 'Head')
            .layer(23, -22, 'hair',
                'AtlasesDollAvroraOne',
                'H', 'H', false, [], ['hat_1'])
            .layer(62, 55, 'glass',
                'AtlasesDollAvroraOne',
                'Gs', null, true)
            .layer(9, 0, 'hat',
                'AtlasesDollAvroraOne',
                'Ht', null, true);

        this.bgContainer.add(this.chest.getBody());
        this.bgContainer.add(this.jas.getBody());
        this.bgContainer.add(this.avrora.getBody());

        // this.jas.show(true);
        // this.avrora.hide(true);

        this.btnContainer = this.game.add.group();
        this.lArrow = GuiUtils.makeButton(
            this, this.bgContainer, 229, 240, 1,
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
            TweenUtils.moveInOut(this.bgContainer, -220, 0, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.jas.getBody(), 86 - 120, 39, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.avrora.getBody(), 960 - 100, 39, Phaser.Timer.SECOND *  1);
            TweenUtils.moveOut(this.cindy, -42 - 500, 364 + 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
            TweenUtils.moveIn(this.belle, 805, 379, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
            this.chest.findItem('jhair').visible = false;
            this.chest.findItem('ahair').visible = true;
        } else {
            this.currentDoll = this.jas;
            TweenUtils.fadeAndScaleOut(this.lArrow, Phaser.Timer.SECOND *  .75);
            TweenUtils.fadeAndScaleIn(this.rArrow, Phaser.Timer.SECOND *  .75, Phaser.Timer.SECOND *  1);
            TweenUtils.moveInOut(this.bgContainer, 0, 0, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.jas.getBody(), 86, 39, Phaser.Timer.SECOND *  1);
            TweenUtils.move(this.avrora.getBody(), 960, 39, Phaser.Timer.SECOND *  1);
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

        this.chest.dispose();

        GameConfig.DOLL_2 = this.avrora.extract();
        GameConfig.DOLL_1 = this.jas.extract();

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

