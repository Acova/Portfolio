const isInViewport = (elem) => {
    const box = elem.getBoundingClientRect();
    return (
        box.top >= 100 &&
        box.left >= 0 &&
        box.bottom <= (window.innerHeight + 100 || document.documentElement.clientHeight + 100 ) &&
        box.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const toggleFade = (scrollableElems) => {
    for(let i = 0; i < scrollableElems.length; i++) {
        let elem = scrollableElems[i];
        if(isInViewport(elem)) {
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

document.addEventListener('scroll', () => {
    let img = document.getElementById("header-img");
    console.log(img.getBoundingClientRect());
})