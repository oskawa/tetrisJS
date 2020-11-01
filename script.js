//Création d'un tableau avec les touches du clavier pour ensuites les associer aux div
const WHITE_KEYS = ['q', 's', 'd', 'f', 'g', 'h', 'j']
const BLACK_KEYS = ['z', 'e', 't', 'y', 'u']


// Toutes les touches du piano avec la class "key" sont selectionnés et sauvegardé dans une variable
const keys = document.querySelectorAll('.key')

// Selection de toutes les touches blanches et de toutes les touches noires
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')


keys.forEach(key => {
    // Lors du clic, on joue la fonction playNote
    key.addEventListener('click', () => playNote(key))

})

document.addEventListener('keydown', e => {
    // Dans le cas où la touche reste pressée
    if (e.repeat) return
    // Associe une variable à la touche du clavier pressée
    const key = e.key
    // On cherche dans le tableau la position de la touche du clavier pressée
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)

    // Si l'index des touches équivaut à quelque chose, on joue la note blanche correspondante grâce à la variable qui a selectionné toutes les touches
    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])




})


function playNote(key) {
    // Liaison entre les div et l'audio
    const noteAudio = document.getElementById(key.dataset.note)
    //Rénitialise la touche pour jouer plusieurs fois la note
    noteAudio.currentTime = 0
    //Joue la note
    noteAudio.play()
    // Change la class de la div pour modifier la couleur
    key.classList.add('active')
    //Réinitialise la couleur quand la div est finie d'être cliqué
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })

}

