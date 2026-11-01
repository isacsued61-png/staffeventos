/**
 * Módulo para Tratar Solicitações de Orçamento com o Dono
 */
const HireModule = (function () {

    function processHireRequest(name, phone, location, staffQty, notes) {
        const message = `Olá Carlos, gostaria de contratar equipe para evento!%0A%0A` +
            `*Nome/Empresa:* ${encodeURIComponent(name)}%0A` +
            `*Telefone:* ${encodeURIComponent(phone)}%0A` +
            `*Data/Local:* ${encodeURIComponent(location)}%0A` +
            `*Equipe Desejada:* ${encodeURIComponent(staffQty)}%0A` +
            `*Detalhes:* ${encodeURIComponent(notes || 'Nenhum detalhe adicional')}`;

        const whatsappNumber = "5561998105292"; // Substitua pelo número real do dono
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
    }

    return {
        processHireRequest
    };
})();