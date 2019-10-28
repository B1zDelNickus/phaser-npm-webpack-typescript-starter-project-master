export interface ISaver {
    init(state: Phaser.State, ...args: any[]): void;
    setOnInCallback(callback?: Function): void;
    setOnOutCallback(callback?: Function): void;
    fadeIn(): void;
    fadeOut(): void;
    dispose(): void;
}