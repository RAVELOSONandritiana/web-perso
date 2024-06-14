let tableau = []//contient tout les elements du fichier profil.json
let liste_ajouter = ''
if(localStorage.getItem('ajouter')){
    liste_ajouter = localStorage.getItem('ajouter').split(',')
}

function _fetch(){
    fetch('../json/profil.json')
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        let d = []
        data.forEach(element => {
            if(!liste_ajouter.includes(element['nom'])){
                d.push(element)
            }
        });
        create_profil3(d)
    })
}

_fetch()

function return_element(element){
    let chemin_image = element['photo_profil']
    let img = document.createElement('img')
    img.src = chemin_image
    let beatmaker = document.createElement('div')
    beatmaker.setAttribute('class','beatmaker')
    beatmaker.appendChild(img)

    let profil = document.createElement('button')
    profil.textContent = "profil"
    profil.setAttribute('class','b2')
    profil.addEventListener('click',function(){
        let popup = document.querySelector('.popup-video')
        popup.style.display = 'block'
        let fichierJSON = `../json/${element['nom'].toLowerCase().replaceAll(' ','_')}.json`
        fetch(fichierJSON)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                if(fichierJSON != `${localStorage.getItem('chemin')}`){
                    localStorage.setItem('chemin',fichierJSON)
                    let v = document.querySelector('.video_du_popup')
                    for(let element of document.querySelectorAll('.video-ancien')){
                        v.removeChild(element)
                    }
                    for(let i = 0;i < data[0]['chemin_chanson'].length;i++){
                        let src = '../..' + data[0]['chemin_chanson'][i]
                        let popup = document.querySelector('.video_du_popup')
                        let video = document.createElement('video')
                        video.src = src
                        video.setAttribute('class','video-ancien')
                        video.setAttribute('controls','controls')
                        popup.appendChild(video)
                    }
                }
            })
    })
    beatmaker.appendChild(profil)

    let button = document.createElement('button')
    button.textContent = 'ajouter'
    button.addEventListener('click',function(e){
        let beat = document.querySelectorAll('.beatmaker')
        beat.forEach((element,index)=>{
            if(element == e.currentTarget.parentElement){
                let nom = element.childNodes[3].textContent
                if(localStorage.getItem('ajouter') == null){
                    localStorage.setItem('ajouter',`${nom}`)
                }
                else{
                    localStorage.setItem('ajouter',`${localStorage.getItem('ajouter')},${nom}`)
                }
                e.currentTarget.parentElement.parentElement.removeChild(element)
            }
        })

        header()
        // _fetch()
    })
    beatmaker.appendChild(button)

    let nom = document.createElement('h2')
    nom.textContent = element['nom']
    beatmaker.appendChild(nom)

    return beatmaker
}

function create_profil3(elements){
    for(let i = 0;i < elements.length;i++){
        let div = return_element(elements[i])
        document.querySelector('.list-profil').appendChild(div)
    }
}

document.querySelector('.fermer').addEventListener('click',function(){
    document.querySelector('.popup-video').style.display = 'none'
})

document.querySelector('.fermer-eteindre').addEventListener('click',function(){
    let popup = document.querySelector('.video_du_popup')
    for(let i = 0;i < popup.childElementCount;i++){
        for(let o of popup.children){
            popup.removeChild(o)
        }
    }
    document.querySelector('.popup-video').style.display = 'none'
})


