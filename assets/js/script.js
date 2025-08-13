'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

// project modal variables
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalTech = document.querySelector("[data-project-modal-tech]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

// project data
const projectData = {
  // General Projects
  "Doorway": {
    title: "Doorway",
    tech: "HTML, Javascript, Github Actions",
    description: "A zero-cost help desk solution that transforms GitHub Discussions and Wiki into a professional support portal for open source organizations.",
    link: "https://github.com/sachin-panayil/Doorway"
  },
  "Notion Action Extractor": {
    title: "Notion Action Extractor",
    tech: "Python, Notion API, Github Actions",
    description: "Automatically extract action items from Notion kanban cards and manage them in a centralized Master Action Items database with completion tracking.",
    link: "https://github.com/sachin-panayil/notion-action-extractor"
  },
  "Pokemon Simulator": {
    title: "Pokemon Simulator",
    tech: "Express.js, Javascript, Pokemon API",
    description: "Users can create a team of pokemon with the use of the Pokedex API and look up pokemon through their id.",
    link: "https://github.com/sachin-panayil/Pokemon-Simulator"
  },
  
  // iOS Projects
  "BarWave": {
    title: "BarWave",
    tech: "Swift, SwiftUI, Firebase, Core Location",
    description: "BarWave is a revolutionary iOS app that connects nightlife enthusiasts with trending bars worldwide while enabling real-time social interaction between users. Features include automatic check-ins, global feed system, and Snapchat-style camera integration.",
    link: "https://www.barwave.app"
  },
  "ShelfLife": {
    title: "ShelfLife",
    tech: "UIKit, Core Data, Recipe APIs",
    description: "UIKit and CoreData powered app that allows users to track their food expiration dates, promoting efficient food management and reducing waste while supplying recipes based on tracked foods.",
    link: "https://github.com/sachin-panayil/ShelfLife"
  },
  "SScribe": {
    title: "SScribe",
    tech: "Swift, SwiftUI, Core Data",
    description: "An iOS app designed for intermediate lifters to track gym sessions and monitor progression. Features comprehensive workout logging and progress analytics. Coming soon...",
    link: "#"
  },
  "Sortly": {
    title: "Sortly",
    tech: "Swift, SwiftUI, CoreML, Vision",
    description: "An organizational app that helps users categorize and manage their trash through ML and their camera. Coming soon...",
    link: "#"
  },
  "Flix": {
    title: "Flix",
    tech: "Swift, UIKit, Movie Database API",
    description: "A movie discovery app that allows users to browse current movies and view detailed information",
    link: "https://github.com/sachin-panayil/Flix"
  },
  
  // Healthcare Projects
  "Code.json Generator": {
    title: "Code.json Generator",
    tech: "TypeScript, GitHub Actions",
    description: "A GitHub Action that automatically generates and maintains code.json files for open source repositories, ensuring compliance with the SHARE IT Act.",
    link: "https://github.com/DSACMS/automated-codejson-generator"
  },
  "Index Generator Website": {
    title: "Index Generator Website",
    tech: "JavaScript, HTML, CSS",
    description: "A web application that helps federal agencies compile and maintain their code.json files for SHARE IT Act compliance.",
    link: "https://github.com/DSACMS/index-generator-website"
  },
  "National Provider Directory": {
    title: "National Provider Directory",
    tech: "Python, Django, PostgreSQL",
    description: "A comprehensive directory system for healthcare providers, enabling efficient search and management of provider information across the national healthcare network.",
    link: "https://github.com/DSACMS/npd"
  },
  "Repolinter Actions": {
    title: "Repolinter Actions",
    tech: "TypeScript, GitHub Actions, Node.js",
    description: "GitHub Actions implementation of Repolinter, automatically checking repository compliance and health metrics for government software projects.",
    link: "https://github.com/DSACMS/repolinter-actions"
  },
  "Metrics": {
    title: "Metrics",
    tech: "JavaScript, Python, GitHub APIs",
    description: "Full-stack dashboard built with JavaScript and Python to visualize repository metrics and health analytics for government software assets worth $10M+. Deployed using GitHub Pages.",
    link: "https://dsacms.github.io/metrics/"
  }
};

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const projectTitle = this.querySelector(".project-title").innerHTML;
    const project = projectData[projectTitle];
    
    if (project) {
      projectModalTitle.innerHTML = project.title;
      projectModalTech.innerHTML = project.tech;
      projectModalText.innerHTML = `<p>${project.description}</p>`;
      projectModalLink.href = project.link;
      
      // Hide link if it's just a placeholder
      if (project.link === "#") {
        projectModalLink.style.display = "none";
      } else {
        projectModalLink.style.display = "flex";
      }
      
      projectModalFunc();
    }
  });
}

// add click event to project modal close button
projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);

const formSuccess = document.querySelector("[data-form-success]");
const formError = document.querySelector("[data-form-error]");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Handle form submission
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  // Show loading state
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  formBtn.setAttribute("disabled", "");
  
  // Hide previous messages
  formSuccess.style.display = "none";
  formError.style.display = "none";
  
  try {
    const formData = new FormData(form);
    
    // Replace with your actual Formspree endpoint
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success
      formSuccess.style.display = "block";
      form.reset();
      formBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Sent!</span>';
      
      // Reset button after 3 seconds
      setTimeout(() => {
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
        formBtn.setAttribute("disabled", "");
      }, 3000);
      
    } else {
      throw new Error('Network response was not ok');
    }
    
  } catch (error) {
    // Error
    formError.style.display = "block";
    formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    
    // Re-enable button if form is valid
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    }
  }
});

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}