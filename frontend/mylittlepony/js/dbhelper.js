
/**
 * Common database helper functions.
 */
class DBHelper {

  /**
 * Common database helper functions.
 */


  /**
   * Database URL.
   * Change this to bettas.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 6322;
    // Change this to your server port
      return '/data/ponies.json';
  }

  /**
   * Database URL.
   * Change this to bettas.json file location on your server.
   */
  static get CITIES_DATABASE_URL() {
    const port = 6322;
    // Change this to your server port
    return 'data/cities.json';
    //  return `http://localhost:${port}/data/cities.json`;
  }

    /**
   * Database URL.
   * Change this to bettas.json file location on your server.
   */
  static get TYPES_DATABASE_URL() {
    const port = 6322;
    // Change this to your server port
    return 'data/types.json';
    //  return `http://localhost:${port}/data/cities.json`;
  }
    /**
   * Database URL.
   * Change this to bettas.json file location on your server.
   */
  static get JOBS_DATABASE_URL() {
    const port = 6322;
    // Change this to your server port
    return 'data/jobs.json';
    //  return `http://localhost:${port}/data/cities.json`;
  }
    /**
   * Database URL.
   * Change this to bettas.json file location on your server.
   */
  static get GROUPS_DATABASE_URL() {
    const port = 6322;
    // Change this to your server port
    return 'data/groups.json';
    //  return `http://localhost:${port}/data/cities.json`;
  }
  /**
   * Fetch with promises
 
  static fetchBettas(callback) {
    fetch(DBHelper.DATABASE_URL)
    .then(response => response.json())
    .then(bettas => callback(null, bettas))
    .catch(error => callback(null,error));
   }
 */

  static fetchPonies(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const ponies = json.ponies;
        callback(null, ponies);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  static fetchCities(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.CITIES_DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const cities = json.cities;
        console.log(cities);
        callback(null, cities);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }
   /** Makes request to fetch Group json **/
   static fetchGroups(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.GROUPS_DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const groups = json.groups;
        console.log(groups);
        callback(null, groups);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }
     /** Makes request to fetch Group json **/
     static fetchTypes(callback) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', DBHelper.TYPES_DATABASE_URL);
      xhr.onload = () => {
        if (xhr.status === 200) { // Got a success response from server!
          const json = JSON.parse(xhr.responseText);
          const types = json.types;
          console.log(groups);
          callback(null, types);
        } else { // Oops!. Got an error from server.
          const error = (`Request failed. Returned status of ${xhr.status}`);
          callback(error, null);
        }
      };
      xhr.send();
    }
         /** Makes request to fetch Group json **/
         static fetchJobs(callback) {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', DBHelper.JOBS_DATABASE_URL);
          xhr.onload = () => {
            if (xhr.status === 200) { // Got a success response from server!
              const json = JSON.parse(xhr.responseText);
              const types = json.jobs;
              console.log(jobs);
              callback(null, jobs);
            } else { // Oops!. Got an error from server.
              const error = (`Request failed. Returned status of ${xhr.status}`);
              callback(error, null);
            }
          };
          xhr.send();
        }

  /** 
  static fetchPonies(callback) {
    fetch(DBHelper.DATABASE_URL)
     .then(response => {
       if(!response.ok){
         throw Error(`Request failed. Returned status of ${response.statusText}`);
       }
       const ponies = response.json();
       console.log(ponies);
   
      return ponies;
     })
     .then(ponies => callback(null, ponies))
     .catch(error => {
       callback(error,null);
     });
   }
*/
  /**
   * Fetch a restaurant by its ID.
   */
  static fetchPonyById(id, callback) {
    // fetch all bettas with proper error handling.
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(null,error);
      } else {
       // fetch(DBHelper.DATABASE_URL)
       // .then(response => response.json())
      //  .then(bettas => {
        const pony = ponies.find(r => r.id == id);
        if (pony) { // Got the location
          //return site;
          callback(null, pony);
        } else { // Location does not exist in the database
          callback('Location does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch ponies by group with proper error handling.
   */
  static fetchPonyByGroup(group, callback) {
    // Fetch all bettas  with proper error handling
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter bettas to have only given cuisine type
        const results = ponies.filter(r => r.group_id== group);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch bettas by a color with proper error handling.
   */
  static fetchPonyByType(type, callback) {
    // Fetch all bettas
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter bettas to have only given color
        const results = ponies.filter(r => r.type_id == type);
        callback(null, results);
      }
    });
  }
  /**
   * Fetch bettas by a cuisine and a neighborhood with proper error handling.
   */
  static fetchPonyByTypeAndGroup(type, group, callback) {
    // Fetch all bettas
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        let results = ponies
      if (type != 'all') { // filter by tailtype
          results = results.filter(r => r.type_id == type);
        }
        if (group != 'all') { // filter by group
          results = results.filter(r => r.group_id == group);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchGroupFilter(callback) {
    // Fetch all ponies
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all groups from all bettas
        const groups = ponies.map((v, i) => ponies[i].group_id)
        // Remove duplicates from neighborhoods
        const uniqueGroups= groups.filter((v, i) => groups.indexOf(v) == i)
        console.log(uniqueGroups);
        callback(null, uniqueGroups);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchTypeFilter(callback) {
    // Fetch all bettas
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all bettas
        const types = ponies.map((v, i) => ponies[i].type_id)
        // Remove duplicates from cuisines
        const uniqueTypes = types.filter((v, i) => types.indexOf(v) == i)
        callback(null, uniqueTypes);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForPony(pony) {
    return (`./character_info.html?id=${pony.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForPony(pony) {
    return (`/img/${pony.photograph}`);
  }

  static postPurchase(){
    event.preventDefault();
    let email_purchase = document.getElementById('email_purchase').value;
    let first = document.getElementById('first').value;
    let last = document.getElementById('last').value;
    let purchase_text = document.getElementById('message_purchase').value;
    let select_multi = document.getElementById('exampleFormControlSelect2').options;
    let select_values = [];
    for(var i=0; i < select_multi.length; i++)
    {
      if(select_multi[i].selected==true)
      {
        select_values.push(select_multi[i].value);
    }
    }
    let review_body = {
        "first_name": first,
        "last_name": last,
        "email_address": email_purchase,
        "message": purchase_text,
        "select_values": select_values
        };
        if(!navigator.onLine)
        {
        console.log("You are offline");
        }
    const myPost = fetch('http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json; charset=utf-8",
               // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSO
      alert("Your request has been sent.");
      document.getElementById("submit_button").disabled = true;
      return myPost;
  }
  /**
   * Restaurant image URL.
   */

  static get sendContactInfo(){
    return 'http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php';
  }


  static postContact(){
    event.preventDefault();
    let email_info = document.getElementById('email_contact').value;
   
    let contact_text = document.getElementById('message_contact').value;
      
    let review_body = {
        "email_address": email_info,
        "message": contact_text,
        };
        if(!navigator.onLine)
        {
        console.log("You are offline");
        }
    const myPost = fetch('http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json; charset=utf-8",
               // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      return myPost;
  }

}

