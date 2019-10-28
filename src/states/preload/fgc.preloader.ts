import * as Assets from '../../assets';
import {IPreloader} from './i.preloader';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {TweenUtils} from '../../utils/tween.utils';
import {AdUtils} from '../../utils/ad/ad.utils';
import {ImageUtils} from '../../utils/images/image.utils';

export class FreeGamesCasualPreloader implements IPreloader {

    game: Phaser.Game;
    state: Phaser.State;

    private spinner: Phaser.Sprite = null;
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    private playButton: Phaser.Button = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private logo: Phaser.Button = null;
    private guiContainer: Phaser.Group = null;
    private glowEmitter: Phaser.Particles.Arcade.Emitter = null;
    private isHover: boolean = false;
    private NEXT: string;

    constructor(state: Phaser.State, next: string = 'Start') {
        this.game = GameConfig.GAME;
        this.state = state;
        this.NEXT = next;
    }

    public preload(): void {
        /** BG */
        this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesPrerollFgc').getName());

        /**
         * Preloader Progress Bar
         */

        this.preloadFrameSprite = this.game.add.sprite(0, 595,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Progressbar1Fgc);
        this.preloadBarSprite = this.game.add.sprite(0, 595,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Progressbar2Fgc);
        this.preloadBarSprite.x = this.preloadFrameSprite.x = this.game.world.centerX - this.preloadFrameSprite.width / 2;
        this.game.load.setPreloadSprite(this.preloadBarSprite);

        /**
         * Gui buttons
         */

        this.guiContainer = this.game.add.group();

        let hoverHandler = (sprite) => {
            this.isHover = true;
            this.game.tweens.removeFrom(sprite.scale);
            this.game.add.tween(sprite.scale).to({ x: 1.05, y: 1.05 }, 250, Phaser.Easing.Linear.None, true);
        };
        let unhoverHandler = (sprite) => {
            this.isHover = false;
            this.game.tweens.removeFrom(sprite.scale);
            this.game.add.tween(sprite.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true);
        };

        this.btn1 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -200, 96, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Icon1Fgc,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn2 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -200, 656, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Icon2Fgc,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn3 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                380, 756, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Icon3Fgc,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn4 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                960, 656, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Icon4Fgc,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn5 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                960, 96, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.Icon5Fgc,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.logo =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                280, 114, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.LogoFgc,
                true, true, true, GuiUtils.goLinkPreloaderLogo, hoverHandler, unhoverHandler);

        this.playButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                350, 558, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
                [ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.PlayNormalFgc,
                    ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.PlayOverFgc,
                    ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.PlayNormalFgc],
                true, false, false, this.nextState, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.glowEmitter = this.game.add.emitter(0, 0, 100);
        this.glowEmitter.makeParticles(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').Frames.ParticleGlowFgc);
        this.glowEmitter.setAlpha(1, 0.3, 3000);
        this.glowEmitter.gravity = new Phaser.Point(0, -10); // -10;
        this.glowEmitter.minParticleScale = 0.5;
        this.glowEmitter.maxParticleScale = 1;

        this.game.add.tween(this.btn1).to({ x: 110, y: 270 }, 800, Phaser.Easing.Circular.Out, true, 0);
        this.game.add.tween(this.btn2).to({ x: 300, y: 380 }, 800, Phaser.Easing.Circular.Out, true, 500);
        this.game.add.tween(this.btn3).to({ x: 480, y: 450 }, 800, Phaser.Easing.Circular.Out, true, 1000);
        this.game.add.tween(this.btn4).to({ x: 660, y: 380 }, 800, Phaser.Easing.Circular.Out, true, 1500);
        this.game.add.tween(this.btn5).to({ x: 850, y: 270 }, 800, Phaser.Easing.Circular.Out, true, 2000);
    }

    public create(): void {
    }

    public update(): void {
        if (this.isHover) {
            this.glowEmitter.x = this.game.input.x;
            this.glowEmitter.y = this.game.input.y;
            this.glowEmitter.start(true, 3000, null, 25);
        }
    }

    public dispose(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.glowEmitter.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.logo.destroy(true);
        this.playButton.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.preloadBarSprite) this.preloadBarSprite.destroy(true);
        if (this.preloadFrameSprite) this.preloadFrameSprite.destroy(true);
        this.guiContainer.destroy(true);
    }

    public enableButton(): void {
        // this.preloadBarSprite.visible = this.preloadFrameSprite.visible = false;
        this.preloadFrameSprite.visible = false;
        TweenUtils.fadeOut(this.preloadBarSprite);
        this.playButton.visible = true;
        this.playButton.alpha = 0;
        this.playButton.scale.setTo(0);
        TweenUtils.fadeAndScaleIn(this.playButton, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .75);
    }

    private nextState(): void {
        if (!DEBUG) ga('send', 'event', GameConfig.gaData());
        this.playButton.inputEnabled = false;
        this.game.camera.onFadeComplete.addOnce(() => {
            SoundUtils.init();
            this.game.time.events.removeAll();
            this.game.tweens.removeAll();
            this.game.state.start(this.NEXT);
        }, this);
        this.game.camera.fade(0x000000, 400, true, .75);
    }
}