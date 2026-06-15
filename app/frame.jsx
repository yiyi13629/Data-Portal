/* 框架：顶部导航（含退出）/ Footer / 回到顶部 / AI 问数助手 */
const { useState: useStateF, useEffect: useEffectF, useRef: useRefF } = React;

/* ============ 顶部导航 ============ */
function TopNav({ active, onNav, onGlobalSearch }) {
  const tabs = [
    { id:'assets', label:'数据资产', icon:'asset' },
    { id:'boards', label:'数据看板', icon:'board' },
    { id:'analysis', label:'数据分析', icon:'analysis' },
  ];
  const [menu, setMenu] = useStateF(false);
  const ref = useRefF(null);
  useEffectF(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setMenu(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return React.createElement('header', { style:{
    position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,.55)', backdropFilter:'saturate(180%) blur(14px)',
    borderBottom:'1px solid rgba(255,255,255,.35)' } },
    React.createElement('div', { className:'wrap', style:{ height:60, position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24 } },
      // 左：logo
      React.createElement('div', { style:{ display:'flex', alignItems:'center', cursor:'pointer', flexShrink:0 }, onClick:()=>onNav('assets') },
        React.createElement('img', { src:'app/logo.png', alt:'秒通数据门户', style:{ height:34, width:'auto', display:'block' } })),
      // 中：导航（绝对居中）
      React.createElement('nav', { style:{ position:'absolute', left:'50%', top:0, bottom:0, transform:'translateX(-50%)', display:'flex', alignItems:'stretch', gap:4 } },
          tabs.map(t => {
            const on = active === t.id || (active==='detail' && t.id==='assets');
            return React.createElement('button', { key:t.id, onClick:()=>onNav(t.id), style:{
              position:'relative', display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'0 18px', fontSize:15, whiteSpace:'nowrap',
              letterSpacing:'.5px', fontWeight: on?600:500, color: on?'var(--ink)':'var(--g3)', transition:'color .18s' },
              onMouseEnter:e=>{ if(!on) e.currentTarget.style.color='var(--g1)'; },
              onMouseLeave:e=>{ if(!on) e.currentTarget.style.color='var(--g3)'; } },
              t.label,
              React.createElement('span', { style:{ position:'absolute', left:'50%', bottom:12, transform:'translateX(-50%)',
                width: on?22:0, height:3, borderRadius:3, background:'linear-gradient(90deg,var(--brand),#5b94ff)', transition:'width .22s cubic-bezier(.2,0,0,1)' } }));
          })),
      // 右：用户
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:14, flexShrink:0 } },
        // 用户菜单
        React.createElement('div', { ref, style:{ position:'relative' } },
          React.createElement('button', { onClick:()=>setMenu(v=>!v), style:{ display:'flex', alignItems:'center', gap:8, height:42, padding:'0 6px 0 4px', borderRadius:999 } },
            React.createElement(Avatar, { name:'朱丹丹', size:30, shape:'circle', src:'app/avatar.png' }),
            React.createElement('div', { style:{ textAlign:'left', lineHeight:1.15 } },
              React.createElement('div', { style:{ fontSize:13.5, fontWeight:600, color:'var(--g1)' } }, '朱丹丹'),
              React.createElement('div', { className:'tnum', style:{ fontSize:11, color:'var(--g4)' } }, '2026000255')),
            React.createElement(Icon, { name:'down', size:14, style:{ color:'var(--g4)', transform: menu?'rotate(180deg)':'none', transition:'.2s' } })),
          menu && React.createElement('div', { className:'fade-up', style:{
            position:'absolute', right:0, top:'calc(100% + 8px)', width:220, background:'#fff', borderRadius:12,
            border:'1px solid var(--line)', boxShadow:'var(--sh-3)', overflow:'hidden', padding:6 } },
            React.createElement('div', { style:{ padding:'10px 12px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--line-soft)', marginBottom:4 } },
              React.createElement(Avatar, { name:'朱丹丹', size:38, shape:'circle', src:'app/avatar.png' }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:14, fontWeight:600 } }, '朱丹丹'),
                React.createElement('div', { className:'tnum', style:{ fontSize:12, color:'var(--g4)' } }, '工号 2026000255'))),
            React.createElement('button', { onClick:()=>{setMenu(false); alert('已退出系统');}, style:Object.assign({}, menuItem, { color:'var(--red)' }) },
              React.createElement(Icon,{name:'logout',size:16}), '退出系统'))))));
}
const menuItem = { display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 12px', borderRadius:8, fontSize:13.5, color:'var(--g2)', textAlign:'left', transition:'.12s' };

/* ============ Footer ============ */
function Footer() {
  return React.createElement('footer', { style:{ marginTop:48, borderTop:'1px solid var(--line)', background:'#fff' } },
    React.createElement('div', { className:'wrap', style:{ height:64, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 } },
      React.createElement('div', { style:{ fontSize:13, color:'var(--g4)' } }, '© 2026 数据门户 · Data Intelligence Platform'),
      React.createElement('div', { style:{ display:'flex', gap:20, fontSize:13, color:'var(--g4)' } },
        ['帮助文档','使用反馈','版本 v1.0'].map(t=>React.createElement('span',{key:t,style:{cursor:'pointer'}},t)))));
}

/* ============ 回到顶部 ============ */
function BackToTop({ scroller }) {
  const [show, setShow] = useStateF(false);
  useEffectF(() => {
    const el = scroller || window;
    const get = () => scroller ? scroller.scrollTop : window.scrollY;
    const h = () => setShow(get() > 600);
    el.addEventListener('scroll', h); h(); return () => el.removeEventListener('scroll', h);
  }, [scroller]);
  if (!show) return null;
  return React.createElement('button', { onClick:()=>{ (scroller||window).scrollTo({ top:0, behavior:'smooth' }); },
    title:'回到顶部', className:'fade-up', style:{
    position:'fixed', right:28, bottom:96, width:44, height:44, borderRadius:12, background:'#fff',
    border:'1px solid var(--line)', boxShadow:'var(--sh-2)', color:'var(--g2)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:40 } },
    React.createElement(Icon, { name:'up', size:20 }));
}

/* ============ AI 问数助手 ============ */
const AI_REPLIES = {
  default:'我可以帮你查询业务数据。试着问我：「上月各公园客流情况」「会员消费 Top5」「本季度收入趋势」。',
};
function AIAssistant() {
  const [open, setOpen] = useStateF(false);
  const [msgs, setMsgs] = useStateF([{ role:'ai', text:'你好，我是数据门户 AI 问数助手 👋 用自然语言提问，我会帮你查询数据。' }]);
  const [val, setVal] = useStateF('');
  const [loading, setLoading] = useStateF(false);
  const bodyRef = useRefF(null);
  useEffectF(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, loading, open]);
  const send = () => {
    const q = val.trim(); if (!q || loading) return;
    setMsgs(m => [...m, { role:'user', text:q }]); setVal(''); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMsgs(m => [...m, { role:'ai', text:`已为你查询「${q}」：\n\n📊 共匹配 3 个相关看板、12 张数据表。\n📈 近 7 日整体上涨 +15.8%，其中「公园客流」环比 +9.2%。\n\n如需查看明细，可点击进入对应看板。` }]);
    }, 1400);
  };
  const sugg = ['上月各公园客流','会员消费 Top5','本季度收入趋势'];
  return React.createElement(React.Fragment, null,
    !open && React.createElement('button', { onClick:()=>setOpen(true), title:'AI 问数', style:{
      position:'fixed', right:28, bottom:32, width:88, height:88, borderRadius:'50%', zIndex:41,
      background:'transparent', border:'none', padding:0, cursor:'pointer',
      display:'flex', alignItems:'center', justifyContent:'center' } },
      React.createElement('img', { src:'app/ai-ball.png', alt:'AI 问数', style:{ width:'100%', height:'100%', objectFit:'contain', display:'block' } })),
    open && React.createElement('div', { className:'fade-up', style:{
      position:'fixed', right:28, bottom:32, width:380, height:560, zIndex:42, background:'#fff', borderRadius:18,
      border:'1px solid var(--line)', boxShadow:'var(--sh-3)', display:'flex', flexDirection:'column', overflow:'hidden' } },
      // header
      React.createElement('div', { style:{ padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'linear-gradient(135deg,#7c5cff,#9d7bff)', color:'#fff' } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:9 } },
          React.createElement('div', { style:{ width:32, height:32, borderRadius:9, background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(Icon, { name:'sparkles', size:18, fill:'current' })),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontWeight:600, fontSize:15 } }, 'AI 问数助手'),
            React.createElement('div', { style:{ fontSize:11.5, opacity:.85 } }, '自然语言查询 · Beta'))),
        React.createElement('button', { onClick:()=>setOpen(false), style:{ color:'#fff', opacity:.9, display:'flex' } },
          React.createElement(Icon, { name:'close', size:20 }))),
      // body
      React.createElement('div', { ref:bodyRef, style:{ flex:1, overflowY:'auto', padding:16, background:'var(--bg)', display:'flex', flexDirection:'column', gap:12 } },
        msgs.map((m,i)=> React.createElement('div', { key:i, style:{ display:'flex', justifyContent: m.role==='user'?'flex-end':'flex-start' } },
          React.createElement('div', { style:{ maxWidth:'82%', padding:'10px 13px', borderRadius:13, fontSize:13.5, lineHeight:1.6, whiteSpace:'pre-wrap',
            background: m.role==='user'?'var(--brand)':'#fff', color: m.role==='user'?'#fff':'var(--g1)',
            border: m.role==='user'?'none':'1px solid var(--line)',
            borderBottomRightRadius: m.role==='user'?4:13, borderBottomLeftRadius: m.role==='ai'?4:13 } }, m.text))),
        loading && React.createElement('div', { style:{ display:'flex' } },
          React.createElement('div', { style:{ padding:'12px 15px', borderRadius:13, background:'#fff', border:'1px solid var(--line)', display:'flex', gap:5 } },
            [0,1,2].map(i=>React.createElement('span',{key:i,style:{ width:7, height:7, borderRadius:99, background:'var(--g5)', animation:`blink 1.2s ${i*0.2}s infinite` }})))),
        msgs.length<=1 && !loading && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:8, marginTop:4 } },
          sugg.map(s=>React.createElement('button',{key:s,onClick:()=>{setVal(s);}, style:{ padding:'6px 11px', borderRadius:999, background:'#fff', border:'1px solid var(--brand-100)', color:'var(--brand)', fontSize:12.5 }}, s)))),
      // input
      React.createElement('div', { style:{ padding:12, borderTop:'1px solid var(--line)', display:'flex', gap:8 } },
        React.createElement('input', { value:val, onChange:e=>setVal(e.target.value), onKeyDown:e=>{ if(e.key==='Enter') send(); },
          placeholder:'输入你的数据问题…', style:{ flex:1, height:40, border:'1px solid var(--line)', borderRadius:10, padding:'0 12px', fontSize:13.5, outline:'none' } }),
        React.createElement('button', { onClick:send, style:{ width:40, height:40, borderRadius:10, background:'var(--brand)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' } },
          React.createElement(Icon, { name:'send', size:17 })))));
}

Object.assign(window, { TopNav, Footer, BackToTop, AIAssistant });
