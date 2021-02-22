/* Helper functions */

const findByClassName = (className) => {
    let els = document.getElementsByClassName(className);
    let els_array = Array.prototype.map.call(els, (elem) => {
        return elem;
    });
    return els_array;
}

const confTitles = (els) => {
    els[0].classList.add("current-title");
    els[1].classList.add("next-title");
}

const init = () => {
    let titles = findByClassName("carousel-title");
    confTitles(titles);
    let prev_title_span = document.createElement('span');
    prev_title_span.classList.add("previous-title", "fodder");
    findByClassName("carousel-nav")[0].prepend(prev_title_span);
}


// Deletes all fodder
const deleteFodder = () => {
    let fodderList = findByClassName('fodder');
    if (fodderList) {
        fodderList.forEach(elem => elem.remove());
    }
}

const nextSlider = () => {
    let titles = findByClassName("carousel-title");

    // First, we delete the fodder, if there is
    deleteFodder();

    // We modify the "previous" title
    let previousIndex = titles.findIndex(elem => elem.classList.contains("previous-title"));
    if(previousIndex != -1) {
        let previous = titles[previousIndex];
        previous.classList.remove("previous-title");
    }

    // We set the current title to the previous title
    let currentIndex = titles.findIndex(elem => elem.classList.contains("current-title"));
    let current = titles[currentIndex];
    current.classList.remove("current-title");
    current.classList.add("previous-title");

    // We set the next title to the current title
    let nextIndex = titles.findIndex(elem => elem.classList.contains("next-title"));
    let next = titles[nextIndex];
    next.classList.remove("next-title");
    next.classList.add("current-title");

    // We must make sure there are more elements
    if((titles.length - 1) > nextIndex){
        let newNext = titles[nextIndex + 1];
        newNext.classList.add("next-title");
    } else {
        let next_title_span = document.createElement('span');
        next_title_span.classList.add("next-title");
        next_title_span.id = "carousel-fodder";
        findByClassName("carousel-nav")[0].appendChild(next_title_span);
        let next_title_btn = document.getElementById('carousel-btn-next');
        next_title_btn.setAttribute('disabled', 'true');
    }
}

/* Events */

document.addEventListener('DOMContentLoaded', () => {
    init();
});