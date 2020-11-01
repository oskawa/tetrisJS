const container = document.getElementById("grid");
for(var i = 0; i < 200; i++){
    container.innerHTML +=  '<div>' + '</div>';

}
for(var i = 0; i < 10; i++){
    container.innerHTML +=  '<div class="taken">' + '</div>';

}
const width = 10
// querySelector récupère une classe
const grid = document.querySelector('.grid')
//On récupère les divs dans la grid et on les stocke
// dans un tableau pour qu'ils aient une position définie sur la page
let squares = Array.from(document.querySelectorAll('.grid div'))
let nextRandom = 0
const displayIndex = 0
let timerID
let score = 0

const ScoreDisplay = document.querySelector('#score')
const StartBtn = document.querySelector('#start-button')

const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
]



// On crée les formes des tetromino en prenant en compte la grille
// Ils prendront forme grâce aux dimensions des div

const lTetromino = [
    [1,width+1,width*2+1, 2],
    [width, width+1,width+2, width*2+2],
    [1, width+1,width*2+1,width*2],
    [width, width*2, width*2+1, width*2+2]
]

const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
]

const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
]

const oTetromino = [
    [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
    ]

const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width, width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
]


const Tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
let currentPosition = 4
let currentRotation = 0


// Choix aléatoire des pièces
let random =Math.floor(Math.random()*Tetrominoes.length)
// Le premier tableau est la pièce
// Le second tableau est la rotation de la pièce
let current = Tetrominoes [random][currentRotation]
console.log(random)
console.log(current)

// On affiche le tetromino choisi
function draw() {
    current.forEach(index => {
        // On ajoute a squares, la variable qui contient les div
        // une classe qui s'appelle Tetromino
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
        squares[currentPosition + index].style.boxShadow = "inset 0 0 1px 1px lighten($hex,20)"
    })
}

function undraw()  {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}

// On fait tomber la pièce d'une div à la fois chaque seconde
// timerId = setInterval(moveDown, 1000)

window.addEventListener("keydown", function(e) {
     switch (e.key) {
         case "ArrowDown":
             // Faire quelque chose pour la touche "flèche vers le bas" pressée.
             break;
         case "ArrowUp":
             rotate()
             // Faire quelque chose pour la touche "up arrow" pressée.
             break;
         case "ArrowLeft":
             moveL()
             // Faire quelque chose pour la touche "left arrow" pressée.
             break;
         case "ArrowRight":
             moveR()
             // Faire quelque chose pour la touche "left arrow" pressée.
             break;
         default:

     }
}, true);






function moveDown(){
    //On efface
    undraw()
    //On ajoute à la position actuelle la hauteur de 10
    currentPosition +=width
    //On affiche
    draw()
    stop()
}

//Stopper la pièce quand elle touche par terre grâce aux div taken
function stop() {
    // Même principe que forEach, l'utilisation de some vérifie que la condition est vraie
    // NON PAS pour CHAQUE éléments du tableau, mais au moins pour un seul.
    //Donc si au moins l'une des pièces est sur une div qui contient la class 'taken'
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        // On ajoute la classe 'taken'
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        // Et On refait tomber une pièce
        random = nextRandom
        nextRandom =Math.floor(Math.random()*Tetrominoes.length)
        current = Tetrominoes [random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()

        gameOver()
    }


}

function moveL(){
    // On efface
    undraw()
    // On vérifie si la position n'est pas dans le coin gauche
    // Vu que notre tableau fait 10 de large, chaque début de ligne commence par 0, 10, 20, 30 ect
    // On fait un modulo, et s'il reste 0, ça veut dire que nous sommes dans un coin à gauche.
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -=1

    //Si on touche une classe taken, on remet la position initiale pour contrer le coté gauche
    if (current.some(index =>
        squares[currentPosition + index].classList.contains('taken'))){
    currentPosition +=1}
    draw()
}

function moveR(){
    undraw()
    //La même chose que précédemment mais lorsque c'est à droite, la largeur - 1 équivaut au coté droit
    const isAtRighttEdge = current.some(index => (currentPosition + index) % width === width -1)
    if (!isAtRighttEdge) currentPosition +=1
    if (current.some(index =>
        squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -=1}
    draw()
}

function rotate(){
    undraw()

    // On incrémente de 1 la position de l'index dans le tableau pour accèder à l'array suivant
    // Et donc tourner la pièce
    currentRotation ++
    // Si on arrive à la fin du tableau (4), on remet la rotation à 0
    if(currentRotation === current.length){
        currentRotation = 0
    }
    // On applique la rotation à la variable current
    current = Tetrominoes[random][currentRotation]
    draw()
}

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4


const UpNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1,2],
    [0, displayWidth, displayWidth+1,displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0,1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
]

function displayShape(){
    displaySquares.forEach(square =>{
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
    })
    UpNextTetrominoes[nextRandom].forEach(index=> {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
}


StartBtn.addEventListener('click', () => {

    if (timerID){
        clearInterval(timerID)
        timerID = null
        stopMusic()
    }else{
        draw()
        timerID = setInterval(moveDown, 200)
        nextRandom = Math.floor(Math.random()*Tetrominoes.length)
        displayShape()
        playMusic()

    }
})


function addScore() {
    for (let i = 0; i<199; i+=width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))){
            score +=10
            ScoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''

            })
            const squaresRemoved = squares.splice(i,width)
            squares = squaresRemoved.concat(squares)
            console.log(squaresRemoved)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

function gameOver() {
    if (current.some(index => squares[currentPosition+index].classList.contains('taken'))){
        ScoreDisplay.innerHTML = 'end'
        clearInterval(timerID)
    }

}

function playMusic() {
    const note = document.getElementById("music")
    //Rénitialise la touche pour jouer plusieurs fois la note
    note.currentTime = 0
    //Joue la note
    note.play()
    //
}

function stopMusic(){
    const note = document.getElementById("music")
    //Rénitialise la touche pour jouer plusieurs fois la note
    note.currentTime = 0
    //Joue la note
    note.pause()
    //
}