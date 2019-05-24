import View from "./view";

class MessageView extends View {
    constructor(message, className) {
        super();

        this.createMessage(message, className);

        this.element.addEventListener('click', this.onClick);
    }

    createMessage(message, className) {
        this.element = this.createElement({ tagName: 'div', className, content: message });
        this.element.append(this.createCloseBtn());
    }

    createCloseBtn() {
        const closeElement = this.createElement({ tagName: 'span', className: 'close' });
        closeElement.innerText = 'x';

        return closeElement;
    }

    onClick(e) {
        if (e.target.closest('.close')) {
            e.currentTarget.remove();
        }
    }
}

export default MessageView;