import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';
import {ImageUtils} from './images/image.utils';

export class PreloaderUtils {

    public static preloadMainTheme(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Audio['AudioMainTheme'] != null) {
            game.load.audio(
                Assets.Audio['AudioMainTheme'].getName(),
                Assets.Audio['AudioMainTheme'].getMP3(),
                true);
        } else {
            if (DEBUG)
                console.log(`\nNo default Main Theme audio was found.`);
        }
        this.soundAdditionalLoads();
    }

    public static preloadSaver(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesSaver') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesSaver').getName(),
                ImageUtils.getAtlasClass('AtlasesSaver').getPNG(),
                ImageUtils.getAtlasClass('AtlasesSaver').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Saver graphics was found.`);
        }
    }

    public static preloadEffects(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesEffects') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesEffects').getName(),
                ImageUtils.getAtlasClass('AtlasesEffects').getPNG(),
                ImageUtils.getAtlasClass('AtlasesEffects').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Effects graphics was found.`);
        }
        // Adds
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsSnow17176').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsSnow17176').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsSnow17176').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsSnow17176').getFrameHeight());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsSnowLarge64646').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsSnowLarge64646').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsSnowLarge64646').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsSnowLarge64646').getFrameHeight());
    }

    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateStart') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateStart').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default StartState graphics was found.`);
        }
        this.startStateAdditionalLoads();
    }

    public static preloadComixState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateComix') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
                ImageUtils.getAtlasClass('AtlasesStateComix').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateComix').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Comix State graphics was found.`);
        }
        this.comixStateAdditionalLoads();
    }

    public static preloadShowState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateShow') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
                ImageUtils.getAtlasClass('AtlasesStateShow').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateShow').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Show State graphics was found.`);
        }
        this.showStateAdditionalLoads();
    }

    public static preloadSelectState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateSelect') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                ImageUtils.getAtlasClass('AtlasesStateSelect').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateSelect').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Select State graphics was found.`);
        }
        this.selectStateAdditionalLoads();
    }

    public static preloadDress1State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress1') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress1 State graphics was found.`);
        }
        this.dress1StateAdditionalLoads();
    }

    public static preloadDress2State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress2') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress2 State graphics was found.`);
        }
        this.dress2StateAdditionalLoads();
    }

    public static preloadDress3State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress3') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress3 State graphics was found.`);
        }
        this.dress3StateAdditionalLoads();
    }

    public static preloadDress4State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress4') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress4').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress4').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress4 State graphics was found.`);
        }
        this.dress4StateAdditionalLoads();
    }

    public static preloadPlaceState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStatePlace') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStatePlace').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePlace').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStatePlace').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Place State graphics was found.`);
        }
        this.placeStateAdditionalLoads();
    }

    public static preloadDecorState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDecor') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Decor State graphics was found.`);
        }
        this.decorStateAdditionalLoads();
    }

    public static preloadPosterState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStatePoster') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Poster State graphics was found.`);
        }
        this.posterStateAdditionalLoads();
    }

    public static preloadResultState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateResult') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
                ImageUtils.getAtlasClass('AtlasesStateResult').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateResult').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Result State graphics was found.`);
        }
        this.resultStateAdditionalLoads();
    }

    public static preloadFinalState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateFinal') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Final State graphics was found.`);
        }
        this.finalStateAdditionalLoads();
    }

    /** ------------------------------------------------------------------------
     * Aditional loads for extending tries of default predefined assets loading
    ------------------------------------------------------------------------- */

    private static startStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg').getName(),
            ImageUtils.getImageClass('ImagesBg').getJPG());
        /*game.load.image(
            ImageUtils.getImageClass('ImagesFg').getName(),
            ImageUtils.getImageClass('ImagesFg').getPNG());*/
        /*game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesStateStart2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart2').getPNG(),
            ImageUtils.getAtlasClass('AtlasesStateStart2').getJSONArray());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getFrameHeight());*/
    }

    private static comixStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg2').getName(),
            ImageUtils.getImageClass('ImagesBg2').getJPG());
        /*game.load.image(
            ImageUtils.getImageClass('ImagesFg2').getName(),
            ImageUtils.getImageClass('ImagesFg2').getPNG());*/
    }

    private static showStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesFon1').getName(),
            ImageUtils.getImageClass('ImagesFon1').getJPG());
        game.load.image(
            ImageUtils.getImageClass('ImagesFon2').getName(),
            ImageUtils.getImageClass('ImagesFon2').getJPG());
        game.load.image(
            ImageUtils.getImageClass('ImagesFon3').getName(),
            ImageUtils.getImageClass('ImagesFon3').getJPG());
        game.load.image(
            ImageUtils.getImageClass('ImagesFon4').getName(),
            ImageUtils.getImageClass('ImagesFon4').getJPG());
    }

    private static resultStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());*/
    }

    private static finalStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg6').getName(),
            ImageUtils.getImageClass('ImagesBg6').getJPG());
        /*game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesStateFinal2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal2').getPNG(),
            ImageUtils.getAtlasClass('AtlasesStateFinal2').getJSONArray());*/
    }

    private static selectStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg3').getName(),
            ImageUtils.getImageClass('ImagesBg3').getJPG());
    }

    private static soundAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
    }

    private static decorStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg3').getName(),
            ImageUtils.getImageClass('ImagesBg3').getJPG());
    }

    private static posterStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
            ImageUtils.getImageClass('ImagesBg3').getName(),
            ImageUtils.getImageClass('ImagesBg3').getJPG());*/
    }

    private static dress1StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());
        /*game.load.image(
            ImageUtils.getImageClass('ImagesChest').getName(),
            ImageUtils.getImageClass('ImagesChest').getPNG());*/
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollJas').getName(),
            ImageUtils.getAtlasClass('AtlasesDollJas').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollJas').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollJas2').getName(),
            ImageUtils.getAtlasClass('AtlasesDollJas2').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollJas2').getJSONArray());
    }

    private static dress2StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg5').getName(),
            ImageUtils.getImageClass('ImagesBg5').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
            ImageUtils.getAtlasClass('AtlasesDollElza').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollElza').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollElza2').getName(),
            ImageUtils.getAtlasClass('AtlasesDollElza2').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollElza2').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollElza3').getName(),
            ImageUtils.getAtlasClass('AtlasesDollElza3').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollElza3').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollElza4').getName(),
            ImageUtils.getAtlasClass('AtlasesDollElza4').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollElza4').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollMoana').getName(),
            ImageUtils.getAtlasClass('AtlasesDollMoana').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollMoana').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollMoana2').getName(),
            ImageUtils.getAtlasClass('AtlasesDollMoana2').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollMoana2').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollMoana3').getName(),
            ImageUtils.getAtlasClass('AtlasesDollMoana3').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollMoana3').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollMoana4').getName(),
            ImageUtils.getAtlasClass('AtlasesDollMoana4').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollMoana4').getJSONArray());
    }

    private static dress3StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
            ImageUtils.getAtlasClass('AtlasesDollRap').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollRap').getJSONArray());*/
        game.load.image(
            ImageUtils.getImageClass('ImagesDoor').getName(),
            ImageUtils.getImageClass('ImagesDoor').getPNG());
        game.load.image(
            ImageUtils.getImageClass('ImagesDoor1').getName(),
            ImageUtils.getImageClass('ImagesDoor1').getPNG());
        game.load.image(
            ImageUtils.getImageClass('ImagesBack').getName(),
            ImageUtils.getImageClass('ImagesBack').getPNG());
        game.load.image(
            ImageUtils.getImageClass('ImagesFront').getName(),
            ImageUtils.getImageClass('ImagesFront').getPNG());
        game.load.image(
            ImageUtils.getImageClass('ImagesMmmm').getName(),
            ImageUtils.getImageClass('ImagesMmmm').getPNG());
    }

    private static dress4StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
         ImageUtils.getImageClass('ImagesBg4').getName(),
         ImageUtils.getImageClass('ImagesBg4').getJPG());
         game.load.atlasJSONArray(
         ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
         ImageUtils.getAtlasClass('AtlasesDollRap').getPNG(),
         ImageUtils.getAtlasClass('AtlasesDollRap').getJSONArray());*/
    }

    private static placeStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());
    }
}