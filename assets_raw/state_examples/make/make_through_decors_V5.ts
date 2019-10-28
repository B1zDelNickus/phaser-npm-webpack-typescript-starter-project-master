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

export default class Jjjjkfgjfjfg extends Phaser.State {

    private NEXT = 'Pread';
    private nextPrepared = false;
    private changing = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private mirror: Phaser.Sprite = null;
    private currentDecor: DecorBackground = null;
    private decorRap: DecorBackground = null;
    private decorElza: DecorBackground = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private cindy: Phaser.Sprite = null;
    private avrora: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private cloud3: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;
    private comState: number = 0;

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
        this.cat1 = false;
        this.cat2 = false;
        this.changing = false;
        this.comState = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.mirror = this.game.add.sprite(288, 31,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Mirror);

        this.decorRap = new DecorBackground(288, 31)
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Back)
            .layer('rum', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Rum1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Rum2)
            .build()
            .layer('lip', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Lip1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Lip2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Lip3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Lip4)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Lip5)
            .build()
            .layer('shad', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Shad1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Shad2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Shad3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Shad4)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Shad5)
            .build()
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Front)
            .layer('res', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Res1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Res2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Res3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Res4)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesMakeRap').getName(),
                    ImageUtils.getAtlasClass('AtlasesMakeRap').Frames.Res5)
            .build();
        this.decorElza = new DecorBackground(288, 31)
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Back)
            .layer('rum', false)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Rum1)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Rum2)
            .build()
            .layer('lip', false)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Lip1)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Lip2)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Lip3)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Lip4)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Lip5)
            .build()
            .layer('shad', false)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Shad1)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Shad2)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Shad3)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Shad4)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Shad5)
            .build()
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Front)
            .layer('res', false)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Res1)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Res2)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Res3)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Res4)
            .item(0, 0,
                ImageUtils.getAtlasClass('AtlasesMakeElza').getName(),
                ImageUtils.getAtlasClass('AtlasesMakeElza').Frames.Res5)
            .build();

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg4').getName());

        this.decorRap.show(true);
        this.decorElza.hide(true);

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                219, 394, 1,
                'rum', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.RumBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                347, 444, 1,
                'lip', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.LipBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                437, 401, 1,
                'res', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ResBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                567, 477, 1,
                'shad', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ShadBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                15, 230, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ArrBtn,
                true, true, true,
                this.changeDoll, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn5.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;
        this.btn5.alpha = 0;

        this.cindy = this.game.add.sprite(0 - 500, 124,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Gr6);
        this.avrora = this.game.add.sprite(714 + 500, 150,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Gr7);

        this.cloud1 = this.game.add.sprite(97, 161,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Cl6);
        this.cloud2 = this.game.add.sprite(13, 325,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Cl7);
        this.cloud3 = this.game.add.sprite(705, 312,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Cl8);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;

        // Initiations
        this.currentDecor = this.decorRap;

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.gui.addExtraMoreAnimated(
            960 - 168, 720 - 173,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1781833').getName(), 1 / 3, true,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.9);
        TweenUtils.fadeAndScaleIn(this.btn5, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 5, this.nextComic, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private nextComic() {
        if (this.comState === 0) {
            TweenUtils.moveIn(this.cindy, 0, 124, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                TweenUtils.fadeOut(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.cindy, 0 - 500, 124, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        else if (this.comState === 1) {
            TweenUtils.moveIn(this.avrora, 714, 150, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                TweenUtils.fadeOut(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.avrora, 714 + 500, 150, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        else if (this.comState === 2) {
            TweenUtils.moveIn(this.cindy, 0, 124, Phaser.Timer.SECOND * 1, 0);
            TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                TweenUtils.fadeOut(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
                TweenUtils.moveOut(this.cindy, 0 - 500, 124, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * this.game.rnd.between(3, 6), this.nextComic, this);
                }, this);
            }, this);
        }
        this.comState++;
        if (this.comState > 2) this.comState = 0;
    }

    private changeDoll(): void {
        if (this.changing) return;
        this.changing = true;
        this.currentDecor.hide();
        if (this.currentDecor === this.decorRap) {
            this.currentDecor = this.decorElza;
        } else {
            this.currentDecor = this.decorElza;
            this.currentDecor = this.decorRap;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDecor.show();
            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        this.currentDecor.next(name);
        if (this.currentDecor === this.decorRap) this.cat1 = true;
        if (this.currentDecor === this.decorElza) this.cat2 = true;
        if (this.cat1 && this.cat2) {
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.btn5.destroy(true);
        this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.decorRap.dispose();
        this.decorElza.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.FREE_RESULT = {
            rapRum: this.decorRap.getIndex('rum') + 1,
            rapLip: this.decorRap.getIndex('lip') + 1,
            rapShad: this.decorRap.getIndex('shad') + 1,
            rapRes: this.decorRap.getIndex('res') + 1,
            elRum: this.decorElza.getIndex('rum') + 1,
            elLip: this.decorElza.getIndex('lip') + 1,
            elShad: this.decorElza.getIndex('shad') + 1,
            elRes: this.decorElza.getIndex('res') + 1,
        };
        this.gui.disable();
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

