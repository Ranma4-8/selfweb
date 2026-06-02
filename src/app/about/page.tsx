const timeline = [
  {
    year: "2026",
    title: "构建这个网站",
    desc: "用 Next.js 重新设计了个人网站，把这些年积累的文字找到了新的归宿。",
  },
  {
    year: "2024",
    title: "开始认真记录",
    desc: "开始系统地用文字记录日常，养成了每周写作的习惯。",
  },
  {
    year: "2023",
    title: "咖啡与相机",
    desc: "学会了手冲咖啡，买了第一台相机，开始用镜头观察世界。",
  },
  {
    year: "2022",
    title: "读书笔记",
    desc: "开始写读书笔记，读了很多很多书。阅读让人变得辽阔。",
  },
  {
    year: "2021",
    title: "第一次独自旅行",
    desc: "一个人去了云南，在丽江住了两周，发现孤独也可以是享受。",
  },
  {
    year: "2019",
    title: "第一篇博客",
    desc: "开始写博客，写了几篇就放弃了。但那粒种子还是种下了。",
  },
];

const nowCards = [
  { emoji: "📖", label: "在读", value: "置身事内", sub: "兰小欢" },
  { emoji: "🎧", label: "在听", value: "Hammock", sub: "后摇 · 氛围" },
  { emoji: "💻", label: "在做", value: "构建个人网站", sub: "Next.js" },
  { emoji: "📍", label: "在哪", value: "奥克兰", sub: "新西兰" },
  { emoji: "☕", label: "在喝", value: "耶加雪菲", sub: "手冲" },
  { emoji: "🌱", label: "在学", value: "设计感知", sub: "苹果的那种" },
];

const stats = [
  { value: "3+", label: "年记录" },
  { value: "50+", label: "篇文章" },
  { value: "138", label: "张照片" },
  { value: "23", label: "本书 · 2025" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#000] min-h-[80vh] flex items-end px-6 pb-20 pt-32 relative overflow-hidden">
        {/* Ambient bg */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(0,113,227,0.25) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-[980px] mx-auto w-full relative z-10">
          <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#0071e3] mb-6">
            关于我
          </p>

          <h1
            className="font-bold text-white leading-[1.02] tracking-[-0.003em] mb-6"
            style={{ fontSize: "clamp(56px, 10vw, 96px)" }}
          >
            晴间有云
          </h1>

          <p className="text-[21px] text-white/50 max-w-[560px] leading-relaxed">
            一个普通人，在普通的生活里寻找有意思的细节。用文字和照片留住那些容易被忘记的瞬间。
          </p>

          {/* Scroll hint */}
          <div className="flex items-center gap-3 mt-16 text-white/30">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-[12px] tracking-widest uppercase">向下滚动</span>
          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="bg-white py-[120px] px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
            {/* Left: text */}
            <div>
              <h2
                className="font-bold text-[#1d1d1f] tracking-[-0.003em] leading-tight mb-8"
                style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                你好，我是 Max
              </h2>
              <div className="space-y-5 text-[17px] text-[#6e6e73] leading-relaxed">
                <p>
                  我不太确定怎么介绍自己。职业上来说，是个坐在电脑前工作的人，像大多数人一样。
                </p>
                <p>
                  生活里，我喜欢早起，喜欢阳光打进来的那种早晨。喜欢慢慢地泡一杯咖啡，在笔记本上写几行字，然后开始这一天。
                </p>
                <p>
                  我觉得生活里大部分让人高兴的事，都是很小的事。菜市场里遇见好看的食材，翻到一本很对胃口的书，和朋友聊到很晚——这些比什么里程碑都更真实。
                </p>
                <p>
                  这个网站是我给自己的一个地方，用来放那些不想忘记的瞬间。如果你路过，欢迎留下来坐坐。
                </p>
              </div>
            </div>

            {/* Right: stats */}
            <div className="bg-[#f5f5f7] rounded-[24px] p-8">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-6">
                一些数字
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-[16px] p-5">
                    <div className="text-[32px] font-bold text-[#1d1d1f] tracking-tight leading-none mb-1.5">
                      {s.value}
                    </div>
                    <div className="text-[13px] text-[#6e6e73]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Now ── */}
      <section className="bg-[#f5f5f7] py-[120px] px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-3">
            现在在做
          </p>
          <h2
            className="font-bold text-[#1d1d1f] tracking-[-0.003em] leading-tight mb-12"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            此刻的状态
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {nowCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-[18px] p-6 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-2xl mb-3">{card.emoji}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-1">
                  {card.label}
                </div>
                <div className="text-[16px] font-bold text-[#1d1d1f] leading-snug">
                  {card.value}
                </div>
                <div className="text-[13px] text-[#6e6e73] mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-white py-[120px] px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-3">
            时间线
          </p>
          <h2
            className="font-bold text-[#1d1d1f] tracking-[-0.003em] leading-tight mb-16"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            走过的路
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[76px] top-2 bottom-2 w-[1px] bg-[#d2d2d7] hidden md:block" />

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col md:flex-row gap-4 md:gap-10 pb-10 last:pb-0"
                >
                  {/* Year */}
                  <div className="md:w-[76px] flex-shrink-0 flex md:justify-end">
                    <span className="text-[15px] font-bold text-[#0071e3] tabular-nums">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex absolute left-[76px] top-1 translate-x-[-4.5px] items-center">
                    <div className="w-[9px] h-[9px] rounded-full bg-[#0071e3] ring-4 ring-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:pl-6">
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-[#6e6e73] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-[#1d1d1f] py-[120px] px-6 text-center">
        <div className="max-w-[560px] mx-auto">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-4">
            联系我
          </p>
          <h2
            className="font-bold text-white leading-tight tracking-[-0.003em] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            打声招呼
          </h2>
          <p className="text-[17px] text-white/50 leading-relaxed mb-10">
            有什么想聊的，或者看到什么有趣的东西想分享，都可以发邮件给我。
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-block px-8 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,113,227,0.4)]"
          >
            发送邮件
          </a>

          <div className="mt-10 flex items-center justify-center gap-5">
            {[
              { label: "GitHub", href: "#" },
              { label: "Twitter", href: "#" },
              { label: "Instagram", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] font-medium text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
