// CSV data converted to JavaScript array
const shelterData = [
    {
        age: "3 years",
        animalId: "A746874",
        animalType: "Cat",
        breed: "Domestic Shorthair Mix",
        color: "Black/White",
        dateOfBirth: "2014-04-10",
        datetime: "2017-04-11 09:00:00",
        name: "",
        outcomeType: "Transfer",
        sexUponOutcome: "Neutered Male",
        locationLat: 30.5066578739455,
        locationLong: -97.3408780722188,
        ageInWeeks: 156.767857142857
    },
    {
        age: "2 years",
        animalId: "A716330",
        animalType: "Dog",
        breed: "Chihuahua Shorthair Mix",
        color: "Brown/White",
        dateOfBirth: "2013-11-18",
        datetime: "2015-12-28 18:43:00",
        name: "Frank",
        outcomeType: "Adoption",
        sexUponOutcome: "Neutered Male",
        locationLat: 30.7595748121648,
        locationLong: -97.5523753807133,
        ageInWeeks: 110.111408730159
    },
    {
        age: "7 months",
        animalId: "A733653",
        animalType: "Cat",
        breed: "Siamese Mix",
        color: "Seal Point",
        dateOfBirth: "2016-01-25",
        datetime: "2016-08-27 18:11:00",
        name: "Kitty",
        outcomeType: "Adoption",
        sexUponOutcome: "Intact Female",
        locationLat: 30.3188063374257,
        locationLong: -97.7240376703891,
        ageInWeeks: 30.8225198412698
    },
    {
        age: "1 year",
        animalId: "A725717",
        animalType: "Cat",
        breed: "Domestic Shorthair Mix",
        color: "Silver Tabby",
        dateOfBirth: "2015-05-02",
        datetime: "2016-05-06 10:49:00",
        name: "",
        outcomeType: "Transfer",
        sexUponOutcome: "Spayed Female",
        locationLat: 30.6525984560228,
        locationLong: -97.7419963476444,
        ageInWeeks: 52.9215277777778
    }
];

// Breed filters for different rescue types
const rescueTypeFilters = {
    Water: ["Labrador Retriever Mix", "Chesapeake Bay Retriever", "Newfoundland"],
    Mountain: ["German Shepherd", "Alaskan Malamute", "Old English Sheepdog", "Siberian Husky", "Rottweiler"],
    Disaster: ["Doberman Pinscher", "German Shepherd", "Golden Retriever", "Bloodhound", "Rottweiler"]
};

// User data stored in localStorage
const defaultAdmin = {
    username: "admin",
    password: "$2a$10$xWZXy3vQvYuL4KMCRn.OJeQBpIwg2yYL1Mx5DUZS.F4JcZDpqrOSS", // hashed "admin123"
    role: "Admin"
};

// Initialize local storage with default admin if not exists
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([defaultAdmin]));
}

// Store initial data in localStorage if not exists
if (!localStorage.getItem('shelterData')) {
    localStorage.setItem('shelterData', JSON.stringify(shelterData));
}

// Helper functions for data management
const DataService = {
    getAllAnimals() {
        return JSON.parse(localStorage.getItem('shelterData')) || [];
    },

    getFilteredAnimals(rescueType) {
        const animals = this.getAllAnimals();
        if (!rescueType || rescueType === 'Reset') return animals;
        
        const breedFilter = rescueTypeFilters[rescueType];
        return animals.filter(animal => breedFilter.includes(animal.breed));
    },

    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    },

    addUser(username, hashedPassword, role) {
        const users = this.getUsers();
        users.push({ username, password: hashedPassword, role });
        localStorage.setItem('users', JSON.stringify(users));
    },

    findUser(username) {
        return this.getUsers().find(user => user.username === username);
    },

    addAnimal(animalData) {
        const animals = this.getAllAnimals();
        animals.push(animalData);
        localStorage.setItem('shelterData', JSON.stringify(animals));
    },

    updateAnimal(animalId, updatedData) {
        const animals = this.getAllAnimals();
        const index = animals.findIndex(a => a.animalId === animalId);
        if (index !== -1) {
            animals[index] = { ...animals[index], ...updatedData };
            localStorage.setItem('shelterData', JSON.stringify(animals));
            return true;
        }
        return false;
    },

    deleteAnimal(animalId) {
        const animals = this.getAllAnimals();
        const filteredAnimals = animals.filter(a => a.animalId !== animalId);
        localStorage.setItem('shelterData', JSON.stringify(filteredAnimals));
    }
};
