/**
 * TASK 2: Room Model
 * 
 * Defines the Room model with properties:
 * - title: string
 * - location: string
 * - price: number (price per night)
 * - amenities: string[] (array of amenities)
 */
class Room {
  /**
   * @param {string} title
   * @param {string} location
   * @param {number} price
   * @param {string[]} amenities
   */
  constructor(title, location, price, amenities = []) {
    this.title = title;
    this.location = location;
    this.price = price;
    this.amenities = Array.isArray(amenities) ? amenities : [];
  }
}

// ==========================================
// TASK 5: AI-GENERATED 5 REALISTIC ROOM DATA
// Sample vacation rental listings for StayEZ
// ==========================================
const roomsData = [
  new Room(
    "Oceanfront Sunset Villa with Private Pool",
    "Goa",
    12500,
    ["Private Infinity Pool", "Sea View", "High-Speed WiFi", "Air Conditioning", "King Bed", "Chef on Demand"]
  ),
  new Room(
    "Pine Woods Luxury Wooden Chalet",
    "Manali",
    8200,
    ["Mountain View", "Fireplace", "Heated Rooms", "Balcony", "Free Breakfast", "Bonfire Pit"]
  ),
  new Room(
    "Heritage Haveli Suite with Courtyard View",
    "Jaipur",
    6500,
    ["Traditional Decor", "Air Conditioning", "Rooftop Restaurant", "Spa Access", "Free Parking", "WiFi"]
  ),
  new Room(
    "Misty Mountain Tea Estate Cottage",
    "Munnar",
    5400,
    ["Tea Plantation View", "Balcony", "Geyser / Hot Water", "Trekking Trails", "Home Cooked Meals"]
  ),
  new Room(
    "Skyline Penthouse with Private Jacuzzi",
    "Mumbai",
    18900,
    ["Panoramic City View", "Private Jacuzzi", "Smart Home Automation", "Gym & Pool Access", "Concierge Service"]
  )
];

module.exports = {
  Room,
  roomsData
};
