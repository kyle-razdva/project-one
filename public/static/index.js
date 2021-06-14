"use strict";

window.onload = function () {
  // ----------------------
  // Navbar collapse scripts
  var toggleNavbarMenu = document.getElementById('toggleNavbarMenu');
  var navbarCollapse = document.getElementById('navbarCollapse');
  var navbarIsCollapsed = false;
  toggleNavbarMenu.addEventListener('click', function () {
    navbarIsCollapsed = !navbarIsCollapsed;

    if (navbarIsCollapsed) {
      navbarCollapse.classList.add('navbar-collapse__open');
    } else {
      navbarCollapse.classList.remove('navbar-collapse__open');
    }
  }); // -----------------------
  // Primary links container

  var primaryLinksContent = document.getElementById('primaryLinksContent');
  var fundsContent = document.getElementById('fundsContent');
  var footerElement = document.getElementById('main-footer');
  var resizer = window.matchMedia('(min-width: 1280px)');

  function resizeHandler(resizer) {
    if (resizer.matches) {
      // If assets query matches
      document.getElementById('wrapper').appendChild(primaryLinksContent);
      primaryLinksContent.style.display = 'block';
    } else {
      var mainContent = document.getElementById('mainContent');
      mainContent.appendChild(primaryLinksContent);
      mainContent.appendChild(fundsContent);
      mainContent.appendChild(footerElement);
    }
  }

  resizeHandler(resizer); // Call listener function at run time

  resizer.addListener(resizeHandler); // Attach listener function on state changes
};

/MSIE|Trident/.test(navigator.userAgent) && document.addEventListener('DOMContentLoaded', function () {
  [].forEach.call(document.querySelectorAll('svg'), function (svg) {
    var use = svg.querySelector('use');

    if (use) {
      var object = document.createElement('object');
      object.data = use.getAttribute('xlink:href');
      object.className = svg.getAttribute('class');
      svg.parentNode.replaceChild(object, svg);
    }
  });
});