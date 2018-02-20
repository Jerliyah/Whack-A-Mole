/* ====== DOM Grab ====== */
body = document.querySelector('body');


/* ====== Variables ====== */



/* ====== Functions ====== */
function populate_page(how_many) {
    for(let i=0; i < how_many; i++) {
        body.insertAdjacentHTML('beforeend',
            `<div class="area">
                <div class="mole"></div>
                <div class="hole"></div>
            </div>`)
    }
    
}



/* ====== Events ====== */
populate_page(6)