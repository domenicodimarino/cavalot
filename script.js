document.addEventListener('DOMContentLoaded', () => {
    const pergamena = document.getElementById('pergamena');
    const immagineFinale = document.getElementById('immagineFinale');
    const introMessageTop = document.getElementById('introMessageTop');
    const introMessageBottom = document.getElementById('introMessageBottom');

    const frames = [
        'images/pergamena1.png',
        'images/pergamena2.png',
        'images/pergamena3.png',
        'images/pergamena4.png'
    ];
    let currentFrameIndex = 0;
    let isAnimating = false;
    const fadeDuration = 1000; 

    // --- NUOVA FUNZIONE ---
    // Abbiamo spostato tutta la logica del click qui
    function startAnimation() {
        if (isAnimating || currentFrameIndex === frames.length - 1) {
            return;
        }

        isAnimating = true;

        // FADE OUT DI ENTRAMBI i messaggi introduttivi
        introMessageTop.classList.add('hidden');
        introMessageBottom.classList.add('hidden'); 
        
        // Aspetta la durata del fade out dei messaggi
        setTimeout(() => {
            
            introMessageTop.style.display = 'none';
            introMessageBottom.style.display = 'none';
            
            // Il resto dell'animazione
            let animationStep = 0;
            const animationInterval = setInterval(() => {
                animationStep++;
                if (currentFrameIndex + animationStep < frames.length) {
                    pergamena.src = frames[currentFrameIndex + animationStep];
                } else {
                    clearInterval(animationInterval);
                    currentFrameIndex = frames.length - 1;

                    // Pausa opzionale di 0.5s su pergamena4
                    setTimeout(() => {
                        pergamena.classList.add('hidden');

                        setTimeout(() => {
                            pergamena.style.display = 'none';
                            immagineFinale.classList.remove('hidden');
                            immagineFinale.classList.add('visible');

                            isAnimating = false;
                        }, fadeDuration); // Tempo del fade out
                    }, 500); // Pausa
                }
            }, 1000); 
        }, fadeDuration); 
    }
    
    // --- MODIFICA CHIAVE ---
    // Aggiungiamo *entrambi* gli event listener alla nuova funzione
    pergamena.addEventListener('click', startAnimation);
    pergamena.addEventListener('touchend', startAnimation); // <-- Aggiunto per il mobile

    // Inizializzazione (invariata)
    pergamena.classList.add('visible'); 
    immagineFinale.classList.add('hidden');
});