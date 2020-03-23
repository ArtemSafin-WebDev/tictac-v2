export default function() {
    const infoRows = Array.from(document.querySelectorAll('.tictac__info-card-content-list-item'));
    const tableRows = Array.from(document.querySelectorAll('.tictac__rocket-card-table-row'));

    infoRows.forEach(row => {
        const rowScore = row.querySelector('.score').textContent;
        row.classList.remove('tictac__info-card-content-list-item--red');
        row.classList.remove('tictac__info-card-content-list-item--yellow');
        if (rowScore < 89) {
            row.classList.add('tictac__info-card-content-list-item--red');
        } else if(rowScore >= 90 && rowScore <= 100) {
            row.classList.add('tictac__info-card-content-list-item--yellow');
        }
    })
    tableRows.forEach(row => {
        const rowScore = row.querySelector('.tictac__rocket-card-score-amount').textContent;
        row.classList.remove('tictac__rocket-card-table-row--red');
        row.classList.remove('tictac__rocket-card-table-row--yellow');
        if (rowScore < 89) {
            row.classList.add('tictac__rocket-card-table-row--red');
        } else if(rowScore >= 90 && rowScore <= 100) {
            row.classList.add('tictac__rocket-card-table-row--yellow');
        }
    })
}