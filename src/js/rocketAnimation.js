import anime from 'animejs/lib/anime.es.js';

export default function() {
    const rocketCards = Array.from(document.querySelectorAll('.js-rocket-card'));

    rocketCards.forEach(card => {
        const counterAnimations = [];
        const rocketCardRows = Array.from(card.querySelectorAll('.tictac__rocket-card-table-row'));
        const scoreElements = Array.from(card.querySelectorAll('.tictac__rocket-card-score-amount'));

        const scores = scoreElements.map(element => parseInt(element.textContent, 10));
        const maxScore = Math.max(...scores);

        // console.log('Scores', scores);
        // console.log('Max score', maxScore);
        rocketCardRows.forEach(row => {
            const rowScoreElement = row.querySelector('.tictac__rocket-card-score-amount');
            const rowScore = parseInt(rowScoreElement.textContent, 10);
            const ratingElement = row.querySelector('.tictac__rocket-card-rating');
            const bars = Array.from(row.querySelector('.tictac__rocket-card-rating-dots').children);
            const rocketElement = row.querySelector('.tictac__rocket-card-score');

            const counter = {
                score: 0
            };

            const baseAnimationDuration = 1.7;

            const percentage = rowScore / maxScore;

            const animationDuration = baseAnimationDuration * percentage;

            // console.log('Animation duration', animationDuration);

            // console.log('Percentage', percentage * bars.length);

            const barsToShow = Math.floor(bars.length * percentage);

            for (let step = 0; step < barsToShow; step++) {
                bars[step].classList.add('shown');
            }

            ratingElement.style.setProperty('--rocket-percent', percentage * 100 + '%');

            rocketElement.style.setProperty('animation-duration', animationDuration + 's');

            if (!window.matchMedia('(max-width: 768px)').matches) {
                const counterAnimation = anime({
                    targets: counter,
                    score: rowScore,
                    easing: 'linear',
                    duration: animationDuration * 1000,
                    round: 1,
                    update: function() {
                        rowScoreElement.textContent = counter.score;
                    }
                });

                counterAnimations.push(counterAnimation);
            }

            // console.log('Current row score', rowScore);

            // console.log('Bars count', bars.length);

            // console.log('Bars to show', barsToShow);
        });

        document.addEventListener('tabchange', function() {
            counterAnimations.forEach(animation => animation.restart());
        });
    });
}
