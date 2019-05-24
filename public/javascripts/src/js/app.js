import { fighterService } from './services/fightersService';
import FightersView from './views/fightersView';
import FightersList from "./data/fightersList";
import Document from "./components/document";
import CloseBtn from "./components/closeBtn";
import saveFighter from "./events/saveFighter";
import fightClick from "./events/fightClick";
import startFight from "./events/startFight";

class App {
    constructor() {
        this.startApp();
    }

    static rootElement = document.getElementById('root');
    static loadingElement = document.getElementById('loading-overlay');

    async startApp() {
        try {
            App.loadingElement.style.visibility = 'visible';

            const fighters = await fighterService.getFighters();
            const fightersView = new FightersView(fighters);
            const fightersElement = fightersView.element;
            const fightersList = new FightersList(fighters);

            document.querySelector('.fight-settings').classList.remove('hidden');

            App.rootElement.appendChild(fightersElement);

            new Document();
            new CloseBtn('.close-btn');

            let saveBtn = document.querySelector('#fighter-details .btn-save');
            saveBtn.addEventListener('click', e => {
                fightersList.set(saveFighter());
                console.log(fightersList);
            });

            let fightBtn = document.querySelector('.btn-go');
            fightBtn.addEventListener('click', e => {
                let fighters;
                fightClick(fightersList)
                    .then(fightersResult => {
                        fighters = fightersResult;
                        if (fighters) {
                            fighters.forEach(item => {
                                fightersList.set(item);
                            });
                        }
                    });
            });

            let startFightBtn = document.querySelector('.btn-start');
            startFightBtn.addEventListener('click', e => {
                startFight(fightersList, e);
            });

        } catch (error) {
            console.warn(error);
            App.rootElement.innerText = 'Failed to load data';
        } finally {
            App.loadingElement.style.visibility = 'hidden';
        }
    }
}

export default App;