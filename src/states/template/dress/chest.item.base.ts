export abstract class ChestItemBase {
    abstract button: Phaser.Button|Phaser.Sprite;
    abstract name: string;
    abstract disable(): void;
    abstract enable(): void;
    abstract dispose(): void;
}