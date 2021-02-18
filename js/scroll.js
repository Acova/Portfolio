const isInVerticalViewport = (elem) => {
    const box = elem.getBoundingClientRect();
    return (
        box.top >= 35 &&
        box.bottom <= (window.innerHeight - 35 || document.documentElement.clientHeight)
    );
};

const toggleFade = (scrollableElems) => {
    for(let i = 0; i < scrollableElems.length; i++) {
        let elem = scrollableElems[i];
        if(isInVerticalViewport(elem)) {
            if(!elem.classList.contains("fade-in")) {
                elem.classList.remove("fade-out");
                elem.classList.add("fade-in");
            }
        }else {
            if(!elem.classList.contains("fade-out")) {
                elem.classList.remove("fade-in");
                elem.classList.add("fade-out");
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', toggleFade(document.getElementsByClassName("scrollable")));

document.addEventListener('scroll', () => {    
    let scrollableElems = document.getElementsByClassName("scrollable");
    toggleFade(scrollableElems);
});