const modal= document.getElementById('modal');
const modalShow = document.getElementById('show-modal'); //add bookmark
const modalClose=document.getElementById('modal-close');
const modalForm = document.getElementById('bookmark-form');
const webName = document.getElementById('website-name');
const webUrl = document.getElementById('website-url');

let bookmarkArr=[];

function modalToggle()
{
    modal.classList.add('show-modal');
    webName.focus();
}

modalShow.addEventListener('click',modalToggle);
modalClose.addEventListener('click', ()=>{ modal.classList.remove('show-modal')});
window.addEventListener('click', (e)=>{e.target === modal ? modal.classList.remove('show-modal'):false});


function validate(urlCheck,nameCheck)
{
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
    const regex = new RegExp(expression);

    if(!nameCheck || !urlCheck)
    {
        alert('Please submit values for both fields!');
        return false;
    }
    if(urlCheck.match(regex))
    {  
        alert('Successfully Match!');
    }
    if(!urlCheck.match(regex))
    {
        alert('Please provide a valid web address');
        return false;
    }

    return true;
}

function build(name,url)
{
    const favIcon= document.getElementById('favicon');
    const urlLink = document.getElementById('url');
    const bookItems = document.getElementById('bookmark-item');
    console.log(name)
    favIcon.setAttribute('alt','favicon');
    urlLink.setAttribute('href',`${url}`);
    urlLink.textContent = name;
    // favIcon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`); 

 
}
function loadBookmarks()
{
    if(localStorage.getItem('bookmarks'))
    {
        bookmarkArr = JSON.parse(localStorage.getItem('bookmarks'));
        
    }
    bookmarkArr.forEach((items)=>{
        const {name, url} = items ;
        build(name,url)
    })
        
        // console.log(bookmarkArr[i].name)            

}

function storeData(e)
{
    e.preventDefault();

    const name= e.target[0].value;
    let url = e.target[1].value;

    if(!url.includes('https://') && !url.includes('http://'))
    {
        url=`https://${url}`;
    }
    // console.log(name,url)
    if (!validate(url,name)) {return false}

    const el ={
        name: name,
        url: url
    }

    bookmarkArr.push(el)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArr));
    loadBookmarks();
    modalForm.reset();
    webName.focus();
    
}

modalForm.addEventListener('submit', storeData);

// on Load
loadBookmarks()