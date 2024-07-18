document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-card');
    const cardPreview = document.getElementById('card-preview');
    const previewContainer = document.getElementById('preview-container');
    const previewText = document.getElementById('preview-text');

    searchButton.addEventListener('click', async () => {
        const cardType = document.getElementById('card-type').value;
        const cardId = document.getElementById('card-id').value;

        if (!cardId) {
            alert('Por favor, ingresa un ID de carta.');
            return;
        }

        try {
            let response;

            if (cardType === 'black') {
                response = await fetch(`/api/cards/black/${cardId}`);
            } else {
                response = await fetch(`/api/cards/white/${cardId}`);
            }

            if (!response.ok) {
                throw new Error('Carta no encontrada.');
            }

            const card = await response.json();

            // Mostrar vista previa
            previewText.textContent = card.text; 
            previewContainer.className = cardType === 'black' ? 'black-preview' : 'white-preview';
            cardPreview.style.display = 'flex'; // Mostrar la vista previa

        } catch (error) {
            console.error('Error al obtener la carta:', error);
            previewText.textContent = 'No se pudo encontrar la carta.';
            previewContainer.className = 'black-preview'; // Cambiar a vista previa negra por defecto
            cardPreview.style.display = 'flex'; // Mostrar la vista previa
        }
    });
});
