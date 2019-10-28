import {GameConfig} from '../../../config/game.config';

import {DollLayer} from './doll.layer';
import {TweenUtils} from '../../../utils/tween.utils';
import {isNull, isUndefined} from 'util';

export class Doll {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private layers: Array<DollLayer> = [];
    private dependencies: Map<string, string> = new Map();

    constructor(state: Phaser.State, x: number, y: number, scaleX: number = 1, scaleY: number = -1) {
        this.game = GameConfig.GAME;

        this.container = this.game.add.group();
        this.container.x = x;
        this.container.y = y;
        this.container.scale.setTo(scaleX, scaleY === -1 ? scaleX : scaleY);
    }

    hide(force: boolean = false) {
        TweenUtils.fadeOut(this.container, force ? 1 : 500);
    }

    show(force: boolean = false) {
        TweenUtils.fadeIn(this.container, force ? 1 : 500);
    }

    layer(x: number, y: number, name: string, assetClass: string, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[], dependsOn?: string[]): Doll {
        this.layers[name] = new DollLayer(this.container, x, y, assetClass, prefix, defaultFrame, removable, strictIndexes);
        if (dependsOn) {
            for (let dep of dependsOn) {
                this.dependencies.set(dep, name);
            }
        }
        return this;
    }

    on(item: string, index: number, ...off: string[]): boolean {
        for (let toOff of off) {
            if (this.layers[toOff])
                this.layers[toOff].operate(-1);
        }
        if (!this.layers[item]) return false;
        const result = this.layers[item].operate(index);
        /*let dep: string;
        let depIndex: number = -1;
        if (this.dependencies.get(item).indexOf('_') !== -1) {
            dep = this.dependencies.get(item).split('_')[0];
            depIndex = parseInt(this.dependencies.get(item).split('_')[1]);
        }
        else {
            dep = this.dependencies.get(item);
        }
        console.log(dep);*/
        if (this.dependencies.has(item)) {
            if (this.layers[item].isEmpty) {
                this.layers[this.dependencies.get(item)].setSecondaryState(false);
            }
            else {
                this.layers[this.dependencies.get(item)].setSecondaryState(true);
            }
        }
        else if (this.dependencies.has(`${item}_${index}`)) {
            if (this.layers[item].isEmpty) {
                this.layers[this.dependencies.get(`${item}_${index}`)].setSecondaryState(false);
            }
            else {
                this.layers[this.dependencies.get(`${item}_${index}`)].setSecondaryState(true);
            }
        }
        else if (this.hasLike(item, index)) {
            this.clearLayerByDependency(item);
        }
        return result;
    }

    public isLayerEmpty(name: string): boolean {
        // if (!this.layers[name]) return true;
        return this.layers[name].getEmpty();
    }

    clearLayerByDependency(name: string) {
        for (let key of this.dependencies.keys()) {
            if (key.indexOf(name) !== -1) {
                this.layers[this.dependencies.get(key)].setSecondaryState(false);
            }
        }
    }

    hasLike(name: string, index: number): boolean {
        for (let key of this.dependencies.keys()) {
            if ((key.indexOf(name) !== -1) && (key !== `${name}_${index}`)) {
                return true;
            }
        }
        return false;
    }

    off(item: string): void {
        this.layers[item].remove();
    }

    setListeners(context: any, callback: Function, overHandler?: Function, outHandler?: Function): Doll {
        this.container.inputEnableChildren = true;
        this.container.onChildInputDown.add(callback, context);
        if (overHandler) this.container.onChildInputOver.add(overHandler, context);
        if (outHandler) this.container.onChildInputOut.add(outHandler, context);
        return this;
    }

    disableListeners(): Doll {
        this.container.inputEnableChildren = false;
        for (let sp of this.container.children) {
            if (sp instanceof Phaser.Sprite) {
                (sp as Phaser.Sprite).inputEnabled = false;
            }
        }
        return this;
    }

    enableListeners(): Doll {
        this.container.inputEnableChildren = true;
        for (let sp of this.container.children) {
            if (sp instanceof Phaser.Sprite) {
                (sp as Phaser.Sprite).inputEnabled = true;
            }
        }
        return this;
    }

    setPosition(x: number, y: number): void {
        this.container.position.setTo(x, y);
    }

    setScale(val: number, val2?: number): void {
        if (isUndefined(val2) || isNull(val2))
            this.container.scale.setTo(val);
        else
            this.container.scale.setTo(val, val2);
    }

    setAlpha(val: number): void {
        this.container.alpha = val;
    }

    setAngle(val: number): void {
        this.container.angle = val;
    }

    getBody(): Phaser.Group {
        return this.container;
    }

    extract(): Doll {
        this.container.parent.removeChild(this.container);
        this.game.add.existing(this.container);
        this.game.world.remove(this.container);
        return this;
    }

    insert(): Doll {
        this.game.add.existing(this.container);
        return this;
    }

    dispose(): void {
        for (let layer of this.layers) {
            layer.dispose();
        }
        this.container.destroy(true);
    }
}