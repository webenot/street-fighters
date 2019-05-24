export default function closePopupWindow(element) {
    element.classList.remove('open');
    document.querySelectorAll('.window-open').forEach(item => {
        item.classList.add('closed');
    });
    document.body.classList.remove('noscroll');

    let fightTitle = document.querySelector('#fight .fight-title');
    fightTitle.classList.add('hidden');
    fightTitle.innerHTML = 'Please wait when the fight ends!';

    document.querySelectorAll('#fight .health-indicator .indicator').forEach(item => {
        item.style.width = '100%';
        item.style.backgroundColor = 'green';
    });

    document.querySelectorAll('#fight .fighter-hits').forEach(item => {
        item.classList.remove('show');
    });

    document.querySelectorAll('#fight .fighter-health').forEach(item => {
        item.style.color = 'green';
    });

    document.querySelector('#fight .fight .btn-start').removeAttribute('disabled');

    document.querySelector('.messages').innerHTML = '';
}