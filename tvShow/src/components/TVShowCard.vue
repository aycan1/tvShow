<template>
  <div class="card" @click="goToShowDetail">
    <img :src="show.image?.medium || defaultImage" alt="Show Image" />
    <div class="card-content">
      <h3>{{ show.name }}</h3>
      <p><strong>Genres:</strong> {{ show.genres.join(", ") }}</p>
      <p><strong>Rating:</strong> {{ show.rating.average || "No Rating" }}</p>
      <p><strong>Language:</strong> {{ show.language }}</p>
      <p><strong>Status:</strong> {{ show.status }}</p>
      <p>
        <strong>Runtime:</strong>
        {{ show.runtime ? show.runtime + " mins" : "N/A" }}
      </p>
      <p><strong>Premiered:</strong> {{ show.premiered || "Unknown" }}</p>
      <p><strong>Ended:</strong> {{ show.ended || "Ongoing" }}</p>
      <div class="summary">
        <strong>Summary:</strong>
        <p v-html="show.summary || 'No summary available.'"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { TVShow } from "../services/api";

export default defineComponent({
  props: {
    show: {
      type: Object as () => TVShow,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const defaultImage = "https://via.placeholder.com/210x295?text=No+Image";

    const goToShowDetail = () => {
      router.push({ name: "ShowDetail", params: { id: props.show.id } });
    };

    return {
      goToShowDetail,
      defaultImage,
    };
  },
});
</script>

<style scoped>
.card {
  width: 250px;
  margin: 15px;
  cursor: pointer;
  border: 2px solid #2c3e50);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

img {
  width: 100%;
  height: auto;
  border-bottom: 2px solid #2c3e50);
}

.card-content {
  padding: 15px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

h3 {
  margin: 0;
  font-size: 1.4em;
  font-weight: bold;
  color: #2c3e50);
}

p {
  margin: 5px 0;
  font-size: 0.9em;
  line-height: 1.4;
}

.summary {
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  color: #555;
  max-height: 100px;
  overflow-y: auto;
}

.summary p {
  margin: 0;
  font-size: 0.9em;
  line-height: 1.5;
  color: #333;
}

.summary p strong {
  color: #2c3e50);
}
</style>
