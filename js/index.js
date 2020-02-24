window.addEventListener('load', (event) => {
    const startingPage = 1; 
    renderMonsters(3,startingPage);
    btnListeners(startingPage);
    monsterInputFields();
});

// fetch 50 monsters 
function renderMonsters(limit,page){
    console.log(`Limit: ${limit}, Page: ${page}`)
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then(resp=>resp.json())
    .then(function(monsters){
        // remove all children from the monster list before rendering 
        const monsterList = document.querySelector("#monster-container");
        while (monsterList.firstChild){
            monsterList.firstChild.remove();
        }
        // for loop to render monsters 
        monsters.forEach(monster => renderMonster(monster,monsterList))

    })
}

// function to render specific monster 
function renderMonster(monster,appendTo){
    const monsterContainer = document.createElement("div");
    const monsterName = document.createElement("h2")
    monsterName.innerText = monster.name; 
    const monsterAge = document.createElement("h4");
    monsterAge.innerText=monster.age; 
    const monsterDescription = document.createElement("p"); 
    monsterDescription.innerText=`Bio: ${monster.description}`;
    
    // append to container 
    monsterContainer.appendChild(monsterName); 
    monsterContainer.appendChild(monsterAge); 
    monsterContainer.appendChild(monsterDescription); 
    appendTo.appendChild(monsterContainer);
}

// create a button for going forward 
// give it a dataset.page integer 
// on click, call renderMonsters with that button's page value +1 as the argument for page (still use 50 as the limit)
function btnListeners(page){
    // give the body a page var 
    document.querySelector("body").dataset.page = page; 
    const forwardBtn = document.querySelector('#forward'); 
    // forwardBtn.dataset.page = page; 
    const backBtn = document.querySelector('#back'); 
    // backBtn.dataset.page = page; 
    forwardBtn.addEventListener('click', function(e){
        // increase page count 
        let pageInt = parseInt(this.parentElement.dataset.page)
        pageInt +=1; 
        this.parentElement.dataset.page = pageInt;
        // re render the list with the new page 
        renderMonsters(3,pageInt)
    })

    backBtn.addEventListener('click',function(e){
        let pageCount = parseInt(this.parentElement.dataset.page); 
        if (pageCount>1){
            pageCount-=1; 
            renderMonsters(3,pageCount); 
            this.parentElement.dataset.page = pageCount; 
        }
    })
}

// create monster input form 
function monsterInputFields(){
    const monsterNameInput = document.createElement('input')
    monsterNameInput.id = "name"; 
    monsterNameInput.placeholder = "name..."; 

    const monsterAgeInput = document.createElement('input')
    monsterAgeInput.id = "age"; 
    monsterAgeInput.placeholder = "age..."; 

    const monsterDescInput = document.createElement('input')
    monsterDescInput.id = "description"; 
    monsterDescInput.placeholder = "description..."; 

    const submitMonsterBtn = document.createElement('button'); 
    submitMonsterBtn.innerText = "Create"; 
    submitMonsterBtn.addEventListener('click',function(e){
        let name = this.parentElement.querySelector("#name").value;
        let age = this.parentElement.querySelector("#age").value;
        let description = this.parentElement.querySelector("#description").value;
        createMonster(name,age,description); 
    })

    // append to create monster div 
    const createMonsterDiv = document.querySelector("#create-monster"); 
    createMonsterDiv.appendChild(monsterNameInput); 
    createMonsterDiv.appendChild(monsterAgeInput); 
    createMonsterDiv.appendChild(monsterDescInput); 
    createMonsterDiv.appendChild(submitMonsterBtn);    
}

function createMonster(name,age,desc){
    const objectData = { 
        "name": name,
        "age": age,
        "description":desc
    };

    fetch('http://localhost:3000/monsters', {
        method: 'POST', // or 'PUT'
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(objectData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}