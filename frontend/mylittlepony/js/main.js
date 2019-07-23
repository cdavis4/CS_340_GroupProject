let ponies,
  groups,
  jobs,
  types,
  cities

/**
 * Fetch colors and tails as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initPage(); // added 
  fetchGroups();
  fetchTypes();
});

/**
 * Fetch all colors and set their HTML.
 */
fetchGroups = () => {
  DBHelper.fetchGroups((error, groups) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.groups = groups;
      fillGroupHTML();
    }
  });
}

/**
 * Set colors HTML.
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
 * Fetch all tail types and set their HTML.
 */
fetchTypes = () => {
  DBHelper.fetchType((error, types) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.types = types;
      fillTypeHTML();
    }
  });
}

/**
 * Set tail types HTML.
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
 * Initialize update for bettas data
 */
initPage = () => {

  updatePonies();
  createContactModal();
}

/**
 * Update page and map for current bettas.
 */
updatePonies = () => {
  const cSelect = document.getElementById('type-select');
  const nSelect = document.getElementById('group-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const type = cSelect[cIndex].value;
  const group = nSelect[nIndex].value;

  DBHelper.fetchPonyByTypeAndGroup(type, group, (error, ponies) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetPonies(ponies);
      fillPoniesHTML();
    }
  })
}

/**
 * Clear current bettas, their HTML and remove their map markers.
 */
/**
 * Clear current bettas, their HTML and remove their map markers.
 */
resetPonies = (ponies) => {
  // Remove all bettas
  console.log(ponies);
  self.ponies = [];
  const ul = document.getElementById('pony-list');
  
  ul.innerHTML = '';
  self.ponies = ponies;
}
/**
 * Create all bettas HTML and add them to the webpage.
 */
fillPoniesHTML = (ponies = self.ponies) => {
  const ul = document.getElementById('pony-list');
ponies.forEach(pony => {
  ul.appendChild(createPonyHTML(pony));
  });
}

/**
 * Create betta HTML.
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
  gender.innerHTML = pony.gender;
  li.append(gender);

  const group = document.createElement('p');
  group.innerHTML = "Group: "+pony.group_id;
  li.append(group);
  const more = document.createElement('button');
  more.innerHTML = 'Update Character';
  
  more.addEventListener ("click", function() {
    const url = DBHelper.urlForPony(pony);
    window.location.replace(url);
  });

  /**
 * Add attributes for View Details button
 */
  more.setAttribute("class", "button");
  more.setAttribute("role", "button");
  more.setAttribute("aria-label", "Purchase options for "+pony.name);
  li.append(more);

  return li
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