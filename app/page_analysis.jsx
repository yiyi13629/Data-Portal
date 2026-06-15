/* 数据分析 · 工具广场（F8）—— 分区大卡片 / 紧凑分类 两版布局 */
const { useState: useStateT } = React;

function ToolCard({ t, tone, onGo, compact }) {
  const dis = !t.go;
  return React.createElement('div', { className:'card', style:{ padding: compact?'14px 14px':'18px 18px', position:'relative', cursor: dis?'default':'pointer',
    opacity: dis?.72:1, transition:'.16s', display:'flex', flexDirection: compact?'row':'column', alignItems: compact?'center':'flex-start', gap: compact?12:14 },
    onMouseEnter:e=>{ if(!dis){e.currentTarget.style.boxShadow='var(--sh-2)';e.currentTarget.style.borderColor=toneFg(tone);e.currentTarget.style.transform='translateY(-2px)';}},
    onMouseLeave:e=>{e.currentTarget.style.boxShadow='var(--sh-1)';e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.transform='none';},
    onClick:()=>{ if(!dis) onGo(t); } },
    t.tag && React.createElement('span',{style:{position:'absolute',top:12,right:12}},React.createElement(Tag,{tone: t.tag==='热门'?'red':t.tag==='新'?'green':'brand'},t.tag)),
    React.createElement(IconTile, { icon:t.icon, tone, size: compact?40:48, radius:12 }),
    React.createElement('div', { style:{ flex:1, minWidth:0 } },
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:7}},
        React.createElement('h4',{style:{margin:0,fontSize: compact?14:15.5,fontWeight:600,color: dis?'var(--g3)':'var(--ink)'}},t.name)),
      React.createElement('p',{className:'clamp1',style:{margin:'5px 0 0',fontSize:12.5,color:'var(--g4)',lineHeight:1.5}},t.desc),
      dis && !compact && React.createElement('div',{style:{display:'flex',alignItems:'center',gap:5,marginTop:10,fontSize:12,color:'var(--amber)'}},
        React.createElement(Icon,{name:'clock',size:13}),'敬请期待')));
}

function AnalysisHero() {
  return React.createElement('div', { style:{ borderRadius:16, padding:'32px 36px', marginBottom:26, position:'relative', overflow:'hidden',
    background:'linear-gradient(120deg,#1f4fd6,#2468f2 55%,#3f86ff)', color:'#fff' } },
    React.createElement('div',{style:{position:'absolute',right:-30,top:-40,width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,.08)'}}),
    React.createElement('div',{style:{position:'absolute',right:120,bottom:-60,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,.06)'}}),
    React.createElement('div',{style:{position:'relative'}},
      React.createElement('div',{style:{fontSize:23,fontWeight:700,letterSpacing:'.5px'}},'让数据流动起来，人人都是数据分析师'),
      React.createElement('div',{style:{fontSize:14,opacity:.9,marginTop:8}},'从数据接入到分析展示，一站式数据处理全流程工具 · 共 23 个工具'),
      React.createElement('div',{style:{display:'flex',gap:24,marginTop:20}},
        [['6','工具分类'],['23','可用工具'],['3','已开放跳转']].map(([v,k])=>React.createElement('div',{key:k},
          React.createElement('span',{className:'tnum',style:{fontSize:24,fontWeight:700}},v),
          React.createElement('span',{style:{fontSize:13,opacity:.85,marginLeft:6}},k))))));
}

function AnalysisPage({ toast }) {
  const [layout,setLayout]=useStateT('section');
  const [activeCat,setActiveCat]=useStateT(DATA.TOOL_GROUPS[0].cat);
  const onGo=t=>toast('跳转：'+t.name);

  const toggle = React.createElement('div', { style:{ display:'flex', justifyContent:'flex-end', marginBottom:16 } },
    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
      React.createElement('span',{style:{fontSize:12.5,color:'var(--g4)'}},'布局'),
      React.createElement('div',{style:{display:'flex',background:'#fff',borderRadius:8,padding:3,border:'1px solid var(--line)'}},
        [['section','分区大卡片'],['compact','紧凑分类']].map(([id,label])=>React.createElement('button',{key:id,onClick:()=>setLayout(id),style:{
          padding:'6px 13px',borderRadius:6,fontSize:12.5,fontWeight: layout===id?600:500,
          color: layout===id?'var(--brand)':'var(--g4)', background: layout===id?'var(--brand-50)':'transparent'}},label)))));

  // 布局 A：分区大卡片
  const sectionLayout = React.createElement('div', null,
    React.createElement(AnalysisHero),
    DATA.TOOL_GROUPS.map(g=>React.createElement('section',{key:g.cat,style:{marginBottom:30}},
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:14}},
        React.createElement('span',{style:{width:4,height:18,borderRadius:2,background:toneFg(g.tone)}}),
        React.createElement('span',{style:{fontSize:16,fontWeight:600,color:'var(--ink)'}},g.cat),
        React.createElement('span',{style:{fontSize:12.5,color:'var(--g4)',padding:'2px 8px',borderRadius:999,background:toneBg(g.tone)}},g.tools.length+' 个工具')),
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16}},
        g.tools.map(t=>React.createElement(ToolCard,{key:t.name,t,tone:g.tone,onGo}))))));

  // 布局 B：紧凑分类（左分类 + 右紧凑网格）
  const activeGroup = DATA.TOOL_GROUPS.find(g=>g.cat===activeCat);
  const compactLayout = React.createElement('div', { style:{ display:'flex', gap:20, alignItems:'flex-start' } },
    React.createElement('aside',{className:'card',style:{width:200,flexShrink:0,padding:8,position:'sticky',top:80}},
      DATA.TOOL_GROUPS.map(g=>{
        const on=activeCat===g.cat;
        return React.createElement('button',{key:g.cat,onClick:()=>setActiveCat(g.cat),style:{
          display:'flex',alignItems:'center',gap:10,width:'100%',padding:'11px 12px',borderRadius:9,fontSize:13.5,marginBottom:2,
          fontWeight: on?600:500, color: on?'var(--brand)':'var(--g2)', background: on?'var(--brand-50)':'transparent', textAlign:'left'},
          onMouseEnter:e=>{if(!on)e.currentTarget.style.background='var(--bg)';}, onMouseLeave:e=>{if(!on)e.currentTarget.style.background='transparent';}},
          React.createElement('span',{style:{width:8,height:8,borderRadius:99,background:toneFg(g.tone),flexShrink:0}}),
          React.createElement('span',{style:{flex:1}},g.cat),
          React.createElement('span',{className:'tnum',style:{fontSize:11.5,color:'var(--g5)'}},g.tools.length));
      })),
    React.createElement('div',{style:{flex:1,minWidth:0}},
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:14}},
        React.createElement('span',{style:{width:4,height:18,borderRadius:2,background:toneFg(activeGroup.tone)}}),
        React.createElement('span',{style:{fontSize:16,fontWeight:600}},activeGroup.cat)),
      React.createElement('div',{className:'fade-up',key:activeCat,style:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:12}},
        activeGroup.tools.map(t=>React.createElement(ToolCard,{key:t.name,t,tone:activeGroup.tone,onGo,compact:true})))));

  return React.createElement('div', { className:'wrap', style:{ padding:'24px 32px 8px' } },
    toggle,
    React.createElement('div',{className:'fade-up',key:layout}, layout==='section'?sectionLayout:compactLayout));
}

Object.assign(window, { AnalysisPage });
