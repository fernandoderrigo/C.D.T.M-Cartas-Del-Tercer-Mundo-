const loadCards = async () => {
    try {
        // Hacer una solicitud a la API para obtener cartas aleatorias
        const response = await fetch('/api/cards/random');
        
        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parsear la respuesta JSON
        const data = await response.json();

        // Obtener el contenedor donde se mostrarán las cartas
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas cartas

        // Verificar si data.cards existe y es un array
        if (Array.isArray(data.blackCards) && Array.isArray(data.whiteCards)) {
            data.blackCards.forEach(card => {
                // Crear un nuevo elemento para cada carta negra
                const cardElement = document.createElement('div');
                cardElement.className = 'card black-card';
                cardElement.textContent = card.text;
                cardsContainer.appendChild(cardElement);
            });

            data.whiteCards.forEach(card => {
                // Crear un nuevo elemento para cada carta blanca
                const cardElement = document.createElement('div');
                cardElement.className = 'card white-card';
                cardElement.textContent = card.text;
                cardsContainer.appendChild(cardElement);
            });
        } else {
            console.error('La respuesta de la API no contiene arrays de cartas.');
        }
    } catch (error) {
        // Manejar errores en la solicitud o procesamiento de datos
        console.error('Error al cargar las cartas:', error);
    }
};

// Añadir un listener al botón para actualizar las cartas al hacer clic
document.getElementById('load-cards').addEventListener('click', loadCards);

// Cargar las cartas al iniciar
loadCards();
