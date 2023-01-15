import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    //The attack function only works if isWaiting is false.
    if(!isWaiting){
        //roll the dice
        wizard.setDiceHtml()
        monster.setDiceHtml()
        //taking damage
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        //calling endgame if wizard or All monsters dead
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            //If there are any monsters left in the monsters array 
            if(monstersArray.length > 0){
                //to clearly see the health bar of monsters
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()