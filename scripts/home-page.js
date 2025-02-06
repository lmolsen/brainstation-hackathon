// document.body.classList.add('no-scroll');

// const scrollThreshold = 100;

// const hero = document.querySelector('.hero');
// function handleScrollTransition() {
//     if (window.innerWidth < 1280) {
//         hero.removeEventListener('click', handleClick);

//         window.addEventListener('scroll', function () {
//             if (window.scrollY > scrollThreshold) {
//                 hero.classList.add('hero--is-clicked'); 
//             } else {
//                 hero.classList.remove('hero--is-clicked');
//             }
//         });
//     } else {
//         window.removeEventListener('scroll', handleScroll);
//         hero.addEventListener('click', handleClick);
//     }
// }

// function handleClick() {
//     hero.classList.toggle('hero--is-clicked');
// }

// function handleScroll() {
//     if (window.scrollY > scrollThreshold) {
//         hero.classList.add('hero--is-clicked');
//     } else {
//         hero.classList.remove('hero--is-clicked');
//     }
// }

// handleScrollTransition();

// window.addEventListener('resize', function () {
//     handleScrollTransition();
// });

document.body.classList.add('no-scroll');

const scrollThreshold = 100;
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('hero__title');
let heroHidden = false; // Track if hero has already been hidden

function handleScrollTransition() {
    if (window.innerWidth < 1280) {
        hero.removeEventListener('click', handleClick);

        window.addEventListener('scroll', function () {
            if (window.scrollY > scrollThreshold && !heroHidden) {
                hero.classList.add('hero--is-clicked'); // Hide the hero
                // heroTitle.classList.add("hero__title--hidden");
                heroHidden = true; // Prevent reappearing
            }
        });
    } else {
        window.removeEventListener('scroll', handleScroll);
        hero.addEventListener('click', handleClick);
    }
}

function handleClick() {
    if (!heroHidden) {
        hero.classList.add('hero--is-clicked'); // Hide the hero on click
        heroHidden = true; // Prevent reappearing
    }
}

function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        hero.classList.add('hero--is-clicked'); // Hide the hero after scrolling past threshold
        heroTitle.classList.add("hero__title--hidden");
    } else {
        hero.classList.remove('hero--is-clicked'); // Make hero visible again when scrolling back up
    }
}

handleScrollTransition();

window.addEventListener('resize', function () {
    handleScrollTransition();
});
