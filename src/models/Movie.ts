
export interface Movie {
  id: number;
  title: string;
  status: "running" | "comingSoon"; 
  trailerUrl: string; // YouTube link
  posterUrl: string;  // URL for the movie poster
  description?: string; // Optional description
  releaseDate?: string; // Optional release date
}
