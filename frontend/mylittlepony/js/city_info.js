
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
  const ul = document.getElementById('city-list');
  cities.forEach(city => {
    console.log(city);
    const li = document.createElement('li');
    li.setAttribute("class","list-group-item");
    ul.appendChild(li);
  //ul.appendChild(createCityHTML(city));
  //name
  const cityname = document.createElement('h3');
  cityname.innerHTML = city.name;
 li.append(cityname);
 
  const desc = document.createElement('p');
  desc.innerHTML = city.characteristics;
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
  form.setAttribute("id","contact_form");
  const div_email = document.createElement('div');
  div_email.setAttribute("class", "form-group");
  const h3 = document.createElement('h3');
  h3.innerHTML = "Contact Information";

  //email info
  const label_email = document.createElement('label');
  label_email.setAttribute("for","email");
  label_email.innerHTML="Email Address:";
  const email_input = document.createElement("input");
  email_input.setAttribute("type", "email_info");
  email_input.setAttribute("id","email_contact");
  email_input.setAttribute("class", "form-control");
  email_input.setAttribute("aria-describedby","emailHelp");
  email_input.setAttribute("emailHelp","Enter email");
  const small_tip = document.createElement("caption");
  small_tip.setAttribute("class","form-text text-muted");
  small_tip.innerHTML="We'll never share your email with anyone else.";

  //add to div

  div_email.appendChild(label_email);
  div_email.appendChild(email_input);
  div_email.appendChild(small_tip);

  //add message to send
  const div_message = document.createElement('div');
  div_message.setAttribute("class", "form-control");
  const label_message = document.createElement('label');
  label_message.setAttribute("for","message");
  const message_input = document.createElement('textarea');
  message_input.setAttribute("name","message");
  message_input.setAttribute("class","message");
  message_input.setAttribute("id","message_contact");
  message_input.setAttribute("placeholder","Please provide your name, inquiry. Provide specifics on order questions. We will contact you by email as soon as possible. Provide phone number if you would like us to contact you by phone. Thank you.");
  message_input.setAttribute("aria-describedby","contact_interests");
  const small_tip2 = document.createElement("small");
  small_tip2.setAttribute("class","form-text text-muted");
  small_tip2.innerHTML="Specify specifics about your interests and we will contact you as soon as possible.";

  //add to div
  div_message.appendChild(label_message);
  div_message.appendChild(message_input);
  div_email.appendChild(small_tip2);

  const div_button = document.createElement('div');
  div_button.setAttribute("class", "form_control");
  const input_button = document.createElement('button');
  input_button.setAttribute("onclick","DBHelper.postContact()");
  input_button.setAttribute("id","submit_button");
  input_button.innerHTML ="Submit";
  div_button.appendChild(input_button);
  
  //add to form
  form.appendChild(div_email);
  form.appendChild(div_message);
  form.appendChild(div_button);
  //form.setAttribute("action",DBHelper.sendContactInfo());
  //form.setAttribute("method", "post");
  return form;
}