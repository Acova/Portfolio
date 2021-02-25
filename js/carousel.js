const findByClassName = (className) => {
    let els = document.getElementsByClassName(className);
    let els_array = Array.prototype.map.call(els, (elem) => {
        return elem;
    });
    return els_array;
}

const configButtons = (titles) => {
    configNextButton(titles);
    configPreviousButton(titles);
}

const configNextButton = (titles) => {
    let previousIndex = titles.findIndex(elem => elem.classList.contains('previous-title'));
    let prev_title_btn = document.getElementsByClassName('carousel-btn-prev')[0];
    if(previousIndex === -1) {
        prev_title_btn.disabled = true;
    } else {
        prev_title_btn.disabled = false;
    }
}

const configPreviousButton = (titles) => {
    let nextIndex =  titles.findIndex(elem => elem.classList.contains('next-title'));
    let next_title_btn = document.getElementsByClassName('carousel-btn-next')[0];
    if(nextIndex === -1) {
        next_title_btn.disabled = true;
    } else {
        next_title_btn.disabled = false;
    }
}

const init = () => {
    let titles = findByClassName('carousel-title');
    initTitles(titles);
    let elems = findByClassName('carousel-elem');
    initBody(elems);
    configButtons(titles);
}

const initBody = (elems) => {
    if(elems) {
        elems[0].classList.add('current-elem');
        if(elems.length >= 2) {
            elems[1].classList.add('next-elem');
        }
    }
}

const initTitles = (titles) => {
    if(titles) {
        titles[0].classList.add('current-title', 'sideToCurrent');
        if(titles.length >= 2) { 
            titles[1].classList.add('next-title', 'noneToSide');
        }
        addTitlesFodder(titles);
    }
}

// Adds necesary fodder to the titles
const addTitlesFodder = (titles) => {
    if(titles[0].classList.contains('current-title')) {
        addTitleFodderBefore();
    }
    if(titles[titles.length - 1].classList.contains('current-title')) {
        addTitleFodderAfter();
    }
}

const addTitleFodderBefore = () => {
    let fodderSpan = document.createElement('span');
    fodderSpan.classList.add('fodder', 'noneToSide');
    let titles = findByClassName('carousel-nav')[0];
    titles.prepend(fodderSpan);
}

const addTitleFodderAfter = () => {
    let fodderSpan = document.createElement('span');
    fodderSpan.classList.add('fodder', 'noneToSide');
    let titles = findByClassName('carousel-nav')[0];
    titles.appendChild(fodderSpan);
}

// Deletes all fodder
const deleteFodder = () => {
    let fodderList = findByClassName('fodder');
    if (fodderList) {
        fodderList.forEach(elem => elem.remove());
    }
}

const nextSlider = () => {
    let titles = findByClassName('carousel-title');
    let elems = findByClassName('carousel-elem');

    deleteFodder();
    nextTitle(titles);
    nextElem(elems);
    configButtons(titles);
}

const nextTitle = (titles) => {
    // We modify the "previous" title
    let previousIndex = titles.findIndex(elem => elem.classList.contains('previous-title'));
    if(previousIndex != -1) {
        let previous = titles[previousIndex];
        previous.classList.remove('currentToSide', 'noneToSide');
        previous.classList.add('sideToNone');
        previous.addEventListener('animationend', e => {
            previous.classList.remove('previous-title');
            configButtons(titles);
        })
    }

    // We set the current title to the previous title
    let currentIndex = titles.findIndex(elem => elem.classList.contains('current-title'));
    let current = titles[currentIndex];
    current.classList.remove('sideToCurrent');
    current.classList.add('currentToSide');
    current.addEventListener('animationend', e => {
        current.classList.remove('current-title');
        current.classList.add('previous-title');
        configButtons(titles);
    });

    // We set the next title to the current title
    let nextIndex = titles.findIndex(elem => elem.classList.contains('next-title'));
    let next = titles[nextIndex];
    next.classList.remove('noneToSide', 'currentToSide');
    next.classList.add('sideToCurrent');
    next.addEventListener('animationend', e => {
        next.classList.remove('next-title');
        next.classList.add('current-title');
        configButtons(titles);
    });

    // We must make sure there are more elements
    if((titles.length - 1) > nextIndex){
        let newNext = titles[nextIndex + 1];
        newNext.classList.add('noneToSide', 'next-title');
    } else {
        addTitleFodderAfter();
    }
}

const nextElem = (elems) => {
    let currentIndex = elems.findIndex(elem => elem.classList.contains('current-elem'));
    let current = elems[currentIndex];
    current.classList.remove('current-elem');
    let next = elems[currentIndex + 1];
    next.classList.add('current-elem');
}

const previousSlider = () => {
    let titles = findByClassName('carousel-title');
    let elems = findByClassName('carousel-elem');

    deleteFodder();
    previousTitle(titles);
    previousElem(elems);
    configButtons(titles);
}

const previousTitle = (titles) => {
    // We set the next title to the current title
    let nextIndex = titles.findIndex(elem => elem.classList.contains('next-title'));
    if(nextIndex !== -1) {
        let next = titles[nextIndex];
        next.classList.remove('next-title');
    }

    // We set the current title to the previous title
    let currentIndex = titles.findIndex(elem => elem.classList.contains('current-title'));
    let current = titles[currentIndex];
    current.classList.remove('current-title');
    current.classList.add('next-title');

    // We modify the "previous" title
    let previousIndex = titles.findIndex(elem => elem.classList.contains('previous-title'));
    let previous = titles[previousIndex];
    previous.classList.remove('previous-title');
    previous.classList.add('current-title');

    // We must make sure there are more elements
    if(previousIndex === 0) {
        addTitlesFodder(titles);
    } else {
        let newPrev = titles [previousIndex - 1];
        newPrev.classList.add('previous-title');
    }

}

const previousElem = (elems) => {
    let currentIndex = elems.findIndex(elem => elem.classList.contains('current-elem'));
    let current = elems[currentIndex];
    current.classList.remove('current-elem');
    let next = elems[currentIndex - 1];
    next.classList.add('current-elem');
}

/* Events */

document.addEventListener('DOMContentLoaded', () => {
    init();
});