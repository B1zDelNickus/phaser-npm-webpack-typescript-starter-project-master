import {GameConfig} from '../config/game.config';
import {GlowFilter} from '../states/spec-effects/glow/glow';

export class FilterUtils {
    public static makeFilter(
        color: number = 0xffffff,
        textureWidth: number = 350,
        textureHeight: number = 350,
        distance: number = 5,
        outerStrength: number = 2,
        innerStrength: number = 1,
        quality: number = 1): any {

            // let f: Phaser.Filter = game.add.filter(Assets.Scripts.ScriptsGlowFilter.getName());
            return new GlowFilter(GameConfig.GAME, color, textureWidth, textureHeight, distance, outerStrength, innerStrength, quality);
    }
}