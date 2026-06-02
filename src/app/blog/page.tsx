const posts = [
  {
    slug: "spring-walk",
    title: "春日漫步：被樱花淹没的下午",
    date: "2026-03-28",
    tag: "生活",
    tagColor: "text-rose-600 bg-rose-50",
    accentColor: "bg-rose-400",
    readTime: "4 分钟",
    excerpt:
      "那天下午阳光很好，我一个人走过公园，粉色的花瓣铺了一地，像是世界暂停了片刻。路边的老人在下棋，小孩子在追鸽子。我突然意识到，幸福大概就是这样，不需要理由，只是刚好在那里。",
    content: `那天下午，我没有任何计划。

打开手机，看了眼天气，"晴，微风"。于是就出门了。

走到公园的时候，满树的樱花已经开到了顶盛。粉的、白的，风一吹就落，铺了一地。我站在树下，仰着头，花瓣落在眼睫毛上，有点痒，但不想动。

旁边一对老夫妻坐在长椅上，手里各拿着一个橙子。老先生给老太太剥，老太太嫌他剥得太慢，伸手接过来自己剥。两个人都在笑。

我想起来一句话，大概是说：人需要的其实很少，但总是把"少"过成了"多"的模样。

那天下午，我没有拍很多照片。有些时刻，放进手机反而会变小。`,
  },
  {
    slug: "coffee-ritual",
    title: "关于咖啡，和清晨的仪式感",
    date: "2026-02-14",
    tag: "随笔",
    tagColor: "text-amber-600 bg-amber-50",
    accentColor: "bg-amber-400",
    readTime: "3 分钟",
    excerpt:
      "每天早上磨豆子的声音是我和这个世界打招呼的方式。手冲的过程让我学会了等待。不是什么有深度的领悟，就是单纯地，喜欢那几分钟。",
    content: `我有一个不算复杂的早晨仪式：磨豆子、烧水、手冲、等待。

磨豆子的声音是很粗粝的那种，轰轰的，但我喜欢。声音停了，香气就出来了。我总觉得这是某种很诚实的交换——你用力，它就给你。

手冲的时候需要注意水温、注水速度、绕圈的方式。一开始我很紧张，总觉得差一点点就会毁掉一杯好豆子。后来慢慢发现，咖啡比想象中宽容，你只要用心，它很少让你失望。

有朋友问我，每天早上花这么多时间泡咖啡不觉得麻烦吗？

我想了想，说：正是因为麻烦，才有意思。

那几分钟是我和这个早晨的协议。世界在等我准备好。`,
  },
  {
    slug: "reading-notes-2025",
    title: "2025 年阅读小结",
    date: "2025-12-31",
    tag: "阅读",
    tagColor: "text-blue-600 bg-blue-50",
    accentColor: "bg-blue-400",
    readTime: "6 分钟",
    excerpt:
      "这一年读了 23 本书，有的让我哭，有的让我不停地划线，还有几本压根读不下去。列了个清单，写了点感受，送走这一年。",
    content: `2025 年的最后一天，我翻出读书笔记 app，数了数，23 本。

比去年少了几本，但感觉更认真了。

印象最深的几本：

《云边有个小卖部》——我知道很多人觉得煽情，但我在地铁上读完最后一章，哭得很没形象。

《置身事内》——读完觉得自己对这个世界的理解多了几个维度。

《挪威的森林》——是第三次读了。每次读都会在不同的地方停下来。

读不下去的：有三本我翻了前两章就放下了，名字就不写了，可能是时机不对。

2026 年的打算：少立 flag，多翻书。`,
  },
  {
    slug: "declutter",
    title: "断舍离的第三个月",
    date: "2025-11-05",
    tag: "生活",
    tagColor: "text-rose-600 bg-rose-50",
    accentColor: "bg-rose-400",
    readTime: "5 分钟",
    excerpt:
      "从卧室开始，扔掉了装满两个大袋子的东西。意外的是，房间小了，人反而轻了。",
    content: `三个月前，我开始认真地清理房间。

起点很随机：有天找一件衣服，翻遍了衣柜，没找到，但翻出来十几件"以后可能会穿"的东西，全部皱巴巴地压在底层。

那之后，我开始按照"现在用得到吗"来判断每一件东西。

两个月后，房间空出来了 1/3。物品和人是有关系的。你放什么在身边，就在和什么打交道。`,
  },
  {
    slug: "market",
    title: "菜市场里的人间",
    date: "2025-09-12",
    tag: "随笔",
    tagColor: "text-amber-600 bg-amber-50",
    accentColor: "bg-amber-400",
    readTime: "3 分钟",
    excerpt:
      "周末早上去买菜，在卖豆腐的摊子前站了很久。不是因为豆腐好看，是因为老板娘和买豆腐的大爷吵架的方式，太好笑了。",
    content: `我喜欢逛菜市场。不是因为那里比超市便宜，是因为那里更"活"。

卖豆腐的阿姨对大爷说：两毛钱，你差这两毛钱吗？

大爷说：我不差，我就是要说说。

阿姨说：那你说，我听着。

然后大爷真的絮絮叨叨说了五分钟，阿姨一边切豆腐一边"嗯嗯嗯"，最后多给了大爷一块豆腐，说：送你的，别说我。

城市里其实藏着很多这样的时刻，只是我们走得太快，来不及看见。`,
  },
];

const tags = ["全部", "生活", "随笔", "阅读"];

export default function BlogPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#f5f5f7] pt-24 pb-20 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-4">
                博客
              </p>
              <h1
                className="font-bold text-[#1d1d1f] leading-[1.05] tracking-[-0.003em]"
                style={{ fontSize: "clamp(40px, 7vw, 72px)" }}
              >
                把零散的想法，
                <br />
                写成可以翻看的样子。
              </h1>
            </div>
            <div className="text-right md:pb-2 flex-shrink-0">
              <div className="text-[32px] font-bold text-[#1d1d1f] tabular-nums">{posts.length}</div>
              <div className="text-[14px] text-[#6e6e73]">篇文章</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tag filters ── */}
      <div className="bg-white border-b border-[#d2d2d7] sticky top-[44px] z-40 px-6 py-4">
        <div className="max-w-[980px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 ${
                tag === "全部"
                  ? "bg-[#1d1d1f] text-white"
                  : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Article list ── */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-[980px] mx-auto">
          {posts.map((post, i) => (
            <article key={post.slug} id={post.slug}>
              <div className="flex gap-6 py-10 group cursor-pointer hover:bg-[#fafafa] -mx-4 px-4 rounded-[12px] transition-colors duration-200">
                {/* Accent bar */}
                <div className={`hidden sm:block flex-shrink-0 w-[3px] rounded-full ${post.accentColor} self-stretch`} />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${post.tagColor}`}>
                      {post.tag}
                    </span>
                  </div>

                  <h2
                    className="font-bold text-[#1d1d1f] leading-snug tracking-tight mb-3 group-hover:text-[#0071e3] transition-colors duration-200"
                    style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                  >
                    {post.title}
                  </h2>

                  <p className="text-[15px] text-[#6e6e73] leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Content preview */}
                  <div className="hidden md:block text-[14px] text-[#6e6e73]/70 leading-[1.7] line-clamp-3 mb-5 pl-4 border-l-2 border-[#d2d2d7] whitespace-pre-line">
                    {post.content}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[13px] text-[#6e6e73]">
                      <span className="font-medium">{post.date}</span>
                      <span className="text-[#d2d2d7]">·</span>
                      <span>{post.readTime}阅读</span>
                    </div>
                    <span className="text-[14px] font-medium text-[#0071e3] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      继续阅读 →
                    </span>
                  </div>
                </div>
              </div>

              {i < posts.length - 1 && (
                <div className="h-[1px] bg-[#d2d2d7]" />
              )}
            </article>
          ))}
        </div>
      </section>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
