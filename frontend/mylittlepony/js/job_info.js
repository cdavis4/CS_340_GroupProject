
let jobs;

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
      console.log(jobs);
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
    console.log(job);
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



  //create submit button
  const div_button = document.createElement('div');
  const input_button = document.createElement('button');
  input_button.setAttribute("onclick","DBHelper.postContact()");
  input_button.setAttribute("id","submit_button");
  input_button.innerHTML ="Submit";
  div_button.appendChild(input_button);

  //add to form
  let type_exc = ["No","Yes"];
  form.appendChild(div);
  form.appendChild(createComboBox("Type Exclusive?", type_exc));
 

  DBHelper.fetchTypes((error, types) => {
    if (error)
     { // Got an error
      console.error(error);
    } else {
      self.types = types;
      typeslist = types.map((v, i) => types[i].type_name);
      typeslist.unshift("None"); //add none to beginning of array
      //still need to disable if th
      form.appendChild(createComboBox("Select Type", typeslist));
    //submit button added only after the types have been received
    //to fill types dropdown
    form.appendChild(div_button);
    }
    });
 

  //form.appendChild(div_type);
 // form.appendChild(div_job);
 // form.appendChild(div_city);
  //form.setAttribute("action",DBHelper.sendContactInfo());
  //form.setAttribute("method", "post");
  return form;
}
//create radio boxes and input label and unique id for  box
createRadioBox = (textlabel,customRadioInline,value) => {
  const div_radio = document.createElement('div');
  div_radio.setAttribute("class","custom-radio custom-control-inline");
  const input_radio = document.createElement("input");
  input_radio.setAttribute("type", "radio");
  input_radio.setAttribute("id", customRadioInline);
  input_radio.setAttribute("name", customRadioInline);
  input_radio.setAttribute("value",value);
  const label_radio = document.createElement("label");
  label_radio.setAttribute("class","custom-control-label");
  label_radio.setAttribute("for",customRadioInline);
  label_radio.innerHTML= textlabel;
  div_radio.appendChild(input_radio);
  div_radio.appendChild(label_radio);
  return div_radio;
};

//create a dropdown combo box
createComboBox = (textLabel, optionsArray) => {
  const div_multi = document.createElement("div");
  div_multi.setAttribute("class", "form-group");
  const label_multi = document.createElement("label");
  label_multi.setAttribute("for","exampleFormControlSelect2");
  label_multi.innerHTML= textLabel;
  const select_multi = document.createElement("select");
  select_multi.setAttribute("class", "form-control");
  select_multi.setAttribute("name","exampleFormControlSelect2");
  select_multi.setAttribute("id","exampleFormControlSelect2");
  optionsArray.forEach(function(x){
    const option = document.createElement('option');
    option.innerHTML = x;
    select_multi.appendChild(option);
  })
  div_multi.appendChild(label_multi);
  div_multi.appendChild(select_multi);
  return div_multi;
};

