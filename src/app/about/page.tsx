const timeline = [
  { year: "2024", event: "开始认真记录生活，建了这个网站" },
  { year: "2023", event: "学会了手冲咖啡，买了第一台相机" },
  { year: "2022", event: "开始写读书笔记，读了很多很多书" },
  { year: "2021", event: "第一次独自旅行，去了云南" },
  { year: "2019", event: "开始写博客，写了几篇就放弃了" },
];

const likes = [
  { emoji: "☕", label: "手冲咖啡", desc: "每天早晨的仪式" },
  { emoji: "📚", label: "闲书乱读", desc: "一年 20+ 本" },
  { emoji: "📷", label: "随手拍照", desc: "记录身边的美" },
  { emoji: "🚶", label: "漫无目的走路", desc: "城市里探险" },
  { emoji: "🌧️", label: "雨天待在家", desc: "最好的放空" },
  { emoji: "🥘", label: "去菜市场买菜", desc: "人间烟火气" },
  { emoji: "🎵", label: "循环一首歌", desc: "当天的背景音" },
  { emoji: "🌿", label: "养盆植物", desc: "生长是治愈的" },
];

const questions = [
  {
    q: "这个网站叫什么？",
    a: "晴间有云。天晴但有云，喜欢这种状态——不是完美的晴天，也不是阴沉的阴天，刚刚好有点缺憾，有点留白。",
  },
  {
    q: "你写什么？",
    a: "生活里的小事。一个下午、一杯咖啡、一本书、一段路。不追热点，不写干货，就是记录。",
  },
  {
    q: "多久更新一次？",
    a: "有感触就写，可能一周好几篇，也可能沉默一个月。没有计划，随缘。",
  },
  {
    q: "可以联系你吗？",
    a: "当然可以。有共鸣的文字、想聊的话题，都欢迎发邮件给我。能认识新朋友是这个网站意外的收获。",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#f5f5f7] pt-20 pb-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center mb-10 shadow-lg">
            <span className="text-4xl">☁️</span>
          </div>
          <p className="text-[#6e6e73] text-[14px] font-medium tracking-widest uppercase mb-4">关于我</p>
          <h1 className="text-[64px] md:text-[72px] font-bold text-[#1d1d1f] leading-[1.05] tracking-tight mb-6">
            晴间有云
          </h1>
          <p className="text-[21px] text-[#6e6e73] leading-relaxed max-w-[600px]">
            一个普通人，在普通的生活里寻找有意思的细节。
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[980px] mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[40px] font-bold text-[#1d1d1f] mb-8 tracking-tight leading-tight">我是谁</h2>
            <div className="space-y-5 text-[17px] text-[#6e6e73] leading-relaxed">
              <p>我不太确定怎么介绍自己。职业上来说，是个坐在电脑前工作的人，像大多数人一样。</p>
              <p>生活里，我喜欢早起，喜欢阳光打进来的那种早晨。喜欢慢慢地泡一杯咖啡，在笔记本上写几行字，然后开始这一天。</p>
              <p>我觉得生活里大部分让人高兴的事，都是很小的事。菜市场里遇见好看的食材，翻到一本很对胃口的书，和朋友聊到很晚，这些比什么里程碑都更真实。</p>
              <p>这个网站是我给自己的一个地方，用来放那些不想忘记的瞬间。如果你路过，欢迎留下来坐坐。</p>
            </div>
          </div>
          <div className="bg-[#f5f5f7] rounded-[24px] p-8">
            <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-6">时间线</h3>
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-[15px] font-bold text-[#0071e3] tabular-nums w-10 shrink-0 mt-0.5">
                    {item.year}
                  </span>
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-2 h-2 rounded-full bg-[#0071e3] mt-2 shrink-0"></div>
                    <p className="text-[15px] text-[#6e6e73] leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Likes */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[#6e6e73] text-[14px] font-medium tracking-widest uppercase mb-4">兴趣爱好</p>
          <h2 className="text-[48px] font-bold text-[#1d1d1f] mb-12 tracking-tight">我喜欢的事</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {likes.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-[20px] p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">{item.emoji}</div>
                <div className="text-[15px] font-semibold text-[#1d1d1f] mb-1">{item.label}</div>
                <div className="text-[13px] text-[#6e6e73]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[#6e6e73] text-[14px] font-medium tracking-widest uppercase mb-4">常见问题</p>
          <h2 className="text-[48px] font-bold text-[#1d1d1f] mb-12 tracking-tight">你可能想知道</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {questions.map((item, i) => (
              <div key={i} className="bg-[#f5f5f7] rounded-[20px] p-8">
                <p className="text-[17px] font-semibold text-[#1d1d1f] mb-3">{item.q}</p>
                <p className="text-[15px] text-[#6e6e73] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#1d1d1f] py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[#0071e3] text-[14px] font-medium tracking-widest uppercase mb-4">联系我</p>
          <h2 className="text-[48px] font-bold text-white mb-6 tracking-tight">打声招呼</h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10">
            有什么想聊的，或者看到什么有趣的东西想分享，都可以发邮件给我。
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-block px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium rounded-full transition-colors"
          >
            hello@example.com
          </a>
        </div>
      </section>
    </>
  );
}
