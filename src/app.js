// commonjs module syntax
//const person = require('./mymodule1');

// es2015 module syntax

//import {person, sayHello} from './mymodule2';

//import * as mod from './mymodule2';


// run
// npm run start
// run server fake api
// npm run json:server

import {
  http
} from './http';
import {
  ui
} from './ui';

// get posts on DOM load

document.addEventListener('DOMContentLoaded', getPosts);

// listen to add posts
document.querySelector('.post-submit').addEventListener('click', submitPost);

// listen for delters
document.querySelector('#posts').addEventListener('click', deletePost);

// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


// get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}


// submit post

function submitPost() {

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // validate input 
  if (title === '' || body === '') {

    ui.showAlert('Add both fields', 'alert alert-warning');

  } else {


    // check for id
    if (id === '') {

      // create post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));

    } else {

      // update the post 
      // create post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));


    }







  }



}

// delete post

function deletePost(e) {


  console.log('delete');

  e.preventDefault();


  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure you want to delete this post')) {
      http.delete(`http://localhost:3000/post/${id}`)
        .then(data => {
          ui.showAlert('Post deleted', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

}

// enable edit state

function enableEdit(e) {

  const id = e.target.parentElement.dataset.id;
  const body = e.target.parentElement.previousElementSibling.textContent;
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

  const data = {
    id,
    title,
    body
  }

  ui.fillForm(data);

  e.preventDefault();
}

// cancel edit state

function cancelEdit(e) {

  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }


  e.preventDefault();
}