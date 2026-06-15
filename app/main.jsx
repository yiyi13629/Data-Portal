/* 主应用：路由 + Toast + 组装 */
const { useState: useStateM, useCallback } = React;

function Toast({ msg }) {
  if (!msg) return null;
  return React.createElement('div', { className:'fade-up', style:{
    position:'fixed', left:'50%', top:24, transform:'translateX(-50%)', zIndex:80,
    background:'rgba(15,25,40,.92)', color:'#fff', padding:'10px 18px', borderRadius:10, fontSize:13.5,
    boxShadow:'var(--sh-3)', display:'flex', alignItems:'center', gap:8 } },
    React.createElement(Icon,{name:'check',size:16,style:{color:'#5fd08a'}}), msg);
}

function App() {
  const [page, setPage] = useStateM('assets');
  const [asset, setAsset] = useStateM(null);
  const [toastMsg, setToastMsg] = useStateM('');
  const toast = useCallback(m => {
    setToastMsg(m);
    clearTimeout(window.__t); window.__t = setTimeout(()=>setToastMsg(''), 2200);
  }, []);
  const nav = p => { setPage(p); window.scrollTo({ top:0 }); };
  const openDetail = a => { setAsset(a); setPage('detail'); window.scrollTo({ top:0 }); };

  return React.createElement('div', { style:{ minHeight:'100vh', display:'flex', flexDirection:'column' } },
    React.createElement(TopNav, { active:page, onNav:nav, onGlobalSearch:()=>toast('全局搜索 · v1 占位') }),
    React.createElement('main', { style:{ flex:1 } },
      page==='assets' && React.createElement(AssetsPage, { onOpen:openDetail, toast }),
      page==='boards' && React.createElement(DashboardsPage, { toast }),
      page==='analysis' && React.createElement(AnalysisPage, { toast }),
      page==='detail' && React.createElement(DetailPage, { asset, onBack:()=>nav('assets'), toast })),
    React.createElement(Footer),
    React.createElement(BackToTop, {}),
    React.createElement(AIAssistant, {}),
    React.createElement(Toast, { msg:toastMsg }));
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
