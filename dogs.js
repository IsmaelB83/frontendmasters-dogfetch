// Constants
const BREEDS_API = 'https://dog.ceo/api/breeds/list/all'
const DOG_IMAGE_API = 'https://dog.ceo/api/breed/';

// Initialization
const dogSpinner = document.querySelector('.dog__spinner');
const dogImage = document.querySelector('.dog__image');
const breeds = document.querySelector('.breed__select');
const loadButton = document.querySelector('.breed__button');

dogImage.hidden = true;
dogSpinner.hidden = true;

// Load breeds
const breedsPromise = fetch(`${BREEDS_API}`);

breedsPromise
    .then(response => {
        return response.json()
    })
    .then (result => {
        const data = result.message;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const opt = document.createElement('option');
                opt.value = key;
                opt.innerHTML = key;
                breeds.appendChild(opt);    
            }
        }
    })
    .catch(error => {
        console.error(error)
    });

// Button 
loadButton.addEventListener('click', (ev) => {
    const breed = breeds.value;
    dogSpinner.hidden = false;
    dogImage.hidden = true;
    const dogPromise = fetch(`${DOG_IMAGE_API}${breed}/images/random`);
    dogPromise
        .then(response => {
            return response.json()
        })
        .then (result => {
            dogImage.src = result.message;
            dogSpinner.hidden = true;
            dogImage.hidden = false;
        })
        .catch(error => {
            dogSpinner.hidden = true;
            dogImage.hidden = true;
        });
});