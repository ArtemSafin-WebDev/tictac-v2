import PerfectScrollbar from 'perfect-scrollbar';
import { lockScroll, unlockScroll } from './scrollBlocker';
import { debounce } from 'lodash';
import detectIt from 'detect-it';

export default function() {
    const navBtns = Array.from(document.querySelectorAll('.js-tab-nav'));
    const sloganItems = Array.from(document.querySelectorAll('.js-slogan-item'));
    const dataTabs = Array.from(document.querySelectorAll('.js-data-tab'));
    const infoContentLists = Array.from(document.querySelectorAll('.js-info-content-list'));
    const scrollbars = [];
    const searchBox = document.querySelector('#search');
    const threeColNav = Array.from(document.querySelectorAll('.js-three-col-nav'));
    const threeColTabs = Array.from(document.querySelectorAll('.js-three-col-tabs'));
    const burger = document.querySelector('.js-burger');
    const menuScrollingContainer = document.querySelector('.page-header__nav-inner');
    const mobileTypes = Array.from(document.querySelectorAll('.js-type-item'));

    const URLparams = new URLSearchParams(window.location.search);

    


    let currentStep = 0;
    let currentInnerTab = 0;
    let menuOpen = false;


    if (URLparams.has('step')) {

        currentStep = +URLparams.get('step');
        console.log(URLparams.get('step'));
    }

    const nameFields = Array.from(document.querySelectorAll('.name'));

   

    function search(term, textFragment) {
        const re = new RegExp(term.toString(), 'i');
        if (textFragment.search(re) != -1) {
            return true;
        } else {
            return false;
        }
    }

    function setActiveItem(item, itemIndex) {
        if (itemIndex !== currentStep) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }
    function setActiveInnerTab(item, itemIndex) {
        if (itemIndex !== currentInnerTab) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }

    function changeStep(index) {
        currentStep = index;
        navBtns.forEach(setActiveItem);
        sloganItems.forEach(setActiveItem);
        dataTabs.forEach(setActiveItem);
        mobileTypes.forEach(setActiveItem);
        closeMenu();

        if (CustomEvent) {
            const event = new CustomEvent('tabchange');
            document.dispatchEvent(event);
        }

    }

    function changeInnerTabs(index) {
        currentInnerTab = index;
        threeColNav.forEach(setActiveInnerTab);
        threeColTabs.forEach(setActiveInnerTab);
        
    }

    function openMenu() {
        document.body.classList.add('menu-open');
        menuOpen = true;
        lockScroll(menuScrollingContainer, window.matchMedia(`(max-width: 768px)`).matches);
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        menuOpen = false;
        unlockScroll(menuScrollingContainer);
    }

    function handleMenu() {
        if (!menuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    function updateScrollbars() {
        scrollbars.forEach(bar => bar.update());
    }

    navBtns.forEach((btn, btnIndex) => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            changeStep(btnIndex);
        });
    });

    threeColNav.forEach((btn, btnIndex) => {
        btn.addEventListener('click', event => {
           
            event.preventDefault();
            changeInnerTabs(btnIndex);
        });
    });

    if (!detectIt.hasTouch) {
        infoContentLists.forEach(contentList => {
            const scrollbar = new PerfectScrollbar(contentList, {
                wheelSpeed: 2,
                wheelPropagation: false,
                minScrollbarLength: 20
            });

            scrollbars.push(scrollbar);
        });
    }

    if (burger)
        burger.addEventListener('click', event => {
            event.preventDefault();
            handleMenu();
           
        });

    changeStep(currentStep);
    changeInnerTabs(currentInnerTab);

    const handleInput = event => {
        const term = event.target.value;
        // console.log('Searching for', term);
        nameFields.forEach(field => {
            const fieldText = field.textContent;
            const foundMatch = search(term, fieldText);
            if (foundMatch) {

                const closestListItem = field.closest('li');
                const closestTableRow = field.closest('tr');
                if (closestListItem) closestListItem.classList.remove('search-hidden');
                if (closestTableRow) closestTableRow.classList.remove('search-hidden');
                // console.log('Found match in field', field);
            } else {
               
                const closestListItem = field.closest('li');
                const closestTableRow = field.closest('tr');
                if (closestListItem) closestListItem.classList.add('search-hidden');
                if (closestTableRow) closestTableRow.classList.add('search-hidden');
                // console.log('Match not found in field', field);
            }
        });
        updateScrollbars();
    };

    const debouncedHandleInput = debounce(handleInput, 300);

    if (searchBox) searchBox.addEventListener('input', debouncedHandleInput);
}
