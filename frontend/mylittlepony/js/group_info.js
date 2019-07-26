
let groups;

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
  fetchGroups();
  createContactModal();
  
}

/**
 * Fetch all groups and set their HTML. fetchData(dataName,databaseFunction,callback)
 */
fetchGroups = () => {
  DBHelper.fetchGroups((error, groups) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.groups = groups;
      console.log(groups);
      fillGroupsHTML();
    }
  });
}
/**
 * Create all ponies HTML and add them to the webpage.
 */
fillGroupsHTML = (groups = self.groups) => {
  const ul = document.getElementById('groups-list');
  groups.forEach(group => {
    const li = document.createElement('li');
    li.setAttribute("class","list-group-item");
    ul.appendChild(li);
  //ul.appendChild(createCityHTML(city));
  //name
  //const groupname = document.createElement('h2');
  //groupname.innerHTML = "Name: ";
  const name = document.createElement("p");
  name.innerHTML = group.name;
  //li.append(groupname)
 li.append(name);
 
  //const city = document.createElement('h2');
 // city.innerHTML = "City: ";
  const city_value = document.createElement("p");
  city_value.innerHTML = "<b> City: </b> "+ group.city_id;
  //li.append(city);
  li.append(city_value);
  });
}


/**
 * Contact Modal
 */
createContactModal = (pony) =>{
  const main = document.getElementById('maincontent');
  const div = document.createElement('div');
  div.setAttribute("id", "myModal");
  div.setAttribute("class", "modal");
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
  h3.innerHTML = "Add New Group";
  form.append(h3);

//create name field
  const div = document.createElement("div");
  const div_name = document.createElement('div');
  div.setAttribute("class",'form-group');
  div_name.setAttribute("class","form-control");
  const input_name = document.createElement("input");
  input_name.setAttribute("type", "text");
  input_name.setAttribute("id", "name");
  input_name.setAttribute("placeholder", "name");
  div_name.appendChild(input_name);
  div.appendChild(div_name);


  //add description
  const div_group = document.createElement('div');
  div_group.setAttribute("class", "form-control");
  const label_group = document.createElement('label');
  label_group.setAttribute("for","city");
  label_group.innerHTML = "City:";
  const group_input = document.createElement('text');
  group_input.setAttribute("class","form-control");
  group_input.setAttribute("id","city");
  group_input.setAttribute("placeholder","city name");
  
  //add to div
  div_group.appendChild(label_group);
  div_group.appendChild(group_input);

  //create submit button
  const div_button = document.createElement('div');
  const input_button = document.createElement('button');
  input_button.setAttribute("onclick","DBHelper.postContact()");
  input_button.setAttribute("id","submit_button");
  input_button.innerHTML ="Submit";
  div_button.appendChild(input_button);
  
  //add to form
  form.appendChild(div);
  form.appendChild(div_group);
  form.appendChild(div_button);
  //form.setAttribute("action",DBHelper.sendContactInfo());
  //form.setAttribute("method", "post");
  return form;
}