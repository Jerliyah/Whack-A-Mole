/*
    TODO:
    - Score to win
    - Leveling system?
*/

/* ====== DOM Grab ====== */
var main = document.querySelector('main');
var score = document.querySelector('#scoreboard > span')


/* ====== Variables ====== */
var countdown;
let peep_time;
var last_area;
var scoreboard = 0;


/* ====== Functions ====== */
function initiate() {
    score.innerText = scoreboard;

    countdown = setInterval( () => {
        let area = random_area(areas)

        if( area ) { peep(area.querySelector('.mole')) }
        else {
            clearInterval(countdown);
            initiate()
        }
    }, random(1000,2500) /*1000*/)
}



function peep(mole) {
    mole.classList.add('mole-active')

    peep_time = setTimeout( () => {
        mole.classList.remove('mole-active')
    }, 1500)
}


function populate_page(how_many) {
    for(let i=0; i < how_many; i++) {
        main.insertAdjacentHTML('beforeend',
            `<div class="area" data-count="${i}">
                <div class="mole"></div>
                <div class="hole"></div>
            </div>`)
    }

    let moles = Array.from( main.querySelectorAll('.mole') )
    // console.log(moles)
    
    moles.forEach( mole => {
        mole.addEventListener('click', whack)
    })
    
}


function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function random_area(areas) {
        let area = areas[ random(0, areas.length-1) ];

        // if(last_area) { console.log("last: " + last_area.dataset.count) }
        // console.log("current: " + area.dataset.count)
        // console.log("\n")

        if( area === last_area ) {
            // console.log("found a copy")
            random_area(areas)
        }
        else {
            last_area = area;
            return area;
        }
}


function stop() {
    clearInterval(countdown)
}


function whack() {

    // To ensure that the user can't get more than 1 point on a whacked mole
    if( ! this.classList.contains('mole-whacked') ) {
        scoreboard += 1;
        score.innerText = scoreboard;
    }

    clearTimeout(peep_time)
    this.classList.add('mole-whacked');

    setTimeout( () => {
        this.classList.remove('mole-whacked');
        this.classList.remove('mole-active');
    }, 1000)
}



/* ====== Events ====== */
populate_page(6)
var areas = Array.from( document.querySelectorAll('div.area') )
initiate()