function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prevSlide = document.querySelector(prevArrow);
    const nextSlide = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    function showSlideNum() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }
    showSlideNum();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol');
    const dotsArr = [];
    dots.classList.add('carousel-indicators');
    dots.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
  `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    const dotsOpacity = () => {
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    }


    const currentSliderNum = () => {
        if (slideIndex > slides.length) {
            slideIndex = 1;
            current.textContent = `0${slideIndex}`
        } else if (slideIndex < 1) {
            slideIndex = slides.length;
            current.textContent = slideIndex;
        }
    };

    const deleteNotDigits = str => +str.replace(/\D/g, '')


    nextSlide.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        currentSliderNum();
        showSlideNum();
        dotsOpacity();
    });

    prevSlide.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        currentSliderNum();
        showSlideNum();
        dotsOpacity();
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSliderNum();
            dotsOpacity();
            showSlideNum();
        })
    });

    // showSlideNum(slideIndex);

    // if (slides.length < 10) {
    //   total.textContent = `0${slides.length}`
    // } else {
    //   total.textContent = slides.length;
    // }

    // function showSlides (n) {
    //   if (n > slides.length) {
    //     slideIndex = 1;
    //   }
    //   if (n < 1) {
    //     slideIndex = slides.length;
    //   }

    //   slides.forEach(slide => slide.style.display = 'none');

    //   slides[slideIndex - 1].style.display = 'block';

    //   if (slides.length < 10) {
    //     current.textContent = `0${slideIndex}`
    //   } else {
    //     current.textContent = slideIndex;
    //   }
    // }

    // function plusSlides (n) {
    //   showSlides(slideIndex += n)
    // }

    // prevSlide.addEventListener('click', () => {
    //   plusSlides(-1);
    // });

    // nextSlide.addEventListener('click', () => {
    //   plusSlides(1);
    // })

    // fetch('http://localhost:3000/menu')
    //   .then(data => data.json())
    //   .then(res => console.log(res));
}

export default slider;