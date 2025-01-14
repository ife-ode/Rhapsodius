const bar = document.querySelector('#navBar');
const menuBtn = document.querySelector('.menuBtn');
const dropDownMenu = document.querySelector('.dropdown_menu');

function showBar(){
    menuBtn.innerHTML = "close";
    menuBtn.title = "close";
    bar.classList.add('showing');
    dropDownMenu.style.display = 'block';

}

function hideBar() {
    menuBtn.innerHTML = "menu";
    menuBtn.title = "menu";
    bar.classList.remove('showing');
    dropDownMenu.style.display = 'none';

}

menuBtn.addEventListener('click',()=>{
    const isBarShowing = bar.classList.contains('showing');
    isBarShowing ? hideBar() : showBar();
})
