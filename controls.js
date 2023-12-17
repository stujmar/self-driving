class Controls {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners() {
        document.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowUp':
                    this.up = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'ArrowDown':
                    this.down = true;
                    break;
            }
        };

        document.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowUp':
                    this.up = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case 'ArrowDown':
                    this.down = false;
                    break;
            }
        };
    }
}