import {IParticle} from './i.particle';
import {GameConfig} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';

export class SnowMiddleParticles implements IParticle {

    private game: Phaser.Game = null;
    private emitter: Phaser.Particles.Arcade.Emitter = null;
    private update_interval: number;
    private max: number;
    private i: number;

    constructor() {
        this.max = 0;
        this.update_interval = 3 * 60;
        this.i = 0;
    }

    init( asset?: string, frames?: any|any[]): void {
        this.game = GameConfig.GAME;
        this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
        this.emitter.makeParticles(ImageUtils.getSpritesheetClass('SpritesheetsSnow17176').getName(), [0, 1, 2, 3, 4, 5]);
        this.emitter.maxParticleScale = 1.2;
        this.emitter.minParticleScale = 0.8;
        this.emitter.setYSpeed(50, 150);
        this.emitter.gravity = new Phaser.Point(0, 0);
        this.emitter.width = this.game.world.width * 1.5;
        this.emitter.minRotation = 0;
        this.emitter.maxRotation = 40;
        this.changeWindDirection();
    }

    addToContainer(cont: Phaser.Group): void {
        cont.add(this.emitter);
    }

    start(): void {
        this.emitter.start(false, 12000, 40);
    }

    update(): void {
        this.i++;
        if (this.i === this.update_interval) {
            this.changeWindDirection();
            this.update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
            this.i = 0;
        }
    }

    dispose(): void {
        this.emitter.kill();
        this.emitter.destroy(true);
    }

    changeWindDirection() {
        let multi = Math.floor((this.max + 200) / 4),
            frag = (Math.floor(Math.random() * 100) - multi);
        this.max = this.max + frag;

        if (this.max > 200) this.max = 150;
        if (this.max < -200) this.max = -150;

        this.setXSpeed(this.emitter, this.max);
    }

    setXSpeed(emitter, max) {
        emitter.setXSpeed(max - 20, max);
        emitter.forEachAlive(this.setParticleXSpeed, this, max);
    }

    setParticleXSpeed(particle, max) {
        particle.body.velocity.x = max - Math.floor(Math.random() * 30);
    }

}