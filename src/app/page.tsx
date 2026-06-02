import Link from "next/link";

const recentPosts = [
  {
    slug: "spring-walk",
    title: "春日漫步：被樱花淹没的下午",
    date: "2026-03-28",
    excerpt: "那天下午阳光很好，我一个人走过公园，粉色的花瓣铺了一地，像是世界暂停了片刻。",
    tag: "生活",
    readTime: "4 分钟",
  },
  {
    slug: "coffee-ritual",
    title: "关于咖啡，和清晨的仪式感",
    date: "2026-02-14",
    excerpt: "每天早上磨豆子的声音是我和这个世界打招呼的方式。手冲的过程让我学会了等待。",
    tag: "随笔",
    readTime: "3 分钟",
  },
  {
    slug: "reading-notes-2025",
    title: "2025 年阅读小结",
    date: "2025-12-31",
    excerpt: "这一年读了 23 本书，有的让我哭，有的让我不停地划线，还有几本压根读不下去。",
    tag: "阅读",
    readTime: "6 分钟",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — dark full-screen */}
      <section className="bg-[#1d1d1f] text-white min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-[800px]">
          <p className="text-[#0071e3] text-[15px] font-medium tracking-widest uppercase mb-6">个人网站</p>
          <h1 className="text-[64px] md:text-[80px] font-bold leading-[1.05] tracking-tight mb-8">
            记录每一刻美好
          </h1>
          <p className="text-[19px] text-white/70 leading-relaxed max-w-[560px] mx-auto mb-10">
            用文字和照片留住那些容易被遗忘的小事。生活大部分时候是灰色的，但偶尔会有光。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium rounded-full transition-colors"
            >
              读我的文章
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-white/30 hover:border-white/60 text-white text-[17px] font-medium rounded-full transition-colors"
            >
              了解我
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts — white bg */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#6e6e73] text-[14px] font-medium tracking-widest uppercase mb-2">近期文章</p>
              <h2 className="text-[48px] font-bold text-[#1d1d1f] leading-tight tracking-tight">最新写了什么</h2>
            </div>
            <Link href="/blog" className="text-[17px] text-[#0071e3] hover:underline font-medium hidden md:block">
              全部文章 →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog#${post.slug}`}
                className="group block bg-[#f5f5f7] rounded-[20px] p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="w-full aspect-[16/9] rounded-[12px] bg-gradient-to-br from-slate-200 to-slate-300 mb-6" />
                <span className="text-[12px] font-medium text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full">
                  {post.tag}
                </span>
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mt-4 mb-3 group-hover:text-[#0071e3] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[15px] text-[#6e6e73] leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-[13px] text-[#6e6e73]">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}阅读</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="text-[17px] text-[#0071e3] hover:underline font-medium">
              全部文章 →
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview — split layout */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[980px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#6e6e73] text-[14px] font-medium tracking-widest uppercase mb-4">关于我</p>
            <h2 className="text-[48px] font-bold text-[#1d1d1f] leading-tight tracking-tight mb-6">
              一个普通人的<br />不普通记录
            </h2>
            <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-8">
              喜欢发呆、喝咖啡、逛菜市场。用文字和照片记录那些容易被遗忘的小事。
              生活大部分时候是灰色的，但偶尔会有光。
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[17px] text-[#0071e3] font-medium hover:underline"
            >
              了解更多 →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: "☕", label: "手冲咖啡", desc: "每天早晨的仪式" },
              { emoji: "📚", label: "闲书乱读", desc: "一年读 20+ 本" },
              { emoji: "📷", label: "随手拍照", desc: "记录身边的美" },
              { emoji: "🚶", label: "漫无目的走路", desc: "城市里探险" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-[16px] p-6 hover:shadow-md transition-all duration-200">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="text-[15px] font-semibold text-[#1d1d1f] mb-1">{item.label}</div>
                <div className="text-[13px] text-[#6e6e73]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview — dark bg */}
      <section className="bg-[#1d1d1f] py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#0071e3] text-[14px] font-medium tracking-widest uppercase mb-2">相册</p>
              <h2 className="text-[48px] font-bold text-white leading-tight tracking-tight">镜头里的瞬间</h2>
            </div>
            <Link href="/gallery" className="text-[17px] text-[#0071e3] hover:underline font-medium hidden md:block">
              查看相册 →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { color: "from-pink-400 to-rose-500", emoji: "🌸", title: "樱花季的公园" },
              { color: "from-amber-400 to-orange-500", emoji: "☕", title: "清晨的咖啡馆" },
              { color: "from-orange-400 to-amber-500", emoji: "🌅", title: "海边的黄昏" },
              { color: "from-sky-400 to-blue-500", emoji: "🌧️", title: "雨天的窗" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-[16px] overflow-hidden cursor-pointer"
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <p className="p-4 text-white text-[14px] font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery" className="text-[17px] text-[#0071e3] hover:underline font-medium">
              查看相册 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
