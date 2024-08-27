export class CameraController {
    constructor(scene) {
        this.scene = scene;
        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;
    }

    initializeCamera(centerX, centerY, zoomLevel = 1) {
        const viewportWidth = this.scene.cameras.main.width;
        const viewportHeight = this.scene.cameras.main.height;
        this.scene.cameras.main.scrollX = centerX - viewportWidth / 2;
        this.scene.cameras.main.scrollY = centerY - viewportHeight / 2;
        this.scene.cameras.main.setZoom(zoomLevel); // Set initial zoom level
    }

    setZoom(zoomLevel) {
        this.scene.cameras.main.setZoom(zoomLevel);
    }

    enablePanning() {
        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.middleButtonDown()) {
                this.isPanning = true;
                this.panStartX = pointer.x;
                this.panStartY = pointer.y;
            }
        });

        this.scene.input.on('pointerup', (pointer) => {
            if (pointer.middleButtonReleased()) {
                this.isPanning = false;
            }
        });

        this.scene.input.on('pointermove', (pointer) => {
            if (this.isPanning) {
                const deltaX = this.panStartX - pointer.x;
                const deltaY = this.panStartY - pointer.y;
                this.scene.cameras.main.scrollX += deltaX;
                this.scene.cameras.main.scrollY += deltaY;
                this.panStartX = pointer.x;
                this.panStartY = pointer.y;
            }
        });
    }
}