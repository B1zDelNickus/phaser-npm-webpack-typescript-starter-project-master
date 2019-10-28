import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {EffectUtils} from '../utils/effect.utils';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {Chest} from './template/dress/chest';
import {Doll} from './template/dress/doll';
import {isNull, isUndefined} from 'util';
import {AdUtils} from '../utils/ad/ad.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Lkkdfkdfkkkdfk extends Phaser.State {

    private NEXT = 'Dress2';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private photo: Phaser.Sprite = null;
    private sparks: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private playBtn: Phaser.Button = null;
    private beginBtn: Phaser.Button = null;
    private skipBtn: Phaser.Button = null;
    private curState: number;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DRESS_STATE);
                break;
            }
        }
        this.doll = null;
        this.chest = null;
        this.curState = 1;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.photo = this.game.add.sprite(7 - 700, 131,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Pic1);
        this.photo.angle = -6;

        // Chests
        this.chest = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(586, 75,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .item(549, 122, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress1,
                    this.onItem)
                .item(645, 100, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress2,
                    this.onItem)
                .item(720, 89, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress3,
                    this.onItem)
            .build()
            .page()
                .item(568, 122, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress4,
                    this.onItem)
                .item(580, 115, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress5,
                    this.onItem)
                .item(681, 100, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress6,
                    this.onItem)
                .item(777, 83, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress7,
                    this.onItem)
            .build()
            .build()
            .leftArrow(867, 293,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(878, 155,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        this.sparks = this.game.add.sprite(220 + 40, -66 + 20, ImageUtils.getSpritesheetClass('SpritesheetsSparks4288023').getName());
        this.sparks.animations.add('sparks');
        this.sparks.alpha = 0;

        // Dolls
        this.doll = new Doll(this, 328, 23)
            .layer(66, 2, 'hat_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HtB', null, true)
            .layer(92, 22, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'HB', 'HB')
            .layer(0, 72, 'body',
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').Frames,
                null, 'Body')
            .layer(75, 264, 'sock',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Sk', null, true)
            .layer(108, 495, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'S', 'S')
            .layer(-3, 105, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElzaBody').Frames,
                'D', 'D')
            .layer(41, 226, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'B', null)
            .layer(33, 98, 'top',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'T', null)
            .layer(32, 104, 'jack',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Jk', null, true)
            .layer(104, 19, 'head',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                null, 'Head')
            .layer(86, 111, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'J', null, true)
            .layer(65, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'H', 'H')
            .layer(101, 54, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Gs', null, true)
            .layer(66, 2, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Ht', null, true)
            .layer(-29, 111, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
                ImageUtils.getAtlasClass('AtlasesDollElza').Frames,
                'Bb', null, true);

        this.cloud = this.game.add.sprite(181 + 50, 132 + 20,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cl3);
        this.cloud.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 199,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreBg,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        this.beginBtn = this.gui.addExtraBtn(328 + 50, 458 + 20,
            ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.GoMcg, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.chest.show, this.chest);
                TweenUtils.moveIn(this.photo, 7, 131, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.fadeAndScaleIn(this.skipBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            },
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        this.skipBtn = this.gui.addExtraBtn(0, 592,
            ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.SkipMcg,
            this.nextState,
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
        this.skipBtn.scale.setTo(0);
        this.skipBtn.alpha = 0;
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations

        // Animations goes here
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        /*if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            AdUtils.playAds();
        }*/
    }

    private playSparks() {
        this.sparks.frame = 0;
        this.sparks.alpha = 1;
        this.sparks.play('sparks', 5, false);
        TweenUtils.fadeOut(this.sparks, Phaser.Timer.SECOND * .25, Phaser.Timer.SECOND * .5);
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        if (name === 'dress1') {
            this.doll.on('dress', 1, 'top', 'bot');
            if (this.curState === 1) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['dress']);
            }
        }
        else if (name === 'dress2') {
            this.doll.on('top', 1, 'dress');
            this.doll.on('bot', 1);
            if (this.curState === 2) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['top', 'bot']);
            }
        }
        else if (name === 'dress3') {
            this.doll.on('dress', 2, 'top', 'bot');
            if (this.curState === 3) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['dress']);
            }
        }
        else if (name === 'dress4') {
            this.doll.on('top', 2, 'dress');
            this.doll.on('bot', 2);
            this.doll.on('jack', 1);
            if (this.curState === 4) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['top', 'bot', 'jack']);
            }
        }
        else if (name === 'dress5') {
            this.doll.on('dress', 3, 'top', 'bot');
            if (this.curState === 5) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['dress']);
            }
        }
        else if (name === 'dress6') {
            this.doll.on('top', 3, 'dress');
            this.doll.on('bot', 3);
            if (this.curState === 6) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['top', 'bot']);
            }
        }
        else if (name === 'dress7') {
            this.doll.on('top', 4, 'dress');
            this.doll.on('bot', 4);
            if (this.curState === 7) {
                this.chest.disable();
                TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.playSparks, this);
                this.chest.onEquiped(name);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextPhoto, this, ['top', 'bot']);
            }
        }
    }

    private nextPhoto(toOff: string[]) {
        if (this.curState === 7) {
            this.doll.on('dress', 0, 'top', 'bot');
            this.cloud.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cl4);
            this.cloud.position.setTo(255, 145);
            this.chest.disable();
            TweenUtils.fadeAndScaleOut(this.skipBtn);
            TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
            TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
            return;
        }
        this.curState++;
        for (let l of toOff) {
            this.doll.off(l);
        }
        this.photo.loadTexture(
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames['Pic' + this.curState]);
        TweenUtils.moveIn(this.photo, 7, 131, Phaser.Timer.SECOND * 1);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
            this.chest.enable();
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        if (this.photo.x === 7) TweenUtils.moveOut(this.photo, 7 - 700, 131, Phaser.Timer.SECOND * 1);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
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
        }, this);
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

