/* ====== DOM Grab ====== */
var body = document.querySelector('body');


/* ====== Variables ====== */
var countdown;
var last_area;


/* ====== Functions ====== */
function peep(area) {
    let mole = area.querySelector('.mole');
    let height = getComputedStyle(mole).getPropertyValue('--height')

    mole.style.marginTop = 0;

    setTimeout( () => {
        mole.style.marginTop = height;
    }, 1000)
}


function populate_page(how_many) {
    for(let i=0; i < how_many; i++) {
        body.insertAdjacentHTML('beforeend',
            `<div class="area" data-count="${i}">
                <div class="mole"></div>
                <div class="hole"></div>
            </div>`)
    }
    
}


function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function random_area(areas) {
    countdown = setInterval( () => {
        let area = areas[ random(0, areas.length-1) ];

        // if(last_area) { console.log("last: " + last_area.dataset.count) }
        // console.log("current: " + area.dataset.count)
        // console.log("\n")

        if( area === last_area ) {
            // console.log("found a copy")
            clearInterval(countdown)
            random_area(areas)
        }
        else {
            peep(area)
        }

        last_area = area;
    }, random(500,3000))
}


function stop() {
    clearInterval(countdown)
}



/* ====== Events ====== */
populate_page(6)
var areas = Array.from( document.querySelectorAll('div.area') )
random_area(areas)