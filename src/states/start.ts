import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';
import {PreloaderUtils} from '../utils/preloader.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {FallParticles} from './spec-effects/particle/fall.particle';
import {BubbleParticles} from './spec-effects/particle/bubble.particle';

export default class Start extends Phaser.State {

    private NEXT = 'Comix';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private fg: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.START_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.START_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.START_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.girl1 = this.game.add.sprite(58, 99,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr1);
        this.girl2 = this.game.add.sprite(539, 102,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr2);
        this.girl3 = this.game.add.sprite(323, 79,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr3);
        this.title = this.game.add.sprite(39, 313,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Title);
        this.title.alpha = 0;

        this.fg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg').getName());

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(698, 544,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE37124828').getName(),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);
        }
        const playBtn = this.gui.addExtraBtn(-25, 567,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.PlayBtn,
            this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this, 386, 342);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        if (!GameConfig.GAME_COMPLETED)
            this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        TweenUtils.fadeIn(this.title, Phaser.Timer.SECOND * .5, GameConfig.GAME_COMPLETED ? Phaser.Timer.SECOND * 2 : Phaser.Timer.SECOND * 1, () => {
            this.title.filters = [EffectUtils.makeLightGlowAnimation(0xff33ff)];
        }, this);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75,
            GameConfig.GAME_COMPLETED ? Phaser.Timer.SECOND * 3 : Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.fg) this.fg.destroy(true);
        if (this.title) this.title.destroy(true);
        if (this.girl1) this.girl1.destroy(true);
        if (this.girl2) this.girl2.destroy(true);
        if (this.girl3) this.girl3.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
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

