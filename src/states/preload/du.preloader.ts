import * as Assets from '../../assets';
import {IPreloader} from './i.preloader';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {ImageUtils} from '../../utils/images/image.utils';

export class DressupMixPreloader implements IPreloader {

    game: Phaser.Game;
    state: Phaser.State;

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
        this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesPrerollDu').getName());

        /**
         * Preloader Progress Bar
         */

        this.preloadFrameSprite = this.game.add.sprite(0, 613,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Progressbar1Du);
        this.preloadBarSprite = this.game.add.sprite(0, 613,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Progressbar2Du);
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
                133 - 293 / 2, 360 - 317 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Icon1Du,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn2 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                303 - 308 / 2, 443 - 309 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Icon2Du,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn3 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                462 - 309 / 2, 493 - 310 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Icon3Du,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn4 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                655 - 309 / 2, 438 - 312 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Icon4Du,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn5 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                851 - 316 / 2, 370 - 317 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.Icon5Du,
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.logo =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                486 - 508 / 2, 194 - 265 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.LogoDu,
                true, true, true, GuiUtils.goLinkPreloaderLogo, hoverHandler, unhoverHandler);

        this.playButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                480 - 249 / 2, 630 - 152 / 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.PlayNormalDu,
                true, false, false, this.nextState, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.glowEmitter = this.game.add.emitter(0, 0, 100);
        this.glowEmitter.makeParticles(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').Frames.ParticleGlowDu);
        this.glowEmitter.setAlpha(1, 0.3, 3000);
        this.glowEmitter.gravity = new Phaser.Point(0, -10); // -10;
        this.glowEmitter.minParticleScale = 0.5;
        this.glowEmitter.maxParticleScale = 1;

        this.btn1.alpha = 0;
        this.btn1.inputEnabled = false;
        this.btn2.alpha = 0;
        this.btn2.inputEnabled = false;
        this.btn3.alpha = 0;
        this.btn3.inputEnabled = false;
        this.btn4.alpha = 0;
        this.btn4.inputEnabled = false;
        this.btn5.alpha = 0;
        this.btn5.inputEnabled = false;

        this.btn1.scale.setTo(0.1);
        this.btn2.scale.setTo(0.1);
        this.btn3.scale.setTo(0.1);
        this.btn4.scale.setTo(0.1);
        this.btn5.scale.setTo(0.1);

        this.game.add.tween(this.btn1.scale).to({ x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true, 0);
        this.game.add.tween(this.btn2.scale).to({ x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true, 500);
        this.game.add.tween(this.btn3.scale).to({ x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true, 1000);
        this.game.add.tween(this.btn4.scale).to({ x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true, 1500);
        this.game.add.tween(this.btn5.scale).to({ x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true, 2000);

        this.game.add.tween(this.btn1).to({ alpha: 1 }, 800, Phaser.Easing.Circular.Out, true, 0)
            .onComplete.addOnce(() => {
            this.btn1.inputEnabled = true;
        }, this);
        this.game.add.tween(this.btn2).to({ alpha: 1 }, 800, Phaser.Easing.Circular.Out, true, 500)
            .onComplete.addOnce(() => {
            this.btn2.inputEnabled = true;
        }, this);
        this.game.add.tween(this.btn3).to({ alpha: 1 }, 800, Phaser.Easing.Circular.Out, true, 1000)
            .onComplete.addOnce(() => {
            this.btn3.inputEnabled = true;
        }, this);
        this.game.add.tween(this.btn4).to({ alpha: 1 }, 800, Phaser.Easing.Circular.Out, true, 1500)
            .onComplete.addOnce(() => {
            this.btn4.inputEnabled = true;
        }, this);
        this.game.add.tween(this.btn5).to({ alpha: 1 }, 800, Phaser.Easing.Circular.Out, true, 2000)
            .onComplete.addOnce(() => {
            this.btn5.inputEnabled = true;
        }, this);
    }

    public create(): void {
        this.preloadBarSprite.visible = this.preloadFrameSprite.visible = false;
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
        this.preloadBarSprite.destroy(true);
        this.preloadFrameSprite.destroy(true);
        this.guiContainer.destroy(true);
    }

    public enableButton(): void {
        this.playButton.visible = true;
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