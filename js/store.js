/* Penyimpanan data bersama (toko + ERP) memakai localStorage */
const GlintStore=(function(){
  const K='glintERP_v2', WA='6281222422669', MSG='Halo Min Glint! Saya tertarik pesan Glint Screen & Lens Cleanser nih';
  const seed=()=>({
    price:19000, capital:97292, fg:0,
    mat:[
      {id:'ipa',name:'IPA 70%',unit:'ml',stock:250,cost:80,min:50},
      {id:'aq',name:'Aquadest',unit:'ml',stock:1000,cost:13,min:200},
      {id:'btl',name:'Botol spray 50 ml',unit:'pcs',stock:4,cost:4150.5,min:2},
      {id:'mf',name:'Kain microfiber',unit:'pcs',stock:6,cost:1281.67,min:2},
      {id:'lbl',name:'Label stiker',unit:'pcs',stock:0,cost:1000,min:5}],
    bom:[{id:'ipa',q:25},{id:'aq',q:25},{id:'btl',q:1},{id:'mf',q:1},{id:'lbl',q:1}],
    orders:[], prod:[]
  });
  const load=()=>{try{const s=JSON.parse(localStorage.getItem(K));return s&&s.mat?s:seed()}catch(e){return seed()}};
  const save=s=>{try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}};
  const addOrder=o=>{const s=load();s.orders.unshift(Object.assign({id:'ORD-'+Date.now().toString().slice(-6),date:new Date().toISOString(),status:'Baru',source:'Website'},o));save(s)};
  const waLink=extra=>'https://wa.me/'+WA+'?text='+encodeURIComponent(MSG+(extra?'\n\n'+extra:''));
  return {load,save,seed,addOrder,waLink};
})();
