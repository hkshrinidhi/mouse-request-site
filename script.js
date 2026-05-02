document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.getElementById('button-container');
    const mainText = document.getElementById('main-text');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const music = document.getElementById('celebration-music');

    // 5. Below two options appear after a slight delay
    setTimeout(() => {
        buttonContainer.style.display = 'flex';
        buttonContainer.style.animation = 'fadeIn 1s ease-in-out';
    }, 1500); // 1.5 second delay
    // 6. For fun, when cursor is hovered on No, it swaps place with Yes
    let isSwapped = false;
    btnNo.addEventListener('mouseenter', () => {
        isSwapped = !isSwapped;
        if (isSwapped) {
            buttonContainer.style.flexDirection = 'row-reverse';
        } else {
            buttonContainer.style.flexDirection = 'row';
        }
    });

    // 7. After clicking either option -> confetti, music, text changes
    const handleSuccess = () => {
        // Change text
        mainText.innerText = 'Tank u so much';
        // Hide buttons
        buttonContainer.style.display = 'none';
        
        // Play music (wrapped in try/catch in case the placeholder file isn't valid yet or browser blocks auto-play)
        try {
            // Reset to start if it was played before
            music.currentTime = 0;
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio playback was prevented. This is expected if it's an empty placeholder file.", error);
                });
            }
        } catch (err) {
            console.log(err);
        }

        // Fire Confetti Animation
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, { particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    };

    btnYes.addEventListener('click', handleSuccess);
    btnNo.addEventListener('click', handleSuccess);
});
