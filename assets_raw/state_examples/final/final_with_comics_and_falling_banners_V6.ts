import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
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

export default class LKkkjdfjdfjkgjdfjgdfjdfjdf extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private stars: IParticle = null;
    private moreBtn: Phaser.Button = null;
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        GameConfig.DOLL_2.setAlpha(1);
        GameConfig.DOLL_1.setAlpha(1);
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_2.setPosition(324 + 700, 32);
        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_1.setPosition(515 + 700, 25);

        this.btnContainer = this.game.add.group();

        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
            this.cross1 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    10, 90, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross2 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    10, 330, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban2,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross1.scale.setTo(0);
            this.cross1.alpha = 0;
            this.cross2.scale.setTo(0);
            this.cross2.alpha = 0;
        }
        else {
            this.cross1 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    13, 130 - 700, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross2 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    480, 130 - 700, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        }

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreBtn = this.gui.addExtraMore(
                960 - 191, 720 - 148,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2,
            );
            this.addAnimation(this.moreBtn);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextMore, this);
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        const beginBtn = this.gui.addExtraBtn(
            -5, 593,
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.DoneFgc,
            () => {
                TweenUtils.fadeAndScaleOut(beginBtn);
                if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
                    TweenUtils.fadeAndScaleIn(this.cross1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
                    TweenUtils.fadeAndScaleIn(this.cross2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
                    TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                }
                else {
                    TweenUtils.moveOut(GameConfig.DOLL_2.getBody(), 324 - 850, 32, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 0);
                    TweenUtils.moveOut(GameConfig.DOLL_1.getBody(), 515 - 850, 25, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 0);
                    TweenUtils.moveIn(this.cross1, 247, 390, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                    TweenUtils.moveIn(this.cross2, 714, 390, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                    TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
                }
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
        TweenUtils.moveIn(GameConfig.DOLL_2.getBody(), 324, 32, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.moveIn(GameConfig.DOLL_1.getBody(), 515, 25, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    private counter: number = 0;
    private sp1: Phaser.Sprite = null;
    private sp2: Phaser.Sprite = null;
    private sp3: Phaser.Sprite = null;
    private sp4: Phaser.Sprite = null;

    private addAnimation(sprite) {
        this.sp1 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp2 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp3 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp3);
        this.sp4 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp4);
        this.sp1.alpha = 0;
        this.sp2.alpha = 0;
        this.sp3.alpha = 0;
        this.sp4.alpha = 0;
        this.sp1.anchor.setTo(.5);
        this.sp2.anchor.setTo(.5);
        this.sp3.anchor.setTo(.5);
        this.sp4.anchor.setTo(.5);
        sprite.addChild(this.sp1);
        sprite.addChild(this.sp2);
        sprite.addChild(this.sp3);
        sprite.addChild(this.sp4);
    }
    private nextMore() {
        this.counter++;
        if (this.counter > 1) this.counter = 0;
        if (this.counter === 1) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            const t1 = this.game.add.tween(this.sp1).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, true).yoyo(true);
            const t2 = this.game.add.tween(this.sp2).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t3 = this.game.add.tween(this.sp3).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t4 = this.game.add.tween(this.sp4).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            t1.chain(t2);
            t2.chain(t3);
            t3.chain(t4);
            this.game.time.events.add(Phaser.Timer.SECOND *  2, this.nextMore, this);
        }
        else if (this.counter === 0) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2);
            this.game.time.events.add(Phaser.Timer.SECOND *  3, this.nextMore, this);
        }
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

        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
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

