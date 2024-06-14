const observer = new IntersectionObserver((entries) => {
    for(let entry of entries){
        if(entry.isIntersecting){

            entry.target.animate([
                {opacity:'0',transform:'scale(.5)'},
                {opacity:'1',transform:'scale(1)'}
            ],
            {
                duration : 500  
            })

            observer.unobserve(entry.target)
        }
    }
})

for(let i of document.querySelectorAll('.animate-image')){
    observer.observe(i)
}
const observerVideo = new IntersectionObserver((entries)=>{
    for(let element of entries){
        if(element.isIntersecting){
            element.target.animate([
                {opacity:'0',transform:'scale(.5) translateY(50px)'},
                {opacity:'1',transform:'scale(1)  translateY(-50px)'}
            ],{
                duration: 500
            })
            observerVideo.unobserve(element.target)
        }
    }
})

for(let i of document.querySelectorAll('video')){
    observerVideo.observe(i)
}

document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('main').style.display = 'none'
    document.querySelector('header').style.display = 'none'
    document.querySelector('footer').style.display = 'none'
    document.querySelector('.loader').style.display = 'block'
})

window.onload = function(){
    document.querySelector('main').style.display = 'block'
    document.querySelector('header').style.display = 'block'
    document.querySelector('footer').style.display = 'block'
    document.querySelector('.loader').style.display = 'none'
    document.querySelector('body').removeChild(document.querySelector('.body'))
}



