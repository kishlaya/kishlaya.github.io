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

var sections_list = populateNav();

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

for (i of document.querySelectorAll('#offcanvas_menu li a')) {
  i.onclick = function() {
    x = this.parentElement.getAttribute('data-section');
    reset(x);
  };
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

document.querySelector('.js-offcanvas-toggle').onclick = function() { navToggle(); }

for (i of document.querySelectorAll('#content, aside')) {
  i.onclick = function() { navClose(); };
}

document.body.onload = function() {
  initPage();
}