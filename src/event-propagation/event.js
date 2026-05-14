const buttonElement = document.querySelector('button');
const divElement = document.querySelector('div');
const bodyElement = document.querySelector('body');

buttonElement.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("Button....");
});

divElement.addEventListener('click', () => {
    console.log("Div....");
});

bodyElement.addEventListener('click', () => {
    console.log("Body....");
});
