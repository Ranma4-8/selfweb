const photos = [
  {
    id: 1,
    title: "樱花季的公园",
    date: "2026-03",
    location: "东京·上野公园",
    color: "from-pink-200 to-rose-300",
    emoji: "🌸",
    aspect: "aspect-square",
  },
  {
    id: 2,
    title: "清晨的咖啡馆",
    date: "2026-02",
    location: "上海·静安寺",
    color: "from-amber-200 to-orange-300",
    emoji: "☕",
    aspect: "aspect-[4/5]",
  },
  {
    id: 3,
    title: "海边的黄昏",
    date: "2025-10",
    location: "厦门·曾厝垵",
    color: "from-orange-300 to-amber-400",
    emoji: "🌅",
    aspect: "aspect-[3/2]",
  },
  {
    id: 4,
    title: "菜市场一角",
    date: "2025-09",
    location: "成都·玉林菜市",
    color: "from-green-200 to-emerald-300",
    emoji: "🥬",
    aspect: "aspect-square",
  },
  {
    id: 5,
    title: "雨天的窗",
    date: "2025-08",
    location: "北京·家",
    color: "from-sky-200 to-blue-300",
    emoji: "🌧️",
    aspect: "aspect-[4/5]",
  },
  {
    id: 6,
    title: "秋天的银杏",
    date: "2025-11",
    location: "苏州·虎丘",
    color: "from-yellow-200 to-amber-300",
    emoji: "🍂",
    aspect: "aspect-square",
  },
  {
    id: 7,
    title: "五月的市集",
    date: "2026-05",
    location: "上海·世博公园",
    color: "from-purple-200 to-pink-300",
    emoji: "🎪",
    aspect: "aspect-[3/2]",
  },
  {
    id: 8,
    title: "书桌上的光",
    date: "2026-01",
    location: "家",
    color: "from-stone-200 to-amber-200",
    emoji: "📚",
    aspect: "aspect-square",
  },
  {
    id: 9,
    title: "冬日暖锅",
    date: "2025-12",
    location: "重庆",
    color: "from-red-200 to-orange-300",
    emoji: "🍲",
    aspect: "aspect-[4/5]",
  },
];

export default function GalleryPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">相册</h1>
        <p className="text-stone-500 text-lg">
          用镜头留住那些来不及用文字描述的瞬间。
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mb-12 text-center">
        {[
          { label: "张照片", value: "138" },
          { label: "个地方", value: "27" },
          { label: "年记录", value: "3" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
            <div className="text-sm text-stone-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
          >
            {/* Placeholder image */}
            <div
              className={`w-full ${photo.aspect} bg-gradient-to-br ${photo.color} flex items-center justify-center`}
            >
              <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                {photo.emoji}
              </span>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-300 rounded-2xl flex items-end">
              <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-medium text-sm">{photo.title}</p>
                <p className="text-white/70 text-xs mt-0.5">
                  {photo.location} · {photo.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-stone-400 text-sm mt-16">
        还有更多照片在路上 · 慢慢更新
      </p>
    </div>
  );
}
