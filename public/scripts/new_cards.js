document.getElementById('add-card-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cardType = document.getElementById('card-type').value;
    const cardText = document.getElementById('card-text').value;

    if (!cardType || !cardText) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch(`/api/cards/${cardType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: cardText }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar la carta.');
        }

        const result = await response.json();
        alert('Carta agregada exitosamente');
        document.getElementById('add-card-form').reset();
    } catch (error) {
        console.error('Error al agregar la carta:', error);
        alert('No se pudo agregar la carta.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cardTypeSelect = document.getElementById('card-type');
    const cardTextInput = document.getElementById('card-text');
    const previewContainer = document.getElementById('preview-container');
    const previewText = document.getElementById('preview-text');
    const jokeText = document.getElementById('joke-text');

// Lista de chistes
const jokes = [
    "Si algún día necesitas una mano, recuerda que yo tengo dos.",
    "Dicen que el tiempo lo cura todo, pero si sigues siendo feo, lo siento.",
    "Estaba tan solo que se compró un espejo para tener a alguien con quien hablar.",
    "Mi abuela murió en paz, dormida... No como los pasajeros de su coche, que gritaban aterrorizados.",
    "Mi terapeuta dice que soy demasiado vengativo. Veremos si sigue diciendo lo mismo después de que queme su casa.",
    "Mi amigo murió de hambre en una tienda de caramelos porque no había wifi para buscar las calorías de cada producto.",
    "¿Cuál es la diferencia entre una pizza y tu opinión? Que yo pedí la pizza.",
    "¿Qué hace una persona con epilepsia en la bañera? El remix de Despacito.",
    "El otro día atropellé a una gallina. Ahora está en el cielo… de mi parrilla.",
    "Me dijeron que el trabajo duro nunca mató a nadie, pero prefiero no arriesgarme.",
    "Las escaleras nunca me han caído bien... siempre me tiran.",
    "¿Por qué no puedes confiar en los átomos? Porque lo inventan todo.",
    "El cementerio está lleno de gente que se murió por consejos que no pidieron.",
    "El FMI me dijo que mi economía se parece a una dieta: siempre sufriendo.",
    "Ayer fui al hospital público y me dijeron que vuelva en tres meses... para sacar turno.",
    "La inflación es como mi ex: siempre vuelve cuando menos lo espero.",
    "¿Cuál es la diferencia entre un político y un ladrón? El ladrón te elige a ti.",
    "La única inflación que me gusta es la de los globos en los cumpleaños.",
    "Si la vida te da limones, abre un negocio y súmate al mercado negro.",
    "Cuando alguien dice 'bajar los precios', me suena a ciencia ficción.",
    "Me dijeron que fuera a terapia, pero prefiero seguir echándole la culpa a mis padres."
];


    // Función para mostrar un chiste aleatorio
    function displayRandomJoke() {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        jokeText.textContent = jokes[randomIndex];
    }

    // Mostrar un chiste aleatorio al cargar la página
    displayRandomJoke();

    // Función para actualizar la vista previa
    function updatePreview() {
        const cardType = cardTypeSelect.value;
        const cardText = cardTextInput.value;

        // Actualizar el texto de la vista previa
        previewText.textContent = cardText || 'Vista previa de la carta';

        // Cambiar el estilo según el tipo de carta
        if (cardType === 'black') {
            previewContainer.className = 'black-preview';
        } else {
            previewContainer.className = 'white-preview';
        }
    }

    // Actualizar la vista previa cuando cambie el tipo de carta o el texto
    cardTypeSelect.addEventListener('change', updatePreview);
    cardTextInput.addEventListener('input', updatePreview);

    // Inicializar la vista previa
    updatePreview();
});
