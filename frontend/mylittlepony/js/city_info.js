
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
  fetchCities();
  createContactModal();
  
}

/**
 * Fetch all groups and set their HTML.
 */
fetchCities = () => {
  DBHelper.fetchCities((error, cities) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.cities = cities;
      console.log(cities);
      fillCitiesHTML();
    }
  });
}
/**
 * Create all ponies HTML and add them to the webpage.
 */
fillCitiesHTML = (cities = self.cities) => {
  const ul = document.getElementById('item-list');
  cities.forEach(city => {
    console.log(city);
    const li = document.createElement('li');
    li.setAttribute("class","list-group-item");
    ul.appendChild(li);
  //ul.appendChild(createCityHTML(city));
  //name
  const cityname = document.createElement('h3');
  cityname.innerHTML = city.city_name;
 li.append(cityname);
 
  const desc = document.createElement('p');
  desc.innerHTML = "Characteristics: "+city.characteristics;
  li.append(desc);
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
  h3.innerHTML = "Add New City";
  form.append(h3);

//create name field
  const div = document.createElement("div");
  const div_name = document.createElement('div');
  div.setAttribute("class",'form-group');
  div_name.setAttribute("class","form-control");
  const input_name = document.createElement("input");
  input_name.setAttribute("type", "text");
  input_name.setAttribute("id", "name");
  input_name.setAttribute("placeholder", "city name");
  div_name.appendChild(input_name);
  div.appendChild(div_name);


  //add description
  const div_desc = document.createElement('div');
  div_desc.setAttribute("class", "form-control");
  const label_desc = document.createElement('label');
  label_desc.setAttribute("for","desc");
  label_desc.innerHTML = "Specifiy city characteristics. Up to 256 characters long.";
  const desc_input = document.createElement('textarea');
  desc_input.setAttribute("rows","3");
  desc_input.setAttribute("class","form-control");
  desc_input.setAttribute("id","desc");
  desc_input.setAttribute("placeholder","This is where you would provide details about the city.");
  
  //add to div
  div_desc.appendChild(label_desc);
  div_desc.appendChild(desc_input);

  //create submit button
  const div_button = document.createElement('div');
  const input_button = document.createElement('button');
  input_button.setAttribute("onclick","DBHelper.postCity()");
  input_button.setAttribute("id","submit_button");
  input_button.innerHTML ="Submit";
  div_button.appendChild(input_button);
  
  //add to form
  form.appendChild(div);
  form.appendChild(div_desc);
  form.appendChild(div_button);
  //form.setAttribute("action",DBHelper.sendContactInfo());
  //form.setAttribute("method", "post");
  return form;
}