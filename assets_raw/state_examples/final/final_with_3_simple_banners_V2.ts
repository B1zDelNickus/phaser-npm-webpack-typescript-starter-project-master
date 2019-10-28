import * as Assets from '../assets';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {EffectUtils} from '../utils/effect.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {CrossButton} from './template/final/cross.button';

export default class Zxcbedfgdfgdfgdf extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private cross1: CrossButton = null;
    private cross2: CrossButton = null;
    private cross3: CrossButton = null;
    private label: Phaser.Sprite = null;

    private bg: Phaser.Sprite = null;
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        this.cross1 = new CrossButton(this, 'http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html');
        this.cross2 = new CrossButton(this, 'http://mycutegames.com/Games/Princess/Dancing-Festival-at-Princess-College.html');
        this.cross3 = new CrossButton(this, 'http://mycutegames.com/Games/Princess/Three-Bridesmaids-for-Cinderella.html');

        this.cross1.getBody().y -= 700;
        this.cross2.getBody().y -= 700;
        this.cross3.getBody().y -= 700;

        this.cross1
            .button(23, 175, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1,
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross2
            .button(328, 310, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2,
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross3
            .button(638, 129, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross3,
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.label = this.game.add.sprite(480, 360,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Label);
        this.label.anchor.setTo(.5);
        this.label.scale.setTo(0);
        this.label.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 199,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreBg,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        let gl: Phaser.Sprite;
        moreBtn.addChild(gl =
            this.game.add.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreSt)
        );
        moreBtn.anchor.setTo(.5, .70);
        gl.anchor.setTo(.5, .65);
        gl.alpha = 0;
        gl.inputEnabled = false;
        EffectUtils.makeAlphaAnimation(gl, 1, 1000);
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
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.moveAndScaleAndFade(this.label, 462, 160, 1, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.moveIn(this.cross1.getBody(), this.cross1.getBody().x, this.cross1.getBody().y + 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2, () => {
                EffectUtils.makeMoveAnimation(this.cross1.getBody(), this.cross1.getBody().x, this.cross1.getBody().y + 20, Phaser.Timer.SECOND * 1.5);
            }, this);
        TweenUtils.moveIn(this.cross2.getBody(), this.cross2.getBody().x, this.cross2.getBody().y + 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3, () => {
                EffectUtils.makeMoveAnimation(this.cross2.getBody(), this.cross2.getBody().x, this.cross2.getBody().y + 20, Phaser.Timer.SECOND * 1.5);
            }, this);
        TweenUtils.moveIn(this.cross3.getBody(), this.cross3.getBody().x, this.cross3.getBody().y + 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2.5, () => {
                EffectUtils.makeMoveAnimation(this.cross3.getBody(), this.cross3.getBody().x, this.cross3.getBody().y + 20, Phaser.Timer.SECOND * 1.5);
            }, this);

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

        this.bg.destroy(true);
        this.label.destroy(true);
        this.cross1.dispose();
        this.cross2.dispose();
        this.cross3.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.spinner) this.spinner.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.GAME_COMPLETED = true;
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

