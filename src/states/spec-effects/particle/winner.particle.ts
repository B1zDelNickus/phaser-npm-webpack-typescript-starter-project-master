import {IParticle} from './i.particle';
import {GameConfig} from '../../../config/game.config';

export class WinnerParticles implements IParticle {

    private game: Phaser.Game = null;
    private emitter: Phaser.Particles.Arcade.Emitter = null;

    constructor(
        private min: number = .35,
        private max: number = .65,
        private maxPart: number = 100,
        private gravity: number = 70,
        private minX: number = -100,
        private maxX: number = 100,
        private minY: number = 30,
        private maxY: number = 100) {}

    init( asset: string, frames?: any|any[], w: number = 960, c: number = 480): void {
        this.game = GameConfig.GAME;
        this.emitter = this.game.add.emitter(c, -50, this.maxPart);
        this.emitter.width = w;
        this.emitter.makeParticles(asset, frames);
        this.emitter.minParticleSpeed.setTo(this.minX, this.minY);
        this.emitter.maxParticleSpeed.setTo(this.maxX, this.maxY);
        this.emitter.minParticleScale = this.min;
        this.emitter.maxParticleScale = this.max;
        this.emitter.gravity = new Phaser.Point(0, this.gravity);
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