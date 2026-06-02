const photos = [
  {
    id: 1,
    title: "樱花季的公园",
    date: "2026-03",
    location: "东京·上野公园",
    color: "from-pink-200 via-rose-200 to-pink-300",
    emoji: "🌸",
    span: "row-span-2",
  },
  {
    id: 2,
    title: "清晨的咖啡馆",
    date: "2026-02",
    location: "上海·静安寺",
    color: "from-amber-100 via-orange-200 to-amber-300",
    emoji: "☕",
    span: "",
  },
  {
    id: 3,
    title: "海边的黄昏",
    date: "2025-10",
    location: "厦门·曾厝垵",
    color: "from-orange-300 via-amber-300 to-yellow-200",
    emoji: "🌅",
    span: "",
  },
  {
    id: 4,
    title: "菜市场一角",
    date: "2025-09",
    location: "成都·玉林菜市",
    color: "from-green-100 via-emerald-200 to-teal-200",
    emoji: "🥬",
    span: "row-span-2",
  },
  {
    id: 5,
    title: "雨天的窗",
    date: "2025-08",
    location: "北京·家",
    color: "from-sky-200 via-blue-200 to-indigo-200",
    emoji: "🌧️",
    span: "",
  },
  {
    id: 6,
    title: "秋天的银杏",
    date: "2025-11",
    location: "苏州·虎丘",
    color: "from-yellow-100 via-amber-200 to-orange-200",
    emoji: "🍂",
    span: "",
  },
  {
    id: 7,
    title: "五月的市集",
    date: "2026-05",
    location: "上海·世博公园",
    color: "from-purple-100 via-violet-200 to-pink-200",
    emoji: "🎪",
    span: "",
  },
  {
    id: 8,
    title: "书桌上的光",
    date: "2026-01",
    location: "家",
    color: "from-stone-100 via-amber-100 to-yellow-100",
    emoji: "📚",
    span: "",
  },
  {
    id: 9,
    title: "冬日暖锅",
    date: "2025-12",
    location: "重庆",
    color: "from-red-200 via-rose-200 to-orange-200",
    emoji: "🍲",
    span: "",
  },
];

const stats = [
  { value: "138", label: "张照片" },
  { value: "27", label: "个地方" },
  { value: "3", label: "年记录" },
  { value: "9", label: "座城市" },
];

export default function GalleryPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#000] pt-24 pb-0 px-6 overflow-hidden">
        <div className="max-w-[980px] mx-auto pb-16">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#0071e3] mb-5">
            相册
          </p>
          <h1
            className="font-bold text-white leading-[1.02] tracking-[-0.003em] mb-6"
            style={{ fontSize: "clamp(52px, 10vw, 96px)" }}
          >
            光影记录
          </h1>
          <p className="text-[21px] text-white/50 max-w-[500px] leading-relaxed">
            用镜头留住那些来不及用文字描述的瞬间。
          </p>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[980px] mx-auto py-8 flex gap-10 md:gap-16 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex-shrink-0">
                <div className="text-[36px] font-bold text-white tabular-nums tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="text-[13px] text-white/40 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="bg-[#f5f5f7] py-16 px-6">
        <div className="max-w-[980px] mx-auto">
          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid group relative overflow-hidden rounded-[18px] cursor-pointer shadow-sm hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] transition-all duration-400"
              >
                <div
                  className={`w-full ${
                    photo.span === "row-span-2" ? "aspect-[3/4]" : "aspect-square"
                  } bg-gradient-to-br ${photo.color} flex items-center justify-center`}
                >
                  <span className="text-[56px] opacity-75 group-hover:scale-110 transition-transform duration-500 select-none">
                    {photo.emoji}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[18px]">
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-[15px] leading-snug">
                      {photo.title}
                    </p>
                    <p className="text-white/60 text-[12px] mt-1">
                      {photo.location} · {photo.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[14px] text-[#6e6e73] mt-16 pb-4">
            还有更多照片在路上 · 慢慢更新
          </p>
        </div>
      </section>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
