import {IParticle} from './i.particle';
import {GameConfig} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';

export class GoldStarParticles implements IParticle {

    private game: Phaser.Game = null;
    private emitter: Phaser.Particles.Arcade.Emitter = null;

    constructor(private min: number = .35, private max: number = .65) {
    }

    init( asset: string, frames?: any|any[]): void {
        this.game = GameConfig.GAME;
        this.emitter = this.game.add.emitter(this.game.world.centerX, -50, 100);
        this.emitter.width = 960;
        this.emitter.makeParticles(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar3,
            ]);
        this.emitter.minParticleSpeed.setTo(-100, 30);
        this.emitter.maxParticleSpeed.setTo(100, 100);
        this.emitter.minParticleScale = this.min;
        this.emitter.maxParticleScale = this.max;
        this.emitter.gravity = new Phaser.Point(0, 70);
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