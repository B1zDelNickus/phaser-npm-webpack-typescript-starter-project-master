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

export default class Ljkdfkdfjgdghdfhhdh extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private arrow: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private lArrow: Phaser.Button = null;
    private rArrow: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private isDown: boolean;
    private direct: number;
    private spd: number;

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

        this.doll = null;
        this.chest = null;
        this.isDown = false;
        this.direct = -1;
        this.spd = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .configure({hideSelected: true})
            .background(157, 14, ImageUtils.getImageClass('ImagesChest').getName())
            .static()
                .item(161, 30, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair1,
                    this.onItem)
                .item(264, 23, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair2,
                    this.onItem)
                .item(338, 47, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair3,
                    this.onItem)
                .item(186, 207, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair4,
                    this.onItem)
                .item(275, 191, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair5,
                    this.onItem)
                .item(354, 207, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair6,
                    this.onItem)
                .item(623, 297, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Acs1,
                    this.onItem)
                .item(467, 42, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                    this.onItem)
                .item(546, 43, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                    this.onItem)
                .item(612, 43, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                    this.onItem)
                .item(723, 43, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress4,
                    this.onItem)
                .item(805, 42, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress5,
                    this.onItem)
                .item(817, 43, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress6,
                    this.onItem)
                .item(903, 42, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress7,
                    this.onItem)
                .item(977, 43, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress8,
                    this.onItem)
                .item(1049, 43, 'dress9',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress9,
                    this.onItem)
                .item(1180, 44, 'dress10',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress10,
                    this.onItem)
                .item(729, 369, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(829, 369, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
                    this.onItem)
                .item(921, 365, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew3,
                    this.onItem)
                .item(1011, 369, 'jew4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew4,
                    this.onItem)
                .item(1113, 369, 'jew5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew5,
                    this.onItem)
                .item(572, 543, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe1,
                    this.onItem)
                .item(673, 539, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe2,
                    this.onItem)
                .item(766, 551, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe3,
                    this.onItem)
                .item(878, 535, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe4,
                    this.onItem)
                .item(993, 521, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe5,
                    this.onItem)
                .item(1101, 537, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe6,
                    this.onItem)
                .item(1307, 62, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top1,
                    this.onItem)
                .item(1365, 61, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top2,
                    this.onItem)
                .item(1425, 61, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top3,
                    this.onItem)
                .item(1495, 62, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top4,
                    this.onItem)
                .item(1578, 60, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top5,
                    this.onItem)
                .item(1619, 61, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top6,
                    this.onItem)
                .item(1275, 240, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot1,
                    this.onItem)
                .item(1346, 240, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot2,
                    this.onItem)
                .item(1413, 240, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot3,
                    this.onItem)
                .item(1476, 240, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot4,
                    this.onItem)
                .item(1539, 240, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot5,
                    this.onItem)
                .item(1609, 240, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot6,
                    this.onItem)
            .build()
            .button(290, 385, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Mmmm,
                GuiUtils.goLinkInMoreGames)
            .build();

        // Dolls
        this.doll = new Doll(this, 304, 34)
            .layer(199, 129, 'acs_b',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'AcB', null, true)
            .layer(92, 2, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'HB', 'HB')
            .layer(0, 30, 'body',
                ImageUtils.getAtlasClass('AtlasesDollBelleBody').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelleBody').Frames,
                null, 'Body')
            .layer(44, 593, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'S', null)
            .layer(53, 236, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'B', null)
            .layer(87, 122, 'top',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'T', null)
            .layer(26, 120, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'D', null)
            .layer(123, 91, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'J', null, true)
            .layer(180, 131, 'acs',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'Ac', null, true)
            .layer(95, 2, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
                ImageUtils.getAtlasClass('AtlasesDollBelle').Frames,
                'H', 'H');

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 144, 720 - 144,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getName(), 7, true,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.lArrow = this.gui.addExtraBtn(10, 259,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Lb,
            null
        );
        this.rArrow = this.gui.addExtraBtn(834, 259,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Rb,
            null
        );
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.lArrow.scale.setTo(0);
        this.lArrow.alpha = 0;
        this.rArrow.scale.setTo(0);
        this.rArrow.alpha = 0;

        this.lArrow.events.onInputUp.add(this.onUp, this);
        this.lArrow.events.onInputDown.add(this.onDown, this);
        this.rArrow.events.onInputUp.add(this.onUp, this);
        this.rArrow.events.onInputDown.add(this.onDown, this);

        this.arrow = this.game.add.sprite(177 + 75, 433 + 150,
            ImageUtils.getSpritesheetClass('SpritesheetsMArrow154825').getName(),
            [0, 1, 2, 3, 4], this.chest.getBody());
        this.arrow.animations.add('arrow');
        this.arrow.animations.play('arrow', 10, true);
        this.arrow.anchor.setTo(.5, 2);
        TweenUtils.rotate(this.arrow, 12, Phaser.Timer.SECOND * .75, 0, 99999, true);

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
        TweenUtils.customFadeAndScaleIn(this.lArrow, 1, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.customFadeAndScaleIn(this.rArrow, 1, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    onDown(sprite: Phaser.Button) {
        if (sprite === this.lArrow) {
            this.direct = 1;
        }
        else {
            this.direct = -1;
        }
        this.spd = 4;
        this.isDown = true;
    }

    onUp() {
        this.isDown = false;
    }

    update(): void {
        super.update(this.game);

        if (this.isDown) {
            this.spd += 0.3;
        }
        else {
            this.spd -= 0.3;
        }
        if (this.spd > 6)
            this.spd = 6;
        if (this.spd < 0)
            this.spd = 0;

        this.bg.x += this.spd * this.direct;
        this.chest.getBody().x += this.spd * this.direct;

        if (this.bg.x <= -960) {
            this.bg.x = -960;
            this.chest.getBody().x = -960;
        }
        if (this.bg.x >= 0) {
            this.bg.x = 0;
            this.chest.getBody().x = 0;
        }
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
            if (this.doll.on('jew', index))
                this.chest.onEquiped(name, 'jew');
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('acs', index);
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

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.chest.dispose();

        this.bg.destroy(true);
        this.arrow.destroy(true);
        this.lArrow.destroy(true);
        this.rArrow.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_3 = this.doll.extract();
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

