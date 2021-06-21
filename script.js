// pick the h1 tag
const header = document.querySelector("header");

header.style.transform = `rotate(-25deg)`;
header.style.top = `100px`;
header.style.marginLeft = `-50%`;

// change font size on scroll
window.addEventListener('scroll', () => {
    const pixels = window.pageYOffset;
    if(pixels > 75) {
        header.style.transform = `rotate(0deg)`;
        header.style.top = `0px`;
        header.style.marginLeft = `0`;
        // header.style.left = `auto`;
    }
    else {
        header.style.transform = `rotate(-25deg)`;
        header.style.top = `100px`;
        header.style.marginLeft = `-50%`;
    }
})

// window.addEventListener('resize', () => {
//     const pixels = window.pageYOffset;
//     const width = window.innerWidth;
//     console.log("width: ", width)
//     if(pixels < 75 && width > 850) {
//         header.style.marginLeft = `-${width/2 - 1}px`
//     }
// })