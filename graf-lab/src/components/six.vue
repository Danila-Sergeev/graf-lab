<template>
  <div>
    <router-link to="/fifth" class="nav-button-left"
      >< Обход в глубину (DFS) для неориентированного графа</router-link
    >

    <h1>Обход в ширину</h1>

    <!-- Ввод количества вершин и начальной и конечной вершин -->
    <div>
      <label for="n">Количество вершин (N):</label>
      <input type="number" v-model.number="n" min="1" max="100" />
    </div>

    <div>
      <label for="start">Начальная вершина:</label>
      <input type="number" v-model.number="startVertex" :min="1" :max="n" />
    </div>

    <div>
      <label for="end">Конечная вершина:</label>
      <input type="number" v-model.number="endVertex" :min="1" :max="n" />
    </div>

    <!-- Кнопка генерации случайной матрицы смежности -->
    <button @click="generateMatrix">
      Сгенерировать случайную матрицу смежности
    </button>

    <!-- Вывод матрицы смежности -->
    <div v-if="matrix.length">
      <h3>Матрица смежности</h3>
      <div v-for="(row, index) in matrix" :key="index">
        {{ row.join(" ") }}
      </div>
    </div>

    <!-- Кнопка поиска кратчайшего пути -->
    <button @click="findShortestPath">Найти кратчайший путь</button>

    <!-- Вывод результата -->
    <div v-if="shortestPath.length">
      <h3>Кратчайший путь: {{ shortestPath.join(" -> ") }}</h3>
      <h3>Длина пути: {{ shortestPath.length - 1 }}</h3>
    </div>
    <div v-else-if="pathLength === -1">
      <h3>Пути нет</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 0, // Количество вершин
      startVertex: 1, // Начальная вершина
      endVertex: 1, // Конечная вершина
      matrix: [], // Матрица смежности
      shortestPath: [], // Кратчайший путь
      pathLength: null, // Длина пути
    };
  },
  methods: {
    // Генерация случайной матрицы смежности для неориентированного графа
    generateMatrix() {
      this.matrix = Array.from({ length: this.n }, () => Array(this.n).fill(0));

      // Заполняем случайными значениями 0 или 1 для рёбер
      for (let i = 0; i < this.n; i++) {
        for (let j = i + 1; j < this.n; j++) {
          const randomValue = Math.round(Math.random());
          this.matrix[i][j] = randomValue;
          this.matrix[j][i] = randomValue;
        }
      }
    },

    // Поиск кратчайшего пути с использованием BFS
    findShortestPath() {
      const start = this.startVertex - 1;
      const end = this.endVertex - 1;

      // Проверяем корректность начальной и конечной вершин
      if (start < 0 || start >= this.n || end < 0 || end >= this.n) {
        console.error("Неправильные начальная или конечная вершина");
        return;
      }

      // Если начальная и конечная вершины совпадают, путь длиной 0
      if (start === end) {
        this.shortestPath = [this.startVertex];
        this.pathLength = 0;
        return;
      }

      // Инициализация для BFS
      const queue = [start]; // Очередь для вершин
      const visited = Array(this.n).fill(false); // Массив посещённых вершин
      const parent = Array(this.n).fill(-1); // Массив для восстановления пути
      visited[start] = true;

      // BFS для поиска кратчайшего пути
      while (queue.length) {
        const current = queue.shift();

        // Проверяем всех соседей текущей вершины
        for (let neighbor = 0; neighbor < this.n; neighbor++) {
          if (this.matrix[current][neighbor] === 1 && !visited[neighbor]) {
            visited[neighbor] = true;
            parent[neighbor] = current;
            queue.push(neighbor);

            // Если нашли конечную вершину, восстанавливаем путь
            if (neighbor === end) {
              this.shortestPath = this.reconstructPath(parent, start, end);
              return;
            }
          }
        }
      }

      // Если путь не найден
      this.pathLength = -1;
    },

    // Восстановление пути с использованием массива parent
    reconstructPath(parent, start, end) {
      const path = [];
      let current = end;

      while (current !== -1) {
        path.push(current + 1); // Добавляем вершину в путь (индексация с 1)
        current = parent[current];
      }

      return path.reverse(); // Путь восстанавливаем в обратном порядке
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
</style>
