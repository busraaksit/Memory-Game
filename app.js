const cardContainer = document.querySelector(".card");
const colors = [ "aqua", "purple", "pink", "gold", "blue", "teal", "orange", "white", "brown", "deeppink", "lightcoral", "olive"];
const colorPicklist = [...colors, ...colors];
const tileCount = colorPicklist.length;

//Game state

let revealedCount = 0;  
let activeTile = null;   
let awaitingEndOfMove= false;

function buildTile(color) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {

        const revealed = element.getAttribute("data-revealed");

       if(
        awaitingEndOfMove
        || revealed === "true"
        || element === activeTile
        ){
        return;
       } 

       element.style.backgroundColor = color; 

       if(!activeTile){
        activeTile = element;

        return;
       }

       const colorToMatch = activeTile.getAttribute("data-color");

       if(colorToMatch === color){

        activeTile.setAttribute("data-revealed", "true");
        element.setAttribute("data-revealed", "true");

        awaitingEndOfMove = false;
        activeTile = null;
        revealedCount += 2;

        if(revealedCount ===tileCount){
            alert( "you win! refresh to play again");
        }
        return;
       }

       awaitingEndOfMove =true;

       setTimeout(() => {
        element.style.backgroundColor = null;
        activeTile.style.backgroundColor = null;

        awaitingEndOfMove = false;
        activeTile = null;
       }, 1000);

       });

    return element;
}

//Build up cards     
for ( let i =0 ; i< tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorPicklist.length);
    const color = colorPicklist[randomIndex];
    const tile = buildTile(color);


    colorPicklist.splice(randomIndex, 1);  //randomIndex içinden 1 ögeyi kaldır
    cardContainer.appendChild(tile);
}


