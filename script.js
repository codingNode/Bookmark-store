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

function deleteBookmark(url)
{
  
    
    bookmarkArr.forEach((item,i)=>{
        
        if(item.url === url)
        {
            console.log(item)
            bookmarkArr.splice(i,1); 
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArr));
    loadBookmarks();
    
}


function build()
{
    
    const bookItems = document.getElementById('container');

    bookItems.textContent = '';

    bookmarkArr.forEach((items)=>{
        const {name, url} = items ;


        const item= document.createElement('div');
        item.classList.add('item');

        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid', 'fa-xmark');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick',  `deleteBookmark('${url}')`);

        const linkInfo =document.createElement('div');
        linkInfo.classList.add('name');

        const img = document.createElement('img');
        img.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        img.setAttribute('alt','favicon');

        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank')
        link.textContent = name;

        linkInfo.append(img,link);
        item.append(closeIcon,linkInfo);

        bookItems.appendChild(item);
 
    })
   
 
}
function loadBookmarks()
{
    if(localStorage.getItem('bookmarks'))
    {
        bookmarkArr = JSON.parse(localStorage.getItem('bookmarks'));
        
    }
    
    build();          

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