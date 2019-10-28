import * as Assets from '../assets';
import {GameConfig, PublishMode} from '../config/game.config';
import {ImageUtils} from './images/image.utils';

export class BootUtils {

    public static preloadMcg(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS) {
            game.load.image(
                ImageUtils.getImageClass('ImagesPrerollMcg').getName(),
                ImageUtils.getImageClass('ImagesPrerollMcg').getJPG());
        } else {
            game.load.image(
                ImageUtils.getImageClass('ImagesPreroll2Mcg').getName(),
                ImageUtils.getImageClass('ImagesPreroll2Mcg').getPNG());
        }
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getPNG(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasMcg').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiMcg').getPNG(),
            ImageUtils.getAtlasClass('AtlasesGuiMcg').getJSONArray());
        game.load.json(
            Assets.JSON.JsonDoll.getName(),
            Assets.JSON.JsonDoll.getJSON());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsPlayMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsLArrMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsLArrMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsLArrMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsLArrMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsDoneMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsDoneMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsDoneMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsDoneMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMoreMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMusicMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMusicMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMusicMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMusicMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMusicOffMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMusicOffMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMusicOffMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMusicOffMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsNextMcg1731322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsNextMcg1731322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsNextMcg1731322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsNextMcg1731322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsPhotoMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsPhotoMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsPhotoMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsPhotoMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsRArrMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsRArrMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsRArrMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsRArrMcg1651322').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsReplayMcg1651322').getFrameHeight());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        game.load.script(
            Assets.Scripts.ScriptsSpriter.getName(),
            Assets.Scripts.ScriptsSpriter.getJS());
        this.additionalLoads();
    }

    public static preloadDu(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            ImageUtils.getImageClass('ImagesPrerollDu').getName(),
            ImageUtils.getImageClass('ImagesPrerollDu').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getPNG(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasDu').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiDu').getPNG(),
            ImageUtils.getAtlasClass('AtlasesGuiDu').getJSONArray());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        this.additionalLoads();
    }

    public static preloadFgc(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            ImageUtils.getImageClass('ImagesPrerollFgc').getName(),
            ImageUtils.getImageClass('ImagesPrerollFgc').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getPNG(),
            ImageUtils.getAtlasClass('AtlasesPreloaderAtlasFgc').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getPNG(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getJSONArray());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        this.additionalLoads();
    }

    private static additionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesSpin').getName(),
            ImageUtils.getImageClass('ImagesSpin').getPNG());
        if (GameConfig.PUB_MODE !== PublishMode.NO_AD && GameConfig.PUB_MODE !== PublishMode.GGG) {
            game.load.script(
                Assets.Scripts.ScriptsPhaserAds.getName(),
                Assets.Scripts.ScriptsPhaserAds.getJS());
        }
    }
}
