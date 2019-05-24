import View from './view';
import FighterView from './fighterView';
import {fighterService} from "../services/fightersService";

class FightersView extends View {
    constructor(fighters) {
        super();

        this.handleClick = this.handleFighterClick.bind(this);
        this.createFighters(fighters);
    }

    fightersDetailsMap = new Map();

    createFighters(fighters) {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleClick);
            return fighterView.element;
        });

        this.element = this.createElement({ tagName: 'div', className: 'fighters' });
        this.element.append(...fighterElements);
    }

    async handleFighterClick(event, fighter) {
        event.stopPropagation();

        if (!event.target.closest('.btn-select')) {
            if (!this.fightersDetailsMap.has(fighter._id)) {
                const fighterDetails = await fighterService.getFightersDetails(fighter._id);
                this.fightersDetailsMap.set(fighter._id, fighterDetails);
            }

            this.renderFighterDetails(fighter._id);
        } else {
            let selectedFighters = document.querySelectorAll('.fighter.selected');
            let selectBtn = event.target;
            let currentFighterContainer = selectBtn.closest('.fighter');
            currentFighterContainer.classList.toggle('selected');
            if (currentFighterContainer.classList.contains('selected')) {
                if (selectedFighters.length < 2) {
                    selectBtn.innerHTML = 'Deselect';
                } else {
                    currentFighterContainer.classList.remove('selected');
                }
            } else {
                selectBtn.innerHTML = 'Select Fighter';
            }
        }
    }

    renderFighterDetails(id) {
        let fighter = this.fightersDetailsMap.get(id);

        let popup = document.getElementById('fighter-details');
        popup.parentElement.classList.add('open');
        popup.classList.remove('closed');

        document.body.classList.add('noscroll');

        let fighterNameContainer = popup.querySelector('.fighter-name');
        fighterNameContainer.innerHTML = fighter.name;

        let fighterImageElement = popup.querySelector('.fighter-image img');
        fighterImageElement.setAttribute('src', fighter.source);
        fighterImageElement.setAttribute('alt', fighter.name);

        let fighterHealthInput = popup.querySelector('#fighter-health');
        fighterHealthInput.value = fighter.health;

        let fighterDefenceInput = popup.querySelector('#fighter-defense');
        fighterDefenceInput.value = fighter.defense;

        let fighterAttackInput = popup.querySelector('#fighter-attack');
        fighterAttackInput.value = fighter.attack;

        let fighterIdInput = popup.querySelector('#fighter-id');
        fighterIdInput.value = id;
    }

    getFightersList() {
        return this.fightersDetailsMap;
    }
}

export default FightersView;