const defaultProjects = [{"title": "AIR JORDAN / MOTION STUDY", "category": "Graphic Design", "year": "2026", "image": "assets/jordan.webp", "desc": "A bold basketball poster study built around repetition, scale and a strong central silhouette.", "wide": false}, {"title": "KALRATRI", "category": "Cultural Poster", "year": "2026", "image": "assets/kalratri.webp", "desc": "A dark editorial interpretation of Navratri, mixing devotional imagery with distressed print textures.", "wide": false}, {"title": "MEET & GREET", "category": "Event Identity", "year": "2026", "image": "assets/meet-greet.webp", "desc": "Visual identity for a campus freshers meet-up using a monochrome blue treatment and playful typography.", "wide": false}, {"title": "NAVRATRI \u2014 NINE NIGHTS", "category": "Cultural Poster", "year": "2026", "image": "assets/navratri.webp", "desc": "A vibrant festival poster exploring mythology, movement and neon editorial color.", "wide": false}, {"title": "NIKE FANMADE / AIR", "category": "Graphic Design", "year": "2026", "image": "assets/nike-fanmade.webp", "desc": "A commercial-style sneaker composition built around oversized type and high-contrast color blocking.", "wide": false}, {"title": "BOMBING WORLD", "category": "Experimental Art", "year": "2026", "image": "assets/bombing-world.webp", "desc": "A surreal visual experiment pairing a vintage lifestyle scene with an apocalyptic landscape.", "wide": false}, {"title": "WE ARE HIRING", "category": "Event Identity", "year": "2026", "image": "assets/we-are-hiring.webp", "desc": "A playful recruitment poster for a creative and technical campus team.", "wide": false}, {"title": "PROMPT BATTLE", "category": "Event Identity", "year": "2026", "image": "assets/prompt-battle.webp", "desc": "A glitchy editorial poster for a creativity and AI-focused campus event.", "wide": false}, {"title": "HACKER RANK \u2014 CERTIFICATE", "category": "Certificate Design", "year": "2026", "image": "assets/hacker-rank-certificate.webp", "desc": "A bold certificate system using comic-book inspired shapes, yellow, blue and black.", "wide": true}, {"title": "FINTECH INNOVATE \u2014 CERTIFICATE", "category": "Certificate Design", "year": "2026", "image": "assets/fintech-certificate.webp", "desc": "A monochrome technology-inspired certificate with an illustrated border system.", "wide": true}];
const storageKey = "prakharPortfolioExtraProjects";
let extraProjects = JSON.parse(localStorage.getItem(storageKey) || "[]");
let currentFilter = "All";

const gallery = document.getElementById("gallery");
const projectCount = document.getElementById("projectCount");

function allProjects(){
  return [...defaultProjects, ...extraProjects];
}

function renderProjects(filter = currentFilter){
  currentFilter = filter;
  const list = allProjects().filter(p => filter === "All" || p.category === filter);
  projectCount.textContent = `${allProjects().length} projects`;
  gallery.innerHTML = "";
  list.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = `card ${p.wide ? "wide" : ""}`;
    card.style.animationDelay = `${Math.min(i * 60, 500)}ms`;
    card.innerHTML = `
      <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy">
      <span class="card-num">${String(i+1).padStart(2,"0")}</span>
      <div class="card-overlay">
        <div class="card-category">${escapeHtml(p.category)} · ${escapeHtml(p.year)}</div>
        <div class="card-title">${escapeHtml(p.title)}</div>
      </div>`;
    card.addEventListener("click", () => openProject(p));
    gallery.appendChild(card);
  });
}

function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escapeAttr(s=""){return escapeHtml(s)}

renderProjects();

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

const projectModal = document.getElementById("projectModal");
function openProject(p){
  document.getElementById("modalImg").src = p.image;
  document.getElementById("modalImg").alt = p.title;
  document.getElementById("modalCategory").textContent = `${p.category} · ${p.year}`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc || "";
  document.getElementById("modalYear").textContent = p.year;
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeProject(){
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.getElementById("closeProject").onclick = closeProject;
projectModal.addEventListener("click", e => {if(e.target===projectModal) closeProject()});

const studio = document.getElementById("studioModal");
document.getElementById("openStudio").onclick = () => {studio.classList.add("open");studio.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"};
document.getElementById("closeStudio").onclick = closeStudio;
studio.addEventListener("click", e => {if(e.target===studio) closeStudio()});
function closeStudio(){studio.classList.remove("open");studio.setAttribute("aria-hidden","true");document.body.style.overflow=""}

document.getElementById("projectImage").addEventListener("change", e => {
  const file = e.target.files[0];
  document.getElementById("uploadText").textContent = file ? `✓ ${file.name}` : "＋ Choose project image";
});

document.getElementById("projectForm").addEventListener("submit", e => {
  e.preventDefault();
  const file = document.getElementById("projectImage").files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const item = {
      id: Date.now(),
      title: document.getElementById("projectTitle").value.trim().toUpperCase(),
      year: document.getElementById("projectYear").value.trim(),
      category: document.getElementById("projectCategory").value,
      desc: document.getElementById("projectDesc").value.trim(),
      image: reader.result,
      wide: false
    };
    extraProjects.unshift(item);
    localStorage.setItem(storageKey, JSON.stringify(extraProjects));
    renderProjects("All");
    document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter==="All"));
    e.target.reset();
    document.getElementById("uploadText").textContent = "＋ Choose project image";
    closeStudio();
    document.getElementById("work").scrollIntoView({behavior:"smooth"});
  };
  reader.readAsDataURL(file);
});

document.getElementById("clearLocal").addEventListener("click", () => {
  if(confirm("Remove projects added through this browser? Your original portfolio work will stay.")){
    extraProjects=[];
    localStorage.removeItem(storageKey);
    renderProjects("All");
  }
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

window.addEventListener("scroll",()=>{
  const h=document.documentElement;
  const progress=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
  document.querySelector(".progress span").style.width=progress+"%";
});

const dot=document.querySelector(".cursor-dot");
window.addEventListener("pointermove",e=>{
  dot.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
});
document.addEventListener("DOMContentLoaded",()=>document.body.classList.add("loaded"));
