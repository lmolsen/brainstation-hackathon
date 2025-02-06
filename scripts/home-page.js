document.body.classList.add('no-scroll');

const scrollThreshold = 100;

const hero = document.querySelector('.hero');

function handleScrollTransition() {
    if (window.innerWidth < 1280) {
        hero.removeEventListener('click', handleClick);

        window.addEventListener('scroll', function () {
            if (window.scrollY > scrollThreshold) {
                hero.classList.add('hero--is-clicked'); 
            } else {
                hero.classList.remove('hero--is-clicked');
            }
        });
    } else {
        window.removeEventListener('scroll', handleScroll);
        hero.addEventListener('click', handleClick);
    }
}

function handleClick() {
    hero.classList.toggle('hero--is-clicked');
}

function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        hero.classList.add('hero--is-clicked');
    } else {
        hero.classList.remove('hero--is-clicked');
    }
}

handleScrollTransition();

window.addEventListener('resize', function () {
    handleScrollTransition();
});

// SIMPLE CLICK
// window.scrollTo(0, 0);
// // Add the 'no-scroll' class to the body as soon as the page loads
// document.body.classList.add('no-scroll');

// // Hide hero section when clicked (still applies if hero is clicked later)
// function hideHero() {
//   const hero = document.querySelector('.hero');
  
//   // Start the transition on the hero section
//   hero.classList.add('hero--is-clicked');
  
//   // After the transition ends, hide the hero section completely
//   setTimeout(() => {
//     hero.classList.add('hero--hidden');
//   }, 500);  // Match the transition duration of 0.5s

//   setTimeout(() => {
//     document.body.classList.remove('no-scroll');
//   }, 500)
// }
