export class DetectionLoop {
  private animationId: number | null = null;
  private lastInferTime = 0;
  private inferencing = false;
  private active = false;

  constructor(
    private fps: number,
    private readonly runDetectionOnce: () => Promise<void>
  ) {}

  start() {
    if (this.active) return;
    this.active = true;
    this.lastInferTime = 0;
    this.animationId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.active = false;
    this.inferencing = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  setFps(fps: number) {
    this.fps = fps;
  }

  private tick = async (timestamp: number) => {
    if (!this.active) return;

    const interval = 1000 / this.fps;
    if (timestamp - this.lastInferTime >= interval && !this.inferencing) {
      this.inferencing = true;
      this.lastInferTime = timestamp;
      try {
        await this.runDetectionOnce();
      } finally {
        this.inferencing = false;
      }
    }

    this.animationId = requestAnimationFrame(this.tick);
  };
}
