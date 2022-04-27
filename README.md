
![](./assets/img/img1.png)

# Slider

See the live version of [Slider App](https://mateuszsuplewski.github.io/JS-Slider/).

Slider is an application that allows you to open a gallery of images and scroll through the photos using the buttons attached to the slider. 
Provided application uses Custom Events to handle the occurring events.

**Main features**:
- Display gallery on image click,
- Scroll through the photos using buttons,
- Infinite scrolling,
- Automatic gallery scrolling.

&nbsp;
 
## 💡 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


&nbsp;
 
## 🤔 Solutions provided in the project

- ### Functionality and interaction
- - #### Listening for an event
```javascript
 const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    navNext.addEventListener('click', function (e) {
        fireCustomEvent(e.target, 'js-slider-img-next');
    });
     sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
```
- - #### Function used with event
```javascript
const onImageNext = function (event) {
    const currentImage = this.querySelector('.js-slider__thumbs-image--current');
    
    const imageParent = currentImage.parentElement;
    let nextParent = imageParent.nextElementSibling;

    const nextImage = nextParent.querySelector('img');
    currentImage.classList.remove('js-slider__thumbs-image--current');
    nextImage.classList.toggle('js-slider__thumbs-image--current');

    const imageURL = nextImage.getAttribute('src');
    const sliderImageURL = this.querySelector('.js-slider__image');
    sliderImageURL.setAttribute('src', imageURL);
}
```
* ### Looping photo scrolling
- - #### Find the first image (not a prototype) when the next one doesn't exist
```javascript
if (!nextParent) {  // Go to first
        const firstParent = this.querySelector('.js-slider__thumbs figure');
        const startPoint = firstParent.nextElementSibling;
        nextParent = startPoint;
    }
```
 - - #### Find the last image (not a prototype) when there is no previous one
```javascript
if (previousParent.classList.contains('js-slider__thumbs-item--prototype')) {  // Go to last
        const sliderThumbs = this.querySelector('.js-slider__thumbs');
        const endPoint = sliderThumbs.lastChild;
        previousParent = endPoint;
    }
```
- ### Self-starting scrolling
- - #### Next image every 3 seconds
```javascript
 const boundAutoSlide = onImageNext.bind(sliderRootElement);
            autoSlideNext = setInterval(boundAutoSlide, 3000);
```
Using bind to change context of `this` in `onImageNext()` to `sliderRootElement`
- - #### Break automatic scroll 
 ```javascript
 clearInterval(autoSlideNext)
 ```
- ### Worth mentioning
  App includes a functionality to randomly allocate one of two classes to each of the photos

&nbsp;

## 💭 Conclusions for future projects


### This is the issue
I used `if(event.target.getAttribute('class') === 'js-slider__zoom')` in `onClose`. Instead of that I could've used `event.stopPropagation()` to `onImagePrev` and `onImagePrev`.

In this app I will leave the first solution, because I don't have that many events, but I will make sure to implement it in the other programs!


### Ideas to upgrade project in the Future
Add function that generate photos template in random order from larger image pool .

&nbsp;

## 🙋‍♂️ Feel free to contact me
In case you found more issues that could've been solved, you have ideas how we can create something more complex or just simply want to chat, then just let me know on:
[Linkedin](https://www.linkedin.com/in/mateusz-suplewski-705017227/) or via Email : Matx3582@gmail.com
&nbsp;

## 👏 Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) & [Akademia Samouka](https://akademiasamouka.pl/) - for providing me with this task.


&nbsp;