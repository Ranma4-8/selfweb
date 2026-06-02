import Link from "next/link";

const recentPosts = [
  {
    slug: "spring-walk",
    title: "春日漫步：被樱花淹没的下午",
    date: "2026-03-28",
    excerpt: "那天下午阳光很好，我一个人走过公园，粉色的花瓣铺了一地，像是世界暂停了片刻。",
    tag: "生活",
  },
  {
    slug: "coffee-ritual",
    title: "关于咖啡，和清晨的仪式感",
    date: "2026-02-14",
    excerpt: "每天早上磨豆子的声音是我和这个世界打招呼的方式。手冲的过程让我学会了等待。",
    tag: "随笔",
  },
  {
    slug: "reading-notes-2025",
    title: "2025 年阅读小结",
    date: "2025-12-31",
    excerpt: "这一年读了 23 本书，有的让我哭，有的让我不停地划线，还有几本压根读不下去。",
    tag: "阅读",
  },
];

const updates = [
  { date: "2026-05-20", text: "更新了相册，加了五月的市集照片 📷" },
  { date: "2026-04-10", text: "写了一篇关于断舍离的长文，欢迎来读" },
  { date: "2026-03-01", text: "网站上线啦，开始认真记录生活" },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar placeholder */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-4xl shrink-0 shadow-md">
            ☁️
          </div>
          <div>
            <p className="text-amber-600 text-sm font-medium mb-2 tracking-wider uppercase">Hello, 我是</p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-800 leading-tight mb-4">
              晴间有云
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-xl">
              一个喜欢发呆、喝咖啡、逛菜市场的普通人。
              用文字和照片记录那些容易被遗忘的小事。
              生活大部分时候是灰色的，但偶尔会有光。
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="/blog"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-full transition-colors shadow-sm"
              >
                读我的文章
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 border border-stone-300 hover:border-amber-400 text-stone-600 hover:text-amber-600 text-sm font-medium rounded-full transition-colors"
              >
                了解我
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-800">近期文章</h2>
          <Link href="/blog" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            全部文章 →
          </Link>
        </div>
        <div className="grid gap-4">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog#${post.slug}`}
              className="group block bg-white rounded-2xl p-6 border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                      {post.tag}
                    </span>
                    <span className="text-xs text-stone-400">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors mb-2 text-lg">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <span className="text-stone-300 group-hover:text-amber-400 transition-colors mt-1 text-xl">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Updates */}
      <section>
        <h2 className="text-2xl font-bold text-stone-800 mb-8">近期动态</h2>
        <div className="space-y-4">
          {updates.map((update, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-xs text-stone-400 mt-0.5 shrink-0 tabular-nums">{update.date}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
              <p className="text-stone-600 text-sm leading-relaxed">{update.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
