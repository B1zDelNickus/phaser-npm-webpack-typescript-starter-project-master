import * as Assets from '../../assets';
import {GameConfig} from '../../config/game.config';

export class ImageUtils {

    public static getImageClass(name: string): any {
        return Assets.Images[name + GameConfig.ASSET_SIZE];
    }

    public static getSpritesheetClass(name: string): any {
        return Assets.Spritesheets[name + GameConfig.ASSET_SIZE];
    }

    public static getAtlasClass(name: string): any {
        return Assets.Atlases[name + GameConfig.ASSET_SIZE];
    }

    public static getGoogleFontClass(name: string): any {
        return Assets.GoogleWebFonts[name];
    }

    public static getBitmapFontClass(name: string): any {
        return Assets.BitmapFonts[name];
    }
}