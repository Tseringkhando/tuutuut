currentYear = new Date().getFullYear(); // Get the current year
// Define Car class
class Car {
    constructor(brand, model, year, color, price, gas) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
        this.gas = gas;
    }

    honk() {
        console.log("Tuut tuut. Brand: " + this.brand + ", Model: " + this.model + ", Year: " + this.year + ", Color: " + this.color + ", Price: " + this.price);
    }
}

// Create instances of Car class
const cars = [
    new Car("Honda", "CR-V", 2023, "Red", 50000, 45),
    new Car("Ford", "F-150", 2020, "Black", 25000, 30),
    new Car("BMW", "X5", 2022, "Green", 60000, 65),
    new Car("Mazda", "CX-5", 2019, "White", 15000, 60),
    new Car("Audi", "Q7", 2018, "Silver", 52000, 47),
    new Car("Kia", "Forte", 2020, "Blue", 21000, 56)
];
// Add this code just after creating the cars array
const raceInfo = document.getElementById("race-info");
cars.forEach(car => {
    const carInfo = document.createElement('p');
    carInfo.id = `info-${car.brand}-${car.model}`;
    carInfo.innerHTML = `${car.brand} ${car.model} - Remaining Gas: ${car.gas} liters`;
    raceInfo.appendChild(carInfo);
    car.honk();
});


// Initialize race variables
let currentTurn = 0;
let raceInterval;

// Function to start the race
function startRace() {
    raceInterval = setInterval(() => {
        currentTurn++;
        if (currentTurn <= 7) {
            console.log(`Car turn number ${currentTurn}:`);
            updateRace();
        } else {
            clearInterval(raceInterval);
            declareWinner();
        }
    }, 1000); // Adjust interval for animation duration
}

// Function to update race
function updateRace() {
    const carElements = document.querySelectorAll('.car');
    cars.forEach((car, index) => {
        var carAge = currentYear - car.year;
        var gasLoss = carAge <= 0 ? 5 : 5 + carAge; // Cars lose 5 liters if new, otherwise 5 + age liters
        car.gas -= gasLoss;
        const carInfo = document.getElementById(`info-${car.brand}-${car.model}`);

        if (car.gas <= 0) {
            car.gas = 0; // Ensure gas doesn't go below 0
            carInfo.innerHTML = `${car.brand} ${car.model} ran out of fuel and stopped.`;
            //To ensure that the car stops at its current position
            const computedStyle = window.getComputedStyle(carElements[index]);
            //Capture the car's current position and set it as its left style property before stopping the animation
            const currentLeft = computedStyle.getPropertyValue('left');
            carElements[index].style.left = currentLeft;
            carElements[index].style.animation = "none"; // Stop the car animation
        } else {
            carElements[index].style.animationName = "moveCar";
            carElements[index].style.animationDuration = `${Math.max(5, car.gas * 0.9)}s`; // Decrease speed with loss of gas
            carInfo.innerHTML = `${car.brand} ${car.model} - Remaining Gas: ${car.gas} liters`;
        }
    });

    // Display remaining fuel in the table
    const raceTable = document.getElementById("turnsTableBody");
    const newRow = raceTable.insertRow(-1);
    const turnCell = newRow.insertCell(0);
    turnCell.textContent = "Turn " + currentTurn;
    cars.forEach((car, index) => {
        const gasCell = newRow.insertCell(index + 1);
        gasCell.textContent = car.gas;
    });
}
// Function to declare the winner
function declareWinner() {
    const winner = cars.reduce((prev, current) => prev.gas > current.gas ? prev : current);

    // Create the winning bubble element
    const winningBubble = document.createElement('div');
    winningBubble.style.position = 'absolute';
    winningBubble.style.top = '50%';
    winningBubble.style.left = '50%';
    winningBubble.style.transform = 'translate(-50%, -50%)';
    winningBubble.style.padding = '20px';
    winningBubble.style.borderRadius = '50%';
    winningBubble.style.backgroundColor = 'rgba(255, 255, 0, 0.8)';
    winningBubble.style.fontSize = '24px';
    winningBubble.style.fontWeight = 'bold';
    winningBubble.style.color = 'black';
    winningBubble.style.zIndex = '10';
    winningBubble.style.textAlign = 'center';
    winningBubble.innerHTML = `${winner.brand} ${winner.model} wins the race!`;

    // Append the winning bubble to the race track
    const raceTrack = document.querySelector('.race-track');
    raceTrack.appendChild(winningBubble);

    // Stop all cars at their current positions
    const carElements = document.querySelectorAll('.car');
    carElements.forEach(car => {
        const computedStyle = window.getComputedStyle(car);
        const currentLeft = computedStyle.getPropertyValue('left');
        car.style.left = currentLeft;
        car.style.animation = "none";
    });
}



// Start the race
startRace();