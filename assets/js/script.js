
// scroll top
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("is-visible");
  } else {
    scrollTopBtn.classList.remove("is-visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// ====================scroll header==========================//
const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("is-sticky");
  } else {
    header.classList.remove("is-sticky");
  }
});



//============================== Lazy load==========================//
const lazyImages = document.querySelectorAll(".lazy-img");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: "100px" });

// Observe all images initially
lazyImages.forEach(img => observer.observe(img));

// =================================hero slider======================//
let sliderIntervals = [];

function initSliders() {
  // Clear old intervals
  sliderIntervals.forEach(i => clearInterval(i));
  sliderIntervals = [];

  const isMobile = window.innerWidth <= 768;
  const wrapper = document.querySelector(".slider-wrapper");
  const allSliders = wrapper.querySelectorAll(".mini-slider");

  if (isMobile) {
    // MOBILE: merge all images into single horizontal slider
    let mobileTrack = wrapper.querySelector(".mobil-sldier .slider-track");

    if (!mobileTrack) {
      wrapper.innerHTML = `<div class="mini-slider mobil-sldier"><div class="slider-track"></div></div>`;
      mobileTrack = wrapper.querySelector(".slider-track");

      // Collect all images from all sliders
      const allImgs = document.querySelectorAll(".slide-img");
      allImgs.forEach(img => mobileTrack.appendChild(img));
    }

    const slides = mobileTrack.querySelectorAll(".slide-img");
    const VISIBLE = 3;
    let index = 0;
    const WIDTH = slides[0] ? slides[0].offsetWidth + 20 : 100;

    function moveSlider() {
      mobileTrack.style.transform = `translateX(-${index * WIDTH}px)`;
    }

    function nextSlide() {
      const maxIndex = slides.length - VISIBLE;
      index = index >= maxIndex ? 0 : index + 1;
      moveSlider();
    }

    let interval = setInterval(nextSlide, 1000);
    sliderIntervals.push(interval);

    wrapper.addEventListener("mouseenter", () => clearInterval(interval));
    wrapper.addEventListener("mouseleave", () => interval = setInterval(nextSlide, 2500));

  } else {
    // DESKTOP: 3 independent vertical sliders
    allSliders.forEach(slider => {
      const track = slider.querySelector(".slider-track");
      if (!track) return;

      const slides = track.querySelectorAll(".slide-img");
      const IMAGE_HEIGHT = slides[0] ? slides[0].offsetHeight + 20 : 120;
      const VISIBLE_COUNT = 3;
      const maxIndex = slides.length - VISIBLE_COUNT;
      if (maxIndex <= 0) return; // no slide if not enough images

      let index = 0;

      function moveSlider() {
        track.style.transform = `translateY(-${index * IMAGE_HEIGHT}px)`;
      }

      function nextSlide() {
        index = index >= maxIndex ? 0 : index + 1;
        moveSlider();
      }

      const delay = slider.classList.contains("is-center") ? 1500 : 1000;
      let interval = setInterval(nextSlide, delay);
      sliderIntervals.push(interval);

      // Hover pause
      slider.addEventListener("mouseenter", () => clearInterval(interval));
      slider.addEventListener("mouseleave", () => interval = setInterval(nextSlide, delay));

      // Vertical swipe support
      let startY = 0;
      slider.addEventListener("touchstart", e => startY = e.touches[0].clientY);
      slider.addEventListener("touchend", e => {
        let endY = e.changedTouches[0].clientY;
        if (startY - endY > 50) nextSlide();
        if (endY - startY > 50) {
          index = index <= 0 ? maxIndex : index - 1;
          moveSlider();
        }
      });
    });
  }

  // Re-observe lazy images after DOM changes
  lazyImages.forEach(img => observer.observe(img));
}

// Initialize
initSliders();
window.addEventListener("resize", initSliders);




// ====================================card=======================//

// Sample JSON data
const jsonData = [
  {
    "title": "1 Million+",
    "description": "Parents",
  },
  {
    "title": "22+Years",
    "description": "Years of Legacy",
  },
  {
    "title": "500+ ",
    "description": "Participating Schools",
  },
  {
    "title": "17 Cities",
    "description": "Across the Globe",
  }
];

const container = document.getElementById('card-container');

// Loop JSON and create cards
jsonData.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
        <div class="card-content">
         <div class="card-space">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
         </div>
        </div>
      `;
  container.appendChild(card);
});



// Participating Schools Logo data (10 logos, split 5 + 5) ✅ 12 unique logos (change paths as per your assets)//
const logos = [
  { img: 'assets/images/slider-1.svg', alt: 'Logo 1' },
  { img: 'assets/images/slider-2.svg', alt: 'Logo 2' },
  { img: 'assets/images/slider-3.svg', alt: 'Logo 3' },
  { img: 'assets/images/slider-4.svg', alt: 'Logo 4' },
  { img: 'assets/images/slider-5.svg', alt: 'Logo 5' },
  { img: 'assets/images/slider-6.svg', alt: 'Logo 6' },
  { img: 'assets/images/slider-1.svg', alt: 'Logo 7' },
  { img: 'assets/images/slider-2.svg', alt: 'Logo 8' },
  { img: 'assets/images/slider-3.svg', alt: 'Logo 9' },
  { img: 'assets/images/slider-4.svg', alt: 'Logo 10' },
  { img: 'assets/images/slider-5.svg', alt: 'Logo 11' },
  { img: 'assets/images/slider-6.svg', alt: 'Logo 12' }
];

// Insert logos into 2 rows (6 logos each)
const row1 = document.getElementById('logoWrapper1');
const row2 = document.getElementById('logoWrapper2');

logos.forEach((logo, i) => {
  const slide = `<div class="swiper-slide"><img src="${logo.img}" alt="${logo.alt}"></div>`;
  (i < 6 ? row1 : row2).insertAdjacentHTML('beforeend', slide);
});


//======================= Choose the School That Fits You Best=======================//
const schoolData = [
  {
    img: 'assets/images/Pre-Schools .jpg',
    title: 'Pre-Schools & Early Learning Centres',
    paragraph: 'Nurturing foundational skills for toddlers and pre-primary children.'
  },
  {
    img: 'assets/images/K12.jpg',
    title: 'K–12 CBSE Day Schools',
    paragraph: 'Reputed schools offering complete schooling from Kindergarten to Grade 12.'
  },
  {
    img: 'assets/images/Heritage.jpg',
    title: 'Heritage to New-Age Schools',
    paragraph: 'Time-tested schools to innovative pedagogy, tech enabled, future-ready schools'
  },
  {
    img: 'assets/images/International.jpg',
    title: 'International Curriculum Schools',
    paragraph: 'Offering IB, Cambridge, Finnish and other global curricula with a global learning environment.'
  }
];

// =====================================Insert desktop cards========================//
const desktopWrapper = document.getElementById('desktopSchoolWrapper');
schoolData.forEach(item => {
  const card = `
    <div class="school-card">
      <img src="${item.img}" alt="${item.title}">
      <div class="school-text">
        <h2>${item.title}</h2>
        <p>${item.paragraph}</p>
      </div>
    </div>
  `;
  desktopWrapper.insertAdjacentHTML('beforeend', card);
});

//========================================== Insert mobile slides=================//
const mobileWrapper = document.getElementById('mobileSchoolWrapper');
schoolData.forEach(item => {
  const slide = `
    <div class="swiper-slide">
      <img src="${item.img}" alt="${item.title}">
      <div class="school-text">
        <h2>${item.title}</h2>
        <p>${item.paragraph}</p>
      </div>
    </div>
  `;
  mobileWrapper.insertAdjacentHTML('beforeend', slide);
});


// ========================What Makes This Exhibition a Must-Visit   JSON Data (5 boxes)======================//

const exhibitionData = [
  { img: 'assets/images/user.svg', title: 'Interact Directly with School Heads ', text: 'Get answers straight from the experts' },
  { img: 'assets/images/Compare.svg', title: 'Compare Curriculum & Pedagogy', text: 'Understand the differences between CBSE, ICSE, IB, Cambridge, Finnish & more' },
  { img: 'assets/images/Structures.svg', title: 'Get Exclusive Fee Structures & Offers', text: 'Access transparent information and avail offers' },
  { img: 'assets/images/Explore.svg', title: 'Explore Schools Offerings', text: 'Preview infrastructure, co-curricular, teaching methodology and culture' },
  { img: 'assets/images/Spot.svg', title: 'On-the-Spot Admissions & Counselling', text: 'Save time with instant applications and expert guidance' },
];

// Insert slides dynamically
const exhibitionWrapper = document.getElementById('exhibitionWrapper');
exhibitionData.forEach(item => {
  const slide = `
    <div class="swiper-slide">
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>
  `;
  exhibitionWrapper.insertAdjacentHTML('beforeend', slide);
});
