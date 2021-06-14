window.onload = () => {
  // ----------------------
  // Navbar collapse scripts
  const toggleNavbarMenu = document.getElementById('toggleNavbarMenu');
  const navbarCollapse = document.getElementById('navbarCollapse')

  let navbarIsCollapsed = false;

  toggleNavbarMenu.addEventListener('click', () => {
    navbarIsCollapsed = !navbarIsCollapsed;
    if (navbarIsCollapsed) {
      navbarCollapse.classList.add('navbar-collapse__open');
    } else {
      navbarCollapse.classList.remove('navbar-collapse__open');
    }
  });

  // -----------------------
  // Primary links container
  const primaryLinksContent = document.getElementById('primaryLinksContent');
  const fundsContent = document.getElementById('fundsContent');
  const footerElement = document.getElementById('main-footer');
  const resizer = window.matchMedia('(min-width: 1280px)');

  function resizeHandler(resizer) {
    if (resizer.matches) { // If assets query matches
      document.getElementById('wrapper').appendChild(primaryLinksContent);
      primaryLinksContent.style.display = 'block';
    } else {
      const mainContent = document.getElementById('mainContent');
      mainContent.appendChild(primaryLinksContent);
      mainContent.appendChild(fundsContent);
      mainContent.appendChild(footerElement);
    }
  }

  resizeHandler(resizer) // Call listener function at run time
  resizer.addListener(resizeHandler) // Attach listener function on state changes
};

/MSIE|Trident/.test(navigator.userAgent) && document.addEventListener('DOMContentLoaded', function () {
  [].forEach.call(document.querySelectorAll('svg'), function (svg) {
    const use = svg.querySelector('use');

    if (use) {
      const object = document.createElement('object');
      object.data = use.getAttribute('xlink:href');
      object.className = svg.getAttribute('class');
      svg.parentNode.replaceChild(object, svg);
    }
  });
});