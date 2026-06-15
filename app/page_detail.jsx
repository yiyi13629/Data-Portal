/* 数据资产详情页（表详情）*/
const { useState: useStateD } = React;

function InfoBlock({ icon, title, rows, first }) {
  return React.createElement('div', { style:{ marginBottom:18, paddingTop: first?0:22, borderTop: first?'none':'1px solid var(--line)' } },
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:7, marginBottom:12 } },
      React.createElement(Icon,{name:icon,size:16,style:{color:'var(--brand)'}}),
      React.createElement('span',{style:{fontWeight:600,fontSize:14}},title)),
    React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:9 } },
      rows.map(([k,v,tone])=>React.createElement('div',{key:k,style:{display:'flex',gap:10,fontSize:13}},
        React.createElement('span',{style:{width:72,flexShrink:0,color:'var(--g4)'}},k),
        React.createElement('span',{style:{color: tone||'var(--g1)', fontWeight: tone?600:400, wordBreak:'break-all', flex:1}},v)))));
}

function FieldsTab() {
  const counts = [['L4-机密',0,'red'],['L3-敏感',2,'amber'],['L2-内部',1,'cyan'],['L1-公开',5,'green']];
  const cols = ['字段名','类型','主键','注释说明','字段别名','样例数据','业务描述','安全等级'];
  const cell = { padding:'13px 14px', fontSize:13, color:'var(--g2)', borderBottom:'1px solid var(--line-soft)', textAlign:'left', verticalAlign:'middle' };
  const renderRow = (f, idx) => React.createElement('tr', { key:f.name, style:{ transition:'.1s' },
    onMouseEnter:e=>e.currentTarget.style.background='var(--brand-tint)', onMouseLeave:e=>e.currentTarget.style.background='transparent' },
    React.createElement('td',{style:{...cell, fontFamily:'var(--mono)', fontWeight:600, color:'var(--ink)'}},f.name),
    React.createElement('td',{style:{...cell, fontFamily:'var(--mono)', color:'var(--purple)'}},f.type),
    React.createElement('td',{style:cell}, f.pk?React.createElement(Tag,{tone:'brand'},'主键'):React.createElement('span',{style:{color:'var(--g6)'}},'—')),
    React.createElement('td',{style:cell},f.note),
    React.createElement('td',{style:{...cell,color:'var(--g4)'}},f.alias),
    React.createElement('td',{style:{...cell,fontFamily:'var(--mono)',color:'var(--g3)'}},f.sample),
    React.createElement('td',{style:{...cell,color:'var(--g4)',maxWidth:200}},React.createElement('span',{className:'clamp1'},f.biz)),
    React.createElement('td',{style:cell},React.createElement(Tag,{tone:levelTone(f.level)},f.level)));
  return React.createElement('div', null,
    React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:12 } },
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:10}},
        React.createElement('span',{style:{fontWeight:600,fontSize:15}},'字段明细信息'),
        React.createElement('span',{style:{fontSize:12.5,color:'var(--g4)'}},'共 8 个字段')),
      React.createElement('div',{style:{display:'flex',gap:22}},
        counts.map(([l,n,t])=>React.createElement('span',{key:l,style:{display:'flex',alignItems:'center',gap:5,fontSize:12.5,color:'var(--g4)'}},
          React.createElement('span',{style:{width:7,height:7,borderRadius:99,background:toneFg(t)}}),l,' ',React.createElement('b',{className:'tnum',style:{color:'var(--g2)'}},n))))),
    React.createElement('div',{style:{display:'flex',gap:10,marginBottom:16}},
      React.createElement('div',{style:{position:'relative',flex:1,maxWidth:280,display:'flex',alignItems:'center'}},
        React.createElement(Icon,{name:'search',size:15,style:{position:'absolute',left:12,color:'var(--g4)'}}),
        React.createElement('input',{placeholder:'按字段名 / 中文名筛选',style:{width:'100%',height:38,borderRadius:9,border:'1px solid var(--line)',padding:'0 12px 0 36px',fontSize:13,outline:'none',background:'var(--bg)'}}))),
    React.createElement('div', { style:{ border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' } },
      React.createElement('table', { style:{ width:'100%', borderCollapse:'collapse' } },
        React.createElement('thead',null,React.createElement('tr',{style:{background:'var(--bg)'}},
          cols.map(c=>React.createElement('th',{key:c,style:{padding:'11px 14px',fontSize:12.5,fontWeight:600,color:'var(--g3)',textAlign:'left',borderBottom:'1px solid var(--line)',whiteSpace:'nowrap'}},c)))),
        React.createElement('tbody',null,DATA.FIELDS.map(renderRow)))),
    React.createElement('div',{style:{fontWeight:600,fontSize:14,margin:'22px 0 12px'}},'分区字段信息'),
    React.createElement('div', { style:{ border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' } },
      React.createElement('table', { style:{ width:'100%', borderCollapse:'collapse' } },
        React.createElement('thead',null,React.createElement('tr',{style:{background:'var(--bg)'}},
          cols.map(c=>React.createElement('th',{key:c,style:{padding:'11px 14px',fontSize:12.5,fontWeight:600,color:'var(--g3)',textAlign:'left',borderBottom:'1px solid var(--line)',whiteSpace:'nowrap'}},c)))),
        React.createElement('tbody',null,DATA.PART_FIELDS.map(renderRow)))));
}

function LineageTab() {
  const node = (label, sub, tone, main) => React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background: main?'var(--brand-50)':'#fff', border:'1px solid '+(main?'var(--brand-100)':'var(--line)'), minWidth:170, boxShadow:'var(--sh-1)' } },
    React.createElement(IconTile,{icon:'asset',tone,size:34,radius:9}),
    React.createElement('div',null,React.createElement('div',{style:{fontSize:13.5,fontWeight:600}},label),React.createElement('div',{style:{fontSize:11.5,color:'var(--g4)'}},sub)));
  const arrow = React.createElement('div',{style:{display:'flex',alignItems:'center',color:'var(--g5)'}},React.createElement(Icon,{name:'right',size:20}));
  return React.createElement('div',null,
    React.createElement('div',{style:{fontWeight:600,fontSize:15,marginBottom:6}},'血缘 & 影响分析'),
    React.createElement('p',{style:{fontSize:13,color:'var(--g4)',margin:'0 0 24px'}},'展示本表的上游数据来源与下游引用关系，用于评估变更影响范围。'),
    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap',padding:'8px 0'}},
      React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:12}},node('ods_user_log','埋点原始日志','cyan'),node('ods_member','会员中心','green')),
      arrow,
      node('用户行为分析表','dw · 当前表','brand',true),
      arrow,
      React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:12}},node('用户活跃看板','下游看板','purple'),node('dws_user_profile','用户画像','amber'),node('会员价值模型','建模','red'))),
    React.createElement('div',{style:{display:'flex',gap:16,marginTop:28}},
      [['上游表','2','cyan'],['下游引用','3','purple'],['关联看板','1','brand']].map(([k,v,t])=>
        React.createElement('div',{key:k,className:'card',style:{flex:1,padding:'16px 18px'}},
          React.createElement('div',{className:'tnum',style:{fontSize:24,fontWeight:700,color:toneFg(t)}},v),
          React.createElement('div',{style:{fontSize:13,color:'var(--g4)',marginTop:2}},k)))));
}

function QualityTab() {
  const metrics = [['完整性','98.6%','green'],['唯一性','100%','green'],['有效性','96.2%','amber'],['及时性','99.1%','green']];
  return React.createElement('div',null,
    React.createElement('div',{style:{fontWeight:600,fontSize:15,marginBottom:16}},'质量概况'),
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}},
      metrics.map(([k,v,t])=>React.createElement('div',{key:k,className:'card',style:{padding:'18px 20px'}},
        React.createElement('div',{style:{fontSize:13,color:'var(--g4)',marginBottom:8}},k),
        React.createElement('div',{className:'tnum',style:{fontSize:26,fontWeight:700,color:toneFg(t)}},v),
        React.createElement('div',{style:{height:6,borderRadius:99,background:'var(--bg-2)',marginTop:10,overflow:'hidden'}},
          React.createElement('div',{style:{height:'100%',width:v,background:toneFg(t),borderRadius:99}}))))),
    React.createElement('div',{style:{fontWeight:600,fontSize:14,marginBottom:12}},'质量校验规则'),
    React.createElement('div',{className:'card',style:{padding:4}},
      [['主键唯一性校验','user_id 不可重复','通过','green'],['非空校验','user_name 非空率 ≥ 99%','通过','green'],['枚举值校验','status ∈ {0,1}','告警 2 条','amber'],['格式校验','phone 符合手机号格式','通过','green']].map(([n,d,s,t],i)=>
        React.createElement('div',{key:n,style:{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',borderBottom: i<3?'1px solid var(--line-soft)':'none'}},
          React.createElement(Icon,{name:'quality',size:17,style:{color:toneFg(t)}}),
          React.createElement('div',{style:{flex:1}},React.createElement('div',{style:{fontSize:13.5,fontWeight:500}},n),React.createElement('div',{style:{fontSize:12,color:'var(--g4)'}},d)),
          React.createElement(Tag,{tone:t},s)))));
}

function SimpleTab({ icon, title, desc }) {
  return React.createElement('div',{style:{textAlign:'center',padding:'70px 0',color:'var(--g4)'}},
    React.createElement('div',{style:{width:60,height:60,borderRadius:16,background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'var(--g5)'}},React.createElement(Icon,{name:icon,size:28})),
    React.createElement('div',{style:{fontSize:15,fontWeight:600,color:'var(--g2)'}},title),
    React.createElement('p',{style:{fontSize:13,marginTop:6}},desc));
}

function DetailPage({ asset, onBack, toast }) {
  const a = asset || DATA.ASSETS[0];
  const [tab, setTab] = useStateD('fields');
  const [fav, setFav] = useStateD(true);
  const tabs = [['fields','字段信息','columns'],['lineage','血缘&影响','lineage'],['quality','质量概况','quality'],['probe','数据探查','probe'],['preview','数据预览','preview'],['output','产出信息','output'],['note','使用说明','doc']];
  return React.createElement('div', null,
    // 详情头（透明，融入页面背景，与导航玻璃风格统一）
    React.createElement('div', { style:{ paddingTop:6 } },
      React.createElement('div', { className:'wrap', style:{ padding:'18px 32px', display:'flex', alignItems:'center', gap:16 } },
        React.createElement('button', { onClick:onBack, title:'返回', style:{ width:48, height:48, padding:0, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', border:'none', color:'var(--g2)', transition:'.15s' },
          onMouseEnter:e=>e.currentTarget.style.background='var(--bg-2)', onMouseLeave:e=>e.currentTarget.style.background='#fff' }, React.createElement(Icon,{name:'left',size:24})),
        React.createElement(IconTile, { icon:'asset', tone:a.tone, size:48, radius:12 }),
        React.createElement('div', { style:{ flex:1, minWidth:0 } },
          React.createElement('div',{style:{display:'flex',alignItems:'center',gap:9}},
            React.createElement('h1',{style:{margin:0,fontSize:20,fontWeight:600,color:'var(--ink)'}},a.name)),
          React.createElement('p',{className:'clamp1',style:{margin:'2px 0 0',fontSize:13.5,color:'var(--g4)'}},a.desc)),
        React.createElement('button', { onClick:()=>{setFav(v=>!v);}, className:'btn', style:{ height:38, border:'1px solid '+(fav?'var(--amber)':'var(--line)'), color: fav?'var(--amber)':'var(--g3)', background: fav?'var(--amber-50)':'#fff' } },
          React.createElement(Icon,{name:'star',size:16,fill:fav?'current':'none'}), fav?'已收藏':'收藏'),
        React.createElement('button', { onClick:()=>toast('跳转秒通 BI · 数据看板配置'), className:'btn btn-primary', style:{ height:38 } },
          React.createElement(Icon,{name:'analysis',size:16}),'分析'))),
    // 主体：左信息 + 右 tab
    React.createElement('div', { className:'wrap', style:{ padding:'22px 32px', display:'flex', gap:20, alignItems:'flex-start' } },
      React.createElement('aside', { className:'card', style:{ width:248, flexShrink:0, padding:'18px 18px 4px', position:'sticky', top:80 } },
        React.createElement(InfoBlock,{first:true,icon:'asset',title:'表基础信息',rows:[['表中文名',a.name],['表英文名',a.en],['创建人','管理员'],['创建时间','2026-06-03 14:30']]}),
        React.createElement(InfoBlock,{icon:'database',title:'业务信息',rows:[['业务主题',a.theme,'var(--brand)'],['数据负责人',a.owner],['业务描述',a.desc]]}),
        React.createElement(InfoBlock,{icon:'shield',title:'权限信息',rows:[['我的权限','读','var(--green)']]}),
        React.createElement(InfoBlock,{icon:'gear',title:'技术信息',rows:[['数据类型','Hive'],['数据源','Hive_ETL_CLUSTER'],['库名','dwd_pub'],['更新时间','每天 0 点'],['调度配置','每天 9 点'],['最近更新','2026-10-13 14:48']]})),
      React.createElement('section', { className:'card', style:{ flex:1, minWidth:0, padding:'4px 22px 24px' } },
        React.createElement('div', { style:{ display:'flex', gap:4, borderBottom:'1px solid var(--line)', marginBottom:20 } },
          tabs.map(([id,label,ic])=>React.createElement('button',{ key:id, onClick:()=>setTab(id), style:{
            display:'flex', alignItems:'center', gap:6, padding:'14px 14px', fontSize:14, whiteSpace:'nowrap',
            fontWeight: tab===id?600:500, color: tab===id?'var(--brand)':'var(--g3)',
            borderBottom: tab===id?'2px solid var(--brand)':'2px solid transparent', marginBottom:-1 } },
            React.createElement(Icon,{name:ic,size:15}),label))),
        React.createElement('div', { className:'fade-up', key:tab },
          tab==='fields' && React.createElement(FieldsTab),
          tab==='lineage' && React.createElement(LineageTab),
          tab==='quality' && React.createElement(QualityTab),
          tab==='probe' && React.createElement(SimpleTab,{icon:'probe',title:'数据探查',desc:'字段分布、空值率、唯一值等探查结果（开发中）'}),
          tab==='preview' && React.createElement(SimpleTab,{icon:'preview',title:'数据预览',desc:'抽样预览表数据前 100 行（开发中）'}),
          tab==='output' && React.createElement(SimpleTab,{icon:'output',title:'产出信息',desc:'调度任务、产出周期与产出记录（开发中）'}),
          tab==='note' && React.createElement(SimpleTab,{icon:'doc',title:'使用说明',desc:'表的口径说明与使用规范文档（开发中）'})))));
}

Object.assign(window, { DetailPage });
