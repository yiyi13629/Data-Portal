/* 数据资产页（F6）—— 卡片 / 列表 两版布局 */
const { useState: useStateA, useMemo: useMemoA } = React;

function SearchHero({ onSearch }) {
  const [q, setQ] = useStateA('');
  const [openHist, setOpenHist] = useStateA(false);
  const [hist, setHist] = useStateA(DATA.HISTORY);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenHist(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  const go = v => { setOpenHist(false); onSearch && onSearch(v); };
  const pick = h => { setQ(h); setOpenHist(false); onSearch && onSearch(h); };
  return React.createElement('div', { style:{ textAlign:'center', margin:'28px 0 66px' } },
    React.createElement('img', { src:'app/title.svg', alt:'数据资产门户', style:{ height:36, width:'auto', display:'block', margin:'0 auto 16px' } }),
    React.createElement('p', { style:{ margin:'0 0 34px', fontSize:14.5, color:'var(--g3)' } }, '一站式检索 · 数据表 · 指标 · 看板'),
    React.createElement('div', { ref:wrapRef, style:{ position:'relative', maxWidth:680, margin:'0 auto' } },
      React.createElement('div', { style:{ position:'relative', display:'flex', alignItems:'center', height:54, borderRadius:27,
        padding:'2px', background: openHist
          ? 'linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,rgba(40,109,255,.55),rgba(119,44,249,.55)) border-box'
          : 'linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,rgba(40,109,255,.28),rgba(119,44,249,.28)) border-box',
        border:'2px solid transparent',
        boxShadow: openHist ? '0 8px 22px -12px rgba(80,70,229,.28)' : '0 6px 20px -10px rgba(80,70,229,.22)',
        transition:'.18s' } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'center', width:46, flexShrink:0 } },
          React.createElement(Icon, { name:'search', size:20, style:{ color:'#5046e5' } })),
        React.createElement('input', { value:q, onChange:e=>setQ(e.target.value), onFocus:()=>setOpenHist(true), onClick:()=>setOpenHist(true),
          onKeyDown:e=>{if(e.key==='Enter')go(q);},
          placeholder:'搜索表 / 指标名称、描述、负责人…', style:{ flex:1, minWidth:0, height:'100%', border:'none',
            background:'transparent', padding:0, fontSize:15.5, outline:'none', color:'var(--g1)' } }),
        React.createElement('button', { onClick:()=>go(q), style:{ flexShrink:0, height:38, marginRight:7, padding:'0 16px', borderRadius:19,
          display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight:500, color:'#5046e5', cursor:'pointer', border:'none',
          background:'var(--brand-50)', transition:'.16s' },
          onMouseEnter:e=>e.currentTarget.style.background='var(--brand-100)', onMouseLeave:e=>e.currentTarget.style.background='var(--brand-50)' },
          '搜索'),
        // 历史搜索浮窗
        openHist && hist.length>0 && React.createElement('div', { className:'fade-up', style:{
          position:'absolute', top:'calc(100% + 8px)', left:0, right:0, zIndex:30, background:'#fff', borderRadius:12,
          border:'1px solid var(--line)', boxShadow:'var(--sh-3)', padding:'10px 8px', textAlign:'left' } },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 10px 8px' } },
            React.createElement('span', { style:{ fontSize:12.5, color:'var(--g4)' } }, '历史搜索'),
            React.createElement('button', { title:'清空历史搜索', onMouseDown:e=>{e.preventDefault(); setHist([]);}, style:{ fontSize:12.5, color:'var(--g4)', display:'flex', alignItems:'center', gap:4, transition:'.12s' },
              onMouseEnter:e=>e.currentTarget.style.color='var(--red)', onMouseLeave:e=>e.currentTarget.style.color='var(--g4)' },
              React.createElement(Icon, { name:'trash', size:14 }))),
          hist.map(h=>React.createElement('button',{ key:h, onMouseDown:e=>{e.preventDefault(); pick(h);}, style:{
            display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 10px', borderRadius:8, color:'var(--g2)', fontSize:14, textAlign:'left', transition:'.12s' },
            onMouseEnter:e=>e.currentTarget.style.background='var(--bg)', onMouseLeave:e=>e.currentTarget.style.background='transparent' },
            React.createElement(Icon, { name:'clock', size:15, style:{ color:'var(--g5)', flexShrink:0 } }),
            React.createElement('span', null, h))))),
      ));
}

function CatalogTree({ onMetric, matchHeight }) {
  const [collapsed, setCollapsed] = useStateA(false);
  if (collapsed) {
    return React.createElement('aside', { className:'card', style:{ width:46, flexShrink:0, padding:7, border:'none', alignSelf:'flex-start', display:'flex', alignItems:'center', justifyContent:'center' } },
      React.createElement('button', { onClick:()=>setCollapsed(false), title:'展开目录', style:{ width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--g3)', background:'var(--bg)' } },
        React.createElement(Icon, { name:'panelOpen', size:18 })));
  }
  return React.createElement('aside', { className:'card', style:{ width:230, flexShrink:0, padding:14, border:'none', height: matchHeight||undefined, display:'flex', flexDirection:'column' } },
    React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 4px 12px' } },
      React.createElement('span', { style:{ fontWeight:600, fontSize:15 } }, '数据资产目录'),
      React.createElement('button', { onClick:()=>setCollapsed(true), title:'收起目录', style:{ display:'flex', color:'var(--g4)', padding:2 } },
        React.createElement(Icon, { name:'panelClose', size:18 }))),
    React.createElement('div', { style:{ fontSize:12, color:'var(--g5)', padding:'4px 6px' } }, '全部表 · 420'),
    React.createElement('ul', { className:'hover-scroll', style:{ listStyle:'none', margin:0, marginRight:-9, padding:0, paddingRight:3, flex:1, minHeight:0, overflowY:'auto', display:'flex', flexDirection:'column', gap:2 } },
      DATA.CATALOG.map((name,i)=>React.createElement('li',{key:i},
        React.createElement('button',{ style:{ display:'flex', alignItems:'center', gap:8, width:'100%', padding:'8px 8px', borderRadius:8, color:'var(--g2)', fontSize:13.5, textAlign:'left', transition:'.12s' },
          onMouseEnter:e=>e.currentTarget.style.background='var(--bg)', onMouseLeave:e=>e.currentTarget.style.background='transparent' },
          React.createElement(Icon,{name:'file',size:15,style:{color:'var(--g5)',flexShrink:0}}),
          React.createElement('span',{className:'clamp1'},name))))));
}

function FilterBar({ scope, setScope, theme, setTheme, view, setView, counts }) {
  const scopes = [['all','全部','asset'],['perm',`我有权限的 (${counts.perm})`,'user'],['fav',`我收藏的 (${counts.fav})`,'star']];
  return React.createElement('div', { style:{ marginBottom:20 } },
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:18, borderBottom:'1px solid var(--line)', paddingBottom:12, marginBottom:18 } },
      scopes.map(([id,label,ic])=>React.createElement('button',{ key:id, onClick:()=>setScope(id), style:{
        display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight: scope===id?600:500, color: scope===id?'var(--brand)':'var(--g3)',
        paddingBottom:10, marginBottom:-13, borderBottom: scope===id?'2px solid var(--brand)':'2px solid transparent' } },
        React.createElement(Icon,{name:ic,size:16,fill: ic==='star'&&scope===id?'current':'none'}), label))),
    React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' } },
        [['','不限'],...DATA.THEMES.map(t=>[t,t])].map(([id,label])=>
          React.createElement('button',{ key:label, onClick:()=>setTheme(id), style:{
            height:34, display:'inline-flex', alignItems:'center', padding:'0 13px', borderRadius:8, fontSize:13, fontWeight: theme===id?600:500,
            color: theme===id?'var(--brand)':'var(--g3)', background: theme===id?'var(--brand-50)':'var(--bg)',
            border:'1px solid '+(theme===id?'var(--brand-100)':'var(--line)') } }, label))),
      React.createElement('div', { style:{ display:'flex', background:'var(--bg)', borderRadius:9, padding:3, border:'1px solid var(--line)' } },
        [['card','grid'],['list','list']].map(([id,ic])=>React.createElement('button',{ key:id, onClick:()=>setView(id), title:id==='card'?'卡片视图':'列表视图', style:{
          width:34, height:26, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center',
          color: view===id?'var(--brand)':'var(--g4)', background: view===id?'#fff':'transparent', boxShadow: view===id?'var(--sh-1)':'none' } },
          React.createElement(Icon,{name:ic,size:16}))))));
}

/* ---- 卡片 ---- */
function AssetCard({ a, onOpen, onFav }) {
  const CARD_BG = { brand:'card-blue', purple:'card-purple', cyan:'card-cyan', green:'card-cyan', amber:'card-orange', red:'card-orange' };
  const bg = CARD_BG[a.tone] || 'card-blue';
  return React.createElement('div', { className:'card fade-up', style:{ position:'relative', overflow:'hidden', padding:16, display:'flex', flexDirection:'column', gap:11, cursor:'pointer', transition:'.18s',
    background:`linear-gradient(to top, #fff 0%, rgba(255,255,255,0) 100%), linear-gradient(rgba(255,255,255,.7),rgba(255,255,255,.7)), #fff url("app/${bg}.png") top right / cover no-repeat` },
    onMouseEnter:e=>{e.currentTarget.style.boxShadow='var(--sh-2)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor='color-mix(in srgb, var(--brand) 50%, transparent)';},
    onMouseLeave:e=>{e.currentTarget.style.boxShadow='var(--sh-1)';e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='var(--line)';},
    onClick:()=>onOpen(a) },
    React.createElement('div', { style:{ display:'flex', alignItems:'flex-start', gap:12 } },
      React.createElement(IconTile, { icon:'asset', tone:a.tone, size:46 }),
      React.createElement('div', { style:{ flex:1, minWidth:0 } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
          React.createElement('h3', { className:'clamp1', style:{ margin:0, fontSize:17.5, fontWeight:600, color:'var(--ink)', flex:1, minWidth:0 } }, a.name),
          React.createElement(Tag,{tone:'cyan', style:{ flexShrink:0, color:'var(--g3)', background:'var(--bg-2)' }},a.theme)),
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginTop:2 } },
          React.createElement('span', { style:{ display:'flex', alignItems:'center', gap:5, fontSize:12.5, color:'var(--g4)', minWidth:0 } },
            React.createElement('span',{className:'clamp1'},'@'+a.owner),
            React.createElement('span',{style:{color:'var(--g4)'}},'·'),
            React.createElement('span',{className:'tnum',style:{flexShrink:0}},a.date))))),
    React.createElement('p', { className:'clamp2', style:{ margin:'4px 0', fontSize:13, color:'var(--g3)', lineHeight:1.6, height:42 } }, a.desc),
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:16, paddingTop:12, borderTop:'1px solid var(--line-soft)' } },
      React.createElement(StatInline,{icon:'columns',value:a.fields}),
      React.createElement(StatInline,{icon:'eye',value:fmt(a.views)}),
      React.createElement('button', { onClick:e=>{e.stopPropagation();onFav(a.id);}, title: a.fav?'取消收藏':'收藏', className:'tnum', style:{ display:'inline-flex', alignItems:'center', gap:4, background:'none', border:'none', padding:0, cursor:'pointer', fontSize:12.5, color: a.fav?'var(--amber)':'var(--g4)' } },
        React.createElement(Icon,{name:'star',size:14,stroke:1.8,fill: a.fav?'current':'none'}),
        React.createElement('span',null,a.stars)),
      React.createElement('button', { onClick:e=>{e.stopPropagation();onOpen(a);}, style:{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:3, background:'none', border:'none', padding:0, color:'var(--brand)', fontSize:13, fontWeight:500, cursor:'pointer' } },
        '分析',React.createElement(Icon,{name:'right',size:14}))));
}

/* ---- 列表行 ---- */
function AssetRow({ a, onOpen, onFav }) {
  return React.createElement('div', { className:'fade-up', style:{ display:'flex', alignItems:'center', gap:16, padding:'14px 18px', borderBottom:'1px solid var(--line-soft)', cursor:'pointer', transition:'.12s' },
    onMouseEnter:e=>e.currentTarget.style.background='var(--brand-tint)', onMouseLeave:e=>e.currentTarget.style.background='transparent', onClick:()=>onOpen(a) },
    React.createElement(IconTile, { icon:'asset', tone:a.tone, size:28, radius:8 }),
    React.createElement('div', { style:{ width:120, flexShrink:0 } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:7 } },
        React.createElement('span', { className:'clamp1', style:{ fontSize:14.5, fontWeight:600, color:'var(--ink)' } }, a.name))),
    React.createElement('p', { className:'clamp1', style:{ flex:1, margin:0, fontSize:13, color:'var(--g4)' } }, a.desc),
    React.createElement('div', { style:{ width:96, flexShrink:0 } }, React.createElement(Tag,{tone:'cyan', style:{ color:'var(--g3)', background:'var(--bg-2)' }},a.theme)),
    React.createElement('div', { style:{ width:90, flexShrink:0, display:'flex', alignItems:'center', gap:6, fontSize:13, color:'var(--g3)' } },
      '@'+a.owner),
    React.createElement('div', { style:{ width:150, flexShrink:0, display:'flex', gap:14 } },
      React.createElement(StatInline,{icon:'columns',value:a.fields}),
      React.createElement(StatInline,{icon:'eye',value:fmt(a.views)}),
      React.createElement('button', { onClick:e=>{e.stopPropagation();onFav(a.id);}, title: a.fav?'取消收藏':'收藏', className:'tnum', style:{ display:'inline-flex', alignItems:'center', gap:4, background:'none', border:'none', padding:0, cursor:'pointer', fontSize:12.5, color: a.fav?'var(--amber)':'var(--g4)' } },
        React.createElement(Icon,{name:'star',size:14,stroke:1.8,fill: a.fav?'current':'none'}),
        React.createElement('span',null,a.stars))),
    React.createElement('div', { style:{ display:'flex', gap:8, flexShrink:0 } },
      React.createElement('button', { onClick:e=>{e.stopPropagation();onOpen(a);}, style:{ display:'inline-flex', alignItems:'center', gap:3, background:'none', border:'none', padding:0, color:'var(--brand)', fontSize:13, fontWeight:500, cursor:'pointer' } },
        '分析',React.createElement(Icon,{name:'right',size:14}))));
}

function Pagination() {
  const [p, setP] = useStateA(1);
  const pages = [1,2,3,4,5,6,7,8,9];
  return React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:20, flexWrap:'wrap', gap:12 } },
    React.createElement('span',{style:{fontSize:13,color:'var(--g4)'}},'当前共 ',React.createElement('b',{className:'tnum',style:{color:'var(--g2)'}},'420'),' 条数据'),
    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:6}},
      React.createElement('button',{className:'pg',style:pgBtn(false)},React.createElement(Icon,{name:'left',size:14})),
      pages.map(n=>React.createElement('button',{key:n,onClick:()=>setP(n),style:pgBtn(p===n)},n)),
      React.createElement('button',{style:pgBtn(false)},React.createElement(Icon,{name:'right',size:14}))));
}
const pgBtn = on => ({ minWidth:32, height:32, padding:'0 8px', borderRadius:8, fontSize:13, display:'flex', alignItems:'center', justifyContent:'center',
  border:'1px solid '+(on?'var(--brand)':'var(--line)'), background: on?'var(--brand)':'#fff', color: on?'#fff':'var(--g2)' });

function AssetsPage({ onOpen, toast }) {
  const [scope, setScope] = useStateA('all');
  const [theme, setTheme] = useStateA('');
  const [view, setView] = useStateA('card');
  const [favs, setFavs] = useStateA(() => Object.fromEntries(DATA.ASSETS.map(a=>[a.id,a.fav])));
  const onFav = id => { setFavs(f=>({...f,[id]:!f[id]})); };
  const list = useMemoA(()=>DATA.ASSETS.filter(a=>{
    if (theme && a.theme!==theme) return false;
    if (scope==='perm' && !a.mine) return false;
    if (scope==='fav' && !favs[a.id]) return false;
    return true;
  }).map(a=>({...a, fav:favs[a.id]})), [theme, scope, favs]);
  const counts = { perm:DATA.ASSETS.filter(a=>a.mine).length, fav:Object.values(favs).filter(Boolean).length };
  const sectionRef = React.useRef(null);
  const [asideH, setAsideH] = useStateA(null);
  React.useLayoutEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setAsideH(el.offsetHeight));
    ro.observe(el); setAsideH(el.offsetHeight);
    return () => ro.disconnect();
  }, [view, list.length]);
  return React.createElement('div', { className:'wrap', style:{ padding:'24px 32px 8px' } },
    React.createElement(SearchHero, { onSearch:q=>toast(q?`搜索：${q}`:'请输入关键字') }),
    React.createElement('div', { style:{ display:'flex', gap:20, alignItems:'flex-start' } },
      React.createElement(CatalogTree, { onMetric:()=>toast('指标模块敬请期待'), matchHeight:asideH }),
      React.createElement('section', { ref:sectionRef, className:'card', style:{ flex:1, minWidth:0, padding:'18px 20px', border:'none' } },
        React.createElement(FilterBar, { scope, setScope, theme, setTheme, view, setView, counts }),
        view==='card'
          ? React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:16 } },
              list.map(a=>React.createElement(AssetCard,{key:a.id,a,onOpen,onFav})))
          : React.createElement('div', { style:{ border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' } },
              list.map(a=>React.createElement(AssetRow,{key:a.id,a,onOpen,onFav}))),
        list.length===0 && React.createElement('div',{style:{textAlign:'center',padding:'60px 0',color:'var(--g5)'}},'暂无匹配的数据资产'),
        React.createElement(Pagination))));
}

Object.assign(window, { AssetsPage });
