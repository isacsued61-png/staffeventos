/**
 * Controlador da Interface (UI Render & Events)
 */
document.addEventListener('DOMContentLoaded', () => {
    MaterialsModule.init();

    // Elementos do DOM
    const tbody = document.getElementById('materials-tbody');
    const form = document.getElementById('material-form');
    const hireForm = document.getElementById('hire-form');
    const filterSector = document.getElementById('filter-sector');
    const filterStatus = document.getElementById('filter-status');

    // Renderizar KPIs
    function renderMetrics() {
        const metrics = MaterialsModule.getMetrics();
        document.getElementById('kpi-total').innerText = metrics.totalItems;
        document.getElementById('kpi-loaded').innerText = metrics.loaded;
        document.getElementById('kpi-unloaded').innerText = metrics.unloaded;
        document.getElementById('kpi-weight').innerText = `${metrics.totalWeight} kg`;
    }

    // Renderizar Tabela
    function renderTable() {
        const sectorVal = filterSector.value;
        const statusVal = filterStatus.value;

        const items = MaterialsModule.getAll().filter(item => {
            const matchSector = sectorVal === 'ALL' || item.sector === sectorVal;
            const matchStatus = statusVal === 'ALL' || item.status === statusVal;
            return matchSector && matchStatus;
        });

        tbody.innerHTML = '';

        if (items.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-muted); padding: 20px;">Nenhum material encontrado.</td></tr>`;
            return;
        }

        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td><span class="badge" style="margin:0">${item.sector}</span></td>
                <td>${item.qty} vol (${item.qty * item.weight} kg)</td>
                <td><span class="badge-status ${item.status}">${item.status}</span></td>
                <td>
                    <button class="action-btn" onclick="handleToggle('${item.id}')" title="Avançar Status">
                        <i class="fa-solid fa-rotate"></i>
                    </button>
                    <button class="action-btn delete" onclick="handleDelete('${item.id}')" title="Excluir">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function updateUI() {
        renderMetrics();
        renderTable();
    }

    // Eventos do Formulário de Material
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('mat-name').value;
        const sector = document.getElementById('mat-sector').value;
        const qty = document.getElementById('mat-qty').value;
        const weight = document.getElementById('mat-weight').value;

        MaterialsModule.addMaterial(name, sector, qty, weight);
        form.reset();
        updateUI();
    });

    // Evento de Contratação
    hireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('hire-name').value;
        const phone = document.getElementById('hire-phone').value;
        const location = document.getElementById('hire-location').value;
        const staffQty = document.getElementById('hire-staff-qty').value;
        const notes = document.getElementById('hire-notes').value;

        HireModule.processHireRequest(name, phone, location, staffQty, notes);
    });

    // Filtros
    filterSector.addEventListener('change', renderTable);
    filterStatus.addEventListener('change', renderTable);

    // Funções Globais para os Botões Inline da Tabela
    window.handleToggle = function (id) {
        MaterialsModule.toggleStatus(id);
        updateUI();
    };

    window.handleDelete = function (id) {
        if (confirm('Deseja realmente remover este item?')) {
            MaterialsModule.deleteMaterial(id);
            updateUI();
        }
    };

    // Inicializa Interface
    updateUI();
});