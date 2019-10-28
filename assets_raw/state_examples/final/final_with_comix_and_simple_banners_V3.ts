import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {GoldStarParticles} from './spec-effects/particle/gold.star.particle';
import {EffectUtils} from '../utils/effect.utils';

export default class KLlfkldflldldfl extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private stars: IParticle = null;
    private cross1: Phaser.Button = null;
    private cross2: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.FINAL_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.stars = new GoldStarParticles();
        this.stars.init(null, null);

        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_2.setPosition(354, 30);
        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_1.setPosition(108, 59);
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_3.setPosition(465, 44);

        this.btnContainer = this.game.add.group();

        this.cross1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                567, 73, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                324, 372, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.cross1.scale.setTo(0);
        this.cross1.alpha = 0;
        this.cross2.scale.setTo(0);
        this.cross2.alpha = 0;

        this.cloud = this.game.add.sprite(253, 270,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cl2);
        this.cloud.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        const moreBtn = this.gui.addExtraMore(
            960 - 191, 720 - 202,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeScaleAnimation(moreBtn, 1.05, Phaser.Timer.SECOND * .5);
        const beginBtn = this.gui.addExtraBtn(
            -5, 593,
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
            () => {
                TweenUtils.moveInOut(GameConfig.DOLL_1.getBody(),
                    GameConfig.DOLL_1.getBody().x - 100, GameConfig.DOLL_1.getBody().y,
                    Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * .5);
                TweenUtils.moveInOut(GameConfig.DOLL_2.getBody(),
                    GameConfig.DOLL_2.getBody().x - 100, GameConfig.DOLL_2.getBody().y,
                    Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * .5);
                TweenUtils.moveInOut(GameConfig.DOLL_3.getBody(),
                    GameConfig.DOLL_3.getBody().x - 100, GameConfig.DOLL_3.getBody().y,
                    Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * .5);

                TweenUtils.fadeAndScaleOut(beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5, () => {
                    this.stars.start();
                    TweenUtils.fadeAndScaleIn(this.cross1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
                    TweenUtils.fadeAndScaleIn(this.cross2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
                    TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
                }, this);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        beginBtn.scale.setTo(0);
        beginBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeAndScaleIn(beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.stars) this.stars.dispose();
        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.cross1) this.cross1.destroy(true);
        if (this.cross2) this.cross2.destroy(true);

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

    private nextState(sprite: Phaser.Button): void {
        GameConfig.GAME_COMPLETED = true;
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

