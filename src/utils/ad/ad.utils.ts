import {GameConfig, PublishMode} from '../../config/game.config';
import {isNull, isUndefined} from 'util';

export class AdUtils {

    private static adTag = 'https://googleads.g.doubleclick.net/pagead/ads?client=ca-games-pub-4405534753933673&slotname=6607102469&ad_type=video_image&description_url=http%3A%2F%2Fdressupmix.com%2FFree-Dressup-Games%2FPrincess%2FPrincess-At-Modeling-Reality---New-Stage-play.html&videoad_start_delay=15000';
    private static gdGame = '4e2644d63cb84235878f63bb07f844bf';
    private static gdUser = '4ED9EE15-CD3B-42DA-AFF4-A2CB65F233D3-s1';

    public static init() {
        const game = GameConfig.GAME;
        Phaser.Device.whenReady(function () {
            if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD ||
                GameConfig.PUB_MODE === PublishMode.DUW) {
                game.plugins.add(PhaserAds.AdManager);
            }
            else if (GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS) {
                game.plugins.add(PhaserAds.AdManager);
                // Set the ad provider, we use google Ima3 (ima 3 sdk)
                /*(game as any).ads.setAdProvider(new PhaserAds.AdProvider.GameDistributionAds(
                    game,
                    AdUtils.gdGame, // Your game id goes here
                    AdUtils.gdUser // Your user id goes here
                ));*/
            }
            else if (GameConfig.PUB_MODE === PublishMode.NO_AD || GameConfig.PUB_MODE === PublishMode.GGG) {
                // Nothing
            }
        });
    }

    public static initGd() {
        const game = GameConfig.GAME;
        (game as any).ads.setAdProvider(new PhaserAds.AdProvider.GameDistributionAds(
            game,
            AdUtils.gdGame, // Your game id goes here
            AdUtils.gdUser // Your user id goes here
        ));
    }

    public static setProvider() {

        const game = GameConfig.GAME;
        Phaser.Device.whenReady(function () {
            // Set the ad provider, we use google Ima3 (ima 3 sdk)
            if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD) {
                (game as any).ads.setAdProvider(new PhaserAds.AdProvider.Ima3(
                    game, AdUtils.adTag
                ));
            }
            else if (GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS) {
                game.plugins.add(PhaserAds.AdManager);
                // Set the ad provider, we use google Ima3 (ima 3 sdk)
                (game as any).ads.setAdProvider(new PhaserAds.AdProvider.GameDistributionAds(
                    game,
                    AdUtils.gdGame, // Your game id goes here
                    AdUtils.gdUser // Your user id goes here
                ));
            }

            // Content paused event is fired when the content (game) should be paused, and the ad will be played
            (game as any).ads.onContentPaused.addO(function () {
                console.error('Started playing ad.');
            }, this);
            // This is fired when the ad is finished playing and the content (game) should be resumed
            (game as any).ads.onContentResumed.add(function () {
                console.error('Finished playing ad.');
                // (game as any).ads.unMuteAfterAd();
            }, this);
            // This is fired when the ad was clicked by the user
            (game as any).ads.onAdClicked.add(function () {
                console.error('Clicked the ad!');
            }, this);
            // This gives us details about how far the users is viewing the add
            (game as any).ads.onAdProgression.add(function (progression) {
                console.error(progression);
            }, this);
            // This is fired when the ad was clicked by the user
            (game as any).ads.onAdsDisabled.add(function () {
                console.error('Ads are being blocked.');
            }, this);
        });
    }

    public static playAds(callback?: Function, context?: any) {
        const game = GameConfig.GAME;
        // Set the ad provider, we use google Ima3 (ima 3 sdk)
        (game as any).ads.setAdProvider(new PhaserAds.AdProvider.Ima3(
            game, AdUtils.adTag
        ));
        // Content paused event is fired when the content (game) should be paused, and the ad will be played
        (game as any).ads.onContentPaused.addOnce(function () {
            console.error('Started playing ad.');
        }, this);
        // This is fired when the ad is finished playing and the content (game) should be resumed
        (game as any).ads.onContentResumed.addOnce(function () {
            console.error('Finished playing ad.');
            // (game as any).ads.unMuteAfterAd();
            AdUtils.removeAdContainer();
            if (callback) {
                callback.call(context);
            }
        }, this);
        // This is fired when the ad was clicked by the user
        (game as any).ads.onAdClicked.addOnce(function () {
            console.error('Clicked the ad!');
        }, this);
        // This gives us details about how far the users is viewing the add
        (game as any).ads.onAdProgression.addOnce(function (progression) {
            console.error(progression);
        }, this);
        // This is fired when the ad was clicked by the user
        (game as any).ads.onAdsDisabled.addOnce(function () {
            console.error('Ads are being blocked.');
            AdUtils.removeAdContainer();
        }, this);
        //// ***********
        /*if (typeof google !== 'undefined') {
            google.ima.settings.setLocale('nl');
        }*/
        //// ***********
        let adsEnabled = (game as any).ads.provider.adsEnabled;
        if (adsEnabled) {
            if (game.device.desktop) {
                // This is how we request an ad for desktop
                (game as any).ads.showAd({
                    deployment: 'devsite',
                    sample_ct: 'skippablelinear'
                });
            } else {
                // In mobile we need to activate it by user input
                (game as any).ads.showAd({
                    deployment: 'devsite',
                    sample_ct: (game.device.iPhone) ? 'linear' : 'skippablelinear' // Iphone doesn't support skippable videos
                });
            }
        }
        else {
            // the actual game content, behind the ad
            /*let text = game.add.text(game.width / 2, game.height / 2 + 60, 'Ads are being blocked.', {
                font: '25px Arial',
                fill: '#cc0000'
            });
            text.anchor.set(0.5);*/
            console.error('Ad blocked.');
        }
    }

    private static removeAdContainer() {
        const ad = document.getElementById('phaser-ad-container');
        if (!isNull(ad) && !isUndefined(ad)) {
            ad.parentNode.removeChild(ad);
        }
    }

    public static areAdsEnabled(): boolean {
        const test = document.createElement('div');
        test.innerHTML = '&nbsp;';
        test.className = 'adsbox';
        document.body.appendChild(test);
        let adsEnabled;
        const isEnabled = function () {
            let enabled = true;
            if (test.offsetHeight === 0) {
                enabled = false;
            }
            test.parentNode.removeChild(test);
            return enabled;
        };
        window.setTimeout(adsEnabled = isEnabled(), 100);
        return adsEnabled;
    }
}