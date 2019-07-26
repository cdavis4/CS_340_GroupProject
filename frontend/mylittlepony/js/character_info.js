
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
 * Get current betta from page URL.
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

  //const image = document.getElementById('pony-img');
  //image.className = 'pony-img';

  //const ponyGroup = document.getElementById('group');
  //ponyGroup.innerHTML = "Group: " +pony.group_id;

  //const ponyGroup = document.getElementById('type');
  //ponyGroup.innerHTML = "Type: " +pony.type_id;

 // added alt attribute and srcset

  //image.alt = "photo from charcter " + pony.name;

  //image.srcset = "/img/"+ pony.id +".jpg";
  //+ betta.id 
  //+ "-300_1x.jpg 400w, /img/" 
  //+betta.id + "-600_1x.jpg 1000w, /img/" + betta.id  + "-600_2x.jpg 4000w";
}

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



 