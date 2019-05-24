class View {
    element;

    createElement({ tagName, className = '', attributes = {}, content = '' }) {
        const element = document.createElement(tagName);
        if (typeof className === 'string') {
            element.classList.add(className);
        } else {
            element.classList.add(...className);
        }

        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });

        element.innerHTML = content;

        return element;
    }
}

export default View;