<template>
  <div>
    <router-link to="/" class="nav-button-left"
      >< Подсчет рёбер графа</router-link
    >
    <router-link to="/third" class="nav-button-right"
      >Построение матрицы смежности по списку рёбер ></router-link
    >
    <h1>Список рёбер графа</h1>
    <div>
      <label for="n">Количество вершин (n):</label>
      <input type="number" v-model="n" min="1" max="100" />
    </div>
    <div>
      <label>Тип графа:</label>
      <select v-model="graphType">
        <option value="undirected">Неориентированный</option>
        <option value="directed">Ориентированный</option>
      </select>
    </div>
    <button @click="generateMatrix">Сгенерировать матрицу</button>

    <div v-if="matrix.length">
      <h3>Матрица смежности</h3>
      <div v-for="(row, index) in matrix" :key="index">
        {{ row.join(" ") }}
      </div>
    </div>

    <button @click="generateEdgeList">Вывести список рёбер</button>

    <div v-if="edges.length">
      <h3>Список рёбер</h3>
      <ul class="ul">
        <li v-for="(edge, index) in edges" :key="index">{{ edge }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const n = ref(0);
    const matrix = ref([]);
    const graphType = ref("undirected");
    const edges = ref([]);

    const generateMatrix = () => {
      matrix.value = Array.from({ length: n.value }, () =>
        Array(n.value).fill(0)
      );

      for (let i = 0; i < n.value; i++) {
        for (let j = 0; j < n.value; j++) {
          if (i !== j) {
            const randomValue = Math.round(Math.random()); // Генерация случайного 0 или 1
            matrix.value[i][j] = randomValue;

            // Для неориентированного графа матрица должна быть симметричной
            if (graphType.value === "undirected") {
              matrix.value[j][i] = matrix.value[i][j];
            }
          }
        }
      }
    };

    const generateEdgeList = () => {
      edges.value = [];

      if (graphType.value === "undirected") {
        // Для неориентированного графа
        for (let i = 0; i < n.value; i++) {
          for (let j = i + 1; j < n.value; j++) {
            if (matrix.value[i][j] === 1) {
              edges.value.push(`(${i + 1}, ${j + 1})`);
            }
          }
        }
      } else {
        // Для ориентированного графа
        for (let i = 0; i < n.value; i++) {
          for (let j = 0; j < n.value; j++) {
            if (matrix.value[i][j] === 1) {
              edges.value.push(`(${i + 1}, ${j + 1})`);
            }
          }
        }
      }
    };

    return {
      n,
      matrix,
      graphType,
      edges,
      generateMatrix,
      generateEdgeList,
    };
  },
};
</script>

<style scoped>
.ul {
  width: 50px;
  margin: auto;
}
.nav-button-left {
  position: fixed;
  top: 30px;
  left: 50px;
}
.nav-button-right {
  position: fixed;
  top: 30px;
  right: 50px;
}
</style>
