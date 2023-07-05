let windowSize = window.innerWidth;
const body = document.querySelector("body");

(function () {
  //contact email
  emailjs.init("58XtBpogqDYqSLNAX");
})();

window.onload = function () {
  setTimeout(function () {
    AOS.init(); //scroll ani
  }, 10);
};

window.onresize = function () {
  windowSize = window.innerWidth;
  sideView(windowSize, window.scrollY);
  AOS.refresh();
};

window.addEventListener("scroll", function () {
  windowSize = window.innerWidth;
  sideView(windowSize, window.scrollY);
  AOS.refresh();
});

mainBgAdd();
snbView();
snbHandler();
snbSectionMoving();

function snbView(width, scroll) {
  const snb = document.querySelector(".snb");
  if (windowSize > 760) {
    snb.classList.remove("mo-nav");
    if (scroll > 300) {
      snb.classList.add("open");
    } else {
      snb.classList.remove("open");
    }
  } else {
    if (scroll > 100) {
      snb.classList.add("mo-nav");
      snb.classList.add("open");
    } else {
      snb.classList.remove("open");
      snb.classList.remove("mo-nav");
    }
  }
  windowSize = width;
}

function snbHandler() {
  //모바일 메뉴 show
  const nav = document.querySelector(".snb .btn-side-open");
  nav.addEventListener("click", function () {
    nav.closest(".snb").classList.toggle("mo-nav");
  });
}

function snbSectionMoving() {
  // section 위치이동
  const section = document.querySelectorAll(".section");
  const navActive = document.querySelectorAll(".bnt-active");
  const btnNav = document.querySelectorAll(".snb .bnt-active");
  const btnTop = document.querySelector(".snb .btn-top");
  let i = null;

  window.onscroll = () => {
    section.forEach((sec, idx) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 500;
      let heigth = sec.offsetHeight;

      if (idx > 0) {
        if (top > offset && top < offset + heigth) {
          navActive.forEach((link) => {
            link.classList.remove("active");
          });
          navActive[idx - 1].classList.add("active");
        }
      }
    });
  };

  btnNav.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      i = idx > 2 ? 0 : idx + 1;
      let offTop = section[i].offsetTop;
      window.scrollTo({ top: offTop + 50, behavior: "smooth" });
    });
  });

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function mainBgAdd() {
  let section1 = document.querySelector(".section1");
  let inner = document.querySelector(".section1 .inner");
  let imgBox = document.querySelector(".section1 .bg-img-box");
  let bgList = [];
  let i = 0;
  for (let i = 1; i < 13; i++) {
    bgList.push(`/images/bg/b${i}.png`);
  }
  let x = section1.clientWidth;
  let y = section1.clientHeight;

  let setinterval = setInterval(() => {
    //auto
    if (i !== bgList.length) {
      let addSpan = document.createElement("span");
      addSpan.style.left = Math.floor(Math.random() * (x - 100) + 1) + "px";
      addSpan.style.top = Math.floor(Math.random() * (y - 100) + 1) + "px";
      let bg = `url(https://owl6068.github.io/msPortFolio/${bgList[i]})`;
      addSpan.style.backgroundImage = bg;
      imgBox.appendChild(addSpan);
      i++;
    } else {
      clearInterval(setinterval);
    }
  }, 150);

  section1.onclick = function (e) {
    //click
    let x = e.pageX - e.target.offsetLeft;
    let y = e.pageY - e.target.offsetTop;

    let addStrong = document.createElement("strong");
    addStrong.style.left = x + "px";
    addStrong.style.top = y + "px";

    let bg = `url(https://owl6068.github.io/msPortFolio/${bgList[Math.floor(Math.random() * bgList.length)]})`;
    addStrong.style.backgroundImage = bg;

    imgBox.appendChild(addStrong);

    setTimeout(() => {
      addStrong.remove();
    }, 3000);
  };
}

let swiper = new Swiper(".career-swiper", {
  slidesPerView: 1,
  centeredSlides : true,
  loop:true,
  observer: true,
  observeParents: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // breakpoints: {
  //       100:{
  //         slidesPerView: 1,
  //         spaceBetween: 0,
  //       },
  //       1000: {
  //         slidesPerView: 1.3,
  //       },
  //   },
});

const btnModalOpen = (select) => {
  const open = document.querySelector(`.${select}`);
  modalClose();
  body.classList.add('overflow');
  open.classList.add("active");
};
const btnModalClose = (select) => {
  const ani = document.querySelector(`.${select}`);
  ani.classList.add('closeAni');
  setTimeout(() => {
    modalClose();
    ani.classList.remove('closeAni');
  }, 300);
  body.classList.remove('overflow');
};

function modalClose(){
  const modal = document.querySelectorAll(`.modal-wrap`);
  modal.forEach(data => {
    data.classList.remove("active");
  });
}
