/* Botol Glint 50 ml 3D murni CSS 3D (tanpa library). Geser untuk memutar. */
(function(){
var sc=document.getElementById('bottle3d');if(!sc)return;
var rig=sc.querySelector('.rig'),n=36,R=62,H=210,TW=2*Math.PI*R,arc=TW/n,strips=[];
function lab(o){return "<g transform='translate("+o+",0)' text-anchor='middle'><rect x='-115' y='30' width='230' height='156' rx='16' fill='#fff'/>"+
"<path d='M-115 150Q-58 130 0 148T115 142V170a16 16 0 0 1-16 16H-99a16 16 0 0 1-16-16Z' fill='url(#w)'/>"+
"<text x='0' y='92' font-size='46' font-weight='800' fill='#0b2a5b' font-family='Georgia,serif'>Glint</text>"+
"<path d='M70 52l4 11 11 4-11 4-4 11-4-11-11-4 11-4z' fill='#d9b872'/><path d='M-34 104H34' stroke='#d9b872' stroke-width='1.5'/>"+
"<text x='0' y='120' font-size='9' letter-spacing='2.4' font-weight='700' fill='#0b2a5b' font-family='Arial,sans-serif'>SCREEN N LENS CLEANSER</text>"+
"<text x='0' y='134' font-size='7.5' letter-spacing='3' fill='#2f80d0' font-family='Arial,sans-serif'>CLEAN. CLEAR. GLINT.</text>"+
"<text x='0' y='171' font-size='15' font-weight='800' fill='#fff' font-family='Arial,sans-serif'>50 ml</text></g>";}
var svg="<svg xmlns='http://www.w3.org/2000/svg' width='"+TW+"' height='"+H+"'><defs><linearGradient id='g' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='#d6ebff'/><stop offset='1' stop-color='#86bff2'/></linearGradient><linearGradient id='w' x1='0' x2='1'><stop offset='0' stop-color='#8fc8ff'/><stop offset='1' stop-color='#2f80d0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/>"+lab(0)+lab(TW)+"<text x='"+TW/2+"' y='110' text-anchor='middle' font-size='10' fill='#0b2a5b' font-family='Georgia,serif'>Made in Indonesia</text></svg>";
var IMG="url(\"data:image/svg+xml,"+encodeURIComponent(svg)+"\")";
function mk(p,css){var d=document.createElement('div');d.style.cssText='position:absolute;transform-style:preserve-3d;'+css;p.appendChild(d);return d}
function cyl(r,h,y,col,tex){var g=mk(rig,'left:0;top:0;transform:translateY('+y+'px)'),a=2*Math.PI*r/n;
 for(var i=0;i<n;i++){var th=(i+.5)*360/n,s=mk(g,'width:'+(a+1)+'px;height:'+h+'px;left:'+(-a/2)+'px;top:'+(-h/2)+'px;backface-visibility:hidden;transform:rotateY('+th+'deg) translateZ('+r+'px);'+(tex?'background:'+IMG+' '+(-i*a)+'px 0/'+TW+'px '+H+'px':'background:'+col));
  strips.push({e:s,th:th*Math.PI/180})}
 ['-1','1'].forEach(function(k){mk(g,'width:'+2*r+'px;height:'+2*r+'px;left:'+(-r)+'px;top:'+(-r)+'px;border-radius:50%;background:'+(tex?'#bfe0ff':col)+';backface-visibility:hidden;transform:translateY('+k*h/2+'px) rotateX('+(k*-90)+'deg)')})}
function box(W,Hh,D,x,y,z,col){var b=mk(rig,'left:0;top:0;transform:translate3d('+x+'px,'+y+'px,'+z+'px)');
 [['translateZ('+D/2+'px)',W,Hh,1],['rotateY(180deg) translateZ('+D/2+'px)',W,Hh,.7],['rotateY(90deg) translateZ('+W/2+'px)',D,Hh,.85],['rotateY(-90deg) translateZ('+W/2+'px)',D,Hh,.6],['rotateX(90deg) translateZ('+Hh/2+'px)',W,D,1.3],['rotateX(-90deg) translateZ('+Hh/2+'px)',W,D,.5]].forEach(function(f){
  mk(b,'width:'+f[1]+'px;height:'+f[2]+'px;left:'+(-f[1]/2)+'px;top:'+(-f[2]/2)+'px;background:'+col+';filter:brightness('+f[3]+');backface-visibility:hidden;transform:'+f[0])})}
cyl(R,H,0,'',true);cyl(30,18,-114,'#cfe7ff');cyl(34,22,-134,'#0b2a5b');cyl(16,18,-154,'#12408a');
box(46,30,54,0,-178,10,'#0b2a5b');box(14,12,16,0,-180,44,'#d9b872');box(14,36,8,0,-150,36,'#12408a');
var ry=-25,rx=-10,vel=.35,drag=false,lx=0,ly=0,auto=true,target=null;
function frame(){
 if(target!==null){var d=((target-ry)%360+540)%360-180;ry+=d*.1;if(Math.abs(d)<.3){target=null}}
 else if(!drag){ry+=vel;if(Math.abs(vel)>.35)vel*=.96;if(!auto&&Math.abs(vel)<.05)vel=0;else if(auto&&Math.abs(vel)<=.35)vel=.35}
 var r=ry*Math.PI/180;
 strips.forEach(function(s){var f=Math.cos(s.th+r),a=Math.max(0,(1-f)*.45),sp=Math.max(0,f-.9)*3.2;s.e.style.boxShadow='inset 0 0 0 99px rgba(5,11,26,'+a.toFixed(2)+'),inset 0 0 0 99px rgba(255,255,255,'+(sp*.3).toFixed(2)+')'});
 var sz=Math.min(sc.clientHeight/360,sc.clientWidth/260,1.4);
 rig.style.transform='scale('+sz+') rotateX('+rx+'deg) rotateY('+ry+'deg)';
 requestAnimationFrame(frame)}
sc.addEventListener('pointerdown',function(e){drag=true;target=null;lx=e.clientX;ly=e.clientY;sc.setPointerCapture(e.pointerId);sc.classList.add('grab')});
sc.addEventListener('pointermove',function(e){if(!drag)return;vel=(e.clientX-lx)*.5;ry+=(e.clientX-lx)*.6;rx=Math.max(-35,Math.min(8,rx+(e.clientY-ly)*.2));lx=e.clientX;ly=e.clientY});
['pointerup','pointercancel'].forEach(function(t){sc.addEventListener(t,function(){drag=false;sc.classList.remove('grab')})});
document.querySelectorAll('[data-b3d]').forEach(function(b){b.onclick=function(){var a=b.dataset.b3d;if(a==='front')target=0;if(a==='back')target=180;if(a==='spin'){auto=!auto;vel=auto?.35:0;b.classList.toggle('on',auto)}}});
frame();
})();
