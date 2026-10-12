(function(){
var $=function(s){return document.querySelector(s)};
var nav=$('#nav');addEventListener('scroll',function(){nav.classList.toggle('sc',scrollY>30)});
$('#burger').onclick=function(){$('#links').classList.toggle('open')};
document.querySelectorAll('#links a').forEach(function(a){a.onclick=function(){$('#links').classList.remove('open')}});
document.querySelectorAll('.wa-quick').forEach(function(a){a.href=GlintStore.waLink();a.target='_blank';a.rel='noopener'});
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
var P={satuan:{n:'Paket Satuan',b:1,t:19000},duo:{n:'Paket Duo',b:2,t:35000},trio:{n:'Paket Trio',b:3,t:50000}},cur='duo';
var rp=function(n){return 'Rp '+n.toLocaleString('id-ID')};
function upd(){var q=Math.max(1,+$('#qty').value||1),p=P[cur];$('#tot').textContent=rp(p.t*q);
 document.querySelectorAll('.pk').forEach(function(k){k.classList.toggle('sel',k.dataset.p===cur)})}
document.querySelectorAll('.pk').forEach(function(k){k.onclick=function(){cur=k.dataset.p;upd()}});
$('#qty').oninput=upd;upd();
$('#order').onclick=function(){
 var q=Math.max(1,+$('#qty').value||1),p=P[cur],nm=$('#nama').value.trim()||'-',ct=$('#cat').value.trim();
 var ex='Nama: '+nm+'\nPaket: '+p.n+' ('+p.b+' botol) x '+q+'\nTotal: '+rp(p.t*q)+(ct?'\nCatatan: '+ct:'');
 GlintStore.addOrder({customer:nm==='-'?'Pelanggan Website':nm,qty:p.b*q,total:p.t*q,note:p.n+' x'+q+(ct?' | '+ct:'')});
 window.open(GlintStore.waLink(ex),'_blank','noopener')};
})();
