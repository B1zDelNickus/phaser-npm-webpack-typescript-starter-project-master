export interface IGui {
    addGui(defaultGui?: boolean, reverse?: boolean): void;
    addPlayBtn(callback?: Function, x?: number, y?: number): Phaser.Button;
    addMoreBtn(): Phaser.Button;
    addExtraMore(x: number, y: number, asset: string, frames?: any|any[], overHandler?: Function, outHandler?: Function, callback?: Function): Phaser.Button;
    addExtraMoreAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number, loop: boolean, overHandler?: Function, outHandler?: Function, callback?: Function): Phaser.Sprite;
    addLogoBtn(): Phaser.Button;
    addMusicBtns(): Array<Phaser.Button>;
    hideStandart(): void;
    hideAll(): void;
    disable(): void;
    dispose(): void;
    addExtraBtn(x: number, y: number, asset: string, frames?: any|any[], callback?: Function, overHandler?: Function, outHandler?: Function): Phaser.Button;
    addExtraBtnAnimated(x: number, y: number, assetClass: any, frames: any[], frameRate: number, loop: boolean, overHandler?: Function, outHandler?: Function, callback?: Function): Phaser.Sprite;
}

export enum StateType {
    START_STATE,
    COMIX_STATE,
    SELECT_STATE,
    MAKEUP_STATE,
    DRESS_STATE,
    DECOR_STATE,
    RESULT_STATE,
    MINIGAME_STATE,
    CROSS_STATE,
    FINAL_STATE
}