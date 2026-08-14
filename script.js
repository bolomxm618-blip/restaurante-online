const dishes = [
  {name:"Tartar de salmón",cat:"entradas",price:"$12",desc:"Salmón fresco, aguacate, ponzu y aceite de sésamo.",img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"},
  {name:"Burrata & tomates",cat:"entradas",price:"$11",desc:"Burrata cremosa, tomates heirloom, albahaca y pesto.",img:"https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=85"},
  {name:"Risotto de hongos",cat:"principales",price:"$19",desc:"Arroz arborio, hongos de temporada, parmesano y trufa.",img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=85"},
  {name:"Filete NOIR",cat:"principales",price:"$29",desc:"Corte premium, puré de papa ahumada y salsa de vino.",img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85"},
  {name:"Pasta de la casa",cat:"principales",price:"$17",desc:"Pasta artesanal, tomate rostizado, burrata y albahaca.",img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85"},
  {name:"Chocolate Noir",cat:"postres",price:"$9",desc:"Chocolate 70%, caramelo salado, cacao y helado de vainilla.",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"},
  {name:"Cheesecake de frutos rojos",cat:"postres",price:"$8",desc:"Cheesecake suave, frutos rojos y crumble de almendra.",img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85"},
  {name:"Mocktail Citrus",cat:"bebidas",price:"$7",desc:"Cítricos frescos, romero, soda y un toque de miel.",img:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85"},
  {name:"Espresso Martini",cat:"bebidas",price:"$10",desc:"Espresso, vainilla y notas de cacao.",img:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85"}
];

const grid = document.getElementById("menuGrid");
const filters = document.querySelectorAll(".filter");
const toast = document.getElementById("toast");
const modal = document.getElementById("menuModal");

function renderMenu(category="all"){
  const list = category === "all" ? dishes : dishes.filter(d=>d.cat===category);
  grid.innerHTML = list.slice(0,6).map(d=>`
    <article class="dish">
      <div class="dish-img" style="background-image:url('${d.img}')"></div>
      <div class="dish-body">
        <div class="dish-top"><h3>${d.name}</h3><span class="price">${d.price}</span></div>
        <p>${d.desc}</p>
        <span class="tag">${d.cat}</span>
      </div>
    </article>`).join("");
}
renderMenu();

filters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.category);
  });
});

document.getElementById("allMenuBtn").addEventListener("click",()=>{
  document.getElementById("modalMenu").innerHTML = dishes.map(d=>`
    <div class="modal-item"><div><h3>${d.name}</h3><p>${d.desc}</p></div><strong>${d.price}</strong></div>
  `).join("");
  modal.classList.add("open");
});
document.getElementById("closeModal").addEventListener("click",()=>modal.classList.remove("open"));
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.remove("open")});

document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));

document.getElementById("themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  document.getElementById("themeBtn").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});

window.addEventListener("scroll",()=>{
  document.getElementById("header").classList.toggle("scrolled",scrollY>30);
});

const date = document.getElementById("date");
const today = new Date();
date.min = new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().split("T")[0];

document.getElementById("reservationForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const people=document.getElementById("people").value;
  const selectedDate=document.getElementById("date").value;
  const time=document.getElementById("time").value;
  if(!name || !selectedDate){showToast("Completa los datos de la reserva.");return}
  const pretty=new Date(selectedDate+"T12:00:00").toLocaleDateString("es-SV",{day:"numeric",month:"long",year:"numeric"});
  showToast(`¡Listo, ${name}! Solicitud para María Bonita: ${people}, ${pretty} a las ${time}.`);
  e.target.reset();
});

function showToast(message){
  toast.textContent=message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),4500);
}

document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
