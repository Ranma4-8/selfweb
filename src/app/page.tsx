import Link from "next/link";

const recentPosts = [
  {
    slug: "spring-walk",
    title: "春日漫步：被樱花淹没的下午",
    date: "2026-03-28",
    excerpt: "那天下午阳光很好，我一个人走过公园，粉色的花瓣铺了一地，像是世界暂停了片刻。",
    tag: "生活",
    readTime: "4 分钟",
    gradient: "from-rose-100 to-pink-200",
  },
  {
    slug: "coffee-ritual",
    title: "关于咖啡，和清晨的仪式感",
    date: "2026-02-14",
    excerpt: "每天早上磨豆子的声音是我和这个世界打招呼的方式。手冲的过程让我学会了等待。",
    tag: "随笔",
    readTime: "3 分钟",
    gradient: "from-amber-100 to-orange-200",
  },
  {
    slug: "reading-notes-2025",
    title: "2025 年阅读小结",
    date: "2025-12-31",
    excerpt: "这一年读了 23 本书，有的让我哭，有的让我不停地划线，还有几本压根读不下去。",
    tag: "阅读",
    readTime: "6 分钟",
    gradient: "from-sky-100 to-blue-200",
  },
];

const galleryPhotos = [
  { color: "from-pink-300 to-rose-400", emoji: "🌸", title: "樱花季的公园", loc: "东京" },
  { color: "from-amber-300 to-orange-400", emoji: "☕", title: "清晨的咖啡馆", loc: "上海" },
  { color: "from-orange-300 to-amber-400", emoji: "🌅", title: "海边的黄昏", loc: "厦门" },
  { color: "from-sky-300 to-blue-400", emoji: "🌧️", title: "雨天的窗", loc: "北京" },
  { color: "from-green-300 to-emerald-400", emoji: "🥬", title: "菜市场一角", loc: "成都" },
  { color: "from-purple-300 to-pink-400", emoji: "🎪", title: "五月的市集", loc: "上海" },
];

export default function Home() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="hero-gradient min-h-screen flex items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Ambient orb */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-[800px] z-10">
          <p className="animate-fade-up text-[12px] font-semibold tracking-[0.15em] uppercase text-[#0071e3] mb-7">
            个人网站
          </p>

          <h1
            className="animate-fade-up-delay-1 font-bold text-white leading-[1.05] tracking-[-0.003em] mb-8"
            style={{ fontSize: "clamp(56px, 10vw, 88px)" }}
          >
            记录生活
            <br />
            每一刻美好
          </h1>

          <p className="animate-fade-up-delay-2 text-[19px] text-white/60 leading-relaxed max-w-[500px] mx-auto mb-12">
            用文字和照片留住那些容易被遗忘的小事。生活大部分时候是灰色的，但偶尔会有光。
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-8 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,113,227,0.4)]"
            >
              开始探索
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-white/25 hover:border-white/50 text-white text-[17px] font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[11px] font-medium tracking-widest uppercase">向下滚动</span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-1/2 bg-white/60"
              style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Featured Posts ── */}
      <section className="bg-white py-[120px] px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-3">
                近期文章
              </p>
              <h2
                className="font-bold text-[#1d1d1f] leading-tight tracking-[-0.003em]"
                style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
              >
                思考与记录
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0071e3] hover:opacity-70 transition-opacity"
            >
              全部文章
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog#${post.slug}`}
                className="group block bg-[#f5f5f7] rounded-[20px] overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-full aspect-[16/9] bg-gradient-to-br ${post.gradient}`}
                />
                <div className="p-7">
                  <span className="inline-block text-[12px] font-semibold text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full mb-4">
                    {post.tag}
                  </span>
                  <h3 className="text-[19px] font-bold text-[#1d1d1f] mb-3 leading-snug tracking-tight group-hover:text-[#0071e3] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-[#6e6e73] leading-relaxed line-clamp-2 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#6e6e73]">{post.date}</span>
                    <span className="text-[13px] font-medium text-[#0071e3] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      阅读 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="text-[15px] font-medium text-[#0071e3]">
              全部文章 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 3: Bento Grid – About ── */}
      <section className="bg-[#f5f5f7] py-[120px] px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-3">
            关于我
          </p>
          <h2
            className="font-bold text-[#1d1d1f] leading-tight tracking-[-0.003em] mb-12"
            style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
          >
            一个普通人的<br className="hidden sm:block" />不普通记录
          </h2>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Big card: 2 cols, 2 rows */}
            <div className="col-span-2 row-span-2 bg-white rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-md transition-shadow duration-300">
              <div>
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #e0f0ff 0%, #c8e3ff 100%)",
                  }}
                >
                  ☁️
                </div>
                <h3 className="text-[22px] font-bold text-[#1d1d1f] mb-3 tracking-tight leading-snug">
                  你好，我是晴间有云
                </h3>
                <p className="text-[15px] text-[#6e6e73] leading-relaxed">
                  喜欢发呆、喝咖啡、逛菜市场。用文字和照片记录那些容易被遗忘的小事。生活大部分时候是灰色的，但偶尔会有光。
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0071e3] mt-6 hover:opacity-70 transition-opacity"
              >
                了解更多
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Small cards */}
            {[
              { emoji: "📍", label: "所在地", value: "奥克兰 · 新西兰", bg: "from-sky-50 to-blue-50" },
              { emoji: "🎵", label: "当下在听", value: "后摇与城市噪音", bg: "from-purple-50 to-pink-50" },
              { emoji: "💻", label: "正在做的事", value: "构建这个网站", bg: "from-green-50 to-emerald-50" },
              { emoji: "📚", label: "最近在读", value: "置身事内", bg: "from-amber-50 to-orange-50" },
            ].map((card) => (
              <div
                key={card.label}
                className={`bg-gradient-to-br ${card.bg} rounded-[20px] p-6 hover:shadow-md transition-all duration-200`}
              >
                <div className="text-2xl mb-3">{card.emoji}</div>
                <div className="text-[12px] font-semibold text-[#6e6e73] uppercase tracking-wide mb-1">
                  {card.label}
                </div>
                <div className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">
                  {card.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Gallery Strip ── */}
      <section className="bg-[#000] py-[120px] overflow-hidden">
        <div className="max-w-[980px] mx-auto px-6 mb-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-3">
                相册
              </p>
              <h2
                className="font-bold text-white leading-tight tracking-[-0.003em]"
                style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
              >
                光影记录
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden md:inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0071e3] hover:opacity-70 transition-opacity"
            >
              查看全部
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scrollable strip */}
        <div className="flex gap-4 overflow-x-auto pl-6 pb-4 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-64 h-80 rounded-[18px] overflow-hidden cursor-pointer"
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                  {photo.emoji}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end rounded-[18px]">
                <div className="p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-[15px]">{photo.title}</p>
                  <p className="text-white/60 text-[12px] mt-0.5">{photo.loc}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Trailing space */}
          <div className="flex-shrink-0 w-6" />
        </div>

        <div className="px-6 mt-8 md:hidden">
          <Link href="/gallery" className="text-[15px] font-medium text-[#0071e3]">
            查看全部 →
          </Link>
        </div>
      </section>

      {/* ── Section 5: Quote / CTA ── */}
      <section className="bg-white py-[120px] px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-[1px] bg-[#d2d2d7]" />
            <svg className="text-[#d2d2d7] flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <div className="flex-1 h-[1px] bg-[#d2d2d7]" />
          </div>

          <blockquote
            className="font-bold italic text-[#1d1d1f] leading-tight tracking-[-0.003em] mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            生活不是用来规划的，
            <br />
            是用来感受的。
          </blockquote>

          <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-10">
            这里是我的一小块地方。记录走过的路，看过的书，喝过的咖啡，遇见的人。
          </p>

          <div className="flex items-center gap-6 mt-10">
            <div className="flex-1 h-[1px] bg-[#d2d2d7]" />
            <p className="text-[13px] font-medium text-[#6e6e73] tracking-wide">晴间有云 · 2026</p>
            <div className="flex-1 h-[1px] bg-[#d2d2d7]" />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
