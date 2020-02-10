const url = `http://localhost:3000`

$('#registerBtn').on('click',function(){
  display('registerPage')
})

$('#loginBtn').on('click',function(){
  console.log('woi')
  display('loginPage')
})

$('#btn-logout').on('click',function(){
  console.log('log')
  localStorage.clear()
  load()
})

$('#submitLoginForm').on('click',function(e){
  e.preventDefault()
  // console.log('uuuui')
  let email = $('#loginForm').find('#email').val()
  let password = $('#loginForm').find('#password').val()
  console.log(email,password)
  $.ajax({
    url: `${url}/login`,
    method: 'POST',
    data:{
      email,
      password
    }
  })
  .done(token=>{
    console.log(`berhasil login`)
    console.log(token)
    localStorage.setItem('token',token)
    display('homePage')
    load()
  })
  .fail(err=>{
    console.log(`gagal login`)
  })
})

$('#submitRegisterButton').on('click',function(e){
  e.preventDefault()
  console.log('woi')
  let username = $('#registerForm').find('#name').val()
  let email = $('#registerForm').find('#email').val()
  let password = $('#registerForm').find('#password').val()
  console.log(username,email,password)
  $.ajax({
    url: `${url}/register`,
    method: 'POST',
    data:{
      username,
      email,
      password
    }
  })
  .done(result=>{
    $('#registerPage').find('#successR').show()
    console.log(`berhasil register`)
  })
  .fail(err=>{
    console.log(`gagal register`)
  })
})

function display(page){
  const pages = ['registerPage','loginPage','homePage','updatePage']
  for(let i = 0; i < pages.length; i++){
    if(page == pages[i]){
      console.log(page==pages[i],'<<<')
      $(`#${pages[i]}`).show()
    }else{
      $(`#${pages[i]}`).hide()
    }
  }
  localStorage.setItem('page', page)
  if(page == 'homePage'){
    comicList()
  }
}

function comicList(){
  $.ajax({
    url: `${url}/comics`,
    method: 'GET',
    headers: {token:localStorage.token}
  })
  .done(comics=>{
    console.log(comics,'<<<<')
    for(let i = 0; i < comics.length; i++){
      $('#comicList').append(`
      <div class="col-4 mb-4">   
        <div class="card text-center">
          <img
          src="${comics[i].imageUrl}"
          class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${comics[i].title}</h5>
            <p class="card-text">${comics[i].author}</p>
            <button class="btn btn-primary" onclick="editComicForm(${comics[i].id})">Edit</button>
          </div>
        </div>
      </div>
          `
      )
    }
           
    console.log(`berhasil load comic`)
  })
  .fail(err=>{
    console.log(`gagal load comic`)
  })
}

function editComicForm(id){
  $.ajax({
    url: `${url}/comic/${id}`,
    method: 'GET',
    headers: {token:localStorage.token}
  })
  .done(comic=>{
    console.log(comic.title)
    // load()
    inputtext(comic.id,comic.title,comic.author,comic.imageUrl)
    console.log(`success load comic`)
  })
  .fail(err=>{
    console.log(`fail load comic`)
  })
}

function inputtext(id, title, author, imageUrl){
  $('#updateForm').find('#title').val(title)
  $('#updateForm').find('#author').val(author)
  $('#updateForm').find('#imageUrl').val(imageUrl)
  $('#updateForm').find('#btn-update').attr('onclick',`updateComic(${id})`)
}

function updateComic(id){
  let title = $('#updateForm').find('#title').val()
  let author = $('#updateForm').find('#author').val()
  let imageUrl = $('#updateForm').find('#imageUrl').val()
  $.ajax({
    url: `${url}/comics/${id}`,
    method: 'PUT',
    headers: {token:localStorage.token},
    data:{
      title,
      author,
      imageUrl
    }
  })
  .done(update=>{
    console.log(`success update`)
  })
  .fail(err=>{
    console.log(`fail update`)
  })
}

function load(){
  console.log(localStorage,'<<<')
  // console.log(localStorage.token != undefined)
  if(localStorage.token){
    display(localStorage.page)
    console.log('sini')
  }else{
    console.log('sono')

    display('loginPage')
  }
}