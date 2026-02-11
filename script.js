    const temasIniciales = [
      { no: '001', titulo: 'Central de Vylkroxant', desc: 'Vamos a la dirección general de Vylkroxant', tags: ['MLTSCW', 'MLTSCE', 'MLTSCA', 'MLTSCT', 'MLTSCV', 'MLTSCP', 'MLTSCL' ], href: 'https://vylkroxant.github.io/Vylkroxant/' },
      { no: '002', titulo: 'Aula Central de Vylkroxant', desc: 'Vamos a tu aula privada de materiales virtuales', tags: ['MLTSCW', 'MLTSCE', 'MLTSCA', 'MLTSCT', 'MLTSCV', 'MLTSCP', 'MLTSCL' ], href: 'https://vylkroxant.github.io/Aula-Vylkroxant/' },
      { no: '003', titulo: 'Gafetes Vylkroxant', desc: 'Completa con tus datos tu Gafete y Validalo', tags: ['MLTSCW', 'MLTSCE', 'MLTSCA', 'MLTSCT', 'MLTSCV', 'MLTSCP', 'MLTSCL' ], href: 'https://vylkroxant.github.io/CDI-Vylkroxant/' },
      { no: '004', titulo: 'Calendarios Vylkroxant', desc: 'Detalla cuando quieres recibir tus clases y Validalo', tags: ['MLTSCW', 'MLTSCE', 'MLTSCA', 'MLTSCT', 'MLTSCV', 'MLTSCP', 'MLTSCL' ], href: 'https://vylkroxant.github.io/Calendario-Vylkroxant/' },
      { no: '005', titulo: 'Centro y Control de Enlaces Vylkroxant', desc: 'Ingresa a todos nuestros enlaces disponibles.', tags: ['MLTSCW', 'MLTSCE', 'MLTSCA', 'MLTSCT', 'MLTSCV', 'MLTSCP', 'MLTSCL' ], href: 'https://vylkroxant.github.io/Centro-de-Enlaces-Vylkroxant/' },
      { no: '006', titulo: 'Respaldo y restauración', desc: 'Imágenes del sistema, puntos de restauración, 3-2-1.', tags: ['sistemas', 'seguridad'], href: '#' },
      { no: '007', titulo: 'Optimización y mantenimiento', desc: 'Rendimiento, servicios, limpieza, buenas prácticas.', tags: ['sistemas', 'seguridad'], href: '#' },
      { no: '008', titulo: 'Gestión de usuarios y permisos', desc: 'Perfiles, UAC, permisos NTFS.', tags: ['sistemas'], href: '#' },
      { no: '009', titulo: 'Fundamentos de redes', desc: 'OSI/TCP-IP, IP, máscara, gateway, DNS.', tags: ['redes', 'base'], href: '#' },
      { no: '010', titulo: 'Configuración de router y Wi‑Fi', desc: 'SSID, WPA2/WPA3, canal, invitados.', tags: ['redes'], href: '#' },
      { no: '011', titulo: 'DNS: resolución y buenas prácticas', desc: 'DNS público, caché, DoH/DoT.', tags: ['redes', 'seguridad'], href: '#' },
      { no: '012', titulo: 'Direcciones IP: DHCP vs estática', desc: 'Cuándo usar cada una, reservas DHCP.', tags: ['redes'], href: '#' },
      { no: '013', titulo: 'Higiene digital', desc: 'Contraseñas, 2FA, actualizaciones, backups.', tags: ['seguridad', 'base'], href: '#' },
      { no: '014', titulo: 'Antimalware: estrategia realista', desc: 'Defender, escaneos, falsos positivos.', tags: ['seguridad'], href: '#' },
      { no: '015', titulo: 'Phishing y verificación de enlaces', desc: 'Señales, dominios, adjuntos, sandbox.', tags: ['seguridad'], href: '#' },
      { no: '016', titulo: 'Word: estilos y plantillas', desc: 'Formato profesional sin perder consistencia.', tags: ['ofimatica'], href: '#' },
      { no: '017', titulo: 'Excel: fórmulas esenciales', desc: 'SUMA, SI, BUSCARX, tablas dinámicas.', tags: ['ofimatica'], href: '#' },
      { no: '018', titulo: 'PowerPoint: presentaciones ejecutivas', desc: 'Retícula, tipografía, ritmo y contraste.', tags: ['ofimatica'], href: '#' },
      { no: '019', titulo: 'HTML: estructura semántica', desc: 'main, nav, article, accesibilidad básica.', tags: ['web', 'base'], href: '#' },
      { no: '020', titulo: 'CSS: layout moderno', desc: 'Grid/Flex, clamp, variables, responsive.', tags: ['web'], href: '#' },
      { no: '021', titulo: 'HTTPS y certificados', desc: 'SSL/TLS, HSTS y configuración básica.', tags: ['web', 'seguridad'], href: '#' }
    ];

    function crearTema({ no, titulo, desc, tags, href }) {
      const div = document.createElement('div');
      div.className = 'topic';
      div.setAttribute('role', 'listitem');
      div.setAttribute('data-tags', tags.join(' '));

      div.innerHTML = `
        <div class="no">${no}</div>
        <div class="title">
          <strong>${titulo}</strong>
          <span>${desc}</span>
        </div>
        <div class="actions">
          <a class="link" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Abrir enlace del tema ${no}">${href}</a>
          <button class="copy" type="button" aria-label="Copiar enlace del tema ${no}" data-copy="${href}">
            Copiar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      `;
      return div;
    }

    function generarTemasAdicionales(inicio, fin) {
      const categorias = ['MLTSCW', 'MLTSCE', 'MLTSCA', 'MLTSCT', 'MLTSCV', 'MLTSCP', 'MLTSCL'];
      const temas = [];
      for (let i = inicio; i <= fin; i++) {
        const cat = categorias[i % categorias.length];
        temas.push({
          no: i.toString().padStart(3, '0'),
          titulo: `Aula de ${cat} - Categoria ${cat}`,
          desc: `Descripción de tu aula ${i} en la categoría ${cat}.`,
          tags: [cat],
          href: '#'
        });
      }
      return temas;
    }

    const topicsContainer = document.getElementById('topics');
    const temasAdicionales = generarTemasAdicionales(22, 130);
    const todosTemas = [...temasIniciales, ...temasAdicionales];

    todosTemas.forEach(tema => {
      topicsContainer.appendChild(crearTema(tema));
    });

    const totalCountEl = document.getElementById('totalCount');
    const shownCountEl = document.getElementById('shownCount');
    totalCountEl.textContent = todosTemas.length;
    shownCountEl.textContent = todosTemas.length;

    function normalizar(texto) {
      return texto.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const chips = document.querySelectorAll('.chip');
    let filtroActivo = 'all';

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        filtroActivo = chip.getAttribute('data-filter');
        filtrarTemas();
      });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filtrarTemas);

    function filtrarTemas() {
      const termino = normalizar(searchInput.value);
      let visibles = 0;

      todosTemas.forEach((tema, idx) => {
        const temaEl = topicsContainer.children[idx];
        const tags = tema.tags.join(' ');
        const textoBuscado = normalizar(`${tema.no} ${tema.titulo} ${tema.desc} ${tags}`);

        const coincideFiltro = filtroActivo === 'all' || tags.includes(filtroActivo);
        const coincideBusqueda = !termino || textoBuscado.includes(termino);

        if (coincideFiltro && coincideBusqueda) {
          temaEl.style.display = '';
          visibles++;
        } else {
          temaEl.style.display = 'none';
        }
      });

      shownCountEl.textContent = visibles;
    }

    document.addEventListener('click', async (e) => {
      if (!e.target.closest('.copy')) return;
      const btn = e.target.closest('.copy');
      const url = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(url);
        btn.textContent = 'Copiado ✓';
        setTimeout(() => {
          btn.innerHTML = `Copiar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>`;
        }, 1200);
      } catch {
        alert('No se pudo copiar el enlace.');
      }
    });

    document.getElementById('btnTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('btnExport').addEventListener('click', async () => {
      const visibles = Array.from(topicsContainer.children).filter(el => el.style.display !== 'none');
      const lines = visibles.map(el => {
        const no = el.querySelector('.no').textContent.trim();
        const titulo = el.querySelector('.title strong').textContent.trim();
        const href = el.querySelector('.link').getAttribute('href');
        return `${no}\t${titulo}\t${href}`;
      });
      const texto = [
        'Predominio Vylkroxant 2021–2026',
        'Propietario: Técnico Angel Manuel Guevara Chavarría',
        'Formato: No[TAB]Título[TAB]HREF',
        '---',
        ...lines
      ].join('\n');

      try {
        await navigator.clipboard.writeText(texto);
        alert('Lista exportada y copiada al portapapeles.');
      } catch {
        alert('No se pudo copiar la lista.');
      }
    });

    filtrarTemas();

    document.getElementById('yearNow').textContent = new Date().getFullYear();
