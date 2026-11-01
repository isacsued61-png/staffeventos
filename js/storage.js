/**
 * Módulo para Persistência no LocalStorage
 */
const StorageModule = (function () {
    const STORAGE_KEY = 'staff_eventos_materiais';

    function loadMaterials() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            const initialData = [
                { id: '1', name: 'Cases de Iluminação Moving Heads', sector: 'Iluminação', qty: 4, weight: 35, status: 'Pendente' },
                { id: '2', name: 'Caixas de Som P.A Subwoofer', sector: 'Som', qty: 2, weight: 50, status: 'Carregado' },
                { id: '3', name: 'Praticáveis de Palco 2x1', sector: 'Palco', qty: 8, weight: 25, status: 'Descarregado' }
            ];
            saveMaterials(initialData);
            return initialData;
        }
        return JSON.parse(data);
    }

    function saveMaterials(materials) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
    }

    return {
        loadMaterials,
        saveMaterials
    };
})();