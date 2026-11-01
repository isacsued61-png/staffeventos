/**
 * Módulo para Operações com Materiais de Carga
 */
const MaterialsModule = (function () {
    let materialsList = [];

    function init() {
        materialsList = StorageModule.loadMaterials();
    }

    function getAll() {
        return materialsList;
    }

    function addMaterial(name, sector, qty, weight) {
        const newItem = {
            id: Date.now().toString(),
            name,
            sector,
            qty: parseInt(qty),
            weight: parseFloat(weight),
            status: 'Pendente'
        };
        materialsList.push(newItem);
        StorageModule.saveMaterials(materialsList);
        return newItem;
    }

    function toggleStatus(id) {
        const item = materialsList.find(m => m.id === id);
        if (item) {
            if (item.status === 'Pendente') item.status = 'Carregado';
            else if (item.status === 'Carregado') item.status = 'Descarregado';
            else item.status = 'Pendente';

            StorageModule.saveMaterials(materialsList);
        }
    }

    function deleteMaterial(id) {
        materialsList = materialsList.filter(m => m.id !== id);
        StorageModule.saveMaterials(materialsList);
    }

    function getMetrics() {
        const totalItems = materialsList.length;
        const loaded = materialsList.filter(m => m.status === 'Carregado').length;
        const unloaded = materialsList.filter(m => m.status === 'Descarregado').length;
        const totalWeight = materialsList.reduce((acc, curr) => acc + (curr.qty * curr.weight), 0);

        return { totalItems, loaded, unloaded, totalWeight };
    }

    return {
        init,
        getAll,
        addMaterial,
        toggleStatus,
        deleteMaterial,
        getMetrics
    };
})();