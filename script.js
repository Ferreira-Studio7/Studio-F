const catalogo=document.getElementById('catalogo');
const categoriasEl=document.getElementById('categorias');
const itensCarrinho=document.getElementById('itensCarrinho');
const totalEl=document.getElementById('total');
const btnWhats=document.getElementById('btnWhats');
const btnPix=document.getElementById('btnPix');
const pixInfo=document.getElementById('pixInfo');
let carrinho=[];

function moeda(v){return 'R$ '+v.toFixed(2).replace('.',',');}

function renderCategorias(){
 const cats=['Todos',...new Set(produtos.map(p=>p.categoria))];
 cats.forEach(cat=>{
  const b=document.createElement('button');
  b.textContent=cat;
  b.onclick=()=>renderProdutos(cat);
  categoriasEl.appendChild(b);
 });
}

function renderProdutos(filtro='Todos'){
 catalogo.innerHTML='';
 produtos.filter(p=>filtro==='Todos'||p.categoria===filtro).forEach((p,i)=>{
  const card=document.createElement('div');
  card.className='card';
  card.innerHTML=`<img src="${p.imagem}"><div class="conteudo"><h3>${p.nome}</h3><p>${p.descricao}</p><div class="preco">${moeda(p.preco)}</div><button class="btn">Adicionar ao Carrinho</button></div>`;
  card.querySelector('button').onclick=()=>{carrinho.push(p); atualizarCarrinho();};
  catalogo.appendChild(card);
 });
}

function atualizarCarrinho(){
 itensCarrinho.innerHTML='';
 let total=0;
 carrinho.forEach(p=>{
   total+=p.preco;
   const div=document.createElement('div');
   div.className='item-carrinho';
   div.innerHTML=`<span>${p.nome}</span><span>${moeda(p.preco)}</span>`;
   itensCarrinho.appendChild(div);
 });
 totalEl.textContent=moeda(total);
 const msg=encodeURIComponent('Olá! Gostaria de finalizar o pedido:%0A'+carrinho.map(p=>`- ${p.nome} (${moeda(p.preco)})`).join('%0A')+`%0ATotal: ${moeda(total)}`);
 btnWhats.href=`https://wa.me/${whatsapp}?text=${msg}`;
}

btnPix.onclick=()=>{
 pixInfo.textContent='Chave Pix: '+chavePix;
 navigator.clipboard?.writeText(chavePix);
};

renderCategorias();
renderProdutos();
