import View from './view';

class FighterView extends View {
    constructor(fighter, handleClick) {
        super();

        this.createFighter(fighter, handleClick);
    }

    createFighter(fighter, handleClick) {
        const { name, source } = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const selectFighterBtn = this.createSelectBtn(fighter._id);

        this.element = this.createElement({ tagName: 'div', className: 'fighter' });
        this.element.append(imageElement, nameElement, selectFighterBtn);
        this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }

    createName(name) {
        const nameElement = this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;

        return nameElement;
    }

    createImage(source) {
        const attributes = { src: source };
        return this.createElement({
            tagName: 'img',
            className: 'fighter-image',
            attributes
        });
    }

    createSelectBtn(id) {
        const attributes = { "data-id": id };
        return this.createElement({
            content: 'Select Fighter',
            tagName: 'button',
            className: ['btn', 'btn-select'],
            attributes
        });
    }
}

export default FighterView;