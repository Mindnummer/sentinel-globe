const fs=require('fs'), vm=require('vm');
const path=require('path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const match=html.match(/<script>\s*([\s\S]*?)\s*<\/script>\s*<\/body>/);
if(!match)throw new Error('inline application script not found');
const src=match[1];
const listeners={};
function cls(){const s=new Set();return{add:(...x)=>x.forEach(y=>s.add(y)),remove:(...x)=>x.forEach(y=>s.delete(y)),toggle:(x,v)=>{if(v===undefined)v=!s.has(x);v?s.add(x):s.delete(x);return v},contains:x=>s.has(x)}}
const els=new Map();
function ctx(){return new Proxy({}, {get(t,k){if(k==='measureText')return ()=>({width:10}); if(k==='getImageData')return ()=>({data:new Uint8ClampedArray(4),width:1,height:1}); return (...a)=>{}},set(){return true}})}
function el(id=''){const e={id,value:'1',textContent:'',innerHTML:'',checked:false,style:{},classList:cls(),dataset:{},children:[],files:[],
 addEventListener:(ev,fn)=>{(listeners[id+':'+ev]??=[]).push(fn)},appendChild:c=>e.children.push(c),closest:()=>null,querySelectorAll:()=>[],
 getContext:()=>ctx(),getBoundingClientRect:()=>({width:800,height:600,left:0,top:0}),click:()=>{},focus:()=>{},remove:()=>{},setAttribute:()=>{}};return e;}
const document={
 body:el('body'),documentElement:el('html'),hidden:false,fullscreenElement:null,
 getElementById:id=>{if(!els.has(id))els.set(id,el(id));return els.get(id)},
 createElement:tag=>el('dyn-'+tag+'-'+Math.random()),
 addEventListener:(ev,fn)=>{(listeners['document:'+ev]??=[]).push(fn)},
 querySelectorAll:sel=>[],querySelector:sel=>null,exitFullscreen:()=>Promise.resolve()
};
document.documentElement.requestFullscreen=()=>Promise.resolve();
const mapCallbacks={}; const sources=new Map(),layers=new Set(); const mapCanvas={style:{},width:800,height:600,addEventListener:()=>{}};
const map={
 on:(ev,a,b)=>{const fn=typeof a==='function'?a:b;(mapCallbacks[ev]??=[]).push(fn);return map},
 addControl:()=>{}, addSource:(id,o)=>sources.set(id,{...o,setData:()=>{}}), getSource:id=>sources.get(id), removeSource:id=>sources.delete(id),
 addLayer:o=>layers.add(o.id), getLayer:id=>layers.has(id)?{id}:null, removeLayer:id=>layers.delete(id),
 setLayoutProperty:()=>{},setPaintProperty:()=>{},getLayoutProperty:()=>"visible",setFilter:()=>{},addImage:()=>{},
 getCenter:()=>({lng:-97.58,lat:33.23}),getZoom:()=>6,getBearing:()=>0,getPitch:()=>0,getBounds:()=>({getNorth:()=>34,getSouth:()=>32,getEast:()=>-96,getWest:()=>-99}),
 flyTo:()=>{},easeTo:()=>{},setCenter:()=>{},setZoom:()=>{},setProjection:()=>{},resize:()=>{},isMoving:()=>false,getCanvas:()=>mapCanvas,project:()=>({x:0,y:0}),unproject:()=>({lng:0,lat:0}),
 setPixelRatio:()=>{}
};
const maplibregl={Map:function(){return map},NavigationControl:function(){},Popup:function(){return{setLngLat(){return this},setHTML(){return this},addTo(){return this}}}};
const store=new Map();
const sandbox={console,document,window:null,maplibregl,satellite:{},localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)},
 navigator:{deviceMemory:8,hardwareConcurrency:8},location:{},innerWidth:1400,devicePixelRatio:1,Notification:undefined,WebSocket:undefined,
 fetch:async()=>({ok:false,status:503,json:async()=>({}),text:async()=>''}),alert:()=>{},confirm:()=>true,prompt:()=>null,
 setTimeout:()=>0,clearTimeout:()=>{},setInterval:()=>0,clearInterval:()=>{},requestAnimationFrame:()=>0,cancelAnimationFrame:()=>{},
 Date,Math,JSON,Number,String,Array,Object,Set,Map,Promise,URL,Blob,FileReader:function(){},Intl,encodeURIComponent,decodeURIComponent,isFinite,parseFloat,parseInt};
sandbox.window=sandbox; sandbox.window.addEventListener=(ev,fn)=>{};sandbox.window.open=()=>{};
vm.createContext(sandbox);
try{vm.runInContext(src,sandbox,{timeout:5000});console.log('TOPLEVEL PASS');
 for(const fn of mapCallbacks.load||[])fn(); console.log('MAP LOAD PASS',layers.size,'layers',sources.size,'sources');
 for(const fn of listeners['btnWeather:click']||[])fn({target:document.getElementById('btnWeather')}); console.log('WX CLICK PASS');
 for(const fn of listeners['radarBack:click']||[])fn({target:document.getElementById('radarBack')});
 for(const fn of listeners['radarNext:click']||[])fn({target:document.getElementById('radarNext')}); console.log('RADAR STEP PASS');
 for(const fn of listeners['btnMock:click']||[])fn({target:document.getElementById('btnMock')}); console.log('MOCK CLICK PASS');
 for(const fn of listeners['btnWeather:click']||[])fn({target:document.getElementById('btnWeather')}); console.log('WX EXIT PASS');
}catch(e){console.error('FAIL',e.stack);process.exit(1)}
