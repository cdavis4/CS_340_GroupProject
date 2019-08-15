
let cities;

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
  fetchTypes();
  createContactModal();
  addButtonToForm(); //adding button later so will be at end of form
}

/**
 * Fetch all types and set HTML.
 */
fetchTypes = () => {
  DBHelper.fetchTypes((error, types) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.types = types;
      console.log(types);
      fillTypesHTML();
    }
  });
}
/**
 * Create all HTML and add to the webpage.
 */
fillTypesHTML = (types = self.types) => {
  const ul = document.getElementById('item-list');
  types.forEach(type => {
    console.log(type);
    const li = document.createElement('li');
    li.setAttribute("class","list-group-item");
    ul.appendChild(li);
  //name
  const typename = document.createElement('h3');
  typename.innerHTML = type.type_name;
  li.append(typename);
  //is magic?
  const magic_p = document.createElement('p');
  if(type.magic == 1)
  { magic_p.innerHTML = "Magic: Yes";}
  else 
  {magic_p.innerHTML = "Magic: No";}
  li.append(magic_p);
  //is equestrain?
  const equest = document.createElement('p');
  if(type.equestrian == 1)
  { equest.innerHTML = "Equestrian: Yes";}
  else { equest.innerHTML = "Equestrian: No";}
  li.append(equest);
  //can fly
  const flight = document.createElement('p');
  if(type.flight == 1)
  { flight.innerHTML = "Can Fly: Yes";}
  else { flight.innerHTML = "Can Fly: No";}
  li.append(flight);
  });
}
/**
 * Add Type Modal
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
 * create html for form
 */

createForm = () => {
  const form = document.createElement('form');
  form.setAttribute("id", "contact_form");
  const h3 = document.createElement('h3');
  h3.innerHTML = "Add New Type";
  form.append(h3);

//create name field
  const div_name = document.createElement('div');
  div_name.setAttribute("class","form-control");
  const input_name = document.createElement("input");
  input_name.setAttribute("type", "text");
  input_name.setAttribute("id", "name");
  input_name.setAttribute("placeholder", "type/species name");
  div_name.appendChild(input_name);
  form.appendChild(div_name);
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
  div_name.appendChild(alert_div);
  //add bool questions to form
  let binary = ["Unknown","No","Yes"];
  form.appendChild(createComboBox("Magic? ","magic", binary));
  form.appendChild(createComboBox("Can Fly? ","flight", binary));
  form.appendChild(createComboBox("Equestrian? ","equest", binary));
  return form;
}
/*Helper function: rcreate drop down combo box*/
createComboBox = (textLabel,exampleFormControlSelect2, optionsArray) => {
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
/**create submit button and validation */
addButtonToForm = () => {
  let form = document.getElementById("contact_form");
   // button in html
   const div_button = document.createElement('div');
   const input_button = document.createElement('button');
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
       DBHelper.postType();
       modal.style.display = "none";
       setTimeout(reload,1000);//refreshes the page
     }
   });
  form.appendChild(div_button);
}

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