import React, { useEffect, useState } from "react";
import styles from "./AdminPromotions.module.css";

interface Promotion {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch existing promotions from backend
  useEffect(() => {
    fetch("http://localhost:8080/promotions")
      .then((res) => res.json())
      .then((data) => setPromotions(data))
      .catch((err) => console.error("Error fetching promotions:", err));
  }, []);

  // Add new promotion
  const handleAddPromotion = (e: React.FormEvent) => {
    e.preventDefault();

    const newPromotion = { title, description, imageUrl };

    fetch("http://localhost:8080/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPromotion),
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotions([...promotions, data]);
        setTitle("");
        setDescription("");
        setImageUrl("");
      })
      .catch((err) => console.error("Error adding promotion:", err));
  };

  // Delete promotion
  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/promotions/${id}`, {
      method: "DELETE",
    })
      .then(() => setPromotions(promotions.filter((p) => p.id !== id)))
      .catch((err) => console.error("Error deleting promotion:", err));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🎬 Manage Movie Promotions</h1>

      <form className={styles.form} onSubmit={handleAddPromotion}>
        <input
          type="text"
          placeholder="Promotion Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Promotion Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.textarea}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          ➕ Add Promotion
        </button>
      </form>

      <h2 className={styles.subHeader}>Active Promotions</h2>
      <div className={styles.grid}>
        {promotions.length === 0 ? (
          <p className={styles.emptyText}>No promotions available.</p>
        ) : (
          promotions.map((promo) => (
            <div key={promo.id} className={styles.card}>
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3 className={styles.title}>{promo.title}</h3>
                <p className={styles.description}>{promo.description}</p>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className={styles.deleteButton}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPromotions;
