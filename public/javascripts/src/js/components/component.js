class Component {

    element;

    constructor(selector) {
        this.element = document.querySelectorAll(selector);
    }

    eventHandlers(events = {}) {
        for (let event in events) {
            if (events.hasOwnProperty(event)) {
                this.element.forEach(item => {
                    item.addEventListener(event, events[event])
                });
            }
        }
    }
}

export default Component;