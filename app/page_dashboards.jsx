/* 数据看板页（F7）—— 主题分组 / 目录树 两版布局 */
const { useState: useStateB, useMemo: useMemoB } = React;

function BoardCard({ b, fav, onFav, onOpen, compact }) {
  return React.createElement('div', { className:'card', style:{ padding: compact?'12px 14px':'14px 16px', display:'flex', alignItems:'center', gap:12, cursor:'pointer', transition:'.16s' },
    onMouseEnter:e=>{e.currentTarget.style.boxShadow='var(--sh-2)';e.currentTarget.style.borderColor='var(--brand-100)';},
    onMouseLeave:e=>{e.currentTarget.style.boxShadow='var(--sh-1)';e.currentTarget.style.borderColor='var(--line)';},
    onClick:()=>onOpen&&onOpen(b), title:b.name },
    React.createElement(IconTile, { icon:'board', tone:b.tone, size:compact?38:42, radius:10 }),
    React.createElement('div', { style:{ flex:1, minWidth:0 } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:7 } },
        React.createElement('span', { className:'clamp1', style:{ fontSize:14.5, fontWeight:600, color:'var(--ink)' } }, b.name)),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12, marginTop:4, fontSize:12, color:'var(--g4)' } },
        React.createElement('span',{style:{display:'flex',alignItems:'center',gap:4,minWidth:0}},React.createElement(Icon,{name:'user',size:14,style:{color:'var(--g4)',flexShrink:0}}),React.createElement('span',{className:'clamp1'},b.owner)),
        React.createElement(StatInline,{icon:'eye',value:fmt(b.views)}),
        React.createElement('button',{ onClick:e=>{e.stopPropagation();onFav&&onFav(b.name);}, title: fav?'取消收藏':'收藏', className:'tnum', style:{ display:'inline-flex', alignItems:'center', gap:4, background:'none', border:'none', padding:0, cursor:'pointer', fontSize:12.5, color: fav?'var(--amber)':'var(--g4)' } },
          React.createElement(Icon,{name:'star',size:14,stroke:1.8,fill: fav?'current':'none'}),
          React.createElement('span',null,b.stars)))));
}

function SortSelect({ value, onChange, options }) {
  const [open, setOpen] = useStateB(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return React.createElement('div', { ref, style:{ position:'relative' } },
    React.createElement('button', { onClick:()=>setOpen(o=>!o), style:{ height:34, display:'inline-flex', alignItems:'center', gap:7, borderRadius:8, padding:'0 11px', fontSize:13, color:'var(--g2)', cursor:'pointer',
      background:'#fff', border:'1px solid '+(open?'var(--brand-100)':'var(--line)'), transition:'.14s' } },
      React.createElement('span', null, value),
      React.createElement(Icon, { name:'down', size:14, style:{ color:'var(--g4)', transition:'transform .18s', transform: open?'rotate(180deg)':'none' } })),
    open && React.createElement('div', { className:'fade-up', style:{ position:'absolute', top:'calc(100% + 6px)', right:0, zIndex:30, minWidth:'100%', whiteSpace:'nowrap',
      background:'#fff', borderRadius:10, border:'1px solid var(--line)', boxShadow:'var(--sh-3)', padding:6 } },
      options.map(s=>React.createElement('button', { key:s, onClick:()=>{ onChange(s); setOpen(false); }, style:{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, width:'100%',
        padding:'8px 10px', borderRadius:7, fontSize:13, textAlign:'left', transition:'.12s',
        fontWeight: s===value?600:500, color: s===value?'var(--brand)':'var(--g2)', background: s===value?'var(--brand-50)':'transparent' },
        onMouseEnter:e=>{ if(s!==value) e.currentTarget.style.background='var(--bg)'; }, onMouseLeave:e=>{ if(s!==value) e.currentTarget.style.background='transparent'; } },
        React.createElement('span', null, s),
        s===value && React.createElement(Icon, { name:'check', size:14 })))));
}

function BoardToolbar({ scope, setScope, cat, setCat, sort, setSort, view, setView, layout, setLayout }) {
  const scopes = [['all','全部'],['mine','我的 (21)'],['fav','我收藏的 (18)']];
  const sorts = ['热门优先','最新发布','最多浏览','最多收藏'];
  return React.createElement('div', { className:'card', style:{ padding:'16px 20px', marginBottom:18 } },
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:18, marginBottom:14 } },
      scopes.map(([id,label])=>React.createElement('button',{ key:id, onClick:()=>setScope(id), style:{
        fontSize:14, fontWeight: scope===id?600:500, color: scope===id?'var(--brand)':'var(--g3)',
        padding:'2px 2px 8px', marginBottom:-15, borderBottom: scope===id?'2px solid var(--brand)':'2px solid transparent' } }, label)),
      React.createElement('div',{style:{flex:1}}),
      // 布局切换（2版）
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
        React.createElement('div',{style:{display:'flex',background:'var(--bg)',borderRadius:8,padding:3,border:'1px solid var(--line)'}},
          [['theme','主题分组'],['tree','目录筛选']].map(([id,label])=>React.createElement('button',{key:id,onClick:()=>setLayout(id),style:{
            padding:'5px 12px',borderRadius:6,fontSize:12.5,fontWeight: layout===id?600:500,
            color: layout===id?'var(--brand)':'var(--g4)', background: layout===id?'#fff':'transparent', boxShadow: layout===id?'var(--sh-1)':'none'}},label)))) ),
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' } },
      [['','不限'],...DATA.BOARD_CATS.map(c=>[c,c])].map(([id,label])=>React.createElement('button',{ key:label, onClick:()=>setCat(id), style:{
        height:34, display:'inline-flex', alignItems:'center', padding:'0 13px', borderRadius:8, fontSize:13, fontWeight: cat===id?600:500,
        color: cat===id?'var(--brand)':'var(--g3)', background: cat===id?'var(--brand-50)':'var(--bg)', border:'1px solid '+(cat===id?'var(--brand-100)':'var(--line)') } }, label)),
      React.createElement('div',{style:{flex:1}}),
      React.createElement(SortSelect, { value:sort, onChange:setSort, options:sorts }),
      React.createElement('div',{style:{position:'relative',display:'flex',alignItems:'center'}},
        React.createElement(Icon,{name:'search',size:15,style:{position:'absolute',left:11,color:'var(--g4)'}}),
        React.createElement('input',{placeholder:'搜索看板…',style:{height:34,width:180,borderRadius:8,border:'1px solid var(--line)',padding:'0 12px 0 34px',fontSize:13,outline:'none',background:'var(--bg)'}})),
      React.createElement('div',{style:{display:'flex',background:'var(--bg)',borderRadius:8,padding:3,border:'1px solid var(--line)'}},
        [['card','grid'],['list','list']].map(([id,ic])=>React.createElement('button',{key:id,onClick:()=>setView(id),style:{
          width:32,height:28,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',
          color: view===id?'var(--brand)':'var(--g4)', background: view===id?'#fff':'transparent', boxShadow: view===id?'var(--sh-1)':'none'}},
          React.createElement(Icon,{name:ic,size:15}))))));
}

function GroupHeader({ title, count, sub }) {
  return React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, margin: sub?'18px 0 12px':'4px 0 14px' } },
    !sub && React.createElement('span',{style:{width:4,height:16,borderRadius:2,background:'var(--brand)'}}),
    sub && React.createElement(Icon,{name:'down',size:14,style:{color:'var(--g5)'}}),
    React.createElement('span',{style:{fontSize: sub?14:15.5, fontWeight:600, color: sub?'var(--g2)':'var(--ink)'}},title),
    React.createElement('span',{className:'tnum',style:{fontSize:12.5,color:'var(--g4)'}},'('+count+')'));
}

function DashboardsPage({ toast }) {
  const [scope,setScope]=useStateB('all');
  const [cat,setCat]=useStateB('');
  const [sort,setSort]=useStateB('热门优先');
  const [view,setView]=useStateB('card');
  const [layout,setLayout]=useStateB('theme');
  const [favs,setFavs]=useStateB({'主题公园经营':true,'集团概况':true,'实时客流大屏':true});
  const [treeCat,setTreeCat]=useStateB('经营分析');
  const onFav=name=>setFavs(f=>({...f,[name]:!f[name]}));
  const onOpen=b=>toast('打开看板：'+b.name);

  const cats = cat ? [cat] : DATA.BOARD_CATS;
  const sortFn = arr => {
    const a=[...arr];
    if(sort==='最多浏览') a.sort((x,y)=>y.views-x.views);
    else if(sort==='最多收藏') a.sort((x,y)=>y.stars-x.stars);
    else if(sort==='最新发布') a.sort((x,y)=>y.date.localeCompare(x.date));
    else a.sort((x,y)=>(y.hot?1:0)-(x.hot?1:0)||y.views-x.views);
    return a;
  };
  const filterScope = b => scope==='fav' ? !!favs[b.name] : true;

  const gridCols = view==='card' ? 'repeat(auto-fill,minmax(280px,1fr))' : '1fr';

  // 布局 A：主题分组
  const themeLayout = React.createElement('div', null,
    cats.map(c=>{
      const subs = DATA.BOARDS[c]; if(!subs) return null;
      const total = Object.values(subs).flat().filter(filterScope).length;
      if(total===0) return null;
      return React.createElement('section', { key:c, style:{ marginBottom:28 } },
        React.createElement(GroupHeader,{title:c,count:total}),
        Object.entries(subs).map(([sub,items])=>{
          const list = sortFn(items.filter(filterScope));
          if(list.length===0) return null;
          return React.createElement('div',{key:sub,style:{marginBottom:8}},
            React.createElement(GroupHeader,{title:sub,count:list.length,sub:true}),
            React.createElement('div',{style:{display:'grid',gridTemplateColumns:gridCols,gap:12}},
              list.map(b=>React.createElement(BoardCard,{key:b.name+sub,b,fav:!!favs[b.name],onFav,onOpen,compact:view==='list'}))));
        }));
    }));

  // 布局 B：目录树
  const subsOf = DATA.BOARDS[treeCat]||{};
  const treeLayout = React.createElement('div', { style:{ display:'flex', gap:20, alignItems:'flex-start' } },
    React.createElement('aside', { className:'card', style:{ width:210, flexShrink:0, padding:12, position:'sticky', top:80 } },
      React.createElement('div',{style:{fontSize:13,fontWeight:600,padding:'4px 8px 10px',color:'var(--g3)'}},'看板目录'),
      DATA.BOARD_CATS.map(c=>{
        const open = treeCat===c;
        const subs = DATA.BOARDS[c]||{};
        return React.createElement('div',{key:c},
          React.createElement('button',{ onClick:()=>setTreeCat(c), style:{ display:'flex', alignItems:'center', gap:7, width:'100%', padding:'9px 8px', borderRadius:8, fontSize:13.5,
            fontWeight: open?600:500, color: open?'var(--brand)':'var(--g2)', background: open?'var(--brand-50)':'transparent', textAlign:'left' } },
            React.createElement(Icon,{name: open?'down':'right',size:13,style:{color:'var(--g5)'}}),
            React.createElement('span',{style:{flex:1}},c),
            React.createElement('span',{className:'tnum',style:{fontSize:11.5,color:'var(--g5)'}},Object.values(subs).flat().length)),
          open && React.createElement('div',{style:{paddingLeft:10}},
            Object.keys(subs).map(s=>React.createElement('div',{key:s,style:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px',borderRadius:7,fontSize:13,color:'var(--g3)'}},
              React.createElement('span',null,s),React.createElement('span',{className:'tnum',style:{fontSize:11.5,color:'var(--g5)'}},subs[s].length)))));
      })),
    React.createElement('div', { style:{ flex:1, minWidth:0 } },
      Object.entries(subsOf).map(([sub,items])=>{
        const list = sortFn(items.filter(filterScope));
        if(list.length===0) return null;
        return React.createElement('div',{key:sub,style:{marginBottom:20}},
          React.createElement(GroupHeader,{title:treeCat+' · '+sub,count:list.length}),
          React.createElement('div',{style:{display:'grid',gridTemplateColumns:gridCols,gap:12}},
            list.map(b=>React.createElement(BoardCard,{key:b.name+sub,b,fav:!!favs[b.name],onFav,onOpen,compact:view==='list'}))));
      })));

  return React.createElement('div', { className:'wrap', style:{ padding:'24px 32px 8px' } },
    React.createElement(BoardToolbar,{scope,setScope,cat,setCat,sort,setSort,view,setView,layout,setLayout}),
    React.createElement('div',{className:'fade-up',key:layout+cat+scope+sort+view}, layout==='theme'?themeLayout:treeLayout));
}

Object.assign(window, { DashboardsPage });
