(function ($) {

  "use strict";

  // PRE LOADER
  $(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets    
  });


  // MENU
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });


  // HOME SLIDER & COURSES & CLIENTS
  $('.home-slider').owlCarousel({
    animateOut: 'fadeOut',
    items: 1,
    loop: true,
    dots: false,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
  })

  $('.owl-courses').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      }
    }
  });

  $('.owl-client').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      }
    }
  });


  // SMOOTHSCROLL
  $(function () {
    $('.custom-navbar a, #home a').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1000);
      event.preventDefault();
    });
  });

})(jQuery);



//WHAT WE REPRESENT READ MORE/LESS
// IIFE (Immediately Invoked Function Expression) to encapsulate the code and avoid global scope pollution or prevent variable leakage
(function () {
  // Function to initialize the read more/less functionality
  // initReadMore function can be easily reused or modified without affecting the global namespace
  function initReadMore() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      // Event delegation for read more/less buttons
      // Instead of attaching separate event listeners to each button, we attach a single listener to the card that 
      // handles clicks on its children. This is more efficient, especially with many elements.
      card.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('read-more-btn')) {
          event.preventDefault();
          const moreText = target.closest('.more-text');
          const extraContent = moreText.querySelector('.extra-content');

          // Show extra content and hide the "Read more" link
          extraContent.style.display = 'inline';
          target.parentElement.style.display = 'none';
        } else if (target.classList.contains('read-less-btn')) {
          event.preventDefault();
          const moreText = target.closest('.more-text');
          const extraContent = moreText.querySelector('.extra-content');

          // Hide extra content and show the "Read more" link
          extraContent.style.display = 'none';
          moreText.querySelector('.read-more').style.display = 'inline';
        }
      });
    });
  }

  // Initialize the functionality on DOMContentLoaded
  // Ensures that the script runs only after the DOM is fully loaded.
  document.addEventListener('DOMContentLoaded', initReadMore);
})();


// PHOTO GALLERY
document.addEventListener('DOMContentLoaded', function() {
  const galleryData = [
      'images/gallery_image_1.jpeg',
      'images/gallery_image_2.jpeg',
      'images/gallery_image_3.jpeg',
      'images/gallery_image_4.jpeg',
      'images/gallery_image_5.jpeg',
      'images/gallery_image_6.jpeg',
      'images/gallery_image_7.jpeg',
      'images/gallery_image_8.jpeg',
  ];

  const gallery = document.getElementById('gallery');
  const toggleViewBtn = document.getElementById('view-more');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentIndex = 0;
  let displayedImages = 5;
  const initialDisplay = 5;

  // Function to disable scrolling
  function disableScroll() {
      document.body.style.overflow = 'hidden';
      // Prevent layout shift
      document.body.style.paddingRight = getScrollbarWidth() + 'px'; 
  }

  // Function to enable scrolling
  function enableScroll() {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
  }

  // Function to calculate scrollbar width to prevent layout shift
  function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
  }

  function createImageElement(src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Gallery Image";
      img.classList.add('gallery-item');
      return img;
  }

  function populateGallery(limit) {
     // Clear existing images
      gallery.innerHTML = '';
      for (let i = 0; i < Math.min(limit, galleryData.length); i++) {
          const imgElement = createImageElement(galleryData[i]);
          imgElement.addEventListener('click', () => openLightbox(i));
          gallery.appendChild(imgElement);
      }

      if (galleryData.length <= initialDisplay) {
          toggleViewBtn.style.display = 'none';
      } else {
          toggleViewBtn.style.display = 'inline-block';
          // Update the button text based on the current state
          if (limit >= galleryData.length) {
              toggleViewBtn.textContent = 'Show Less';
          } else {
              toggleViewBtn.textContent = 'Show More';
          }
      }
  }

  function openLightbox(index) {
      currentIndex = index;
      lightbox.style.display = 'flex';
      lightboxImage.src = galleryData[currentIndex];
      lightbox.style.opacity = 1;
      // Disable scrolling when lightbox opens
      disableScroll(); 
  }

  function hideLightbox() {
      lightbox.style.opacity = 0;
      setTimeout(() => {
          lightbox.style.display = 'none';
          // Re-enable scrolling when lightbox closes
          enableScroll(); 
      }, 300);
  }

  function showNextImage() {
      currentIndex = (currentIndex + 1) % galleryData.length;
      lightboxImage.src = galleryData[currentIndex];
  }

  function showPrevImage() {
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      lightboxImage.src = galleryData[currentIndex];
  }

  toggleViewBtn.addEventListener('click', () => {
      if (displayedImages < galleryData.length) {
          displayedImages = galleryData.length;
      } else {
          displayedImages = initialDisplay;
      }
      populateGallery(displayedImages);
  });

  lightboxClose.addEventListener('click', hideLightbox);
  lightboxPrev.addEventListener('click', showPrevImage);
  lightboxNext.addEventListener('click', showNextImage);

   // Close the lightbox when clicking the overlay
  lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
          hideLightbox();
      }
  });

  document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
          if (e.key === 'Escape') hideLightbox();
          if (e.key === 'ArrowLeft') showPrevImage();
          if (e.key === 'ArrowRight') showNextImage();
      }
  });

  // Initial population of the gallery
  populateGallery(displayedImages);
});
