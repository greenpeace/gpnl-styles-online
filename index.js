const tableOfContents = document.getElementById('table-of-contents');
const contents = document.getElementById('manual-contents');

generateTOC(tableOfContents);

function createLink(href, innerHTML) {
  const a = document.createElement("a");
  a.setAttribute("href", href);
  a.innerHTML = innerHTML;
  return a;
}

function toKebabCase(string) {
  return (string
          .replace(/([a-z])([A-Z])/g, '$1-$2')    // get all lowercase letters that are near to uppercase ones
          .replace(/[\s_]+/g, '-')                // replace all spaces and low dash
          .toLowerCase()                          // convert to lower case
  )
}

function generateTOC(toc) {
  var i2 = 0, i3 = 0, i4 = 0;
  toc = toc.appendChild(document.createElement("ul"));
  for (let i = 0; i < contents.childNodes.length; ++i) {
    let node = contents.childNodes[i];
    let tagName = node.nodeName.toLowerCase();
    if (tagName === "h4") {
      ++i4;
      if (i4 === 1) toc.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
      const section = i2 + "." + i3 + "." + i4;
      node.id = i2 + "-" + i3 + '-' + i4 + '-' + toKebabCase(node.innerText);
      node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
      toc.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink('#' + node.id, node.innerHTML));
    } else if (tagName === "h3") {
      ++i3, i4 = 0;
      if (i3 === 1) toc.lastChild.appendChild(document.createElement("ul"));
      const section = i2 + "." + i3;
      node.id = i2 + "-" + i3 + '-' + toKebabCase(node.innerText);
      node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
      toc.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink('#' + node.id, node.innerHTML));
    } else if (tagName === "h2") {
      ++i2, i3 = 0, i4 = 0;
      node.id = i2 + '-' + toKebabCase(node.innerText);
      node.insertBefore(document.createTextNode(i2 + ". "), node.firstChild);
      toc.appendChild(document.createElement("li")).appendChild(createLink('#' + node.id, node.innerHTML));
    } else if (tagName === "h1") {
      toc.appendChild(document.createElement("li")).appendChild(createLink('#' + node.id, node.innerHTML));
    }
  }
}


const navbar = document.getElementById('navbar');
const navToggler = document.getElementById('nav-toggler');
const navLinks = document.getElementById('table-of-contents');

// Script for toggling the menu open or closed.
navToggler.onclick = () => {
  navLinks.classList.toggle("open");
};

// Remove open class when clicked outside the navigation.
document.addEventListener('click', function ({target}) {
  if (!navbar.contains(target)) {
    navLinks.classList.remove("open");
  }
});