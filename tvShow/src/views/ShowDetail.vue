<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>

  <div v-if="selectedShow" class="show-details">
    <div class="show-header">
      <img
        :src="selectedShow.image?.original || defaultImage"
        alt="Show Image"
      />
      <div class="show-info">
        <h1>{{ selectedShow.name }}</h1>

        <ul class="show-extra-details">
          <li><strong>Language:</strong> {{ selectedShow.language }}</li>
          <li><strong>Status:</strong> {{ selectedShow.status }}</li>
          <li>
            <strong>Runtime:</strong>
            {{ selectedShow.runtime ? selectedShow.runtime + " mins" : "N/A" }}
          </li>
          <li>
            <strong>Premiered:</strong>
            {{ selectedShow.premiered || "Unknown" }}
          </li>
          <li><strong>Ended:</strong> {{ selectedShow.ended || "Ongoing" }}</li>
          <li><strong>Genres:</strong> {{ selectedShow.genres.join(", ") }}</li>
          <li>
            <strong>Average Rating:</strong>
            {{ selectedShow.rating.average || "No Rating" }}
          </li>
        </ul>

        <p v-html="selectedShow.summary" class="show-summary"></p>
      </div>
    </div>

    <h2 class="episode-title">Episodes</h2>

    <div class="episode-list">
      <div v-for="episode in episodes" :key="episode.id" class="episode-card">
        <img
          :src="episode.image?.medium || defaultEpisodeImage"
          alt="Episode Image"
        />
        <div class="episode-info">
          <h3>
            {{ episode.name }} (S{{ episode.season }} E{{ episode.number }})
          </h3>
          <p v-html="episode.summary || 'No summary available'"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useShowStore } from "../store/showStore";

export default {
  setup() {
    const route = useRoute();
    const store = useShowStore();
    const showId = Number(route.params.id);
    const defaultImage = "https://via.placeholder.com/300x450?text=No+Image";
    const defaultEpisodeImage =
      "https://via.placeholder.com/150x90?text=No+Image";

    onMounted(() => {
      store.fetchShowDetails(showId);
      store.fetchEpisodes(showId);
    });

    return {
      selectedShow: computed(() => store.selectedShow),
      episodes: computed(() => store.episodes),
      loading: computed(() => store.loading),
      error: computed(() => store.error),
      defaultImage,
      defaultEpisodeImage,
    };
  },
};
</script>

<style scoped>

.show-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}


.show-header {
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.show-header img {
  width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.show-info h1 {
  font-size: 2.4em;
  color: #2c3e50);
  margin: 0;
}


.show-extra-details {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  font-size: 1em;
}

.show-extra-details li {
  margin-bottom: 8px;
  font-size: 1.1em;
}

.show-extra-details strong {
  color: #2c3e50);
}


.show-summary {
  margin-top: 15px;
  line-height: 1.6;
  font-size: 1.1em;
  color: #555;
}


.episode-title {
  font-size: 2em;
  color: #333;
  margin-bottom: 15px;
}


.episode-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
  scroll-behavior: smooth;
  width: 100%;
}


.episode-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
  scroll-behavior: smooth;
}

.episode-card {
  min-width: 300px; 
  max-width: 300px; 
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.episode-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.episode-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.episode-info {
  padding: 15px;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.episode-info h3 {
  font-size: 1.1em;
  color: #2c3e50);
  margin-bottom: 10px;
}

.episode-info p {
  font-size: 0.85em;
  color: #555;
}
</style>
