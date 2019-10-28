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
import {IParticle} from './spec-effects/particle/i.particle';
import {FallParticles} from './spec-effects/particle/fall.particle';
import {WinnerParticles} from './spec-effects/particle/winner.particle';

export default class Jjdfjjdgjdfjjdgdfjj extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private luch: Phaser.Sprite = null;
    private lights: Phaser.Sprite = null;
    private baner: Phaser.Sprite = null;
    private particle1: IParticle = null;
    private particle2: IParticle = null;
    private particle3: IParticle = null;
    private bg: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private flashing: boolean = false;
    private slower: number = 0;
    private res: number = 0;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.RESULT_STATE);
                break;
            }
        }
        this.flashing = false;
        this.slower = 0;
        this.res = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.lights = this.game.add.sprite(0, 0,
            ImageUtils.getSpritesheetClass('SpritesheetsLights9613214').getName());
        this.lights.animations.add('neon');
        this.lights.animations.play('neon', 6, true);

        this.baner = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.Banner);
        this.luch = this.game.add.sprite(297, -99,
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            ImageUtils.getAtlasClass('AtlasesEffects').Frames.Projector);
        this.luch.anchor.set(.5, 0);
        this.luch.visible = false;

        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_2.insert();

        GameConfig.DOLL_1.setPosition(45 - 800, 24);
        GameConfig.DOLL_2.setPosition(290 - 800, -10);
        GameConfig.DOLL_3.setPosition(510 + 800, 21);

        this.particle1 = new WinnerParticles(.9, 1.1);
        this.particle1.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Sn1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Sn2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con5,
            ], 150, 295);
        // this.particle1.start();
        this.particle2 = new WinnerParticles(.9, 1.1);
        this.particle2.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Sn1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Sn2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con5,
            ], 150, 502);
        // this.particle2.start();
        this.particle3 = new WinnerParticles(.9, 1.1);
        this.particle3.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Sn1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Sn2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con5,
            ], 150, 682);
        // this.particle3.start();

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(835, 520,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE11919931').getName(),
                null, 10, true);
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.slideIn(GameConfig.DOLL_2.getBody(), 290, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.slideIn(GameConfig.DOLL_3.getBody(), 510, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.slideIn(GameConfig.DOLL_1.getBody(), 45, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
            this.luch.visible = true;
            this.flashing = true;
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 4, () => {
                this.flashing = false;
            }, this);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 4.5, () => {
                if (this.res === 1) {
                    this.particle1.start();
                    GameConfig.DOLL_1.on('rib', 1);
                }
                else if (this.res === 2) {
                    this.particle2.start();
                    GameConfig.DOLL_2.on('rib', 1);
                }
                else if (this.res === 3) {
                    this.particle3.start();
                    GameConfig.DOLL_3.on('rib', 1);
                }
                TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
            }, this);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
        if (this.flashing) {
            this.slower++;
            if (this.slower > 4) {
                this.slower = 0;
                const arr = [295, 502, 692];
                this.res = this.game.rnd.between(1, 3);
                this.luch.x = arr[this.res - 1];
            }
        }
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.luch) this.luch.destroy(true);
        if (this.lights) this.lights.destroy(true);
        if (this.baner) this.baner.destroy(true);
        if (this.particle1) this.particle1.dispose();
        if (this.particle2) this.particle2.dispose();
        if (this.particle3) this.particle3.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();

        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3 = null;
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE = 0;
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

