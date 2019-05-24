import closePopupWindow from '../helpers/closePopupWindow';

export default function () {
    let fighter = {};

    fighter._id = document.getElementById('fighter-id').value;
    fighter.name = document.querySelector('.fighter-name').textContent;
    fighter.health = document.getElementById('fighter-health').value;
    fighter.attack = document.getElementById('fighter-attack').value;
    fighter.defense = document.getElementById('fighter-defense').value;
    fighter.source = document.querySelector('.fighter-image img').getAttribute('src');

    closePopupWindow(document.querySelector('.popup'));

    return fighter;
}