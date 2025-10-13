package com.example.cinema.movie;

import jakarta.persistence.*;

@Entity
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    @Column(name = "poster_url")
    private String posterUrl;
    @Column(name = "trailer_url")
    private String trailerUrl;
    private String status; // running / comingSoon

    public Movie() {}

    public Movie(String title, String description, String posterUrl, String trailerUrl, String status) {
        this.title = title;
        this.description = description;
        this.posterUrl = posterUrl;
        this.trailerUrl = trailerUrl;
        this.status = status;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getPosterUrl() { return posterUrl; }
    public String getTrailerUrl() { return trailerUrl; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public void setTrailerUrl(String trailerUrl) { this.trailerUrl = trailerUrl; }
    public void setStatus(String status) { this.status = status; }
}
