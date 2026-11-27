(function(){
  "use strict";
  var palettes=[
    {id:"ciel",name:"Couleur d’origine",bg:"#eff8ff",card:"#fbfdff",text:"#435d73",muted:"#7891a5",accent:"#b9dcf5",soft:"#dceefa",border:"#dceaf4"},
    {id:"azur",name:"Bleu azur",bg:"#f4f7ff",card:"#fcfdff",text:"#46557a",muted:"#7c88a8",accent:"#cdd9f7",soft:"#e6edfc",border:"#e2e8f6"},
    {id:"perle",name:"Gris perle",bg:"#f8f8fa",card:"#fefefe",text:"#55575f",muted:"#85878f",accent:"#dcdde3",soft:"#eeeef2",border:"#e8e8ec"},
    {id:"rose",name:"Rose poudré",bg:"#fff8f9",card:"#fffafb",text:"#684c56",muted:"#987b85",accent:"#f0d0d9",soft:"#faeaef",border:"#f4e6eb"},
    {id:"lavande",name:"Lavande",bg:"#faf8ff",card:"#fdfbff",text:"#594f70",muted:"#887e9e",accent:"#ddd3f1",soft:"#f1ebfa",border:"#efe9f5"},
    {id:"menthe",name:"Menthe",bg:"#f5fcf9",card:"#fbfffd",text:"#45665a",muted:"#78978a",accent:"#d2ece0",soft:"#eaf7f1",border:"#e6f3ed"},
    {id:"peche",name:"Pêche",bg:"#fff9f5",card:"#fffdfb",text:"#76584a",muted:"#a08070",accent:"#f7dbca",soft:"#fceee6",border:"#f6ebe4"},
    {id:"vanille",name:"Jaune vanille",bg:"#fffdf4",card:"#fffef8",text:"#6b6245",muted:"#958a68",accent:"#f5ebc6",soft:"#faf5e1",border:"#f3eedd"}
  ];
  var key="pastel-theme-v1",current="ciel";
  try{current=localStorage.getItem(key)||"ciel";}catch(e){}
  var style=document.getElementById("pastel-theme-styles")||document.createElement("style");
  style.id="pastel-theme-styles";
  style.textContent=
    "body{background:var(--site-bg)!important;color:var(--site-text)!important;transition:background .2s,color .2s}"+
    "header,footer,.hero,.feature-card,.box,.c,.card,.duo-card,.spaces-card,.color-system,main,.modal-card,.other-sites-card{background-color:var(--site-card)!important;color:var(--site-text)!important;border-color:var(--site-border)!important}"+
    "p,.muted,.sub,footer{color:var(--site-muted)!important}"+
    "a{color:var(--site-text)}"+
    "input,textarea,select{background:var(--site-card)!important;color:var(--site-text)!important;border-color:var(--site-border)!important}"+
    "body{--bg:var(--site-bg);--card:var(--site-card);--tx:var(--site-text);--text:var(--site-text);--mu:var(--site-muted);--muted:var(--site-muted);--bd:var(--site-border);--border:var(--site-border);--p1:var(--site-soft);--p2:var(--site-soft);--p3:var(--site-accent);--accent:var(--site-accent);--ac:var(--site-accent);--dk:var(--site-text)}"+
    "#pastel-theme-panel{position:fixed;right:14px;bottom:72px;z-index:11000;width:min(310px,calc(100vw - 28px));padding:14px;background:var(--site-card);color:var(--site-text);border:1px solid var(--site-border);border-radius:18px;box-shadow:0 12px 36px rgba(50,60,80,.18);font:14px/1.4 system-ui,sans-serif}"+
    "#pastel-theme-panel .pt-title{font-weight:700;margin:0 0 10px;color:var(--site-text)}"+
    "#pastel-theme-panel .pt-colors{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}"+
    "#pastel-theme-panel button{display:flex;align-items:center;gap:7px;width:100%;padding:8px;border:1px solid var(--site-border);border-radius:11px;background:var(--site-soft);color:var(--site-text);font:12px system-ui,sans-serif;cursor:pointer}"+
    "#pastel-theme-panel button[aria-pressed=true]{outline:2px solid var(--site-text);outline-offset:1px}"+
    "#pastel-theme-panel i{display:block;width:19px;height:19px;flex:none;border-radius:50%;border:1px solid rgba(0,0,0,.08)}"+
    "#pastel-theme-toggle{position:fixed;right:14px;bottom:14px;z-index:11001;padding:9px 14px;border:1px solid var(--site-border);border-radius:999px;background:var(--site-soft);color:var(--site-text);font-weight:700;box-shadow:0 5px 16px rgba(50,60,80,.13);cursor:pointer}"+
    "#pastel-theme-panel[hidden]{display:none!important}"+
    "#pastel-theme-close{float:right;border:0;border-radius:50%;width:30px;height:30px;font-size:19px;line-height:1;cursor:pointer;background:var(--site-soft);color:var(--site-text)}";
  if(!style.parentNode)document.head.appendChild(style);
  function apply(id){
    var p=palettes.find(function(x){return x.id===id;})||palettes[0];
    current=p.id;var root=document.documentElement;
    root.style.setProperty("--site-bg",p.bg);root.style.setProperty("--site-card",p.card);
    root.style.setProperty("--site-text",p.text);root.style.setProperty("--site-muted",p.muted);
    root.style.setProperty("--site-accent",p.accent);root.style.setProperty("--site-soft",p.soft);
    root.style.setProperty("--site-border",p.border);
    try{localStorage.setItem(key,p.id);}catch(e){}
    panel.querySelectorAll("[data-theme]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.theme===p.id));});
  }
  var panel=document.getElementById("pastel-theme-panel");
  if(!panel){
    panel=document.createElement("aside");panel.id="pastel-theme-panel";
    panel.setAttribute("aria-label","Choisir une couleur pastel");panel.hidden=true;
    var close=document.createElement("button");close.id="pastel-theme-close";close.type="button";close.textContent="×";
    close.setAttribute("aria-label","Fermer les couleurs");
    close.addEventListener("click",function(){panel.hidden=true;});
    var title=document.createElement("p");title.className="pt-title";title.textContent="Choisissez votre ambiance pastel";
    var grid=document.createElement("div");grid.className="pt-colors";
    palettes.forEach(function(p){
      var b=document.createElement("button");b.type="button";b.dataset.theme=p.id;b.setAttribute("aria-label",p.name);
      var dot=document.createElement("i");dot.style.background=p.accent;
      var label=document.createElement("span");label.textContent=p.name;
      b.appendChild(dot);b.appendChild(label);b.addEventListener("click",function(){apply(p.id);});
      grid.appendChild(b);
    });
    panel.appendChild(close);panel.appendChild(title);panel.appendChild(grid);document.body.appendChild(panel);
  }
  var toggle=document.getElementById("pastel-theme-toggle");
  if(!toggle){
    toggle=document.createElement("button");toggle.id="pastel-theme-toggle";toggle.type="button";
    toggle.textContent="🎨 Couleurs pastel";document.body.appendChild(toggle);
  }
  toggle.addEventListener("click",function(){panel.hidden=!panel.hidden;});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")panel.hidden=true;});
  apply(current);
})();