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

export default class Jjdfhdfghdfjjkjjdf extends Phaser.State {

    private NEXT = 'Result';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private container: Phaser.Group = null;
    private btnContainer: Phaser.Group = null;
    private phone: Phaser.Sprite = null;
    private flash: Phaser.Sprite = null;
    private finger: Phaser.Sprite = null;
    private btn: Phaser.Button = null;

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

        this.container = this.game.add.group();
        this.container.add(this.game.add.sprite(0, 0,
            ImageUtils.getImageClass(`ImagesFon${GameConfig.SELECTED_BG}`).getName()));

        this.container.add(GameConfig.DOLL_2.getBody());
        this.container.add(GameConfig.DOLL_1.getBody());

        GameConfig.DOLL_1.setPosition(410, 55);
        GameConfig.DOLL_2.setPosition(220, 50);
        GameConfig.DOLL_1.setAlpha(0);
        GameConfig.DOLL_2.setAlpha(0);

        this.phone = this.game.add.sprite(0, -720,
            ImageUtils.getAtlasClass('AtlasesStatePhoto').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePhoto').Frames.Phone);
        this.flash = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStatePhoto').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePhoto').Frames.Flash);
        this.flash.alpha = 0;

        this.btnContainer = this.game.add.group();
        this.btn = GuiUtils.makeButton(
            this, this.btnContainer, 423, 220, 1,
            'btn', ImageUtils.getAtlasClass('AtlasesStatePhoto').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePhoto').Frames.PhotoBtn,
            true, true, true,
            this.shoot, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.btn.scale.setTo(0);
        this.btn.alpha = 0;

        this.finger = this.game.add.sprite(960, 720,
            ImageUtils.getAtlasClass('AtlasesStatePhoto').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePhoto').Frames.Finger);

        // GUI Buttons
        this.gui.addGui(false);
        const moreBtn = this.gui.addExtraMore(
            960 - 124, 720 - 200,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeLightRotateAnimation(moreBtn, Phaser.Timer.SECOND * .8);

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
            GameConfig.DOLL_1.show();
            GameConfig.DOLL_2.show();
        }, this);
        TweenUtils.moveIn(this.phone, 0, 0, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeAndScaleIn(this.btn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4, () => {
            this.btn.filters = [EffectUtils.makeGlowAnimation(0xff00ee, 1000, true, 99999, 250)];
            EffectUtils.makeScaleAnimation(this.btn);
        }, this);

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private shoot() {
        this.btn.inputEnabled = false;
        TweenUtils.moveIn(this.finger, 215, 217, Phaser.Timer.SECOND * 1.5, 0, () => {
            TweenUtils.moveAndScaleIn(this.finger, 230, 240, 0.955,
                Phaser.Timer.SECOND * .5, 0, () => {
                EffectUtils.makeShootAnimation(this.flash);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.nextState, this);
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.phone.destroy(true);
        this.flash.destroy(true);
        this.finger.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.game.world.remove(this.container);
        GameConfig.CONT_1 = this.container;
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

