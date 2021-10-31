var sections_list;

function populateNav() {
  var x = []
  var nav = document.querySelector('#offcanvas_menu ul');
  for (i of document.querySelectorAll('section')) {
    sectionID = i.id;
    
    nav_entry = "<li data-section='" + sectionID + "'><a href='#" + sectionID + "'>" + sectionID + "</a></li>";
    nav.innerHTML += nav_entry;

    x.push(sectionID);
  }
  return x;
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

function reset(section) {
  navClose();

  for (i of document.querySelectorAll('#offcanvas_menu li')) {
    i.classList.remove("active");
  }
  document.querySelector('li[data-section=' + section + ']').classList.add("active");

  document.getElementById('content').innerHTML = document.getElementById(section).innerHTML;
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
  sections_list = populateNav();
  
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