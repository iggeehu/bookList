import React, { useEffect, useRef} from "react";


export const Canvas = (props)=>{
    // const id=props.listObj.id;
    const canvasRef = useRef(null)
    const thisList = props.listObj.list
    const imageArray = thisList.map(elem=>elem.image? elem.image.smallThumbnail:null)

    useEffect(
      () => {
        const canvas = canvasRef.current;
        try{
        const ctx = canvas.getContext('2d');
        let imageOrder = 0;
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 3; j++) {
                if(imageOrder<imageArray.length){
                    const img = new Image();
                    img.src = imageArray[imageOrder]
                    img.onload = () => {ctx.drawImage(img, j * 50, 6+i * 70, 50, 70);}
                    imageOrder++;
                }}}     
        }
        catch(e){
          console.error(e);
        }
      },[])
    
    return <canvas ref={canvasRef} width="150" height="150"></canvas>
}