export class OverlayManager {
    constructor(scene, margin) {
        this.scene = scene;
        this.margin = margin;
    }

    createOverlay() {
        const viewportWidth = this.scene.cameras.main.width;
        const viewportHeight = this.scene.cameras.main.height;
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x333333, 1);

        overlay.fillRect(0, 0, viewportWidth, this.margin);
        overlay.fillRect(0, viewportHeight - this.margin, viewportWidth, this.margin);
        overlay.fillRect(0, this.margin, this.margin, viewportHeight - 2 * this.margin);
        overlay.fillRect(viewportWidth - this.margin, this.margin, this.margin, viewportHeight - 2 * this.margin);
        overlay.setScrollFactor(0);

        return overlay;
    }
}