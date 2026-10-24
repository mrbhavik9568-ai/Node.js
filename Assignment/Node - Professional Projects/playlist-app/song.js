/**
 * TASK 2: Song Model Class
 * Defines properties: title, artist, duration (in seconds)
 */
class Song {
  /**
   * @param {string} title - Title of the song
   * @param {string} artist - Artist name
   * @param {number} duration - Duration in seconds
   */
  constructor(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
  }

  // Helper method to format duration as MM:SS
  getFormattedDuration() {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

// Array of 3 sample Song objects
const initialSongs = [
  new Song("Blinding Lights", "The Weeknd", 200),
  new Song("Shape of You", "Ed Sheeran", 233),
  new Song("Levitating", "Dua Lipa", 203)
];

module.exports = {
  Song,
  initialSongs
};
