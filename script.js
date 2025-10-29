document.addEventListener('DOMContentLoaded', () => {
    const pergamena = document.getElementById('pergamena');
    const immagineFinale = document.getElementById('immagineFinale'); // Ottieni il riferimento all'immagine finale

    const frames = [
        'images/pergamena1.png',
        'images/pergamena2.png',
        'images/pergamena3.png',
        'images/pergamena4.png'
    ];
    let currentFrameIndex = 0;
    let isAnimating = false; // Per evitare click multipli durante l'animazione
    const fadeDuration = 1000; // Durata del fade in millisecondi (deve corrispondere al CSS)

    pergamena.addEventListener('click', () => {
        if (isAnimating || currentFrameIndex === frames.length - 1) {
            // Se l'animazione è già in corso O la pergamena è già completamente srotolata, ignora il click
            return;
        }

        isAnimating = true;
        let animationStep = 0;
        const animationInterval = setInterval(() => {
            animationStep++;
            if (currentFrameIndex + animationStep < frames.length) {
                // Continua con l'animazione dei frame
                pergamena.src = frames[currentFrameIndex + animationStep];
            } else {
                // Animazione frame terminata, ora gestiamo il fade
                clearInterval(animationInterval);
                currentFrameIndex = frames.length - 1; // Assicurati che l'indice sia l'ultimo frame

                // 1. Fade out della pergamena
                pergamena.classList.remove('visible'); // Rimuovi visible nel caso ci fosse
                pergamena.classList.add('hidden');

                // 2. Attendi la durata del fade out, poi fai apparire la nuova immagine
                setTimeout(() => {
                    pergamena.style.display = 'none'; // Rimuovi completamente la pergamena dopo il fade
                    immagineFinale.classList.remove('hidden');
                    immagineFinale.classList.add('visible'); // Fa apparire l'immagine finale con fade in

                    isAnimating = false; // Reset dello stato di animazione
                }, fadeDuration); // Aspetta che il fade out sia completo
            }
        }, 500); // Velocità di cambio frame (regola come preferisci)
    });

    // Assicurati che la pergamena sia visibile all'inizio
    pergamena.classList.add('visible'); 
    immagineFinale.classList.add('hidden'); // E che l'immagine finale sia nascosta
});