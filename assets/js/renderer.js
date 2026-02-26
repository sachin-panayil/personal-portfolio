/**
 * renderer.js
 * Clones <template> elements, populates them with data, and inserts into the DOM.
 * Exports a projectDataMap for use by interactions.js (project modal lookups).
 */

/** Map of project title -> project data object, built during renderProjects() */
export const projectDataMap = new Map();

/**
 * Renders all sections of the page from the provided data.
 * @param {Object} data - The full data object from data-loader.js
 */
export function renderAll(data) {
  renderSidebar(data.meta);
  renderAbout(data.about);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderTestimonials(data.testimonials);
  renderContact(data.contact);
}

// ---------------------------------------------------------------------------
// Helper: clone a template and append populated instances to a container
// ---------------------------------------------------------------------------

function cloneTemplate(templateId) {
  const template = document.getElementById(templateId);
  return template.content.cloneNode(true);
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function renderSidebar(meta) {
  // Name & title & avatar
  const nameEl = document.querySelector('.sidebar .name');
  const titleEl = document.querySelector('.sidebar .title');
  const avatarImg = document.querySelector('.sidebar .avatar-box img');

  nameEl.textContent = meta.name;
  nameEl.title = meta.name;
  titleEl.textContent = meta.title;
  avatarImg.src = meta.avatar;
  avatarImg.alt = meta.name;

  // Contact items
  const contactsList = document.querySelector('.contacts-list');
  meta.contacts.forEach(contact => {
    const clone = cloneTemplate('contact-item-template');
    clone.querySelector('ion-icon').setAttribute('name', contact.icon);
    clone.querySelector('.contact-title').textContent = contact.label;

    if (contact.isAddress) {
      clone.querySelector('.contact-link').remove();
      clone.querySelector('address').textContent = contact.value;
    } else {
      clone.querySelector('address').remove();
      clone.querySelector('.contact-link').innerHTML = contact.value;
    }

    contactsList.appendChild(clone);
  });

  // Social links
  const socialList = document.querySelector('.social-list');
  meta.socials.forEach(social => {
    const clone = cloneTemplate('social-item-template');
    clone.querySelector('a').href = social.url;
    clone.querySelector('ion-icon').setAttribute('name', social.icon);
    socialList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

function renderAbout(about) {
  // Bio paragraphs
  const aboutText = document.querySelector('.about-text');
  about.bio.forEach(paragraph => {
    const p = document.createElement('p');
    p.innerHTML = paragraph;
    aboutText.appendChild(p);
  });

  // Services
  const serviceList = document.querySelector('.service-list');
  about.services.forEach(service => {
    const clone = cloneTemplate('service-item-template');
    clone.querySelector('.service-icon-box img').src = service.icon;
    clone.querySelector('.service-icon-box img').alt = service.iconAlt;
    clone.querySelector('.service-item-title').textContent = service.title;
    clone.querySelector('.service-item-text').textContent = service.text;
    serviceList.appendChild(clone);
  });

  // Tech logos
  const clientsList = document.querySelector('.clients-list');
  about.techLogos.forEach(logo => {
    const clone = cloneTemplate('tech-logo-template');
    clone.querySelector('img').src = logo.src;
    clone.querySelector('img').alt = logo.alt;
    clientsList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

function renderExperience(experience) {
  const timelineList = document.querySelector('#experience-list');
  experience.forEach(entry => {
    const clone = cloneTemplate('experience-item-template');

    clone.querySelector('.company-logo img').src = entry.logo;
    clone.querySelector('.company-logo img').alt = entry.logoAlt;
    clone.querySelector('.timeline-item-title').textContent = entry.company;
    clone.querySelector('#role-text').textContent = entry.role;
    clone.querySelector('.timeline-dates').textContent = entry.dates;

    // Description text + bullet list
    const timelineText = clone.querySelector('.timeline-text');
    timelineText.childNodes[0].textContent = entry.description + '\n';

    const bulletList = timelineText.querySelector('.timeline-bullets');
    entry.bullets.forEach(bullet => {
      const li = document.createElement('li');
      li.textContent = bullet;
      bulletList.appendChild(li);
    });

    timelineList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

function renderEducation(education) {
  const timelineList = document.querySelector('#education-list');
  education.forEach(entry => {
    const clone = cloneTemplate('education-item-template');
    clone.querySelector('.timeline-item-title').textContent = entry.school;
    clone.querySelector('.timeline-dates').textContent = entry.dates;
    clone.querySelector('.timeline-text').textContent = entry.degree;
    timelineList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

function renderSkills(skills) {
  const skillsList = document.querySelector('.skills-list');
  skills.forEach(skill => {
    const clone = cloneTemplate('skill-item-template');
    clone.querySelector('.h5').textContent = skill.name;
    const dataEl = clone.querySelector('data');
    dataEl.value = skill.percentage;
    dataEl.textContent = skill.percentage + '%';
    clone.querySelector('.skill-progress-fill').style.width = skill.percentage + '%';
    skillsList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

function renderProjects(projects) {
  const projectList = document.querySelector('.project-list');

  projects.forEach(project => {
    // Build the project data map for modal lookups
    projectDataMap.set(project.title, {
      title: project.title,
      tech: project.tech,
      description: project.description,
      link: project.link
    });

    const clone = cloneTemplate('project-item-template');

    // Set filter attributes on the <li>
    const li = clone.querySelector('li');
    li.dataset.category = project.category;

    // Populate card content
    clone.querySelector('.project-emoji').textContent = project.emoji;
    clone.querySelector('.project-title').textContent = project.title;
    clone.querySelector('.project-category').textContent = project.categoryLabel;

    projectList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

function renderTestimonials(testimonials) {
  const testimonialsList = document.querySelector('.testimonials-list');
  testimonials.forEach(testimonial => {
    const clone = cloneTemplate('testimonial-item-template');
    const avatarImg = clone.querySelector('[data-testimonials-avatar]');
    avatarImg.src = testimonial.avatar;
    avatarImg.alt = testimonial.avatarAlt;
    clone.querySelector('[data-testimonials-title]').textContent = testimonial.name;
    clone.querySelector('[data-testimonials-text]').innerHTML = testimonial.text;
    testimonialsList.appendChild(clone);
  });
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

function renderContact(contact) {
  // Map iframe
  const iframe = document.querySelector('.mapbox iframe');
  iframe.src = contact.mapEmbedUrl;

  // Form action
  const form = document.querySelector('[data-form]');
  form.action = contact.formAction;
}
