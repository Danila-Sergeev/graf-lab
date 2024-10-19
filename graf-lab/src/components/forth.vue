<template>
  <div>
    <router-link to="/third" class="nav-button-left"
      >< Построение матрицы смежности по списку рёбер</router-link
    >
    <router-link to="/fifth" class="nav-button-right">
      Обход в глубину (DFS) для неориентированного графа ></router-link
    >

    <h1>Количество дорог на планете "Neptune"</h1>

    <div>
      <label for="n">Количество городов (N):</label>
      <input type="number" v-model="n" min="0" max="100" />
      <button @click="generateMatrix">Сгенерировать случайную матрицу</button>
    </div>

    <div class="matrix-box" v-if="n > 0">
      <h3>Матрица смежности:</h3>
      <div class="matrix">
        <div v-for="(row, index) in matrix" :key="index">
          {{ row.join(" ") }}
        </div>
      </div>
    </div>

    <button @click="countRoads">Посчитать количество дорог</button>

    <div v-if="totalRoads !== null">
      <h3>Количество дорог: {{ totalRoads }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 0, // Количество городов
      matrix: [], // Матрица смежности
      totalRoads: null, // Количество дорог
    };
  },
  methods: {
    // Генерация случайной матрицы смежности для неориентированного графа
    generateMatrix() {
      this.matrix = Array.from({ length: this.n }, () => Array(this.n).fill(0));

      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.n; j++) {
          if (i !== j) {
            const randomValue = Math.round(Math.random()); // Генерация случайного 0 или 1
            this.matrix[i][j] = randomValue;
            this.matrix[j][i] = this.matrix[i][j];
          }
        }
      }
    },

    // Подсчет количества дорог в неориентированном графе
    countRoads() {
      let roads = 0;

      for (let i = 0; i < this.n; i++) {
        for (let j = i + 1; j < this.n; j++) {
          if (this.matrix[i][j] === 1) {
            roads++;
          }
        }
      }

      this.totalRoads = roads;
    },
  },
};
</script>

<style scoped>
.matrix {
  display: flex;
  flex-direction: column;
}
.matrix-box {
  margin: auto;
}

.row {
  display: flex;
}

.cell {
  width: 40px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 5px;
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
