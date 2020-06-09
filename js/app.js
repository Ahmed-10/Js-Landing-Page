/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Define Global Variables
 * 
*/
const navElements = document.querySelectorAll('section');
const nav = document.querySelector('nav');

const navList = document.createElement('ul');
let count = 0;
const options = { root: null, threshold: 0, rootMargin: "-150px -150px -150px -150px" };

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
* @description  build the nav list with the section available at the DOM
* @param        none
* @returns      non
*/
function buildNavList() {
    navList.classList.add('navbar__list');

    navElements.forEach(el => {
                                const navListElement = document.createElement('li');
    
                                navListElement.setAttribute('id', count);
                                navListElement.classList.add('menu__link');
                                
                                if(count == 0) { navListElement.textContent = 'landing page'; }
                                else { navListElement.textContent = `${ el.dataset.nav }`; }
    
                                count++;
                                navList.appendChild(navListElement);
                            });
    
    nav.appendChild(navList);
}

// Add class 'active' to section when near top of viewport
/**
* @description  the callback of the intersection observer to update the style of the nav list
* @param        list of IntersectionObserverEntry objets and the observer
* @returns      non
*/
function updateNavList(entries, observer) {
    const items = navList.querySelectorAll('li');
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }
        items.forEach(i => {
            i.classList.remove('active');
            i.classList.add('menu__link');
        })
    
        let id = entry.target.id;
        id = id.slice(7, 8);
        const listItem = document.getElementById(id)
        listItem.classList.add('active');
        listItem.classList.remove('menu__link');
    })
}


// Scroll to anchor ID using scrollTO event
/**
* @description  the function attached to the click event to scroll to specific item
* @param        event object
* @returns      none
*/
function scrollToItem(event) {
    const element = document.getElementById(`section${event.target.id}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'center'});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavList();
// Scroll to section on link click
nav.addEventListener('click', scrollToItem);

// Set sections as active
const observer = new IntersectionObserver(updateNavList, options);

navElements.forEach(element => { observer.observe(element); });

