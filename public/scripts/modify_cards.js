document.addEventListener('DOMContentLoaded', () => {
    const fetchCardButton = document.getElementById('fetch-card');
    const updateCardButton = document.getElementById('update-card');
    const cardTypeSelect = document.getElementById('card-type');
    const cardIdInput = document.getElementById('card-id');
    const previewContainer = document.getElementById('preview-container');
    const previewText = document.getElementById('preview-text');
    const modifyForm = document.getElementById('modify-form');
    const cardTextInput = document.getElementById('card-text');

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
            modifyForm.style.display = 'block'; // Mostrar el formulario de modificación
            cardTextInput.value = card.text; // Rellenar el textarea con el texto de la carta
            modifyForm.dataset.cardId = card.id; // Guardar el ID para actualizar
            modifyForm.dataset.cardType = cardType; // Guardar el tipo de carta
        } catch (error) {
            console.error('Error al obtener la carta:', error);
            previewText.textContent = 'No se pudo encontrar la carta.';
            previewContainer.className = 'black-preview'; // Cambiar a vista previa negra por defecto
            previewContainer.style.display = 'flex'; // Mostrar la vista previa
            modifyForm.style.display = 'none'; // Ocultar el formulario de modificación
        }
    });

    updateCardButton.addEventListener('click', async () => {
        const cardId = modifyForm.dataset.cardId;
        const cardType = modifyForm.dataset.cardType;
        const cardText = cardTextInput.value;

        if (!cardId || !cardText) {
            alert('Por favor, ingresa todos los detalles.');
            return;
        }

        try {
            let response;

            if (cardType === 'black') {
                response = await fetch(`/api/cards/black/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: cardText })
                });
            } else {
                response = await fetch(`/api/cards/white/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: cardText })
                });
            }

            if (!response.ok) {
                throw new Error('Error al actualizar la carta.');
            }

            const updatedCard = await response.json();
            alert('Carta actualizada con éxito.');
            previewText.textContent = updatedCard.text;
            modifyForm.style.display = 'none';
            cardIdInput.value = '';
        } catch (error) {
            console.error('Error al actualizar la carta:', error);
            alert('No se pudo actualizar la carta.');
        }
    });
});
