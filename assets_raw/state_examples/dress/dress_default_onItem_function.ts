class A {
    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot', 'und'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            this.currentDoll.on('dress_b', index);
            this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
            this.currentDoll.on('top_b', index);
            this.currentDoll.on('top_f', index);
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('bot_b', index);
            this.currentDoll.on('bot_f', index);
            this.currentDoll.on('bot_t', index);
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
            this.currentDoll.on('shoe_f', index);
            this.currentDoll.on('shoe_b', index);
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
            this.currentDoll.on('jew_b', index);
            this.currentDoll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('hat', index);
            this.currentDoll.on('hat_b', index);
            this.currentDoll.on('hat_f', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
            this.currentDoll.on('acs_f', index);
            this.currentDoll.on('acs_b', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            this.currentDoll.on('bag_b', index);
            this.currentDoll.on('bag_f', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
            this.currentDoll.on('glove_b', index);
            this.currentDoll.on('glove_f', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('sock', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('jack', index);
            this.currentDoll.on('jack_b', index);
            this.currentDoll.on('jack_f', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index)) {
                this.chest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
            this.currentDoll.on('hair_f', index);
        }
        if (this.currentDoll === this.rap) this.rapDressed = true;
        if (this.currentDoll === this.elza) this.elzaDressed = true;
        if (this.playBtn.alpha === 0 && this.rapDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }
}