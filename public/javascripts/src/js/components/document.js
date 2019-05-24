import closePopupWindow from '../helpers/closePopupWindow';

class Document {

    constructor() {
        this.eventHadlers({
            click: this.documentClick
        });
    }

    eventHadlers(events) {
        for (let event in events) {
            if (events.hasOwnProperty(event)) {
                document.addEventListener(event, events[event]);
            }
        }
    }

    documentClick(event) {
        let el = event.target;
        document.querySelectorAll('.popup').forEach(item => {
            if(item.classList.contains('open') && !el.closest('.window-open') && !el.closest('.btn-go')) {
                closePopupWindow(item);
            }
        });
    }
}

export default Document;