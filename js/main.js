const page_list = ["bio", "projects", "resume", "quotes"];

function populateNav() {
  var x = []
  var nav = document.querySelector('#offcanvas_menu ul');
  for (page of page_list) {    
    nav_entry = "<li data-page='" + page + "'><a href='#" + page + "'>" + page + "</a></li>";
    nav.innerHTML += nav_entry;
  }
}

function initPage() {
  var hash = "";
  if (window.location.hash) {
    hash = window.location.hash.substring(1);
    if (page_list.indexOf(hash) == -1) {
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

async function reset(page) {
  // Clear content
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "...";

  // Change styling of navbar
  for (i of document.querySelectorAll('#offcanvas_menu li')) {
    i.classList.remove("active");
  }
  document.querySelector('li[data-page=' + page + ']').classList.add("active");

  // Close the navbar
  navClose();

  // Load page
  var pageURL = "pages/" + page + ".html";
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
      x = this.parentElement.getAttribute('data-page');
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