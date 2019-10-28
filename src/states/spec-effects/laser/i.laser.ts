export interface ILaser {
    init(asset: string, frame?: any|any[]): void;
    start(): void;
    getContainer(): Phaser.Group;
    dispose(): void;
}