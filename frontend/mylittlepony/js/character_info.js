
let pony;

/**
 * Initialize bread crumb as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
  initPage();
 
});

initPage = () => {
  fetchPonyFromURL((error, site) => {
    if (error) { // Got an error!
      console.error(error);
    } 
  });
}  
/**
 * Get current pony from page URL.
 */
fetchPonyFromURL = (callback) => {
  if (self.pony) { // betta already fetched!
    callback(null, self.pony)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No pony id in URL';
    callback(error, null);
  } else {
    DBHelper.fetchPonyById(id, (error, pony) => {
      self.pony = pony;
      if (!pony) {
        console.error(error);
        return;
      }
      fillBreadcrumb();
      fillPonyHTML();
      callback(null, pony)
    });
  }
}
/**
 * Add betta name to the breadcrumb navigation menu
 */
fillBreadcrumb = (pony=self.pony) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = pony.name;
  breadcrumb.appendChild(li);
}



/**
 * Create pony HTML and add it to the webpage
 */
fillPonyHTML = (pony = self.pony) => {

  const title = document.getElementById('title');
  const headerName = document.createElement('h1');
  title.appendChild(headerName);
  headerName.innerHTML = pony.name;
  createCharacterForm(pony);
}
/**
 * Create update character form
 */
createCharacterForm = (pony) => {
  const form = document.createElement('form');
  form.setAttribute("id", "contact_form");
  const div1 = document.createElement("div");
  div1.setAttribute('id','form-group');
  //const divRow = document.createElement('div');
  //div.setAttribute('class','row');
  //for name
  const labelname = document.createElement('label');
  labelname.setAttribute('for','N\name');
  labelname.innerHTML = "Name";
  div1.appendChild(labelname);
  const input_name = document.createElement("input");
  input_name.setAttribute("type", "text");
  input_name.setAttribute('class','form-control');
  input_name.setAttribute("id", "name");
  input_name.setAttribute("placeholder", pony.name);
  div1.appendChild(input_name);
   //for gender
   const div2 = document.createElement("div");
    div2.setAttribute('id','form-group');
   //const divRow2 = document.createElement('div');
   //divRow2.setAttribute('class','row');

  // div.appendChild(labelGender);
   div2.appendChild(createRadioBox("Female","gender",'F'));
   div2.appendChild(createRadioBox("Male","gender",'M'));
   div2.appendChild(createRadioBox("Non-Binary","gender",'O'));
  //
 
     
  //div.appendChild(divRow);
  //div.appendChild(divRow2);
  form.appendChild(div1);
  form.appendChild(div2);
  
  DBHelper.fetchGroups((error, groups) => {
  if (error)
     { // Got an error
      console.error(error);
    } else {
      self.groups = groups;
      let groupslist = groups.map((v, i) => groups[i].group_name)
      groupslist.unshift("None"); //add none to beginning of array
      form.appendChild(createComboBox("Select Group","group_id", groupslist));
    }
    });
  DBHelper.fetchTypes((error, types) => {
  if (error)
    { // Got an error
    console.error(error);
    } else {
    self.types = types;
    let typeslist = types.map((v, i) => types[i].type_name)
    typeslist.unshift("None"); //add none to beginning of array
    form.appendChild(createComboBox("Select Type","type_id", typeslist));
    }
  });
  
  DBHelper.fetchCities((error, cities) => {
  if (error)
    { // Got an error
    console.error(error);
    } else {
    self.cities = cities;
    let citieslist = cities.map((v, i) => cities[i].city_name)
    citieslist.unshift("None"); //add none to beginning of array
    form.appendChild(createComboBox("Select City","city_id", citieslist));
  
    //create submit button here because making requests to database server
    /// is slow and this will wait until the above request is done before placing
    /// button in html
    const div_button = document.createElement('div');
    const input_button = document.createElement('button');
    input_button.setAttribute("onclick","DBHelper.postContact()");
    input_button.setAttribute("id","submit_button");
    input_button.innerHTML ="Submit";
    div_button.appendChild(input_button);
    input_button.addEventListener ("click", function() {
      setTimeout(reload,1500);
     });
    form.appendChild(div_button);
    }
  });
 
  const container = document.getElementById('insert-container');
  container.appendChild(form);
}
//create radio boxes and input label and unique id for  box
createRadioBox = (textlabel,customRadioInline,value) => {
  const div_radio = document.createElement('div');
  div_radio.setAttribute("class","custom-radio custom-control-inline");
  const input_radio = document.createElement("input");
  input_radio.setAttribute("type", "radio");
  input_radio.setAttribute("class", customRadioInline);
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
/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let reload = function() {
  window.location.reload(true);
  }

 