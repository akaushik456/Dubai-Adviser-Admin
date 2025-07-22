export const restaurantFilters = {
    MealType: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    OnlineOptionsAndOffers: ["Online Delivery", "Online Booking", "Online Offers"],
    PriceRange: ["Cheap Eats", "Mid-range", "Fine Dining"],
    TravelerRating: ["5*", "4*", "3*"],
    MichelinGuide: [
        "Michelin Guide",
        "Michelin 2 Star",
        "Michelin 1 Star",
        "Michelin Bib Gourmand"
    ],
    Cuisine: [
        "Asian", "Indian", "Mediterranean", "International", "Middle Eastern", "Arabic", "Italian",
        "American", "European", "Fast Food", "Chinese", "Healthy", "Lebanese", "Pub", "Pizza",
        "Seafood", "Japanese", "Sushi", "Grill", "Barbeque", "French", "Thai", "Fusion", "Steakhouse",
        "Mexican", "Persian", "Street Food", "Spanish"
    ],
    Dishes: [
        "Chicken Dishes", "Salad", "Desserts", "Cake", "Beef", "Fish", "Breads and Pastries", "Burger",
        "Soup", "Lamb", "Kebabs", "Seafood", "Sandwiches", "Curry", "Biryani", "Lobster", "Crab",
        "Mutton", "Fried Rice", "Paneer", "Beef Ribs", "Chicken Wings", "Pork", "Shawarma", "Chilly",
        "Tiramisu", "Dumpling", "Thali", "Omelette", "Pancake", "Cheesecake", "Dimsum", "Mashed Potatoes"
    ],
    DietaryRestrictions: [
        "Vegetarian Friendly", "Vegan Options", "Halal", "Gluten Free", "Kosher"
    ],
    GreatFor: [
        "Child-friendly", "Groups", "Kids", "Business Meetings", "Romantic", "Special Occasion Dining",
        "Bar Scene", "View", "Hidden Gems", "Local Cuisine", "Hot New Restaurants"
    ],
    Facilities: [
        "Seating", "Reservations", "Table Service", "Wheel Chair Accessibility", "Free Wifi", "Delivery",
        "Takeout", "Serves Alcohol", "Family Style", "Valet Parking", "Street Parking", "Private Dining",
        "Buffet", "Cash Only", "BYOB", "Sports Bar", "Pet Friendly", "Beach Front", "Live Music",
        "Non-smoking Restaurants", "Digital Payments"
    ],
    Neighborhood: [
        "Deira", "Bur Dubai", "Al Barsha", "Marina", "Downtown Dubai", "Trade Centre", "Al Karama",
        "The Creek", "Jumeirah", "Dubai International Financial Centre", "Jumeirah Lake Towers",
        "International City", "Business Bay", "Al Rigga", "Al Muraqqabat", "Dubai Investment Park",
        "Emirates Hills", "Umm Al Sheif", "Umm Ramool", "Al Manara", "Al Waheda", "Al Jafilia", "Al Safa"
    ],
    Airports: ["Dubai Airport", "Sharjah", "Abu Dhabi"]
};

export const dubaiAdventureFilters = {
    TimeOfDay: ["Morning", "Afternoon", "Evening", "Overnight"],
    OnlineOptionsAndOffers: [
        "Online Delivery",
        "Online Booking",
        "Online Offers"
    ],
    PriceRange: ["Cheap", "Mid-range", "Fine Dining"],
    TravelerRating: ["5*", "4*", "3*"],
    Duration: ["Upto 1 hr", "1-4 Hrs", "4 to 24 Hrs"],
    Accessibility: [
        "Wheel Chair Accessible",
        "Push Chair Accessible",
        "Service Dog Accessible",
        "Infant Seats Available"
    ],
}

export const thingsToDoFilters = {
    TimeOfDay: ["Morning", "Afternoon", "Evening", "Overnight"],
    OnlineOptionsAndOffers: ["Online Booking", "Online Offers"],
    // PriceRange: [],
    TravelerRating: ["5*", "4*", "3*"],
    Duration: ["Upto 1 hr", "1-4 Hrs", "4 to 24 Hrs"],
    Specification: ["Half Day", "Full Day", "City Tours", "Bus Tour"],
    Accessibility: [
        "Wheel Chair Accessible",
        "Push Chair Accessible",
        "Service Dog Accessible",
        "Infant Seats Available"
    ]
}

export const carRentalFilters = {
    City: [
        "Dubai", "Abu Dhabi", "Ras Al Khaimah", "Ajman", "Umm Al Quwain", "Al Ain"
    ],
    Make: [
        "Abarth", "Acura", "AITO", "Alfa Romeo", "Ariel", "Ashok Leyland", "Aston Martin", "Audi", "Aurus", "Austin-Healey", "Avatr",
        "BAC", "BAIC", "BAW", "Bentley", "Bentley Onyx", "Bestune", "Bizzarrini", "BMW", "BMW Alpina", "Borgward", "Brilliance",
        "Bufori", "Bugatti", "Buick", "BYD", "Cadillac", "Can-am", "Caterham", "CEVO", "Changan", "Chery", "Chevrolet", "Chrysler",
        "Citroen", "CMC", "Cupra", "Dacia", "Daewoo", "Daihatsu", "Dallara", "Datsun", "Dayun", "DeLorean", "Denza", "Devinci",
        "DFSK", "Dodge", "DongFeng", "Dorcen", "Entegra", "Equus", "Exeed", "Faw", "Fengon", "Fenyr", "Ferrari", "Ferrari Onyx",
        "Fiat", "Fisker", "Force", "Ford", "Forthing", "Foton", "GAC", "GAC Gonow", "Geely", "Genesis", "Genty", "GMC",
        "Grand Tiger", "Great Wall", "Gumpert", "Haval", "Higer", "Hino", "HiPhi", "Honda", "Hongqi", "Hummer", "Hycan", "Hyundai",
        "INEOS", "Infiniti", "International", "Isuzu", "Iveco", "JAC", "Jaguar", "Jeep", "Jetour", "Ji Yue", "Jinbei", "JMC",
        "Kaiyi", "Kia", "King Long", "Koenigsegg", "KTM", "Lada", "Lamborghini", "Lamborghini Onyx", "Lancia", "Land Rover",
        "Leapmotor", "LEVC", "Lexus", "Li Auto", "Lincoln", "Lixiang", "Lotus", "Lucid", "Luxgen", "Lynk & Co", "Mahindra",
        "Maserati", "Maxus", "Maybach", "Mazda", "McLaren", "Mercedes Onyx", "Mercedes-AMG", "Mercedes-Benz", "Mercedes-Maybach",
        "Mercury", "MG", "Milan", "MINI", "Mitsubishi", "Morgan", "Morris", "Neta", "Nio", "Nissan", "Noble", "Oldsmobile",
        "Opel", "Oullim", "Pagani", "PAL-V", "Peugeot", "PGO", "Plymouth", "Polestar", "Pontiac", "Porsche", "Proton", "Qiantu",
        "Rabdan", "RAM", "Renault", "Rivian", "Roewe", "Rolls-Royce", "Rolls-Royce Onyx", "Rover", "Rox", "Saab", "Seat", "Seres",
        "Shenlong/Sunlong", "Skoda", "Skywell", "Smart", "Soueast", "Speranza", "Spyker", "SsangYong", "Studebaker", "Subaru",
        "Suzuki", "TANK", "TATA", "Tesla", "Tova", "Toyota", "Triumph", "UAZ", "VGV", "Victory", "Volkswagen", "Volvo", "Voyah",
        "W Motors", "Westfield Sportscars", "Wiesmann", "Wuling", "XEV", "Xiaomi", "XPeng", "YangWang", "Zeekr", "Zenvo",
        "Zhongxing", "ZNA", "Zotye", "ZXAUTO", "Other"
    ],
    PriceRange: [], 
    Year: [],
    BodyType: [
        "SUV", "Coupe", "Sedan", "Crossover", "Hard Top Convertible", "Pick-up Truck", "Hatchback",
        "Soft Top Convertible", "Sports car", "Van", "Wagon", "Utility truck", "Others"
    ],
    FuelType: ["Petrol", "Diesel", "Hybrid", "Electric"],
    TransmissionType: ["Manual", "Automatic"],
    BaggageCapacity: ["1 Bag", "2 Bags", "3 Bags", "4 Bags", "5 Bags"],
    SeatingCapacity: ["2", "4", "5", "6", "7"],
    Doors: ["2", "3", "4", "5+"],
    HorsePower: [
        "Upto 100 HP", "Upto 200 HP", "Upto 300 HP", "Upto 400 HP", "Upto 500 HP",
        "Upto 600 HP", "Upto 700 HP", "Upto 800 HP", "Upto 900 HP", "Above 900 HP"
    ],
    EngineCapacity: [
        "Upto 500 CC", "Upto 1000 CC", "Upto 1500 CC", "Upto 2000 CC", "Upto 2500 CC",
        "Upto 3000 CC", "Upto 3500 CC", "Upto 4000 CC", "Above 4000 CC"
    ],
    Facilities: [
        "Keyless Entry", "Leather Seats", "Premium Sound System", "DVD Player", "Rear View Camera",
        "Cooled Seats", "Navigation System", "Parking Sensors", "Climate Control", "Front Wheel Drive",
        "4 Wheel Drive", "All Wheel Drive", "Dual Exhaust", "Front & Side Airbags", "Air Conditioning",
        "Off Road Kit", "Sunroof", "Power Window", "Performance Tyres", "Others"
    ],
    TravelerRating: ["5*", "4*", "3*"],
    Availability: ["Available Now"]
}