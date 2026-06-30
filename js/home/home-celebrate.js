/* =========================================================
   HOME-CELEBRATE.JS
   Celebrate With Funenza section for homepage

   Responsibilities:
   - Render left feature card
   - Render right inquiry cards
   - Render respective inquiry form
   - Switch active form on click
   ========================================================= */

const celebrateFeature = {
  eyebrow: "Private Venue · Custom Packages",
  title: "THE PARTY.\nTHE POWER-UPS.\nTHE PERFECT DAY.",
  desc: "Decor, food, games and memories — handled start to finish by our in-house celebration team."
};

const celebrateOptions = [
  {
    id: "birthday",
    icon: "🎂",
    title: "Birthday Parties",
    subtitle: "Unforgettable celebrations for kids & teens",
    buttonLabel: "INQUIRE"
  },
  {
    id: "corporate",
    icon: "🏢",
    title: "Corporate Events",
    subtitle: "Team building & staff parties done right",
    buttonLabel: "INQUIRE"
  },
  {
    id: "picnics",
    icon: "🌳",
    title: "Picnics & Groups",
    subtitle: "Trips, outings & community events",
    buttonLabel: "INQUIRE"
  }
];

let activeCelebrateId = celebrateOptions[0].id;

/* --- Feature card --- */
function buildCelebrateFeatureCard() {
  return `
    <article class="celebrate-feature-card">
      <p class="celebrate-feature-eyebrow">${celebrateFeature.eyebrow}</p>
      <h3 class="celebrate-feature-title">
        ${celebrateFeature.title.replace(/\n/g, "<br>")}
      </h3>
      <p class="celebrate-feature-desc">${celebrateFeature.desc}</p>
    </article>
  `;
}

/* --- Inquiry cards --- */
function buildCelebrateInquiryCards() {
  return celebrateOptions
    .map(
      (item) => `
        <article class="celebrate-inquiry-card ${item.id === activeCelebrateId ? "is-active" : ""}">
          <div class="celebrate-inquiry-card__icon" aria-hidden="true">${item.icon}</div>

          <div class="celebrate-inquiry-card__content">
            <h3 class="celebrate-inquiry-card__title">${item.title}</h3>
            <p class="celebrate-inquiry-card__subtitle">${item.subtitle}</p>
          </div>

          <button
            class="celebrate-inquiry-card__button"
            type="button"
            data-celebrate-open="${item.id}"
            aria-controls="celebrate-form-mount"
            aria-label="Open ${item.title} inquiry form"
          >
            ${item.buttonLabel}
            <span aria-hidden="true">›</span>
          </button>
        </article>
      `
    )
    .join("");
}

/* --- Form templates --- */
function buildCelebrateForm(optionId) {
  let content = "";
  const birthdayFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc9o9VbCI_MxH37f4Tpi-hhx8W41RG8cSPu8AYtI4-dVbgQ8w/formResponse";
  
  if (optionId === "corporate") {
    content = `
      <div class="celebrate-form-panel__header">
        <h3>Corporate Events Inquiry</h3>
        <p>Tell us about your team size, preferred date and event goals.</p>
      </div>

      <form class="celebrate-form" action="#inquiry" method="POST" data-celebrate-form="corporate">
        <div class="celebrate-form__grid">
          <label>
            <span>Company Name</span>
            <input type="text" name="entry." placeholder="Enter company name" required>
          </label>

          <label>
            <span>Contact Person</span>
            <input type="text" name="entry." placeholder="Enter full name" required>
          </label>

          <label>
            <span>Work Email</span>
            <input type="email" name="entry." placeholder="name@company.com" required>
          </label>

          <label>
            <span>Phone Number</span>
            <input type="tel" name="entry." placeholder="Enter phone number" required>
          </label>

          <label>
            <span>Team Size</span>
            <input type="number" name="entry." placeholder="Approx. guests" min="1" required>
          </label>

          <label>
            <span>Preferred Date</span>
            <input type="date" name="entry." required>
          </label>
        </div>

        <label class="celebrate-form__full">
          <span>Event Goals</span>
          <textarea name="entry." rows="4" placeholder="Team outing, rewards day, offsite, launch celebration..."></textarea>
        </label>

        <button type="submit" class="celebrate-form__submit">Send Inquiry</button>
      </form>
    `;
  } else if (optionId === "picnics") {
    content = `
      <div class="celebrate-form-panel__header">
        <h3>Picnics & Groups Inquiry</h3>
        <p>Share your group type, expected headcount and preferred experience.</p>
      </div>

      <form class="celebrate-form" action="#inquiry" method="POST" data-celebrate-form="picnics">
        <div class="celebrate-form__grid">
          <label>
            <span>Group Name</span>
            <input type="text" name="entry." placeholder="School, society, club, family..." required>
          </label>

          <label>
            <span>Contact Person</span>
            <input type="text" name="entry." placeholder="Enter full name" required>
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="entry." placeholder="Enter email address" required>
          </label>

          <label>
            <span>Phone Number</span>
            <input type="tel" name="entry." placeholder="Enter phone number" required>
          </label>

          <label>
            <span>Group Size</span>
            <input type="number" name="entry." placeholder="Approx. guests" min="1" required>
          </label>

          <label>
            <span>Preferred Date</span>
            <input type="date" name="entry." required>
          </label>
        </div>

        <label class="celebrate-form__full">
          <span>Requirements</span>
          <textarea name="entry." rows="4" placeholder="Meals, games, transport, time slot, age group..."></textarea>
        </label>

        <button type="submit" class="celebrate-form__submit">Send Inquiry</button>
      </form>
    `;
  } else {
    content = `
      <div class="celebrate-form-panel__header">
        <h3>Birthday Party Inquiry</h3>
        <p>Tell us a few details and our team will suggest the right celebration package.</p>
      </div>

      <form class="celebrate-form" action="${birthdayFormUrl}" method="POST" target="hidden_iframe" data-celebrate-form="birthday">
        <div class="celebrate-form__grid">
          <label>
            <span>Parent / Contact Name</span>
            <input type="text" name="entry.1851609193" placeholder="Enter full name" required>
          </label>

          <label>
            <span>Phone Number</span>
            <input type="tel" name="entry.1438185698" placeholder="Enter phone number" required>
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="entry.1127298643" placeholder="Enter email address" required>
          </label>

          <label>
            <span>Child Age</span>
            <input type="number" name="entry.998792661" placeholder="Age" min="1" max="18">
          </label>

          <label>
            <span>Guest Count</span>
            <input type="number" name="entry.12486315" placeholder="Approx. guests" min="1" required>
          </label>

          <label>
            <span>Preferred Date</span>
            <input type="date" data-date-base="entry.238223715" required>
          </label>
        </div>

        <label class="celebrate-form__full">
          <span>Party Details</span>
          <textarea name="entry.457045701" rows="4" placeholder="Theme, food, activities, preferred time..."></textarea>
        </label>

        <button type="submit" class="celebrate-form__submit">Send Inquiry</button>
      </form>
    `;
  }

  return `
    <div class="celebrate-form-panel" data-form-panel="${optionId}">
      <button type="button" class="celebrate-form-close" aria-label="Close form">&times;</button>
      ${content}
    </div>
  `;
}

/* --- Render section --- */
function renderCelebrateSection(showModal = false) {
  const featureMount = document.getElementById("celebrate-feature-card");
  const listMount = document.getElementById("celebrate-inquiry-list");
  const formMount = document.getElementById("celebrate-form-mount");

  if (!featureMount || !listMount || !formMount) return;

  featureMount.innerHTML = buildCelebrateFeatureCard();
  listMount.innerHTML = buildCelebrateInquiryCards();
  formMount.innerHTML = buildCelebrateForm(activeCelebrateId);

  if (showModal) {
    formMount.classList.add("is-open");
    document.body.style.overflow = "hidden";
  } else {
    formMount.classList.remove("is-open");
    document.body.style.overflow = "";
  }
}

/* --- Handle clicks with event delegation --- */
function initCelebrateEvents() {
  const celebrateSection = document.getElementById("home-celebrate");
  const formMount = document.getElementById("celebrate-form-mount");
  
  if (!celebrateSection || celebrateSection.dataset.eventsBound === "true") return;

  celebrateSection.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-celebrate-open]");
    if (!trigger) return;

    const nextId = trigger.dataset.celebrateOpen;
    if (!nextId) return;

    activeCelebrateId = nextId;
    renderCelebrateSection(true);
  });

  if (formMount) {
    formMount.addEventListener("click", (event) => {
      const isCloseBtn = event.target.closest(".celebrate-form-close");
      const isBackdrop = event.target === formMount;

      if (isCloseBtn || isBackdrop) {
        formMount.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });

    formMount.addEventListener("submit", (event) => {
      const form = event.target.closest(".celebrate-form");
      if (!form) return;

      const actionAttr = form.getAttribute("action");

      // Prevent full page navigation/hash redirect if form is currently an unconfigured placeholder
      if (actionAttr === "#inquiry") {
        event.preventDefault();
      }

      // 1. Intercept the date field and split it for Google Forms (Only handles Birthday option right now)
      const dateInput = form.querySelector('input[data-date-base]');
      if (dateInput) {
        const baseName = dateInput.dataset.dateBase; 
        const dateVal = dateInput.value;             
        
        if (dateVal) {
          const [year, month, day] = dateVal.split("-");
          
          const createHiddenField = (suffix, value) => {
            let field = form.querySelector(`input[name="${baseName}_${suffix}"]`);
            if (!field) {
              field = document.createElement("input");
              field.type = "hidden";
              field.name = `${baseName}_${suffix}`;
              form.appendChild(field);
            }
            field.value = value;
          };

          createHiddenField("year", year);
          createHiddenField("month", month);
          createHiddenField("day", day);
        }
      }

      // 2. Handle visual UI success animation
      const submitButton = form.querySelector(".celebrate-form__submit");
      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = "Inquiry Sent";
        submitButton.disabled = true;

        window.setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          form.reset();
          formMount.classList.remove("is-open");
          document.body.style.overflow = "";
        }, 1800);
      }
    });
  }

  celebrateSection.dataset.eventsBound = "true";
}

/* --- Main init --- */
export function initCelebrate() {
  if (!document.getElementById("hidden_iframe")) {
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.id = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  renderCelebrateSection();
  initCelebrateEvents();
}