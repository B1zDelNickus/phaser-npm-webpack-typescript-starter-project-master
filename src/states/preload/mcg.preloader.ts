import * as Assets from '../../assets';
import {IPreloader} from './i.preloader';
import {GameConfig, PublishMode} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {ImageUtils} from '../../utils/images/image.utils';

export class MyCuteGamesPreloader implements IPreloader {

    game: Phaser.Game;
    state: Phaser.State;

    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    private playButton: Phaser.Button = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private logo: Phaser.Button = null;
    private guiContainer: Phaser.Group = null;
    private crownEmitter: Phaser.Particles.Arcade.Emitter = null;
    private glowEmitter: Phaser.Particles.Arcade.Emitter = null;
    private spriterGroup: Spriter.SpriterGroup = null;
    private isHover: boolean = false;
    private NEXT: string;

    constructor(state: Phaser.State, next: string = 'Start') {
        this.game = GameConfig.GAME;
        this.state = state;
        this.NEXT = next;
    }

    public preload(): void {
        /** BG */
        this.game.add.sprite(0, 0,
            GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS ?
                ImageUtils.getImageClass('ImagesPrerollMcg').getName() :
                ImageUtils.getImageClass('ImagesPreroll2Mcg').getName());

        /**
         * Crown Particle Emmiter
         */

        this.crownEmitter = this.game.add.emitter(0, 0, 100);
        this.crownEmitter.makeParticles(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.ParticleCrownMcg);
        this.crownEmitter.setRotation(-50, 50);
        this.crownEmitter.setAlpha(1, 0.3, 4000);
        this.crownEmitter.gravity = new Phaser.Point(0, -10); // -10;
        this.crownEmitter.minParticleScale = 0.5;
        this.crownEmitter.maxParticleScale = 1;
        this.crownEmitter.x = 500;
        this.crownEmitter.y = 100;

        let spriterLoader = new Spriter.Loader();
        let spriterFile = new Spriter.SpriterJSON(
            this.game.cache.getJSON(
                Assets.JSON.JsonDoll.getName()));
        let spriterData = spriterLoader.load(spriterFile);

        this.spriterGroup = new Spriter.SpriterGroup(
            this.game, spriterData,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
            'girl', 0, 10);
        this.spriterGroup.position.setTo(200, 720 - this.spriterGroup.height);
        this.game.add.existing(this.spriterGroup);

        this.spriterGroup.playAnimationById(0);

        this.spriterGroup.onLoop.add(function (data) {
            this.spriterGroup.playAnimationById(0);
        }, this);
        this.spriterGroup.onEvent.add(function (data, event) {
            this.crownEmitter.start(true, 4000, null, 25);
        }, this);

        /**
         * Preloader Progress Bar
         */

        this.preloadFrameSprite = this.game.add.sprite(0, 580,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.Progressbar1Mcg);
        this.preloadBarSprite = this.game.add.sprite(0, 579.5,
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.Progressbar2Mcg);
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
                20, 30, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.DressupMcg,
                true, true, GameConfig.PUB_MODE !== PublishMode.GAME_DISTRIBUTIONS,
                GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn2 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                635, 25, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.PrincessMcg,
                true, true, GameConfig.PUB_MODE !== PublishMode.GAME_DISTRIBUTIONS,
                GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn3 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                660, 280, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.MakeupMcg,
                true, true, GameConfig.PUB_MODE !== PublishMode.GAME_DISTRIBUTIONS,
                GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn4 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                15, 310, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.HairMcg,
                true, true, GameConfig.PUB_MODE !== PublishMode.GAME_DISTRIBUTIONS,
                GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.logo =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                480 - 208, 415 - 137, 1,
                '', ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.LogoMcg,
                true, true, true, GuiUtils.goLinkPreloaderLogo, hoverHandler, unhoverHandler);

        this.playButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                308, 558, 1,
                '', ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getName(), [0, 1, 0],
                true, false, false, this.nextState, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        this.glowEmitter = this.game.add.emitter(0, 0, 100);
        this.glowEmitter.makeParticles(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').Frames.ParticleGlowMcg);
        this.glowEmitter.setAlpha(1, 0.3, 3000);
        this.glowEmitter.gravity = new Phaser.Point(0, -10); // -10;
        this.glowEmitter.minParticleScale = 0.5;
        this.glowEmitter.maxParticleScale = 1;

        this.shakeItem(this.btn1, 0 * 1500);
        this.shakeItem(this.btn2, 1 * 1500);
        this.shakeItem(this.btn3, 2 * 1500);
        this.shakeItem(this.btn4, 3 * 1500);
    }

    public create(): void {
        this.preloadBarSprite.visible = this.preloadFrameSprite.visible = false;
    }

    public update(): void {
        this.spriterGroup.updateAnimation();
        if (this.isHover) {
            this.glowEmitter.x = this.game.input.x;
            this.glowEmitter.y = this.game.input.y;
            this.glowEmitter.start(true, 3000, null, 25);
        }
    }

    public dispose(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.spriterGroup.onEvent.removeAll();
        this.spriterGroup.onLoop.removeAll();
        this.spriterGroup.destroy(true);

        this.crownEmitter.destroy(true);
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

    private shakeItem(target: Phaser.Button, delay: number) {
        const _tween0 = this.game.add.tween(target).to({ angle: 0 }, delay, Phaser.Easing.Linear.None, true);
        const _tween1 = this.game.add.tween(target).to({ angle: 10 }, 400, Phaser.Easing.Linear.None, false, 4000);
        const _tween2 = this.game.add.tween(target).to({ angle: -10 }, 800, Phaser.Easing.Linear.None, false);
        const _tween3 = this.game.add.tween(target).to({ angle: 0 }, 400, Phaser.Easing.Linear.None, false);
        _tween3.onComplete.add(function () {
            this.glowEmitter.x = target.x;
            this.glowEmitter.y = target.y;
            this.glowEmitter.start(true, 1500, null, 25);
        }, this);
        _tween0.chain(_tween1);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween1);
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