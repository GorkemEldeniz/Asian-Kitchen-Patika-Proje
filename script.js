import { menu } from './app.js';
const container = document.querySelector('.content');
const  btns = document.querySelectorAll('.btn-item');

function createMenu(item){
    return `
    <div class="menu-items" data-id="${item.id}" data-category="${item.category}">
        <img src="${item.img}" alt="" class="photo">
        <div class="menu-info">
            <h4 class="menu-title">${item.title} <span>${item.price}</span></h4>
            <p class="menu-text">${item.desc}</p>
        </div>
    </div>`
    
}

function createLayer(arr){
    arr.forEach(item => {
        container.innerHTML += createMenu(item);
    })
}

createLayer(menu);

//active btn animation
document.body.addEventListener('click',e => {
    if(![...btns].includes(e.target)){
        removeActiveBtn();
        showAll();
    }
})

btns.forEach(btn => {
    btn.addEventListener('click',e => {
        removeActiveBtn();
        let category = e.target.getAttribute('data-cate');
        showItem(category);
        e.target.classList.add('active');
    })
})

//hide all
function showAll(){
    document.querySelectorAll('.menu-items').forEach(el => el.classList.remove('hide'));
}
function hideAll(){
    document.querySelectorAll('.menu-items').forEach(el => el.classList.add('hide'));
}

function showItem(category){
    hideAll();
    if(category == 'All') showAll();
    else{
        showFilter(category).forEach((el,index)=> {
            el.classList.remove('hide');
            el.style.setProperty('order',index);
        });
    }
}

function showFilter(category){
    return [...document.querySelectorAll('.menu-items')].filter(el => el.getAttribute('data-category') == category)
}

//filter the items according to btn
function resetDom(){
    container.innerHTML = '';
}


function removeActiveBtn(){
    btns.forEach(el => el.classList.remove('active'));
}

function filterMenu(category){
    resetDom();
    if(category == 'All') {
       createLayer(menu);
    }
    else{
        let ar = menu.filter(el => el.category == category);
        createLayer(ar);
    }
}

