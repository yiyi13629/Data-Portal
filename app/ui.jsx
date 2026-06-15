/* 共享 UI 原语：Icon / Avatar / Tag / IconTile / Stat 等 */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- 线性图标集（feather 风格，24x24，currentColor 描边） ---------- */
const ICONS = {
  home:'M3 11l9-8 9 8M5 9.5V21h14V9.5',
  asset:'M3 3h18v18H3zM3 9h18M9 21V9',           // 表格
  board:'M3 3h7v8H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 15h7v6H3z', // 看板九宫
  analysis:'M3 3v18h18M7 14l3-4 3 3 5-7',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.5 21a2 2 0 0 1-3 0',
  user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a8 8 0 0 1 16 0v1',
  down:'M6 9l6 6 6-6',
  right:'M9 6l6 6-6 6',
  left:'M15 6l-6 6 6 6',
  up:'M6 15l6-6 6 6',
  star:'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.4 6.1 20.5 7.3 14 2.5 9.4 9.1 8.5z',
  eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
  columns:'M4 4h16v16H4zM10 4v16M16 4v16',
  heart:'M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z',
  folder:'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  plus:'M12 5v14M5 12h14',
  cart:'M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  cloud:'M7 18a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6-1.4A4 4 0 0 1 18 18z',
  gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a7.5 7.5 0 0 0 0-2l1.8-1.4-1.8-3.1-2.2.9a7.5 7.5 0 0 0-1.7-1l-.3-2.3H9.6l-.3 2.3a7.5 7.5 0 0 0-1.7 1l-2.2-.9L3.6 9.6 5.4 11a7.5 7.5 0 0 0 0 2l-1.8 1.4 1.8 3.1 2.2-.9c.5.4 1.1.7 1.7 1l.3 2.3h4.8l.3-2.3c.6-.3 1.2-.6 1.7-1l2.2.9 1.8-3.1z',
  check:'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4L12 14l-3-3',
  shield:'M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5z',
  database:'M12 7c4.4 0 8-1.1 8-2.5S16.4 2 12 2 4 3.1 4 4.5 7.6 7 12 7zM4 4.5v15C4 20.9 7.6 22 12 22s8-1.1 8-2.5v-15M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5',
  sparkles:'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 14l.8 2.2 2.2.8-2.2.8L19 20l-.8-2.2-2.2-.8 2.2-.8z',
  close:'M18 6L6 18M6 6l12 12',
  list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  filter:'M3 4h18l-7 8v7l-4 2v-9z',
  more:'M5 12h.01M12 12h.01M19 12h.01',
  logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  lineage:'M6 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 5v14M6 12h10',
  quality:'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  probe:'M3 3v18h18M7 13l3 3 4-5 4 4',
  preview:'M2 4h20v14H2zM2 9h20M7 22h10',
  output:'M4 17l6-6-6-6M12 19h8',
  doc:'M9 2h6l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9 13h6M9 17h6',
  refresh:'M21 2v6h-6M3 22v-6h6M3.5 9a9 9 0 0 1 14.8-3.4L21 8M21 15a9 9 0 0 1-14.8 3.4L3 16',
  send:'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v5l3 2',
  trash:'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
  scan:'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18',
  // 工具广场图标
  prep:'M4 7h16M4 12h16M4 17h10M18 15l3 3-3 3', dataset:'M3 3h18v18H3zM3 9h18M9 21V9',
  meta:'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01', cube:'M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7',
  model:'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM5 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10.5 7.5L6.5 15M13.5 7.5l4 7.5',
  query:'M4 4h16v16H4zM8 9l3 3-3 3M14 15h3', plug:'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5',
  upload:'M12 15V3M7 8l5-5 5 5M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2',
  api:'M10 3L4 9l6 6M14 21l6-6-6-6', rocket:'M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a13 13 0 0 1 8-8c1 4-1 8-4 10l-4-2zM15 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  video:'M2 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM16 9l6-3v12l-6-3',
  help:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01',
  domain:'M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M13 9h.01M13 13h.01',
  panelClose:'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM10 4v16M16.5 9.5l-3 2.5 3 2.5',
  panelOpen:'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM10 4v16M13.5 9.5l3 2.5-3 2.5',
};
function Icon({ name, size = 18, stroke = 1.8, fill = 'none', style, className }) {
  const d = ICONS[name] || '';
  const filled = fill === 'current';
  return React.createElement('svg', { width:size, height:size, viewBox:'0 0 24 24',
    fill: filled ? 'currentColor' : 'none', stroke: filled ? 'none' : 'currentColor',
    strokeWidth: stroke, strokeLinecap:'round', strokeLinejoin:'round', style, className, 'aria-hidden':true },
    React.createElement('path', { d }));
}

/* ---------- tone 调色 ---------- */
const TONES = {
  brand:['var(--brand)','var(--brand-50)'], green:['var(--green)','var(--green-50)'],
  amber:['var(--amber)','var(--amber-50)'], red:['var(--red)','var(--red-50)'],
  purple:['var(--purple)','var(--purple-50)'], cyan:['var(--cyan)','var(--cyan-50)'],
};
const toneFg = t => (TONES[t]||TONES.brand)[0];
const toneBg = t => (TONES[t]||TONES.brand)[1];

/* ---------- 图标方块（统一资产/看板/工具的视觉语言） ---------- */
function IconTile({ icon = 'asset', tone = 'brand', size = 44, radius = 13 }) {
  const c = toneFg(tone);
  return React.createElement('div', { style:{
    width:size, height:size, borderRadius:radius, display:'flex', alignItems:'center',
    justifyContent:'center', color:'#fff', flexShrink:0,
    background:`linear-gradient(135deg, color-mix(in srgb, ${c} 88%, #fff), ${c})` } },
    React.createElement(Icon, { name:icon, size:Math.round(size*0.5), stroke:2 }));
}

/* ---------- 头像（squircle） ---------- */
function Avatar({ name = '', size = 28, tone = 'amber', shape = 'squircle', src }) {
  const ch = name ? name.slice(-1) : '';
  const radius = shape === 'circle' ? '50%' : size * 0.32;
  if (src) {
    return React.createElement('img', { src, alt:name, style:{
      width:size, height:size, borderRadius:radius, objectFit:'cover', flexShrink:0, display:'block' } });
  }
  return React.createElement('div', { style:{
    width:size, height:size, borderRadius:radius, background:toneBg(tone), color:toneFg(tone),
    display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*0.42, fontWeight:600, flexShrink:0 } }, ch);
}

/* ---------- 标签 ---------- */
function Tag({ children, tone = 'brand', solid = false, size = 'sm', style }) {
  const fg = toneFg(tone), bg = toneBg(tone);
  const pad = size === 'sm' ? '1px 7px' : '2px 9px';
  const fs = size === 'sm' ? 11 : 12;
  return React.createElement('span', { style:{
    display:'inline-flex', alignItems:'center', gap:3, padding:pad, fontSize:fs, fontWeight:500,
    borderRadius:5, lineHeight:1.5, whiteSpace:'nowrap',
    color: solid ? '#fff' : fg, background: solid ? fg : bg, ...style } }, children);
}

/* ---------- 统计小项 ---------- */
function StatInline({ icon, value, tone, fill }) {
  return React.createElement('span', { className:'tnum', style:{ display:'inline-flex', alignItems:'center', gap:4, color:tone||'var(--g4)', fontSize:12.5 } },
    React.createElement(Icon, { name:icon, size:14, stroke:1.8, fill: fill?'current':'none' }),
    React.createElement('span', null, value));
}

/* 安全等级配色 */
function levelTone(level){
  if(level.startsWith('L4')) return 'red';
  if(level.startsWith('L3')) return 'amber';
  if(level.startsWith('L2')) return 'cyan';
  return 'green';
}
const fmt = n => typeof n === 'number' ? n.toLocaleString('en-US') : n;

Object.assign(window, { Icon, IconTile, Avatar, Tag, StatInline, TONES, toneFg, toneBg, levelTone, fmt });
