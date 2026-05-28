export function EdgeVisionHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-industrial-950">
      <div className="industrial-grid absolute inset-0 opacity-15" />
      <div className="mx-auto grid min-h-[420px] max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div className="relative z-10">
          <p className="edge-eyebrow">Edge Vision Lab</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
            工业视觉识物实验室
          </h1>
          <p className="mt-5 text-2xl font-semibold text-signal-cyan">Edge Vision Lab</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            基于网页摄像头的固定场景物体识别 Demo，用于展示边缘 AI、工业视觉和工程感知能力。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#experience">
              开始体验
            </a>
            <a className="btn-secondary" href="https://github.com/Lori-Programmer/Industrial-Agent-Lab" target="_blank" rel="noreferrer">
              查看 GitHub 源码
            </a>
            <a className="btn-secondary" href="/portfolio">
              返回作品集
            </a>
          </div>
        </div>
        <div className="relative z-10 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="aspect-video rounded-lg border border-signal-cyan/30 bg-black p-4">
            <div className="relative h-full overflow-hidden rounded-md bg-[#08111d]">
              <div className="absolute left-[18%] top-[24%] h-[28%] w-[28%] rounded border-2 border-signal-cyan bg-signal-cyan/10" />
              <div className="absolute left-[56%] top-[20%] h-[16%] w-[24%] rounded border-2 border-signal-green bg-signal-green/10" />
              <div className="absolute bottom-[16%] left-[36%] h-[18%] w-[18%] rounded border-2 border-signal-amber bg-signal-amber/10" />
              <div className="absolute bottom-4 left-4 rounded bg-black/55 px-3 py-2 text-xs text-slate-200">
                browser-local-demo · mock detection
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
            <span className="rounded-md bg-white/[0.06] px-2 py-2">不上传</span>
            <span className="rounded-md bg-white/[0.06] px-2 py-2">不保存</span>
            <span className="rounded-md bg-white/[0.06] px-2 py-2">不识别人</span>
          </div>
        </div>
      </div>
    </section>
  );
}
