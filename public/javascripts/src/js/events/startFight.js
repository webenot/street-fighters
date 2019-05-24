export default function startFight(fightersList, e) {
    e.currentTarget.setAttribute('disabled', 'disabled');

    let fightTitle = document.querySelector('.fight-title');
    fightTitle.classList.remove('hidden');

    let fighters = [];

    fighters.push({
        container: e.currentTarget.closest('.fighter-container').querySelector('.fighter-left')
    });
    fighters.push({
        container: e.currentTarget.closest('.fighter-container').querySelector('.fighter-right')
    });
    fighters.map(item => {
        item.fighter = fightersList.fightersDetailsMap.get(item.container.getAttribute('data-id'));
        item.bang = item.container.querySelector('.fighter-bang');
        item.avoid = item.container.querySelector('.fighter-avoid');
        item.winner = item.container.querySelector('.fighter-winner');
        item.indicator = item.container.querySelector('.health-indicator .indicator');
        item.healthContainer = item.container.querySelector('.fighter-health');
        item.health = item.fighter.fighter.health;

        return item;
    });

    window.fightTimer = setInterval(() => {
        fighters.forEach(item => {
            item.bang.classList.remove('show');
            item.avoid.classList.remove('show');
        });

        let hits = [];
        hits.push(fighters[1].fighter.getHitPower() - fighters[0].fighter.getBlockPower());
        hits.push(fighters[0].fighter.getHitPower() - fighters[1].fighter.getBlockPower());

        hits.forEach((item, index) => {
            if (parseInt(item) > 0) {
                fighters[index].container.querySelector('.fighter-hit-count span').textContent = '-' + item;
                fighters[index].bang.classList.add('show');
                fighters[index].health -= item;
                fighters[index].healthContainer.textContent = fighters[index].health;

                let diff1 = fighters[index].health / fighters[index].fighter.fighter.health;

                if (diff1 > 0.8) {
                    fighters[index].healthContainer.style.color = '#00FF00';
                    fighters[index].indicator.style.backgroundColor = '#00FF00';
                } else if (diff1 > 0.4 && diff1 <= 0.8) {
                    fighters[index].healthContainer.style.color = '#D97E0B';
                    fighters[index].indicator.style.backgroundColor = '#D97E0B';
                } else if (diff1 <= 0.4){
                    fighters[index].healthContainer.style.color = 'red';
                    fighters[index].indicator.style.backgroundColor = 'red';
                }
                fighters[index].indicator.style.width = diff1 * 100 + '%';
            } else {
                fighters[index].avoid.classList.add('show');
            }
        });

        setTimeout(() => {
            fighters.forEach(item => {
                item.bang.classList.remove('show');
                item.avoid.classList.remove('show');
            });
        }, 1000);
        if (fighters[0].health <= 0 || fighters[1].health <= 0) {
            clearInterval(window.fightTimer);

            let winner;

            if (fighters[0].health < fighters[1].health) {
                fighters[1].winner.classList.add('show');
                fighters[0].indicator.style.width = 0;

                winner = fighters[1].fighter.fighter.name;
            } else {
                fighters[0].winner.classList.add('show');
                fighters[1].indicator.style.width = 0;
                winner = fighters[0].fighter.fighter.name;
            }
            fightTitle.innerHTML = `And the winner is - <strong>${winner}</strong>!`;
        }
    }, 1500);
}