
let char_jobs;

/**
 * Initialize bread crumb as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
  initPage();
 
});

/**
 * Initialize update for bettas data
 */
initPage = () => {
  fetchChar_Job();
  createContactModal();
  
}

/**
 * Fetch all groups and set their HTML.
 */
fetchChar_Job = () => {
  DBHelper.fetchChar_Job((error, char_jobs) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.char_jobs = char_jobs;
      console.log(char_jobs);
      fillCharJobHTML();
    }
  });
}
/**
 * Create all ponies HTML and add them to the webpage.
 */
fillCharJobHTML = (char_jobs = self.char_jobs) => {
  const ul = document.getElementById('item-list');
  char_jobs.forEach(char_job => {
    console.log(char_job);
    const li = document.createElement('li');
    li.setAttribute("class","list-group-item");
    ul.appendChild(li);
  //ul.appendChild(createCityHTML(city));
  //name
  const name = document.createElement('h3');
  name.innerHTML = char_job.name;
 li.append(name);
 
  const job = document.createElement('p');
  job.innerHTML = "Job: "+char_job.job_name;
  li.append(job);

  const remove = document.createElement('button');
  remove.innerHTML = 'Delete Relationship';
  li.append(remove);
  remove.addEventListener ("click", function() {
    //does nothing right now
   });
  });
};


/**
 * Contact Modal
 */
createContactModal = (pony) =>{
  const main = document.getElementById('maincontent');
  const div = document.createElement('div');
  div.setAttribute("id", "myModal");
  div.setAttribute("class", "modal-style");
  main.appendChild(div);
  const divContent = document.createElement('div');
  divContent.setAttribute("class", "modal-content");
  div.appendChild(divContent);
  const span = document.createElement('span');
  span.setAttribute("class", "close");
  span.innerHTML = "&times";
  divContent.appendChild(span);
  
  divContent.appendChild(createForm());

  // Get the modal button, close button and modal
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementsByClassName("close")[0];
  const btn = document.getElementById('contactBtn');
  btn.addEventListener ("click", function() {
    modal.style.display = "block";
    modal.querySelector('input').focus();
  });

  closeBtn.addEventListener("click",function() {
    modal.style.display = "none";
  });
  window.addEventListener("click",function(){
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}
/**
 * create html for reviews form
 */

createForm = () => {

  const form = document.createElement('form');
  form.setAttribute("id", "contact_form");
  const h3 = document.createElement('h3');
  h3.innerHTML = "Add New Character Job Relationship";
  form.append(h3);

  //create name field
  const div = document.createElement("div");
  const div_name = document.createElement('div');
  div.setAttribute("class",'form-group');
 
  form.appendChild(div);

   /**
  * Fetch all groups and set their HTML. 
  */
  
  DBHelper.fetchPonies((error, ponies) => {
  if (error)
   { // Got an error
    console.error(error);
  } else {
    self.ponies = ponies;
    let ponieslist = ponies.map((v, i) => ponies[i].name);
    form.appendChild(createComboBox("Select Character","characters", ponieslist));
  }
  });
  DBHelper.fetchJobs((error, jobs) => {
    if (error)
     { // Got an error
      console.error(error);
    } else {
      self.jobs = jobs;
      let jobslist = jobs.map((v, i) => jobs[i].job_name);
      form.appendChild(createComboBox("Select Job","jobs", jobslist));
    }

    //create submit button here because making requests to database server
    /// is slow and this will wait until the above request is done before placing
    /// button in html
    const div_button = document.createElement('div');
    const input_button = document.createElement('button');
    input_button.setAttribute("onclick","DBHelper.postContact()");
    input_button.setAttribute("id","submit_button");
    input_button.innerHTML ="Submit";
    div_button.appendChild(input_button);
    form.appendChild(div_button);
    });

    //form.setAttribute("action",DBHelper.sendContactInfo());
    //form.setAttribute("method", "post");
  return form;
}

//create a dropdown combo box
createComboBox = (textLabel, exampleFormControlSelect2,optionsArray) => {
  const div_multi = document.createElement("div");
  div_multi.setAttribute("class", "form-group");
  const label_multi = document.createElement("label");
  label_multi.setAttribute("for",exampleFormControlSelect2);
  label_multi.innerHTML= textLabel;
  const select_multi = document.createElement("select");
  select_multi.setAttribute("class", "form-control");
  select_multi.setAttribute("name",exampleFormControlSelect2);
  select_multi.setAttribute("id",exampleFormControlSelect2);
  optionsArray.forEach(function(x){
    const option = document.createElement('option');
    option.innerHTML = x;
    select_multi.appendChild(option);
  })
  div_multi.appendChild(label_multi);
  div_multi.appendChild(select_multi);
  return div_multi;
};