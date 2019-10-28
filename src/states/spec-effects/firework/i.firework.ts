export interface IFirework {
    init(asset: string, frame?: any|any[]): void;
    start(): void;
    dispose(): void;
}