export const site = {
  name: 'WS Design',
  role: 'Designer de flyers para eventos',
  city: 'São Paulo, Brasil',
  whatsapp: '5511964419572',
  instagram: '', // Ex.: https://instagram.com/seuusuario
  email: '',
}

const files = [
  'bar-do-beco-01-AGO.png','bar-do-beco-02-AGO.png','bar-do-beco-02-jul.png','bar-do-beco-03-jul.png','BAR-DO-BECO-03-JUN.png','bar-do-beco-03-SETEMBRO.png','bar-do-beco-04-jul.png','BAR-DO-BECO-04-JUN.png','BAR-DO-BECO-05-JUN.png','bar-do-beco-06-jun.png','bar-do-beco-07-ago.png','bar-do-beco-07-jun.png','BAR-DO-BECO-08-AGO.png','bar-do-beco-09-AGO.png','bar-do-beco-09-jul.png','BAR-DO-BECO-10-JUL.png','bar-do-beco-10-set.png','BAR-DO-BECO-11-JUN.png','bar-do-beco-11-set.png','bar-do-beco-12-jul.png','BAR-DO-BECO-13-jun.png','bar-do-beco-14-ago.png','bar-do-beco-14-jun.png','bar-do-beco-15-ago.png','bar-do-beco-16-jul.png','bar-do-beco-17-jul.png','BAR-DO-BECO-18-JUL.png','bar-do-beco-18-jun.png','bar-do-beco-19-jul.png','BAR-DO-BECO-19-JUN.png','bar-do-beco-20-ago.png','bar-do-beco-20-jun.png','bar-do-beco-21-jun.png','BAR-DO-BECO-22-AGO.png','bar-do-beco-23-ago.png','bar-do-beco-23-jul.png','bar-do-beco-24-jul.png','bar-do-beco-24-junho.png','bar-do-beco-25-jul.png','bar-do-beco-26-jul.png','bar-do-beco-26-jun.png','bar-do-beco-27-ago.png','bar-do-beco-27-jun.png','bar-do-beco-29-ago.png','bar-do-beco-30-ago.png','bar-do-beco-30-jul.png','bar-do-beco-31-jul.png','bar-do-beco11-JUL.png','bar-premium-011-29-agosto.png','gold-smoke-bar-5-set.png','POINT-DO-GORDÃO-05-SET.png','GOLD-SMOKE-BAR-18-SET.png','bar-do-beco-19-set.png','gold-smoke-19-set.png','BAR-DO-BECO-20-SET.png','bar-do-beco-24-set.png'
]

const monthOf=(name:string)=>{const n=name.toLowerCase();if(n.includes('set'))return'Setembro';if(n.includes('ago'))return'Agosto';if(n.includes('jul'))return'Julho';return'Junho'}
const clientOf=(name:string)=>name.toLowerCase().includes('bar-do-beco')?'Bar do Beco':name.toLowerCase().includes('gold')?'Gold Smoke':name.toLowerCase().includes('point')?'Point do Gordão':'Bar Premium'
export const works=files.map((file,index)=>({id:index+1,file,src:`/portfolio/${file}`,month:monthOf(file),client:clientOf(file),title:file==='bar-do-beco-11-set.png'?'Kelvinho — Aniversário do Bar do Beco':`${clientOf(file)} — ${monthOf(file)}`}))
