const timeline = [
  { year: "2024", event: "开始认真记录生活，建了这个网站" },
  { year: "2023", event: "学会了手冲咖啡，买了第一台相机" },
  { year: "2022", event: "开始写读书笔记，读了很多很多书" },
  { year: "2021", event: "第一次独自旅行，去了云南" },
  { year: "2019", event: "开始写博客，写了几篇就放弃了" },
];

const likes = [
  { emoji: "☕", label: "手冲咖啡" },
  { emoji: "📚", label: "闲书乱读" },
  { emoji: "📷", label: "随手拍照" },
  { emoji: "🚶", label: "漫无目的地走路" },
  { emoji: "🌧️", label: "下雨天待在家" },
  { emoji: "🥘", label: "去菜市场买菜" },
  { emoji: "🎵", label: "循环一首歌" },
  { emoji: "🌿", label: "养盆植物" },
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
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-5xl mb-8 shadow-lg">
          ☁️
        </div>
        <h1 className="text-4xl font-bold text-stone-800 mb-4">关于我</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          嗨，我是晴间有云。一个普通人，在普通的生活里寻找有意思的细节。
        </p>
      </div>

      {/* Bio */}
      <section className="mb-16">
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
          <p className="text-stone-700 leading-8 mb-4">
            我不太确定怎么介绍自己。职业上来说，是个坐在电脑前工作的人，像大多数人一样。
          </p>
          <p className="text-stone-700 leading-8 mb-4">
            生活里，我喜欢早起，喜欢阳光打进来的那种早晨。喜欢慢慢地泡一杯咖啡，在笔记本上写几行字，然后开始这一天。
          </p>
          <p className="text-stone-700 leading-8 mb-4">
            我觉得生活里大部分让人高兴的事，都是很小的事。菜市场里遇见好看的食材，翻到一本很对胃口的书，和朋友聊到很晚，这些比什么里程碑都更真实。
          </p>
          <p className="text-stone-700 leading-8">
            这个网站是我给自己的一个地方，用来放那些不想忘记的瞬间。如果你路过，欢迎留下来坐坐。
          </p>
        </div>
      </section>

      {/* Likes */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">我喜欢的事</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {likes.map((item) => (
            <div
              key={item.label}
              className="bg-white border border-stone-100 rounded-xl p-4 text-center hover:border-amber-200 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="text-sm text-stone-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">时间线</h2>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 items-start">
              <span className="text-sm font-bold text-amber-600 tabular-nums w-10 shrink-0 mt-0.5">
                {item.year}
              </span>
              <div className="flex items-start gap-3 flex-1">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                <p className="text-stone-600 text-sm leading-relaxed">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">常见问题</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-stone-100">
              <p className="font-semibold text-stone-800 mb-2">Q: {item.q}</p>
              <p className="text-stone-500 text-sm leading-relaxed">A: {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 text-center">
          <div className="text-3xl mb-3">✉️</div>
          <h2 className="text-xl font-bold text-stone-800 mb-2">联系我</h2>
          <p className="text-stone-500 text-sm mb-4 leading-relaxed">
            有什么想聊的，或者看到什么有趣的东西想分享，都可以发邮件给我。
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-block px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-full transition-colors shadow-sm"
          >
            hello@example.com
          </a>
        </div>
      </section>
    </div>
  );
}
