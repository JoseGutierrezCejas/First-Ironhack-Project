const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')



loadedImages = {}

const imageLinks = [ 
    {link: "./images/background1.gif", name: 'background'},
    {link: "./images/player.png", name: 'player'},
    {link: "./images/apple.png", name: 'apple'},
    {link: "./images/tnt.png", name: 'tnt'},
    {link: "./images/score.png", name: 'score'},


  ]
  
  let counterForLoadedImages = 0;
  
  imageLinks.forEach((imagen)=>{ 
    const img = new Image() 
    img.src = imagen.link 
    img.onload = ()=>{ 
      counterForLoadedImages++ 
      loadedImages[imagen.name] = img
      if(imageLinks.length === counterForLoadedImages){ 
        ctx.drawImage(loadedImages.background,0.5,0)
        ctx.drawImage(loadedImages.player,0,158,100,100)
        ctx.drawImage(loadedImages.score,0,0,30,30)
        ctx.drawImage(loadedImages.tnt,500,226,30,30)
        ctx.drawImage(loadedImages.apple,300,230,20,20)
      }
    }
  })
  const updateCanvas = ()=>{



    requestAnimationFrame(updateCanvas)
}
updateCanvas()