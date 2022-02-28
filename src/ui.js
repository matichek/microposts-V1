class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts) {

    let output = '';

    posts.forEach((post) => {

      output += `
      
        <div class="card mp-3">
        
        <div class="card-body">
        
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">
            ${post.body}
          </p>
          <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-edit"></i></a>
          <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
        </div>
        
        </div>

      `

    })

    this.post.innerHTML = output; 
    
  }

  //show alert message

  showAlert(message, className) {

    this.clearAlert();

    // Clear div

    const div = document.createElement('div');
    // add class
    div.className = className;

    // add text
    div.appendChild(document.createTextNode(message));

    // insert into dom get parent
    const container = document.querySelector('.postsContainer');

    // get posts
    const posts = document.querySelector('#posts');

    // insert div alert
    container.insertBefore(div, posts);

    // timeouts

    setTimeout(() => {
      this.clearAlert();
    }, 3000);

  }

  clearAlert() {

    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }

  }
  // clear form 
  clearFields() {

    this.titleInput.value = "";
    this.bodyInput.value = "";

  }

  clearIdInput() {

    this.idInput.value = "";

  }

  // fill form to edit

  fillForm(data) {

    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');

  }


  // change the form state
  changeFormState(type) {
    if(type === 'edit') {

      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // create canel button

      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-lighter btn-block';

      button.appendChild(document.createTextNode('Cancel Edit'));

      // get parent 

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');

      // insert cancel button
      cardForm.insertBefore(button, formEnd);

    } else {

      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // remove cancel button 

      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      // clear the id form the hidden field
      this.clearIdInput();

      // clear text fields
      this.clearFields();


    }
  }



}

export const ui = new UI();