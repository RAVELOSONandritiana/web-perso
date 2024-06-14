// localStorage.setItem('ajouter','')
if(localStorage.getItem('ajouter') == null){
    localStorage.setItem('ajouter','')
}
function header(){
    if(document.querySelector('header nav')){
        document.querySelector('header').removeChild(document.querySelector('header nav'))
    }
    let header = document.querySelector('header')
    let nav = document.createElement('nav')
    let img = document.createElement('img')
    img.src = "../../images_global/Download DJ Logo Letter Monogram Slash with Modern logo designs template for free.jpeg"
    let ul = document.createElement('ul')
    let tab_title = ["accueil","recommandes","projet","libre","tutoriel"]
    let tab_lien  = ["accueil.html","recommandes.html","projet.html","libre.html","tutoriel.html"]
    tab_title.forEach((e,i)=>{
        let element = document.createElement('li')
        element.textContent = e.toUpperCase()
        let div = document.createElement('div')
        div.setAttribute('class','cpt')
        if(i == 2 && localStorage.getItem('ajouter')){
            let cpt = document.createElement('div')
            cpt.setAttribute('class','cpt_projet')
            
            localStorage.setItem('ajouter',localStorage.getItem('ajouter').split(',').filter((e)=>{
                return e.length
            }).join(','))


            if(localStorage.getItem('ajouter')){
                cpt.textContent = localStorage.getItem('ajouter').split(',').filter((e)=>{
                    return e.length?1:0
                }).length
            }
            div.appendChild(cpt)
        }
        if(i == 3){
            let c = 0
            fetch('../json/profil.json')
                .then((response)=>{
                    return response.json()
                })
                .then((data)=>{
                    data.forEach((element,i) => {
                        c++
                    });
                    return c
                })
                .then((c)=>{
                    let cpt = document.createElement('div')
                    cpt.setAttribute('class','cpt_projet')
                    cpt.textContent = c - localStorage.getItem('ajouter').split(',').filter((e)=>{
                        return e.length?1:0
                    }).length
                    div.appendChild(cpt)
                })
        }
        let a = document.createElement('a')
        a.href = tab_lien[i]
        a.addEventListener('click',function(e){
            if(document.location.href.includes(tab_lien[i])){
                e.preventDefault()
            }
        })
        a.appendChild(element)
        div.appendChild(a)
        ul.appendChild(div)
    })
    nav.appendChild(img)
    nav.appendChild(ul)
    header.appendChild(nav)
}

window.onload = header()
