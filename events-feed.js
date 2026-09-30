/**
 * Lotus Academy - Events, Facebook Live Feed & Reels Engine
 * School Facebook Page: https://www.facebook.com/academylotus.simara
 */

// Featured Events, Latest Photos, and Facebook Reels Database
// School admins can easily update or add items to this array
const LOTUS_EVENTS = [
  {
    id: "evt-01",
    type: "reel",
    category: "reels",
    title: "Annual Sports Meet & Athletic Championship",
    date: "Latest Highlight",
    badge: "Facebook Reel",
    thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freels%2Facademylotus.simara&show_text=false",
    fbLink: "https://www.facebook.com/academylotus.simara",
    caption: "Our students displaying athletic excellence, sportsmanship, and teamwork at the annual track and field competitions."
  },
  {
    id: "evt-02",
    type: "photo",
    category: "events",
    title: "National Scrabble Championship & Word Power Expo",
    date: "Featured Event",
    badge: "Championship",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    fbLink: "https://www.facebook.com/academylotus.simara",
    caption: "Lotus Academy proudly hosted participants from across the region for competitive scrabble, vocabulary drills, and strategic gaming."
  },
  {
    id: "evt-03",
    type: "reel",
    category: "reels",
    title: "Science & Technology Innovation Exhibition",
    date: "Latest Highlight",
    badge: "Facebook Reel",
    thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freels%2Facademylotus.simara&show_text=false",
    fbLink: "https://www.facebook.com/academylotus.simara",
    caption: "Young innovators from +2 Science and secondary classes presenting working robotics models, hydraulic systems, and eco-friendly solutions."
  },
  {
    id: "evt-04",
    type: "photo",
    category: "academic",
    title: "Annual Parents' Day & Cultural Extravaganza",
    date: "School Milestone",
    badge: "Cultural Fest",
    thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    fbLink: "https://www.facebook.com/academylotus.simara",
    caption: "Spectacular traditional Nepali dance, drama performances, and academic award ceremony celebrating student toppers."
  },
  {
    id: "evt-05",
    type: "reel",
    category: "reels",
    title: "Graduation & +2 Welcome Farewell Gala",
    date: "Campus Life",
    badge: "Facebook Reel",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freels%2Facademylotus.simara&show_text=false",
    fbLink: "https://www.facebook.com/academylotus.simara",
    caption: "Cherished memories, musical performances, and blessings as our senior batches embark on their higher education journeys."
  },
  {
    id: "evt-06",
    type: "photo",
    category: "events",
    title: "Inter-House Debate & Public Speaking Forum",
    date: "Co-curricular",
    badge: "Oratory",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    fbLink: "https://www.facebook.com/academylotus.simara",
    caption: "Sharp minds articulating thoughtful perspectives on contemporary global issues, ethics, and leadership."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderEvents("all");
  setupTabFilters();
  initFacebookSDK();
});

function renderEvents(filter = "all") {
  const container = document.getElementById("eventsCardsContainer");
  if (!container) return;

  const filtered = filter === "all" 
    ? LOTUS_EVENTS 
    : LOTUS_EVENTS.filter(e => e.category === filter || (filter === "reels" && e.type === "reel"));

  container.innerHTML = filtered.map(item => `
    <div class="event-card" data-id="${item.id}">
      <div class="event-media-wrap" onclick="openEventModal('${item.id}')" style="cursor: pointer;">
        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
        <span class="event-type-badge ${item.type === 'reel' ? 'reel' : (item.category === 'academic' ? 'academic' : 'photo')}">
          ${item.badge}
        </span>
        ${item.type === 'reel' ? `
          <div class="reel-play-btn" title="Watch Reel">
            <i class="fa-solid fa-play"></i>
          </div>
        ` : ''}
      </div>
      <div class="event-card-body">
        <div class="event-date">
          <i class="fa-regular fa-calendar-days"></i> ${item.date}
        </div>
        <h3 class="event-title" onclick="openEventModal('${item.id}')" style="cursor: pointer;">
          ${item.title}
        </h3>
        <p class="event-snippet">${item.caption}</p>
        <div class="event-footer">
          <span style="color: #64748b;"><i class="fa-solid fa-tag"></i> ${item.badge}</span>
          <a href="${item.fbLink}" target="_blank" rel="noopener noreferrer" class="fb-link-btn">
            <i class="fa-brands fa-facebook"></i> View on Facebook
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

function setupTabFilters() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.getAttribute("data-filter") || "all";
      renderEvents(filter);
    });
  });
}

// Lightbox Modal for Photo viewing & Facebook Reels
window.openEventModal = function(id) {
  const event = LOTUS_EVENTS.find(e => e.id === id);
  if (!event) return;

  const modal = document.getElementById("eventModal");
  const modalMedia = document.getElementById("modalMedia");
  const modalTitle = document.getElementById("modalTitle");
  const modalCaption = document.getElementById("modalCaption");
  const modalFbLink = document.getElementById("modalFbLink");

  if (!modal) return;

  if (event.type === "reel") {
    modalMedia.innerHTML = `
      <div style="width: 100%; height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; color: #fff; text-align: center; padding: 20px;">
        <i class="fa-brands fa-facebook-square" style="font-size: 3rem; color: #1877f2; margin-bottom: 16px;"></i>
        <h4 style="margin-bottom: 12px; font-size: 1.2rem;">${event.title}</h4>
        <p style="color: #94a3b8; max-width: 480px; margin-bottom: 24px;">Watch the full official high-definition reel and live community reactions directly on our Facebook page.</p>
        <a href="${event.fbLink}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="padding: 12px 24px;">
          <i class="fa-solid fa-play"></i> Watch Full Reel on Facebook
        </a>
      </div>
    `;
  } else {
    modalMedia.innerHTML = `<img src="${event.thumbnail}" alt="${event.title}" style="max-height: 480px; width: 100%; object-fit: contain;">`;
  }

  modalTitle.textContent = event.title;
  modalCaption.textContent = event.caption;
  if (modalFbLink) {
    modalFbLink.href = event.fbLink;
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeEventModal = function() {
  const modal = document.getElementById("eventModal");
  if (modal) {
    modal.classList.remove("active");
    const modalMedia = document.getElementById("modalMedia");
    if (modalMedia) modalMedia.innerHTML = "";
  }
  document.body.style.overflow = "";
};

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeEventModal();
});

// Facebook SDK Initialization
function initFacebookSDK() {
  window.fbAsyncInit = function() {
    FB.init({
      xfbml: true,
      version: 'v19.0'
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
