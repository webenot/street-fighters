import MessageView from "../views/messageView";
import {fighterService} from "../services/fightersService";

export default async function fightClick(fightersList) {
    document.body.classList.add('noscroll');

    let fightersContainers = document.querySelectorAll('.fighter.selected');

    if (fightersContainers.length < 2) {
        let msg = new MessageView('Please, select two fighters to begin', 'error');
        document.querySelector('.messages').append(msg.element);

        return false;
    } else {
        let fightContainer = document.getElementById('fight');
        fightContainer.closest('.popup').classList.add('open');
        fightContainer.classList.remove('closed');

        let fighter1 = fightersList.fightersDetailsMap.get(fightersContainers[0].querySelector('.btn-select').getAttribute('data-id'));
        let fighter2 = fightersList.fightersDetailsMap.get(fightersContainers[1].querySelector('.btn-select').getAttribute('data-id'));

        let fighter1Details = fighter1.fighter,
            fighter2Details = fighter2.fighter;

        if (!fighter1.fighter.health) {
            fighter1Details = await fighterService.getFightersDetails(fighter1.fighter._id);
        }
        if (!fighter2.fighter.health) {
            fighter2Details = await fighterService.getFightersDetails(fighter2.fighter._id);
        }

        let fighter1Card = fightContainer.querySelector('.fighter-left');
        let fighter2Card = fightContainer.querySelector('.fighter-right');

        fighter1Card.querySelector('.fighter-name').innerHTML = fighter1Details.name;
        fighter2Card.querySelector('.fighter-name').innerHTML = fighter2Details.name;

        fighter1Card.querySelector('.fighter-health').innerHTML = fighter1Details.health;
        fighter2Card.querySelector('.fighter-health').innerHTML = fighter2Details.health;
        fighter1Card.setAttribute('data-id', fighter1Details._id);
        fighter2Card.setAttribute('data-id', fighter2Details._id);

        let fighter1Image = fighter1Card.querySelector('img');
        let fighter2Image = fighter2Card.querySelector('img');

        fighter1Image.setAttribute('src', fighter1Details.source);
        fighter1Image.setAttribute('alt', fighter1Details.name);
        fighter2Image.setAttribute('src', fighter2Details.source);
        fighter2Image.setAttribute('alt', fighter2Details.name);

        return [fighter1Details, fighter2Details];
    }
}