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

export default class Lkjksdhjdfjhdfjdfjdf extends Phaser.State {

    private NEXT = 'Result';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private decorBg: DecorBackground = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;
    private cat3: boolean = false;
    private cat4: boolean = false;
    private cat5: boolean = false;

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
        this.cat3 = false;
        this.cat4 = false;
        this.cat5 = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.decorBg = new DecorBackground()
            .sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName())
            .layer('car')
                .item(0, 306,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Car1)
                .item(144, 372,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Car2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Car3)
            .build()
            .layer('tent')
                .item(408, 114,
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').Frames.Tent1)
                .item(144, 94,
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').Frames.Tent2)
                .item(304, 30,
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor2').Frames.Tent3)
            .build()
            .layer('arc')
                .item(408, 222,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Arc1)
                .item(248, 205,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Arc2)
                .item(356, 157,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Arc3)
            .build()
            .layer('gir')
                .item(88, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gir1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gir2)
                .item(29, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Gir3)
            .build()
            .layer('stuff')
                .item(9, 400,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Stuff1)
                .item(214, 0,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Stuff2)
                .item(259, 427,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Stuff3)
            .build();

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                133, 582, 1,
                'arc', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ArcBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                266, 582, 1,
                'gir', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.GirBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                400, 582, 1,
                'tent', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.TentBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                533, 582, 1,
                'stuff', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.StuffBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                665, 582, 1,
                'car', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.CarBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

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

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.9);
        TweenUtils.fadeAndScaleIn(this.btn5, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        this.decorBg.next(name);
        if (name === 'arc') this.cat1 = true;
        if (name === 'car') this.cat2 = true;
        if (name === 'tent') this.cat3 = true;
        if (name === 'stuff') this.cat4 = true;
        if (name === 'gir') this.cat5 = true;
        if (this.cat1 && this.cat2 && this.cat3 && this.cat4 && this.cat5) {
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

        GameConfig.DECOR_1 = this.decorBg.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

