/* 卡片信息布局方案探索 — 5 种方案 */
const { Icon, IconTile, Tag, StatInline, fmt, toneFg } = window;
const { useState } = React;

const SAMPLE = { name:'用户行为分析表', en:'dw_user_behavior', theme:'商业系统', tone:'brand', fav:true,
  desc:'记录用户在平台上的所有行为数据，包含点击、浏览、搜索等', owner:'张三', date:'2026-06-03',
  fields:24, views:3256, stars:128 };

const cardBase = {
  background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:16,
  display:'flex', flexDirection:'column', fontFamily:'var(--font)', boxShadow:'var(--sh-1)' };

const metaText = { fontSize:12.5, color:'var(--g4)', display:'inline-flex', alignItems:'center', gap:5 };
const descText = { margin:0, fontSize:13, color:'var(--g3)', lineHeight:1.6 };
const analyzeBtn = { height:32, padding:'0 14px', display:'inline-flex', alignItems:'center', gap:6, borderRadius:8,
  color:'var(--brand)', border:'1px solid var(--brand-100)', background:'var(--brand-50)', fontSize:13, fontWeight:500, cursor:'pointer' };

/* ── 方案 A：当前方案（基线）──────────────── */
function CardA({ a }) {
  return (
    <div style={{ ...cardBase, gap:11 }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <IconTile icon="asset" tone={a.tone} size={46} />
        <div style={{ flex:1, minWidth:0 }}>
          <h3 className="clamp1" style={{ margin:0, fontSize:17.5, fontWeight:600, color:'var(--ink)' }}>{a.name}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6 }}>
            <Tag tone="cyan">{a.theme}</Tag>
            <span style={metaText}><Icon name="user" size={13} style={{ color:'var(--g5)' }}/>{a.owner} · <span className="tnum">{a.date}</span></span>
          </div>
        </div>
        <Icon name="star" size={19} fill="current" style={{ color:'var(--amber)' }}/>
      </div>
      <p className="clamp2" style={descText}>{a.desc}</p>
      <div style={{ display:'flex', alignItems:'center', gap:16, paddingTop:12, borderTop:'1px solid var(--line-soft)' }}>
        <StatInline icon="columns" value={a.fields}/>
        <StatInline icon="eye" value={fmt(a.views)}/>
        <StatInline icon="star" value={a.stars}/>
        <button style={{ ...analyzeBtn, marginLeft:'auto' }}><Icon name="analysis" size={15}/>分析</button>
      </div>
    </div>
  );
}

/* ── 方案 B：标签前置 · 元信息分行 ──────────── */
function CardB({ a }) {
  return (
    <div style={{ ...cardBase, gap:12 }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <IconTile icon="asset" tone={a.tone} size={44} />
        <div style={{ flex:1, minWidth:0 }}>
          <h3 className="clamp1" style={{ margin:0, fontSize:16.5, fontWeight:600, color:'var(--ink)' }}>{a.name}</h3>
          <div style={{ marginTop:6 }}><Tag tone="cyan">{a.theme}</Tag></div>
        </div>
        <Icon name="star" size={19} fill="current" style={{ color:'var(--amber)' }}/>
      </div>
      <p className="clamp2" style={descText}>{a.desc}</p>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid var(--line-soft)' }}>
        <span style={metaText}><Icon name="user" size={13} style={{ color:'var(--g5)' }}/>{a.owner} · <span className="tnum">{a.date}</span></span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <StatInline icon="columns" value={a.fields}/>
        <StatInline icon="eye" value={fmt(a.views)}/>
        <StatInline icon="star" value={a.stars}/>
        <button style={{ ...analyzeBtn, marginLeft:'auto' }}><Icon name="analysis" size={15}/>分析</button>
      </div>
    </div>
  );
}

/* ── 方案 C：左色条 + 极简留白 ──────────────── */
function CardC({ a }) {
  const c = toneFg(a.tone);
  return (
    <div style={{ ...cardBase, gap:12, padding:0, overflow:'hidden' }}>
      <div style={{ display:'flex' }}>
        <div style={{ width:4, background:c, flexShrink:0 }}/>
        <div style={{ flex:1, padding:'16px 16px 0', display:'flex', flexDirection:'column', gap:10, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
            <div style={{ minWidth:0 }}>
              <h3 className="clamp1" style={{ margin:0, fontSize:17, fontWeight:600, color:'var(--ink)' }}>{a.name}</h3>
              <div style={{ ...metaText, marginTop:5 }}><Tag tone="cyan">{a.theme}</Tag></div>
            </div>
            <Icon name="star" size={19} fill="current" style={{ color:'var(--amber)', flexShrink:0 }}/>
          </div>
          <p className="clamp2" style={descText}>{a.desc}</p>
          <span style={{ ...metaText, fontSize:12 }}><Icon name="user" size={13} style={{ color:'var(--g5)' }}/>{a.owner} · <span className="tnum">{a.date}</span></span>
          <div style={{ display:'flex', alignItems:'center', gap:16, padding:'12px 0', borderTop:'1px solid var(--line-soft)' }}>
            <StatInline icon="columns" value={a.fields}/>
            <StatInline icon="eye" value={fmt(a.views)}/>
            <StatInline icon="star" value={a.stars}/>
            <button style={{ ...analyzeBtn, marginLeft:'auto' }}><Icon name="analysis" size={15}/>分析</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 方案 D：横向分栏（大图标 + 右侧内容）────── */
function CardD({ a }) {
  const c = toneFg(a.tone);
  return (
    <div style={{ ...cardBase, padding:0, flexDirection:'row', overflow:'hidden' }}>
      <div style={{ width:84, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
        background:`linear-gradient(135deg, color-mix(in srgb, ${c} 14%, #fff), color-mix(in srgb, ${c} 8%, #fff))` }}>
        <IconTile icon="asset" tone={a.tone} size={48} />
      </div>
      <div style={{ flex:1, minWidth:0, padding:16, display:'flex', flexDirection:'column', gap:9 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <h3 className="clamp1" style={{ margin:0, fontSize:16.5, fontWeight:600, color:'var(--ink)', flex:1 }}>{a.name}</h3>
          <Tag tone="cyan">{a.theme}</Tag>
        </div>
        <p className="clamp2" style={descText}>{a.desc}</p>
        <span style={{ ...metaText, fontSize:12 }}><Icon name="user" size={13} style={{ color:'var(--g5)' }}/>{a.owner} · <span className="tnum">{a.date}</span></span>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <StatInline icon="eye" value={fmt(a.views)}/>
          <StatInline icon="star" value={a.stars}/>
          <button style={{ ...analyzeBtn, marginLeft:'auto' }}><Icon name="analysis" size={15}/>分析</button>
        </div>
      </div>
    </div>
  );
}

/* ── 方案 E：紧凑列表卡（高密度）──────────────── */
function CardE({ a }) {
  return (
    <div style={{ ...cardBase, gap:10, padding:14 }}>
      <div style={{ display:'flex', alignItems:'center', gap:11 }}>
        <IconTile icon="asset" tone={a.tone} size={40} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <h3 className="clamp1" style={{ margin:0, fontSize:15.5, fontWeight:600, color:'var(--ink)' }}>{a.name}</h3>
            <Tag tone="cyan">{a.theme}</Tag>
          </div>
          <p className="clamp1" style={{ ...descText, marginTop:3, fontSize:12.5 }}>{a.desc}</p>
          <span style={{ ...metaText, fontSize:11.5, marginTop:3 }}><Icon name="user" size={12} style={{ color:'var(--g5)' }}/>{a.owner} · <span className="tnum">{a.date}</span></span>
        </div>
        <Icon name="star" size={18} fill="current" style={{ color:'var(--amber)', flexShrink:0 }}/>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:14, paddingLeft:51 }}>
        <StatInline icon="columns" value={a.fields}/>
        <StatInline icon="eye" value={fmt(a.views)}/>
        <StatInline icon="star" value={a.stars}/>
        <button style={{ ...analyzeBtn, marginLeft:'auto', height:28, padding:'0 12px' }}><Icon name="analysis" size={14}/>分析</button>
      </div>
    </div>
  );
}

/* ============================================================
   分析操作 · 展现 / 交互形式探索（同一张卡，只换「分析」入口）
   ============================================================ */
const linkBtn    = { display:'inline-flex', alignItems:'center', gap:3, background:'none', border:'none', padding:0, color:'var(--brand)', fontSize:13, fontWeight:500, cursor:'pointer' };
const iconBtn    = { width:32, height:32, display:'inline-flex', alignItems:'center', justifyContent:'center', borderRadius:8, color:'var(--brand)', border:'1px solid var(--brand-100)', background:'var(--brand-50)', cursor:'pointer' };
const primaryBtn = { height:34, padding:'0 16px', display:'inline-flex', alignItems:'center', gap:6, borderRadius:8, color:'#fff', border:'none', background:'var(--brand)', fontSize:13, fontWeight:500, cursor:'pointer', boxShadow:'0 2px 8px rgba(26,121,255,.28)' };
const ghostBtn   = { height:34, padding:'0 14px', display:'inline-flex', alignItems:'center', borderRadius:8, color:'var(--g2)', border:'1px solid var(--line)', background:'#fff', fontSize:13, fontWeight:500, cursor:'pointer' };
const footRow    = { display:'flex', alignItems:'center', gap:16, paddingTop:12, borderTop:'1px solid var(--line-soft)' };

function AHead({ a }) {
  return (
    <React.Fragment>
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <IconTile icon="asset" tone={a.tone} size={44} />
        <div style={{ flex:1, minWidth:0 }}>
          <h3 className="clamp1" style={{ margin:0, fontSize:16.5, fontWeight:600, color:'var(--ink)' }}>{a.name}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6, flexWrap:'wrap' }}>
            <Tag tone="cyan">{a.theme}</Tag>
            <span style={metaText}><Icon name="user" size={13} style={{ color:'var(--g5)' }}/>{a.owner} · <span className="tnum">{a.date}</span></span>
          </div>
        </div>
        <Icon name="star" size={19} fill="current" style={{ color:'var(--amber)' }}/>
      </div>
      <p className="clamp2" style={descText}>{a.desc}</p>
    </React.Fragment>
  );
}
const aStats = (a) => (
  <React.Fragment>
    <StatInline icon="columns" value={a.fields}/>
    <StatInline icon="eye" value={fmt(a.views)}/>
    <StatInline icon="star" value={a.stars}/>
  </React.Fragment>
);

/* F · 实心主按钮（当前） */
function FormF({ a }) {
  return (
    <div style={{ ...cardBase, gap:11 }}>
      <AHead a={a}/>
      <div style={footRow}>{aStats(a)}<button style={{ ...analyzeBtn, marginLeft:'auto' }}><Icon name="analysis" size={15}/>分析</button></div>
    </div>
  );
}

/* G · 文字链接（最低存在感，省横向空间） */
function FormG({ a }) {
  return (
    <div style={{ ...cardBase, gap:11 }}>
      <AHead a={a}/>
      <div style={footRow}>{aStats(a)}<button style={{ ...linkBtn, marginLeft:'auto' }}>分析<Icon name="right" size={14}/></button></div>
    </div>
  );
}

/* H · 图标按钮（图标网格 / 高密度时省空间） */
function FormH({ a }) {
  return (
    <div style={{ ...cardBase, gap:11 }}>
      <AHead a={a}/>
      <div style={footRow}>{aStats(a)}<button title="分析" style={{ ...iconBtn, marginLeft:'auto' }}><Icon name="analysis" size={16}/></button></div>
    </div>
  );
}

/* I · 悬停浮层主操作（鼠标移入卡片时浮现） */
function FormI({ a }) {
  const [hv, setHv] = useState(true);
  return (
    <div onMouseEnter={()=>setHv(true)} onMouseLeave={()=>setHv(false)}
      style={{ ...cardBase, gap:11, position:'relative', overflow:'hidden', cursor:'pointer' }}>
      <AHead a={a}/>
      <div style={footRow}>{aStats(a)}</div>
      {hv &&
        <div style={{ position:'absolute', inset:0, borderRadius:14, background:'rgba(255,255,255,.80)', backdropFilter:'blur(1.5px)',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <button style={primaryBtn}><Icon name="analysis" size={15}/>分析</button>
          <button style={ghostBtn}>查看详情</button>
        </div>}
    </div>
  );
}

/* J · 悬停底部操作条（移入时由底部滑出） */
function FormJ({ a }) {
  const [hv, setHv] = useState(true);
  const bar = { flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, fontSize:13, fontWeight:500, background:'none', border:'none', cursor:'pointer' };
  return (
    <div onMouseEnter={()=>setHv(true)} onMouseLeave={()=>setHv(false)}
      style={{ ...cardBase, gap:11, position:'relative', overflow:'hidden', paddingBottom: hv?54:16, transition:'padding .18s var(--ease,ease)' }}>
      <AHead a={a}/>
      <div style={footRow}>{aStats(a)}</div>
      <div style={{ position:'absolute', left:0, right:0, bottom:0, height:46, display:'flex', alignItems:'stretch',
        borderTop:'1px solid var(--line)', background:'#fafbfc', transform: hv?'translateY(0)':'translateY(100%)', transition:'transform .18s var(--ease,ease)' }}>
        <button style={{ ...bar, color:'var(--brand)' }}><Icon name="analysis" size={15}/>分析</button>
        <div style={{ width:1, background:'var(--line)', margin:'10px 0' }}/>
        <button style={{ ...bar, color:'var(--g3)' }}><Icon name="eye" size={15}/>详情</button>
        <div style={{ width:1, background:'var(--line)', margin:'10px 0' }}/>
        <button style={{ ...bar, color:'var(--g3)' }}><Icon name="star" size={15}/>收藏</button>
      </div>
    </div>
  );
}

/* K · 整卡可点 + 右侧箭头（卡片本身即分析入口） */
function FormK({ a }) {
  const [hv, setHv] = useState(false);
  return (
    <div onMouseEnter={()=>setHv(true)} onMouseLeave={()=>setHv(false)}
      style={{ ...cardBase, gap:11, cursor:'pointer', borderColor: hv?'var(--brand-100)':'var(--line)',
        boxShadow: hv?'0 6px 20px rgba(0,13,31,.10)':'var(--sh-1)', transition:'box-shadow .15s, border-color .15s' }}>
      <AHead a={a}/>
      <div style={footRow}>
        {aStats(a)}
        <span style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:3, color:'var(--brand)', fontSize:12.5, fontWeight:500 }}>分析<Icon name="right" size={15}/></span>
      </div>
    </div>
  );
}

/* L · 主操作 + 更多菜单（分析常显，次要操作收进 …） */
function FormL({ a }) {
  return (
    <div style={{ ...cardBase, gap:11 }}>
      <AHead a={a}/>
      <div style={footRow}>
        {aStats(a)}
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
          <button style={analyzeBtn}><Icon name="analysis" size={15}/>分析</button>
          <button title="更多" style={{ ...iconBtn, width:32, color:'var(--g3)', border:'1px solid var(--line)', background:'#fff' }}><Icon name="more" size={18}/></button>
        </div>
      </div>
    </div>
  );
}

const SCHEMES = [
  ['A', '当前方案 · 标题 + 元信息行 + 描述 + 统计', CardA, 320, 220],
  ['B', '标签前置 · 元信息分行', CardB, 320, 232],
  ['C', '左色条 + 极简留白', CardC, 320, 250],
  ['D', '横向分栏 · 大图标', CardD, 360, 210],
  ['E', '紧凑列表卡 · 高密度', CardE, 360, 182],
];

const ACTION_FORMS = [
  ['F', '实心主按钮 · 当前形式', FormF, 320, 218],
  ['G', '文字链接 · 低存在感、省空间', FormG, 320, 218],
  ['H', '图标按钮 · 高密度网格省空间', FormH, 320, 218],
  ['I', '悬停浮层 · 移入卡片浮现主操作', FormI, 320, 218],
  ['J', '悬停操作条 · 底部滑出 分析/详情/收藏', FormJ, 320, 240],
  ['K', '整卡可点 · 卡片即入口 + 箭头提示', FormK, 320, 218],
  ['L', '主操作 + 更多菜单 · 次要操作收进 …', FormL, 320, 218],
];

function App() {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  return (
    <DesignCanvas>
      <DCSection id="cards" title="卡片信息布局方案" subtitle="同一份数据 · 5 种排布，挑一个或组合">
        {SCHEMES.map(([id, label, Comp, w, h]) =>
          <DCArtboard key={id} id={id} label={`${id} · ${label}`} width={w} height={h}>
            <div style={{ padding:20, height:'100%', boxSizing:'border-box', display:'flex', alignItems:'center', background:'var(--bg)' }}>
              <div style={{ width:'100%' }}><Comp a={SAMPLE}/></div>
            </div>
          </DCArtboard>
        )}
      </DCSection>
      <DCSection id="actions" title="「分析」操作的展现 / 交互形式" subtitle="同一张卡 · 7 种入口形式（I/J 悬停查看，此处默认展开预览）">
        {ACTION_FORMS.map(([id, label, Comp, w, h]) =>
          <DCArtboard key={id} id={id} label={`${id} · ${label}`} width={w} height={h}>
            <div style={{ padding:20, height:'100%', boxSizing:'border-box', display:'flex', alignItems:'center', background:'var(--bg)' }}>
              <div style={{ width:'100%' }}><Comp a={SAMPLE}/></div>
            </div>
          </DCArtboard>
        )}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
