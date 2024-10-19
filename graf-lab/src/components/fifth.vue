<template>
  <div>
    <router-link to="/forth" class="nav-button-left"
      >< Количество дорог на планете "Neptune"</router-link
    >
    <router-link to="/six" class="nav-button-right">
      Обход в ширину: Поиск кратчайшего пути ></router-link
    >
    <h1>Обход в глубину</h1>

    <div>
      <label for="n">Количество вершин (N):</label>
      <input type="number" v-model="n" min="1" max="100" />

      <label for="s">Заданная вершина (S):</label>
      <input type="number" v-model="s" :min="1" :max="n" />
    </div>

    <button @click="generateMatrix">Сгенерировать случайную матрицу</button>

    <div v-if="matrix.length">
      <h3>Матрица смежности:</h3>
      <div v-for="(row, index) in matrix" :key="index">
        {{ row.join(" ") }}
      </div>
    </div>

    <button @click="countConnectedVertices">
      Найти количество вершин в компоненте связности
    </button>

    <div v-if="connectedVerticesCount !== null">
      <h3>
        Количество вершин в компоненте связности: {{ connectedVerticesCount }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 0, // Количество вершин
      s: 1, // Заданная вершина
      matrix: [], // Матрица смежности
      visited: [], // Массив для отметки посещенных вершин
      connectedVerticesCount: null, // Количество вершин в компоненте связности
    };
  },
  methods: {
    // Генерация случайной матрицы смежности для неориентированного графа
    generateMatrix() {
      this.matrix = Array.from({ length: this.n }, () => Array(this.n).fill(0));

      // Генерируем случайные рёбра
      for (let i = 0; i < this.n; i++) {
        for (let j = i + 1; j < this.n; j++) {
          const randomValue = Math.round(Math.random()); // 0 или 1
          this.matrix[i][j] = randomValue;
          this.matrix[j][i] = randomValue; // Симметрия для неориентированного графа
        }
      }

      // Обнуляем главную диагональ (нет рёбер между вершиной и самой собой)
      for (let i = 0; i < this.n; i++) {
        this.matrix[i][i] = 0;
      }
    },

    // Функция для обхода графа в глубину (DFS)
    dfs(vertex) {
      this.visited[vertex] = true; // Отмечаем вершину как посещённую

      for (let neighbor = 0; neighbor < this.n; neighbor++) {
        if (this.matrix[vertex][neighbor] === 1 && !this.visited[neighbor]) {
          this.dfs(neighbor); // Рекурсивно посещаем всех соседей
        }
      }
    },

    // Подсчет количества вершин в компоненте связности
    countConnectedVertices() {
      this.visited = Array(this.n).fill(false); // Обнуляем массив посещенных вершин

      // Запускаем DFS с вершины S-1 (учитываем индексацию с 0)
      this.dfs(this.s - 1);

      // Подсчитываем количество посещённых вершин
      this.connectedVerticesCount = this.visited.filter((v) => v).length;
    },
  },
};
</script>

<style scoped>
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
