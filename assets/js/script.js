const init = function () {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach(img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

let autoSlideNext;

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function () {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider';
    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function (imagesList, sliderRootElement) {
    imagesList.forEach(function (item) {
        item.addEventListener('click', function (e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
            const boundAutoSlide = onImageNext.bind(sliderRootElement);
            autoSlideNext = setInterval(boundAutoSlide, 3000);
        });
    });

    // todo: 
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    navNext.addEventListener('click', function (e) {
        fireCustomEvent(e.target, 'js-slider-img-next');
        clearInterval(autoSlideNext);
    });


    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    navPrev.addEventListener('click', function (e) {
        fireCustomEvent(e.target, 'js-slider-img-prev');
        clearInterval(autoSlideNext);
    });



    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    zoom.addEventListener('click', function (e) {
        fireCustomEvent(e.target, 'js-slider-close');
        clearInterval(autoSlideNext);
    });
}

const fireCustomEvent = function (element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent(event);
}

const initCustomEvents = function (imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function (img) {
        img.addEventListener('js-slider-img-click', function (event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}




const onImageClick = function (event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    sliderRootElement.classList.add('js-slider--active');

    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    const clickedImage = event.target.querySelector('img'); // spróbować tu dać this zamiast wyszukiwac selektorem !!!
    const imageURL = clickedImage.getAttribute('src');
    const sliderImage = sliderRootElement.querySelector('.js-slider__image');
    sliderImage.setAttribute('src', imageURL);

    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    const clickedGroupName = event.target.dataset.sliderGroupName;

    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
    const photosList = document.querySelectorAll(`[data-slider-group-name="${clickedGroupName}"]`);

    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    const itemPrototype = sliderRootElement.querySelector('.js-slider__thumbs-item--prototype');
    itemPrototype.style.flexBasis = '100%';
    const sliderThumbs = sliderRootElement.querySelector('.js-slider__thumbs');

    photosList.forEach((photo) => {

        const clonedItem = itemPrototype.cloneNode(true);
        sliderThumbs.appendChild(clonedItem);
        clonedItem.classList.remove('js-slider__thumbs-item--prototype');
        const photoImage = photo.querySelector('img');
        const itemImage = clonedItem.querySelector('img');
        const photoURL = photoImage.getAttribute('src');
        itemImage.setAttribute('src', photoURL);
    });

    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
    const currentlyDisplayedImage = sliderThumbs.querySelector(`[src="${imageURL}"]`);
    currentlyDisplayedImage.classList.add('js-slider__thumbs-image--current');
}

const onImageNext = function (event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]

    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const currentImage = this.querySelector('.js-slider__thumbs-image--current');

    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const imageParent = currentImage.parentElement;
    let nextParent = imageParent.nextElementSibling;

    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    if (!nextParent) {  // Go to first
        const firstParent = this.querySelector('.js-slider__thumbs figure');
        const startPoint = firstParent.nextElementSibling;
        nextParent = startPoint;
    }

    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    const nextImage = nextParent.querySelector('img');
    currentImage.classList.remove('js-slider__thumbs-image--current');
    nextImage.classList.toggle('js-slider__thumbs-image--current');

    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
    const imageURL = nextImage.getAttribute('src');
    const sliderImageURL = this.querySelector('.js-slider__image');
    sliderImageURL.setAttribute('src', imageURL);
}

const onImagePrev = function (event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]

    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const currentImage = this.querySelector('.js-slider__thumbs-image--current');

    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const imageParent = currentImage.parentElement;
    let previousParent = imageParent.previousElementSibling;

    if (previousParent.classList.contains('js-slider__thumbs-item--prototype')) {  // Go to last

        const sliderThumbs = this.querySelector('.js-slider__thumbs');
        const endPoint = sliderThumbs.lastChild;
        previousParent = endPoint;
    }

    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    if (previousParent) {

        // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
        const previousImage = previousParent.querySelector('img');
        currentImage.classList.remove('js-slider__thumbs-image--current');
        previousImage.classList.toggle('js-slider__thumbs-image--current');

        // 5. podmienić atrybut [src] dla [.js-slider__image]
        const imageURL = previousImage.getAttribute('src');
        const sliderImageURL = this.querySelector('.js-slider__image');
        sliderImageURL.setAttribute('src', imageURL);
    }
}

const onClose = function (event) {
    // todo:
    if (event.target.getAttribute('class') === 'js-slider__zoom') {

        // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
        const slider = document.querySelector('.js-slider');
        slider.classList.remove('js-slider--active');

        // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
        const sliderThumbs = slider.querySelector('.js-slider__thumbs');
        const thumbsPrototype = sliderThumbs.querySelector('.js-slider__thumbs-item--prototype');

        while (thumbsPrototype.nextElementSibling) {
            sliderThumbs.removeChild(thumbsPrototype.nextElementSibling);
        }
    }
}