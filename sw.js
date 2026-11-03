// GH2026 offline helper -- GT Fit's approach: always try the network first (so each
// opening with a connection gets the latest upload), keep a copy for use offline.
const C='gh2026-v1.0';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  const u=new URL(e.request.url); if(u.origin!==location.origin) return;
  e.respondWith(caches.open(C).then(async c=>{ try{ const r=await fetch(e.request); if(r&&r.ok&&!u.search) c.put(e.request,r.clone()); return r; }catch(err){ const m=await c.match(e.request,{ignoreSearch:true}); return m || (await c.match('./')) || Response.error(); } })); });
