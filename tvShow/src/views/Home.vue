<template>
  <main>
    <div class="background-images"></div>
    <div class="content">
      <h1>TV Show Search</h1>
      <div class="search-container">
        <input class="search-box" v-model="query" placeholder="Search for a show..." @keyup.enter="searchShow" />
        <button class="search-button" @click="searchShow">Search</button>
      </div>

      <div class="filter-bar">
        <label for="genre-select">Filter by Genre:</label>
        <select id="genre-select" v-model="selectedGenre" @change="filterByGenre">
          <option value="All">All</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Science-Fiction">Science Fiction</option>
          <option value="Romance">Romance</option>
        </select>
      </div>

      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>

      <div class="show-list" v-if="filteredShows.length">
        <TVShowCard
          v-for="showData in filteredShows"
          :key="showData.show.id"
          :show="showData.show"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useShowStore } from '../store/showStore';
import TVShowCard from '../components/TVShowCard.vue';

export default {
  components: {
    TVShowCard,
  },
  setup() {
    const query = ref('');
    const selectedGenre = ref('All');
    const store = useShowStore();

    const searchShow = () => {
      if (query.value.trim()) {
        store.fetchShows(query.value);
      } else {
        store.fetchPopularShows();
      }
    };

    const filterByGenre = () => {
      store.fetchShows(selectedGenre.value);
    };

    const updateBackgroundImages = (shows) => {
      const backgroundContainer = document.querySelector('.background-images');
      if (backgroundContainer) {
        backgroundContainer.innerHTML = '';
        shows.forEach(showData => {
          if (showData.show.image && showData.show.image.medium) {
            const img = document.createElement('img');
            img.src = showData.show.image.medium;
            backgroundContainer.appendChild(img);
          }
        });
      }
    };

    watch(() => store.filteredShows, (newShows) => {
      updateBackgroundImages(newShows);
    });

    onMounted(() => {
      store.fetchPopularShows();
    });

    return {
      query,
      selectedGenre,
      searchShow,
      filterByGenre,
      filteredShows: computed(() => store.filteredShows),
      loading: computed(() => store.loading),
      error: computed(() => store.error),
    };
  },
};
</script>
<style scoped>

main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.background-images {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  opacity: 0.2;
  z-index: -1;
}

.background-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: relative;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  text-align: center;
}

/* Arama kutusu ve buton stilleri */
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.search-box {
  padding: 10px 15px;
  width: 300px;
  border: 2px solid #2c3e50;
  border-radius: 30px;
  outline: none;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-box:focus {
  border-color: #2c3e50;
  box-shadow: 0 0 8px rgba(44, 62, 80, 0.5);
}

.search-button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
  background-color: #3d5266;
  transform: scale(1.05);
}

.search-button:active {
  transform: scale(0.98);
}

/* Filtre barı ve şov listesi stilleri */
.filter-bar {
  margin-bottom: 20px;
}

.show-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

select {
  padding: 10px;
  margin-left: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
}
</style>
