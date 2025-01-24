const imageUrls = [
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/11.jpg',
    '/img/12.jpg',
    '/img/13.jpg',
    '/img/14.jpg',
    '/img/15.jpg',
    '/img/16.jpg',
    '/img/17.jpg',
    '/img/18.jpg'
]

const container = document.getElementById('random-images-container');
let min = 1;
let max = 17;

for (let i = 0; i < 4; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const imgElement = document.createElement('img');
    imgElement.src = imageUrls[randomNumber];
    imgElement.alt = `Afbeelding ${i + 1}`;
    container.appendChild(imgElement);
}