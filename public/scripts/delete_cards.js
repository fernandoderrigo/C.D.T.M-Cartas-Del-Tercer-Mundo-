document.addEventListener('DOMContentLoaded', () => {
    const fetchCardButton = document.getElementById('fetch-card');
    const deleteCardButton = document.getElementById('delete-card');
    const cardTypeSelect = document.getElementById('card-type');
    const cardIdInput = document.getElementById('card-id');
    const previewContainer = document.getElementById('preview-container');
    const previewText = document.getElementById('preview-text');
    
    fetchCardButton.addEventListener('click', async () => {
        const cardType = cardTypeSelect.value;
        const cardId = cardIdInput.value;
        
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
            previewText.textContent = card.text; // Mostrar el texto de la carta en la vista previa
            previewContainer.className = cardType === 'black' ? 'black-preview' : 'white-preview'; // Cambiar el estilo según el tipo de carta
            previewContainer.style.display = 'flex'; // Mostrar la vista previa
            deleteCardButton.style.display = 'block';
            deleteCardButton.dataset.cardId = card.id; // Guardar el ID para eliminar
            deleteCardButton.dataset.cardType = cardType; // Guardar el tipo de carta
        } catch (error) {
            console.error('Error al obtener la carta:', error);
            previewText.textContent = 'No se pudo encontrar la carta.';
            previewContainer.className = 'black-preview'; // Cambiar a vista previa negra por defecto
            previewContainer.style.display = 'flex'; // Mostrar la vista previa
            deleteCardButton.style.display = 'none';
        }
    });

    deleteCardButton.addEventListener('click', async () => {
        const cardId = deleteCardButton.dataset.cardId;
        const cardType = deleteCardButton.dataset.cardType;

        if (!cardId) {
            alert('No se ha seleccionado ninguna carta para eliminar.');
            return;
        }

        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta carta?');
        if (!confirmDelete) {
            return;
        }

        try {
            let response;

            if (cardType === 'black') {
                response = await fetch(`/api/cards/black/${cardId}`, {
                    method: 'DELETE'
                });
            } else {
                response = await fetch(`/api/cards/white/${cardId}`, {
                    method: 'DELETE'
                });
            }

            if (!response.ok) {
                throw new Error('Error al eliminar la carta.');
            }

            const deletedCard = await response.json();
            alert('Carta eliminada con éxito.');
            previewText.textContent = 'Detalles de la carta aparecerán aquí.';
            previewContainer.style.display = 'none'; // Ocultar la vista previa
            deleteCardButton.style.display = 'none';
            cardIdInput.value = '';
        } catch (error) {
            console.error('Error al eliminar la carta:', error);
            alert('No se pudo eliminar la carta.');
        }
    });
});
