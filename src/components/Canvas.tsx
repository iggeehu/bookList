import React, { FC, useEffect, useRef} from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks'

import styles from './css/canvas.module.css'



export const Canvas = (props)=>{
    const id=props.id;
    const canvasRef = useRef(null)
    const thisList = useAppSelector(state=>state.myLists.lists.filter(elem=>elem.listID==id)[0].list)
    const imageArray = thisList.map(elem=>elem.image? elem.image.smallThumbnail:null)

    useEffect(() => {
        const canvas = canvasRef.current;
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
      }, [])
    
    return <canvas ref={canvasRef} width="150" height="150"></canvas>
}