import Component from './component';
import closePopupWindow from "../helpers/closePopupWindow";

class CloseBtn extends Component {

    constructor(selector) {
        super(selector);

        this.eventHandlers({
            click: this.click
        });
    }

    click(e) {
        if (window.fightTimer) {
            clearInterval(window.fightTimer);
        }

        closePopupWindow(e.target.closest('.popup'));
        if (e.target.closest('#fight')) {
            document.querySelectorAll('.fighter.selected').forEach(item => {
                item.classList.remove('selected');
                item.querySelector('.btn-select').innerHTML = 'Select Fighter';
            });
        }
    }
}

export default CloseBtn;