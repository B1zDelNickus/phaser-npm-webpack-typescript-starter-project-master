import {IParticle} from './i.particle';
import {GameConfig} from '../../../config/game.config';

export class BubbleParticles implements IParticle {

    private game: Phaser.Game = null;
    private emitter: Phaser.Particles.Arcade.Emitter = null;

    constructor(private min: number = .35, private max: number = .65) {
    }

    init( asset: string, frames?: any|any[], rate: number = 100, w: number = 960, c: number = 480): void {
        this.game = GameConfig.GAME;
        this.emitter = this.game.add.emitter(c, 770, rate);
        this.emitter.width = w;
        this.emitter.makeParticles(asset, frames);
        this.emitter.minParticleSpeed.setTo(-100, -30);
        this.emitter.maxParticleSpeed.setTo(100, -100);
        this.emitter.minParticleScale = this.min;
        this.emitter.maxParticleScale = this.max;
        this.emitter.gravity = new Phaser.Point(0, -30);
    }

    addToContainer(cont: Phaser.Group): void {
        cont.add(this.emitter);
    }

    start(): void {
        this.emitter.flow(7000, 500, 3, -1);
    }

    update(): void {
    }

    dispose(): void {
        this.emitter.kill();
        this.emitter.destroy(true);
    }

}