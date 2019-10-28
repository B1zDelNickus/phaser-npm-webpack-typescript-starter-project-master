import * as AssetUtils from '../utils/asset.utils';
import {IPreloader} from './preload/i.preloader';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {MyCuteGamesPreloader} from './preload/mcg.preloader';
import {DressupMixPreloader} from './preload/du.preloader';
import {FreeGamesCasualPreloader} from './preload/fgc.preloader';
import {PreloaderUtils} from '../utils/preloader.utils';
import {AdUtils} from '../utils/ad/ad.utils';

export default class Preloader extends Phaser.State {

    private preloader: IPreloader = null;

    public init(...args: any[]): void {
        if (GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS) {
            AdUtils.initGd();
        }
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.preloader = new MyCuteGamesPreloader(this, 'Start');
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.preloader = new DressupMixPreloader(this, 'Start');
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.preloader = new FreeGamesCasualPreloader(this, 'Start');
                break;
            }
        }
    }

    public preload(): void {
        this.preloader.preload();
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadMainTheme();
            PreloaderUtils.preloadSaver();
            PreloaderUtils.preloadEffects();
            PreloaderUtils.preloadStartState();
            AssetUtils.Loader.loadSelectedAssets(this.game, false, this.waitForSoundDecoding, this);
        }
    }

    public create(): void {
        this.preloader.create();
    }

    public update(): void {
        super.update(this.game);
        this.preloader.update();
    }

    public shutdown(): void {
        this.preloader.dispose();
    }

    private waitForSoundDecoding(): void {
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            GameConfig.IS_ASSETS_LOADED = true;
        AssetUtils.Loader.waitForSoundDecoding(() => {
            // enable sound or else
            this.preloader.enableButton();
        }, this);
    }
}
