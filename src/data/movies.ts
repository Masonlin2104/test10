// src/data/movies.ts
import { Movie } from "../models/Movie";

export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    status: "running",
    trailerUrl: "https://www.youtube.com/embed/JfVOs4VSpmA",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg"
  },
  {
    id: 2,
    title: "Dune",
    status: "running",
    trailerUrl: "https://www.youtube.com/embed/8g18jFHCLXk",
    posterUrl: "https://preview.redd.it/something-i-noticed-in-the-official-dune-movie-posters-v0-baabw52pwymc1.jpg?width=1170&format=pjpg&auto=webp&s=1c0db04055e10369cb462db9dcd013bf34faddeb"
  },
  {
    id: 3,
    title: "Avatar 2",
    status: "comingSoon",
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
    posterUrl: "https://wallpapercave.com/wp/wp11484135.jpg"
  },
  {
    id: 4,
    title: "The Batman",
    status: "comingSoon",
    trailerUrl: "https://www.youtube.com/embed/mqqft2x_Aa4",
    posterUrl: "https://c7.alamy.com/comp/2P609PM/the-batman-poster-2P609PM.jpg"
  }
];
