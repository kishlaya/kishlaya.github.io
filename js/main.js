const sections_list = ["bio", "projects", "resume", "todo", "quotes"];

function populateNav() {
  var x = []
  var nav = document.querySelector('#offcanvas_menu ul');
  for (sectionID of sections_list) {    
    nav_entry = "<li data-section='" + sectionID + "'><a href='#" + sectionID + "'>" + sectionID + "</a></li>";
    nav.innerHTML += nav_entry;
  }
}

function initPage() {
  var hash = "";
  if (window.location.hash) {
    hash = window.location.hash.substring(1);
    if (sections_list.indexOf(hash) == -1) {
      hash = "bio";
    }
  } else {
    hash = "bio";
  }
  reset(hash);
}

/**
  * @param {String} url - address for the HTML to fetch
  * @return {String} the resulting HTML string fragment
  */

async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function reset(section) {
  navClose();

  for (i of document.querySelectorAll('#offcanvas_menu li')) {
    i.classList.remove("active");
  }
  document.querySelector('li[data-section=' + section + ']').classList.add("active");
  
  var pageURL = "pages/" + section + ".html";
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = await fetchHtmlAsText(pageURL);
}

function navClose() {
  document.body.classList.remove('offcanvas-open');
}

function navToggle() {
  if (document.body.classList.contains('offcanvas-open')) {
    document.body.classList.remove('offcanvas-open');
  }
  else {
    document.body.classList.add('offcanvas-open');
  }
}

window.onload = function() {
  // populate navbar
  populateNav();
  
  // Attach onclick handler for navbar elements
  for (i of document.querySelectorAll('#offcanvas_menu li a')) {
    i.onclick = function() {
      x = this.parentElement.getAttribute('data-section');
      reset(x);
    };
  }

  // Toggle navbar with Menu button
  // document.querySelector('.js-offcanvas-toggle').onclick = function() { navToggle(); }

  // Close navbar when clicked in open space
  for (i of document.querySelectorAll('#content, aside')) {
    i.onclick = function() { navClose(); };
  }

  // Load contents of page based on hash in url
  initPage();
}