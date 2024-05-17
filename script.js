window.addEventListener("DOMContentLoaded", ()=>{
    const blockContainer= document.getElementById("blocks");
    const blockSize= 50;
    const screenWidth= window.innerWidth;
    const screenHeight= window.innerHeight;
    const numcols= Math.ceil(screenWidth/blockSize);
    const numrows= Math.ceil(screenHeight/blockSize);
    const numBlocks= numcols*numrows+20;

    function createBlocks(){
        for(let i=0; i<numBlocks; i++){
            const block= document.createElement("div");
            block.classList.add("block");
            block.dataset.index= i;
            block.addEventListener("mousemove", highlightRandomNeighbours);
            blockContainer.appendChild(block);
        }
    }

    function highlightRandomNeighbours(){
        const index= parseInt(this.dataset.index);
        const neighbours= [
            index-1, index+1, index-numcols, index+numcols, index-numcols-1, index-numcols+1, index+numcols-1, index+numcols+1
        ].filter(
            (i)=>
                i>=0 &&
            i< numBlocks &&
            Math.abs((i%numcols)-
        (index%numcols))<=1
        );

        this.classList.add("highlight");
        setTimeout(()=>{
            this.classList.remove("highlight");

        }, 500);

        shuffleArray(neighbours).slice(0, 1).forEach((nIndex)=>{
            const neighbour =blockContainer.children[nIndex];
            if(neighbour){
                neighbour.classList.add("highlight");
                setTimeout(()=>{
                    neighbour.classList.remove("highlight");
                }, 500);
            }
        });
    }

    function shuffleArray(array){
        for(let i=array.length-1; i>0; i--){
            const j= Math.floor(Math.random()*(i+1));
            [array[i], array[j]]= [array[j], array[i]];
        }
        return array;
    }
    createBlocks();
})