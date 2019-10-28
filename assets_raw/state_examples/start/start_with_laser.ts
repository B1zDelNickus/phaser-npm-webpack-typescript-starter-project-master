import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';

export default class Fdfgdfgdfgdfg extends Phaser.State {

    private NEXT = 'Comix';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private bg: Phaser.Sprite = null;
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
        this.bg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.Bg);

        this.laser = EffectUtils.makeLaser(LaserType.DOUBLE_LASER);
        this.laser.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light.toString());
        this.laser.start();

        this.girl1 = this.game.add.sprite(274, 11,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.Gr1);
        this.girl2 = this.game.add.sprite(47, 53,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.Gr2);
        this.girl3 = this.game.add.sprite(432, 47,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.Gr3);

        this.girl1.alpha = 0;
        this.girl2.alpha = 0;
        this.girl3.alpha = 0;

        this.title = this.game.add.sprite(171, 257 - 720, ImageUtils.getAtlasClass('AtlasesTitle').getName());
        this.title.animations.add('neon', [
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title001,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title002,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title003,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title004,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title005,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title006,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title007,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title008,
                ImageUtils.getAtlasClass('AtlasesTitle').Frames.Title009,
            ]
        );
        this.title.animations.play('neon', 10, true);

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 182,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.EMore.toString(),
            GuiUtils.addOverScaleHandler,
            GuiUtils.addOutScaleHandler
        );
        moreBtn.filters = [EffectUtils.makeGlowAnimation(0xff33ff)];
        playBtn.position.setTo(playBtn.x - 250, playBtn.y + 250);

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        new Animation()
            .add(this.girl1, { alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Timer.SECOND * 1)
            .add(this.girl2, { alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Timer.SECOND * 1.5)
            .add(this.girl3, { alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Timer.SECOND * 2)
            .add(this.title, { y: 257 }, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 2.5, Phaser.Easing.Bounce.Out)
            .add(playBtn,
                { x: playBtn.x + 250, y: playBtn.y - 250 },
                Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4, Phaser.Easing.Circular.Out)
            .animate();

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
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

        this.laser.dispose();
        this.bg.destroy(true);
        this.girl1.destroy(true);
        this.girl2.destroy(true);
        this.girl3.destroy(true);
        this.title.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        this.blocker.destroy(true);

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

