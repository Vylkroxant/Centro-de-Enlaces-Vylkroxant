let todosTemas = [];
let filtroActivo = 'all';

document.addEventListener('DOMContentLoaded', () => {
    const yearNow = document.getElementById('yearNow');
    if(yearNow) yearNow.textContent = new Date().getFullYear();
    
    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.addEventListener('input', filtrarTemas);

    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
            chip.setAttribute('aria-pressed', 'true');
            filtroActivo = chip.getAttribute('data-filter');
            filtrarTemas();
        });
    });

    const btnTop = document.getElementById('btnTop');
    if(btnTop) btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const btnExport = document.getElementById('btnExport');
    if(btnExport) btnExport.addEventListener('click', exportarLista);

    cargarNavegacionAulas(); 
});

async function cargarNavegacionAulas() {
    if (typeof supabaseClient === 'undefined') {
        console.error("Error: supabaseClient no está definido.");
        return;
    }

    const { data, error } = await supabaseClient
        .from('aulas_navegacion')
        .select('*')
        .order('no', { ascending: true });

    if (error) {
        console.error("Error cargando aulas:", error.message);
        return;
    }

    todosTemas = data;
    renderizarTemas();
}

function renderizarTemas() {
    const topicsContainer = document.getElementById('topics');
    if(!topicsContainer) return;
    
    topicsContainer.innerHTML = '';
    
    todosTemas.forEach(tema => {
        const div = document.createElement('div');
        div.className = 'topic';
        div.setAttribute('role', 'listitem');
        div.setAttribute('data-tags', (tema.tags || []).join(' '));

        div.innerHTML = `
            <div class="no">${tema.no}</div>
            <div class="title">
                <strong>${tema.titulo}</strong>
                <span>${tema.descripcion}</span>
            </div>
            <div class="actions">
                <button class="link-btn-masacre" onclick="verificarYAbrir('${tema.href}', '${tema.no}')">
                    Abrir Aula Privada
                </button>
            </div>
        `;
        topicsContainer.appendChild(div);
    });

    actualizarContadores(todosTemas.length, todosTemas.length);
    filtrarTemas();
}

async function verificarYAbrir(url, numero) {
    if (url === '#' || !url) {
        alert(`Aula ${numero} en mantenimiento.`);
        return;
    }

    const cdiValid = prompt(`SISTEMA VYLKROXANT\nIngrese su CDI para abrir el Aula ${numero}:`);
    if (!cdiValid) return;

    const { data, error } = await supabaseClient
        .from('estudiantes')
        .select('nombre')
        .eq('cdi', cdiValid.trim().toUpperCase())
        .maybeSingle();

    if (data) {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        alert("ACCESO DENEGADO: CDI no autorizado.");
    }
}

function normalizar(texto) {
    return texto.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarTemas() {
    const topicsContainer = document.getElementById('topics');
    const searchInput = document.getElementById('searchInput');
    const termino = normalizar(searchInput.value);
    let visibles = 0;

    todosTemas.forEach((tema, idx) => {
        const temaEl = topicsContainer.children[idx];
        if(!temaEl) return;

        const tagsStr = (tema.tags || []).join(' ');
        const textoBuscado = normalizar(`${tema.no} ${tema.titulo} ${tema.descripcion} ${tagsStr}`);

        const coincideFiltro = filtroActivo === 'all' || tagsStr.includes(filtroActivo);
        const coincideBusqueda = !termino || textoBuscado.includes(termino);

        if (coincideFiltro && coincideBusqueda) {
            temaEl.style.display = '';
            visibles++;
        } else {
            temaEl.style.display = 'none';
        }
    });

    actualizarContadores(todosTemas.length, visibles);
}

function actualizarContadores(total, visibles) {
    const totalEl = document.getElementById('totalCount');
    const shownEl = document.getElementById('shownCount');
    if(totalEl) totalEl.textContent = total;
    if(shownEl) shownEl.textContent = visibles;
}

async function exportarLista() {
    const topicsContainer = document.getElementById('topics');
    const visibles = Array.from(topicsContainer.children).filter(el => el.style.display !== 'none');
    const lines = visibles.map(el => {
        const no = el.querySelector('.no').textContent.trim();
        const titulo = el.querySelector('.title strong').textContent.trim();
        return `${no}\t${titulo}\t[ACCESO RESTRINGIDO POR CDI]`;
    });

    const texto = ['Vylkroxant 2021–2026', 'Autor: Angel Guevara', 'Reporte de Aulas Activas', '---', ...lines].join('\n');
    await navigator.clipboard.writeText(texto);
    alert('Lista de nombres exportada. Los enlaces están protegidos.');
}

let pendingUrl = "";

function verificarYAbrir(url, numero) {
    if (url === '#' || !url) {
        alert(`Aula ${numero} en mantenimiento.`);
        return;
    }
    pendingUrl = url;
    document.getElementById('modalDesc').innerText = `Ingrese su CDI para abrir el Aula ${numero}`;
    document.getElementById('securityModal').style.display = 'flex';
    document.getElementById('modalCDI').focus();
}

function closeModal() {
    document.getElementById('securityModal').style.display = 'none';
    document.getElementById('modalCDI').value = "";
}

document.getElementById('confirmBtn').onclick = async () => {
    const cdiValid = document.getElementById('modalCDI').value.trim().toUpperCase();
    if (!cdiValid) return;

    const { data } = await supabaseClient
        .from('estudiantes')
        .select('nombre')
        .eq('cdi', cdiValid)
        .maybeSingle();

    if (data) {
        window.open(pendingUrl, '_blank', 'noopener,noreferrer');
        closeModal();
    } else {
        alert("ACCESO DENEGADO: CDI no autorizado.");
    }
};
