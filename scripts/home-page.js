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


// need to clean up a bit since we turned off scrolling back up to make hero reappear. maybe add that back in if we can get it to not be annoying and bounce the user up and down
document.body.classList.add('no-scroll');

const scrollThreshold = 100;
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero__title');
let heroHidden = false; 

function handleScrollTransition() {
    if (window.innerWidth < 1280) {
        hero.removeEventListener('click', handleClick);

        window.addEventListener('scroll', function () {
            if (window.scrollY > scrollThreshold && !heroHidden) {
                hero.classList.add('hero--is-clicked'); 
                heroTitle.classList.add("hero__title--hidden");
                heroHidden = true; 
            }
        });
    } else {
        window.removeEventListener('scroll', handleScroll);
        hero.addEventListener('click', handleClick);
    }
}

function handleClick() {
    if (!heroHidden) {
        hero.classList.add('hero--is-clicked');
        heroTitle.classList.add("hero__title--hidden");
        heroHidden = true; 
    }
}

function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        hero.classList.add('hero--is-clicked'); 
        heroTitle.classList.add("hero__title--hidden");
    } else {
        hero.classList.remove('hero--is-clicked'); 
    }
}

handleScrollTransition();

window.addEventListener('resize', function () {
    handleScrollTransition();
});
