$(document).ready(function() {
    const cards = [
        { id: 1, image: 'imagens/ana.jpeg' },
        { id: 2, image: 'imagens/castle.png' },
        { id: 3, image: 'imagens/elsa.jpg' },
        { id: 4, image: 'imagens/hans.jpg' },
        { id: 5, image: 'imagens/kristof.png' },
        { id: 6, image: 'imagens/Movie.jpg' },
        { id: 7, image: 'imagens/olaf.jpg' },
        { id: 8, image: 'imagens/sven.jpg' },
        { id: 1, image: 'imagens/ana2.jpeg' },
        { id: 2, image: 'imagens/castle2.png' },
        { id: 3, image: 'imagens/elsa2.jpg' },
        { id: 4, image: 'imagens/hans2.jpg' },
        { id: 5, image: 'imagens/kristof2.png' },
        { id: 6, image: 'imagens/Movie2.jpg' },
        { id: 7, image: 'imagens/olaf2.jpg' },
        { id: 8, image: 'imagens/sven2.jpg' }
    ];

    // Embaralhar as cartas
    cards.sort(() => Math.random() - 0.5);

    let flippedCards = [];
    let lockBoard = false;

    // Selecionar o elemento de áudio
    const backgroundMusic = document.getElementById('background-music');

    // Iniciar a música após o primeiro clique do usuário
    $(document).one('click', function() {
        backgroundMusic.play();
    });

    $('.card').each(function(index) {
        $(this).attr('data-id', cards[index].id);
        $(this).find('img').attr('src', cards[index].image);
    });

    $('.card').click(function() {
        if (lockBoard || $(this).hasClass('flipped') || flippedCards.length === 2) return;

        $(this).addClass('flipped');
        flippedCards.push($(this));

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    });

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = $(card1).attr('data-id') === $(card2).attr('data-id');

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        flippedCards.forEach(card => {
            $(card).off('click');
        });
        resetBoard();
        checkGameOver();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            flippedCards.forEach(card => {
                $(card).removeClass('flipped');
            });
            resetBoard();
        }, 500);
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false];
    }

    function checkGameOver() {
        if ($('.card.flipped').length === cards.length) {
            // Exibe o texto de vitória
            $('h1').html(" <h2> Você Ganhou Parabéns! 🎉🎉🎉 </h2> ").addClass("game-over");

            // Efeitos de confetes
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Criar flocos de neve
            createSnowflakes();

            const victorySound = document.getElementById('win-sound');
            victorySound.play();  // Toca o som de vitór
        }
    }

    function createSnowflakes() {
        const snowflakes = 50; // Número de flocos de gelo
        for (let i = 0; i < snowflakes; i++) {
            const snowflake = $('<div class="snowflake"></div>');
            $('body').append(snowflake);
            snowflake.css({
                left: Math.random() * 100 + '%',
                animationDuration: Math.random() * 3 + 2 + 's',
                animationDelay: Math.random() * 5 + 's'
            });
        }
    }
});





