export interface IParticle {
    init(asset?: string, frames?: any|any[], rate?: number, w?: number, c?: number): void;
    addToContainer(cont: Phaser.Group): void;
    start(): void;
    update(): void;
    dispose(): void;
}