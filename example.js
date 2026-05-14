
// const stopWatch = {
//     second: 0,
//     start: () => {
//         setInterval(function () {
//             console.log("Inside the setinterval", this);
//             this.second++;
//             console.log(this.second);
//         }, 1000);
//     },
// };

// stopWatch.start();


const element = document.getElementById("root");

element.addEventListener('click', () => {
    console.log(this);
})