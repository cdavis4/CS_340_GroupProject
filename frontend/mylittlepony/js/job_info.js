
let jobs;
let types;

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
  fetchJobs();
  createContactModal();
}

/**
 * Fetch all groups and set their HTML.
 */
fetchJobs = () => {
  DBHelper.fetchJobs((error, jobs) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.jobs = jobs;
      fillJobsHTML();
    }
  });
}
/**
 * Create all ponies HTML and add them to the webpage.
 */
fillJobsHTML = (jobs = self.jobs) => {
  const ul = document.getElementById('item-list');
  jobs.forEach(job => {
    const li = document.createElement('li');
    li.setAttribute("class","list-group-item");
    ul.appendChild(li);
  //ul.appendChild(createCityHTML(city));
  //name
  const jobname = document.createElement('h3');
  jobname.innerHTML = job.job_name;
 li.append(jobname);
 

  

  const type = document.createElement('p');
  type.innerHTML = "Type/Species Required: "+job.type_name;
  if (job.type_name == null) //display only if there is an exclusive type to perform job
    {
      let booleanVal = "No";
      const type_x = document.createElement('p');
      type_x.innerHTML = "Type/Species Exclusive? " + booleanVal;
      li.append(type_x);
    }
  else 
    { 
    let booleanVal = "Yes";
    const type_x = document.createElement('p');
    type_x.innerHTML = "Type/Species Exclusive? " + booleanVal;
    li.append(type_x);
    li.append(type);
    }
 
  });
}

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
  //add form to modal
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
 * create html for add job form
 */

createForm = () => {
  const form = document.createElement('form');
  form.setAttribute("id", "contact_form");
  const h3 = document.createElement('h3');
  h3.innerHTML = "Add New Job";
  form.append(h3);

  //create name field
  const div = document.createElement("div");
  const div_name = document.createElement('div');
  div.setAttribute("class",'form-group');
  div_name.setAttribute("class","form-control");
  const input_name = document.createElement("input");
  input_name.setAttribute("type", "text");
  input_name.setAttribute("id", "name");
  input_name.setAttribute("placeholder", "job name");
  div_name.appendChild(input_name);
  div.appendChild(div_name);
    //create validation alert for name field
    let alert_div = document.createElement('div');
    alert_div.setAttribute("class","alert alert-warning alert-dismissible fade show");
    alert_div.setAttribute("id","name_val");
    alert_div.style.display = "none";
    alert_div.setAttribute("role","alert");
    alert_div.innerHTML = 'Name must be filled out';
    let alert_button = document.createElement("button");
    alert_button.setAttribute("type","button");
    alert_button.setAttribute("class", "close");
    alert_button.setAttribute("data-dismiss","alert");
    alert_button.setAttribute('aria-label','Close');
    let span_alert = document.createElement("span");
    span_alert.setAttribute("aria-hidden","true");
    span_alert.innerHTML = "&times;";
    alert_button.appendChild(span_alert);
    alert_div.appendChild(alert_button);
    div.appendChild(alert_div);

  //add to form
  let type_exc = ["No","Yes"];
  form.appendChild(div);
  form.appendChild(createComboBox("Type Exclusive?","type_exclusive", type_exc));
 
  //fetching types from server for dropdown
  DBHelper.fetchTypes((error, types) => {
    if (error)
     { // Got an error
      console.error(error);
    } else {
      self.types = types;
      typeslist = types.map((v, i) => types[i].type_name);
      typeslist.unshift("None"); //add none to beginning of array
      //still need to disable if th
      form.appendChild(createComboBox("Select Type","type_id", typeslist));
      addButtonToForm();//wait until data from types fetched/returned
    }
    });
  return form;
}
/**create submit button here because making requests to database server
* is slow and this will wait until the above requests for drop down values
*  is done before placing button in form */
addButtonToForm = () => {
  let form = document.getElementById("contact_form");
   // button in html
   const div_button = document.createElement('div');
   const input_button = document.createElement('button');
  // input_button.setAttribute("onclick","DBHelper.postCharacter()");
   input_button.setAttribute("id","submit_button");
   input_button.innerHTML ="Submit";
   div_button.appendChild(input_button);
   input_button.addEventListener ("click", function() {
     event.preventDefault();
     let boolvalue = checkIfEmpty();
     let modal = document.getElementById("myModal");
     modal.style.display = "block";
     if (boolvalue == true)
     {
       DBHelper.postJob();
       modal.style.display = "none";
       setTimeout(reload,1000);//refreshes the page
     }
   });
  form.appendChild(div_button);
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

/*Helper function: reloads page*/
let reload = function() {
  window.location.reload(true);
  }
  /*
* Helper function: checks if string value is empty
* Adapted from https://www.w3schools.com/js/js_validation.asp
*/
function checkIfEmpty(){
  let nameVal = document.getElementById("name").value;
  if(nameVal == "")
  {
    let alert = document.getElementById("name_val");
    alert.style.display = "block";
    return false;
  }
  else{return true;}
}
