import * as Assets from '../../assets';
import {ISaver} from './i.saver';
import {GameConfig, PublishMode} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {SaverAnimation} from './animation.saver';
import {SaverAnimations} from './enum.saver';

export class DefaultSaver implements ISaver {
    private game: Phaser.Game;
    private state: Phaser.State;

    protected container: Phaser.Group = null;
    protected vs: Phaser.Button = null;
    protected part1: Phaser.Sprite = null;
    protected part2: Phaser.Sprite = null;
    protected inAnimation: SaverAnimation = null;
    protected outAnimation: SaverAnimation = null;

    protected static initial: boolean = false;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(state: Phaser.State): void {
    }

    setOnInCallback(callback?: Function): void {
    }

    setOnOutCallback(callback?: Function): void {
    }

    fadeIn(callback?: Function): void {
    }

    fadeOut(callback?: Function): void {
    }

    dispose(): void {
    }
}