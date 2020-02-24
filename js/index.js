let page = 1;
const monstContainer = document.querySelector('#monster-container')
const pageForward = document.querySelector('#forward')
const pageBack = document.querySelector('#back')
const monsterCreator = document.querySelector('#create-monster')

document.addEventListener('DOMContentLoaded', (event) => {
    getMonsters();

    const pageForward = document.querySelector('#forward')
    const pageBack = document.querySelector('#back')

    pageForward.addEventListener('click', function(e) {
        moveForward()
    })

    pageBack.addEventListener('click', function(e) {
        moveBack()
    })

    makeForm()
});


function getMonsters() {
    const monstContainer = document.querySelector('#monster-container')
    monstContainer.innerHTML = ''
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then((response) => {
    return response.json();
    })
    .then((monsters) => {
    monsters.forEach(monster => makeMonster(monster));
    });
} 



function makeMonster(mon) {
    const monstContainer = document.querySelector('#monster-container')

    const monName = document.createElement('h1')
    monName.innerText = mon.name

    const monAge = document.createElement('h2')
    monAge.innerText = `Age: ${mon.age}`

    const monBio = document.createElement('p')
    monBio.innerText = `Bio: ${mon.description}`

    monstContainer.appendChild(monName)
    monstContainer.appendChild(monAge)
    monstContainer.appendChild(monBio)
}

function moveForward () {
    page += 1;
    getMonsters();
}

function moveBack () {
    if (page > 1) {
        page -= 1;
        getMonsters();
    }
}

function makeForm() {
    const monsterForm = document.createElement('form')
    const monsterCreator = document.querySelector('#create-monster')

    const formName = document.createElement('input')
    formName.type = 'text'
    formName.id = 'name'
    formName.placeholder = 'name...'

    const formAge = document.createElement('input')
    formAge.type = 'text'
    formAge.id = 'age'
    formAge.placeholder = 'age...'

    const formBio = document.createElement('input')
    formBio.type = 'text'
    formBio.id = 'description'
    formBio.placeholder = 'description...'

    const submitButton = document.createElement('input')
    submitButton.type = 'submit'
    submitButton.value = 'Submit'

    monsterForm.appendChild(formName)
    monsterForm.appendChild(formAge)
    monsterForm.appendChild(formBio)
    monsterForm.appendChild(submitButton)

    monsterForm.addEventListener('submit', function(e){
        e.preventDefault();
        let data = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }

        let dataObj = {
            method: 'POST',
            headers: 
                {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
                
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3000/monsters', dataObj)
        .then((response) => {
            return response.json();
        })
        .then((monster) => {
            makeMonster(monster);
        });
    })

    monsterCreator.appendChild(monsterForm)
}