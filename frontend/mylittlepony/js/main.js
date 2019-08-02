let ponies,
  groups,
  jobs,
  types,
  cities;

/**
 * Fetch groups and types  as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initPage(); // added 
  fetchGroupFilter();
  fetchTypeFilter();
  
});


/**
 * Fetch all groups and set their HTML.
 */
fetchGroupFilter = () => {
  DBHelper.fetchGroupFilter((error, groups) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.groups = groups;
      fillGroupHTML();
    }
  });
}

/**
 * Set group HTML.
 */
fillGroupHTML = (groups = self.groups) => {
  const select = document.getElementById('group-select');
  groups.forEach(group => {
    const option = document.createElement('option');
    option.innerHTML = group;
    option.value = group;
    select.append(option);
  });
}

/**
 * Fetch all types and set their HTML.
 */
fetchTypeFilter = () => {
  DBHelper.fetchTypeFilter((error, types) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.types = types;
      fillTypeHTML();
    }
  });
}

/**
 * Set types HTML.
 */
fillTypeHTML = (types= self.types) => {
  const select = document.getElementById('type-select');

  types.forEach(type => {
    const option = document.createElement('option');
    option.innerHTML = type;
    option.value = type;
    select.append(option);
  });
}

/**
 * Initialize update for ponies data
 */
initPage = () => {

  updatePonies();
  createContactModal();
}

/**
 * Update page and map for current ponies.
 */
updatePonies = () => {
  const cSelect = document.getElementById('type-select');
  const nSelect = document.getElementById('group-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const type = cSelect[cIndex].value;
  const group = nSelect[nIndex].value;

  DBHelper.filterPonyByTypeAndGroup(type, group, (error, ponies) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetPonies(ponies);
      fillPoniesHTML();
    }
  })
}

/**
 * Clear current ponies, their HTML and remove their map markers.
 */
/**
 * Clear current ponies, their HTML and remove their map markers.
 */
resetPonies = (ponies) => {
  // Remove all ponies
  
  self.ponies = [];
  const ul = document.getElementById('pony-list');
  
  ul.innerHTML = '';
  self.ponies = ponies;
}
/**
 * Create all ponies HTML and add them to the webpage.
 */
fillPoniesHTML = (ponies = self.ponies) => {
  const ul = document.getElementById('pony-list');
ponies.forEach(pony => {
  ul.appendChild(createPonyHTML(pony));
  });
}

/**
 * Create pony HTML.
 */
createPonyHTML = (pony) => {
  const li = document.createElement('li');
  li.setAttribute("class","list-group-item");

  const image = document.createElement('img');
  image.className = 'pony-img';
  image.src = DBHelper.imageUrlForPony(pony);
  /**
 * add alt and srcset
 */
 // added alt attribute and srcset

 image.alt = "photo from pony " + pony.name;

 image.srcset = "/img/"+ pony.id +".jpg";
 //"/img/"+ betta.id + ".jpg 400w, /img/" 
 //+betta.id + "-600_1x.jpg 1000w, /img/" + betta.id  + "-600_2x.jpg 4000w";

  li.append(image);

  //create div to keep name and div so star can be right of name
  const div = document.createElement('div');
  div.setAttribute("id","pony-div");
  li.append(div);

  //name
  const name = document.createElement('h3');
  name.innerHTML = pony.name;
 li.append(name);
 
  const gender = document.createElement('p');
  gender.innerHTML = "Gender: "+pony.gender;
  li.append(gender);

  const type = document.createElement('p');
  type.innerHTML = "Type/Species: "+pony.type_name;
  li.append(type);

  const group = document.createElement('p');
  group.innerHTML = "Group: "+pony.group_name;
  li.append(group);

  const more = document.createElement('button');
  more.innerHTML = 'Update Character';
  const remove = document.createElement('button');
  remove.innerHTML = 'Delete Character';
  
  more.addEventListener ("click", function() {
    const url = DBHelper.urlForPony(pony);
    window.location.replace(url);
  });
  remove.addEventListener ("click", function() {
    //does nothing right now
    
  });

  /**
 * Add attributes for Update button
 */
  more.setAttribute("class", "button-style");
  more.setAttribute("role", "button");
  more.setAttribute("aria-label", "Update options for "+pony.name);
  li.append(more);
  remove.setAttribute("class", "button");
  remove.setAttribute("role", "button");
  remove.setAttribute("aria-label", "Remove"+pony.name);
  const div_remove = document.createElement("div"); 
  li.append(div_remove);
  div_remove.append(remove);


  return li
}

/**
 * Contact Modal
 */
createContactModal = () =>{
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
  h3.innerHTML = "Add New Character";
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



  //add to form
  //let jobs = ["Pilot", "Fashion Designer", "Flight Instructor", "Plumber"];
 
  form.appendChild(div);
  form.appendChild(createRadioBox("Female","customRadioInline1","option1"));
  form.appendChild(createRadioBox("Male","customRadioInline2","option2"));
  form.appendChild( createRadioBox("Non-Binary","customRadioInline3","option3"));
 
  //form.appendChild(createComboBox("Select Type", types));
  //form.appendChild(div_type);
  //form.appendChild(div_job);
  //form.appendChild(div_city);
  //form.appendChild(createMultiComboBox("Select Character's Jobs", jobs));
   /**
  * Fetch all groups and set their HTML. fetchData(dataName,databaseFunction,callback)
  */
  
  DBHelper.fetchGroups((error, groups) => {
  if (error)
   { // Got an error
    console.error(error);
  } else {
    self.groups = groups;
    let groupslist = groups.map((v, i) => groups[i].group_name)
    form.appendChild(createComboBox("Select Group", groupslist));
  }
  });
  DBHelper.fetchTypes((error, types) => {
    if (error)
     { // Got an error
      console.error(error);
    } else {
      self.types = types;
      let typeslist = types.map((v, i) => types[i].type_name)
      form.appendChild(createComboBox("Select Type", typeslist));
    }
    });

    DBHelper.fetchCities((error, cities) => {
      if (error)
       { // Got an error
        console.error(error);
      } else {
        self.cities = cities;
        let citieslist = cities.map((v, i) => cities[i].city_name)
        form.appendChild(createComboBox("Select City", citieslist));

    //create submit button here because making requests to database server
    /// is slow and this will wait until the above request is done before placing
    /// in html
    const div_button = document.createElement('div');
    const input_button = document.createElement('button');
    input_button.setAttribute("onclick","DBHelper.postContact()");
    input_button.setAttribute("id","submit_button");
    input_button.innerHTML ="Submit";
    div_button.appendChild(input_button);
    form.appendChild(div_button);
      }
      });

    
  
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

//create a dropdown combo box
createMultiComboBox = (textLabel, optionsArray) => {
  const div_multi = document.createElement("div");
  div_multi.setAttribute("class", "form-group");
  const label_multi = document.createElement("label");
  label_multi.setAttribute("for","exampleFormControlSelect2");
  label_multi.innerHTML= textLabel;
  const select_multi = document.createElement("select");
  select_multi.setAttribute("multiple","");
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