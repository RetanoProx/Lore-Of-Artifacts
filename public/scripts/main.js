document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація Lottie для стрілок "Назад" та "Вперед"
    const player_3 = document.getElementById("Lottie_3");
    const player_4 = document.getElementById("Lottie_4");

    if (player_3) {
        player_3.addEventListener("ready", () => {
            LottieInteractivity.create({
                player: player_3.getLottie(),
                mode: "cursor",
                actions: [
                    {
                        type: "hover",
                        forceFlag: false
                    }
                ]
            });
        });
    }

    if (player_4) {
        player_4.addEventListener("ready", () => {
            LottieInteractivity.create({
                player: player_4.getLottie(),
                mode: "cursor",
                actions: [
                    {
                        type: "hover",
                        forceFlag: false
                    }
                ]
            });
        });
    }

    // Оновлення информації про обраний артефакт
    const listItems = document.querySelectorAll('.navigation .list');

    function updateArtifactInfo(index) {
        document.querySelector('.artifact-info-container .artifact-name').innerText = window.artifacts[index].name;
        document.querySelector('.artifact-info-container .artifact-description-1').innerText = window.artifacts[index].description[0];
        document.querySelector('.artifact-info-container .artifact-description-2').innerText = window.artifacts[index].description[1];
    }

    listItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            listItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            updateArtifactInfo(index);
        });
    });

    // Ініціалізація першого артефакту
    updateArtifactInfo(0);

    // Керування вспливаючим вікном для Trivia
    const triviaButton = document.querySelector('.custom-btn.btn-12');
    const triviaOverlay = document.getElementById('overlay');
    const closeTriviaOverlayButton = document.getElementById('close-overlay');

    if (triviaButton && triviaOverlay && closeTriviaOverlayButton) {
        triviaButton.addEventListener('click', () => {
            if (triviaButton.classList.contains('active')) {
                triviaOverlay.classList.add('hidden');
                triviaButton.classList.remove('active');
            } else {
                triviaOverlay.classList.remove('hidden');
                triviaButton.classList.add('active');
            }
        });

        closeTriviaOverlayButton.addEventListener('click', () => {
            triviaOverlay.classList.add('hidden');
            triviaButton.classList.remove('active');
        });

        triviaOverlay.addEventListener('click', (event) => {
            if (event.target === triviaOverlay) {
                triviaOverlay.classList.add('hidden');
                triviaButton.classList.remove('active');
            }
        });
    }

    // Керування вспливаючим вікном для About
    const aboutButton = document.querySelector('.about button');
    const aboutOverlay = document.getElementById('about-overlay');
    const closeAboutOverlayButton = document.getElementById('close-about-overlay');
    const footer = document.querySelector('footer');

    if (aboutButton && aboutOverlay && closeAboutOverlayButton && footer) {
        aboutButton.addEventListener('click', () => {
            aboutOverlay.classList.remove('hidden');
            footer.style.zIndex = '0'; // Міняємо z-index на 0 при відкритті вспливаючого вікна
        });

        closeAboutOverlayButton.addEventListener('click', () => {
            aboutOverlay.classList.add('hidden');
            footer.style.zIndex = '9999'; // Повертаємо z-index при закритті вікна
        });

        aboutOverlay.addEventListener('click', (event) => {
            if (event.target === aboutOverlay) {
                aboutOverlay.classList.add('hidden');
                footer.style.zIndex = '9999'; // Повертаємо z-index при кліке поза контентом
            }
        });
    }
});
