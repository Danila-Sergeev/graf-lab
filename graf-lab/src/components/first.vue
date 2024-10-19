<template>
  <div>
    <router-link to="/second" class="nav-button"
      >Список рёбер графа ></router-link
    >
    <h1>Подсчет рёбер графа</h1>
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

    <button @click="countEdges">Посчитать рёбра</button>
    <p>Количество рёбер: {{ edgesCount }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 0,
      matrix: [],
      graphType: "undirected",
      edgesCount: 0,
    };
  },
  methods: {
    generateMatrix() {
      this.matrix = Array.from({ length: this.n }, () => Array(this.n).fill(0));

      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.n; j++) {
          if (i !== j) {
            const randomValue = Math.round(Math.random()); // Генерация случайного 0 или 1
            this.matrix[i][j] = randomValue;

            // Если граф неориентированный, нужно сделать матрицу симметричной
            if (this.graphType === "undirected") {
              this.matrix[j][i] = this.matrix[i][j];
            }
          }
        }
      }
    },
    countEdges() {
      let count = 0;

      if (this.graphType === "undirected") {
        // Подсчёт рёбер для неориентированного графа
        for (let i = 0; i < this.n; i++) {
          for (let j = i + 1; j < this.n; j++) {
            count += this.matrix[i][j];
          }
        }
      } else {
        // Подсчёт рёбер для ориентированного графа
        for (let i = 0; i < this.n; i++) {
          for (let j = 0; j < this.n; j++) {
            count += this.matrix[i][j];
          }
        }
      }

      this.edgesCount = count;
    },
  },
};
</script>

<style scoped>
.nav-button {
  position: fixed;
  top: 30px;
  right: 50px;
}
</style>
