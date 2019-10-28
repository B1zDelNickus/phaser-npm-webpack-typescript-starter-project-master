import {GameConfig} from '../../../config/game.config';
import {TweenUtils} from '../../../utils/tween.utils';
import {GuiUtils} from '../../../utils/gui.utils';
export class LikeDrop {

    private total: number = 0;
    private game: Phaser.Game = null;
    private asset: string;
    private frame: any;
    private min: number;
    private max: number;
    private container: Phaser.Group = null;
    private isStopped: boolean = false;
    private fromX: number;
    private toX: number;
    private sprites: Phaser.Sprite[] = [];

    constructor(fromX: number, toX: number, asset: string, frame: any, min: number = 1, max: number = 1) {
        this.game = GameConfig.GAME;
        this.asset = asset;
        this.frame = frame;
        this.min = min;
        this.max = max;
        this.fromX = fromX;
        this.toX = toX;
        this.container = this.game.add.group();
    }

    public start() {
        this.isStopped = false;
        this.generate();
    }

    private generate() {
        if (this.isStopped) return;
        let sp = this.game.add.sprite(
            this.game.rnd.between(
                this.fromX, this.toX), -100,
                this.asset, this.frame,
                this.container);
        sp.inputEnabled = true;
        sp.events.onInputOver.addOnce(() => {
            sp.inputEnabled = false;
            TweenUtils.blow(sp, 350);
            this.total++;
        }, this);
        this.sprites.push(sp);
        GuiUtils.centrize(sp);
        sp.scale.setTo(this.game.rnd.realInRange(this.min, this.max));
        sp.angle = this.game.rnd.between(-25, 25);
        TweenUtils.moveAndRotate(sp, sp.x, 800, this.game.rnd.between(-180, 180), Phaser.Timer.SECOND * 7, 0, () => {
            sp.inputEnabled = false;
            TweenUtils.delayedCall(500, () => {
                sp.destroy(true);
            }, this);
        }, this, false);
        TweenUtils.delayedCall(this.game.rnd.between(750, 1250), this.generate, this);
    }

    public stop() {
        this.isStopped = true;
        for (let sp of this.sprites) {
            if (sp.alive) {
                sp.inputEnabled = false;
                TweenUtils.kill(sp);
                TweenUtils.blow(sp, 500, 500);
                TweenUtils.delayedCall(1500, () => {
                    sp.destroy(true);
                }, this);
            }
        }
    }

    public getTotal(): number {
        return this.total;
    }

    public dispose() {
        this.container.destroy(true);
    }
}