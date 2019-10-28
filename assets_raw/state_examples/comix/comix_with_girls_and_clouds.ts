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

export default class Tyyutyutyuhrtyrtrt extends Phaser.State {

    private NEXT = 'Dress1';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.COMIX_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {
        this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.Bg);

        this.laser = EffectUtils.makeLaser(LaserType.DOUBLE_LASER);
        this.laser.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light);
        this.laser.start();

        this.girl1 = this.game.add.sprite(94 - 700, 6,
            ImageUtils.getAtlasClass('AtlasesComixState').getName(),
            ImageUtils.getAtlasClass('AtlasesComixState').Frames.Gr4);
        this.girl2 = this.game.add.sprite(368 + 700, 41,
            ImageUtils.getAtlasClass('AtlasesComixState').getName(),
            ImageUtils.getAtlasClass('AtlasesComixState').Frames.Gr5);
        this.girl3 = this.game.add.sprite(578 + 700, 41,
            ImageUtils.getAtlasClass('AtlasesComixState').getName(),
            ImageUtils.getAtlasClass('AtlasesComixState').Frames.Gr6);
        this.cloud1 = this.game.add.sprite(12, 161,
            ImageUtils.getAtlasClass('AtlasesComixState').getName(),
            ImageUtils.getAtlasClass('AtlasesComixState').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(451, 165,
            ImageUtils.getAtlasClass('AtlasesComixState').getName(),
            ImageUtils.getAtlasClass('AtlasesComixState').Frames.Cl2);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 182,
            ImageUtils.getAtlasClass('AtlasesStartState').getName(),
            ImageUtils.getAtlasClass('AtlasesStartState').Frames.EMore,
            GuiUtils.addOverScaleHandler,
            GuiUtils.addOutScaleHandler
        );
        moreBtn.filters = [EffectUtils.makeGlowAnimation(0xff33ff)];
        const skip = this.gui.addExtraBtn(115, 593,
            ImageUtils.getAtlasClass('AtlasesComixState').getName(),
            ImageUtils.getAtlasClass('AtlasesComixState').Frames.Skip,
            this.nextState
        );
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        skip.scale.setTo(0);
        skip.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeAndScaleIn(skip, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
        new Animation()
            .add(this.girl1, { x: 94 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.Out)
            .add(this.cloud1, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2)
            .add(this.girl2, { x: 368 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3.5, Phaser.Easing.Circular.Out)
            .add(this.girl3, { x: 578 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 4, Phaser.Easing.Circular.Out)
            .add(this.cloud2, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 5)
            .animate(() => {
                TweenUtils.fadeAndScaleIn(playBtn);
                TweenUtils.fadeAndScaleOut(skip);
            }, this);

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
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
        this.girl1.destroy(true);
        this.girl2.destroy(true);
        this.girl3.destroy(true);
        this.cloud1.destroy(true);
        this.cloud2.destroy(true);

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

