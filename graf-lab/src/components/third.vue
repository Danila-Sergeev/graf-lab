<template>
  <div>
    <router-link to="/second" class="nav-button-left"
      >< Список рёбер графа</router-link
    >
    <router-link to="/forth" class="nav-button-right"
      >Количество дорог на планете "Neptune" ></router-link
    >
    <h1>Построение матрицы смежности по списку рёбер</h1>

    <div>
      <label for="n">Количество вершин (n):</label>
      <input type="number" v-model="n" min="1" max="100" />
    </div>

    <div>
      <label for="m">Количество рёбер (m):</label>
      <input
        type="number"
        v-model="m"
        :min="1"
        :max="maxEdges"
        placeholder="1"
      />
      <p>Максимально допустимое количество рёбер: {{ maxEdges }}</p>
    </div>

    <div>
      <label>Тип графа:</label>
      <select v-model="graphType">
        <option value="undirected">Неориентированный</option>
        <option value="directed">Ориентированный</option>
      </select>
    </div>

    <div v-for="(edge, index) in edges" :key="index">
      <label>Ребро {{ index + 1 }}:</label>
      <input
        v-model.number="edge[0]"
        type="number"
        min="1"
        :max="n"
        placeholder="Вершина 1"
      />
      <input
        v-model.number="edge[1]"
        type="number"
        min="1"
        :max="n"
        placeholder="Вершина 2"
      />
    </div>

    <button @click="addEdge">Добавить ребро</button>
    <button @click="generateAdjacencyMatrix">
      Построить матрицу смежности
    </button>

    <div v-if="matrix.length">
      <h3>Матрица смежности</h3>
      <div v-for="(row, index) in matrix" :key="index">
        {{ row.join(" ") }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  setup() {
    const n = ref(0); // Количество вершин
    const m = ref(0); // Количество рёбер
    const graphType = ref("undirected"); // Тип графа (неориентированный или ориентированный)
    const edges = ref([[1, 1]]); // Список рёбер (по умолчанию одно ребро)
    const matrix = ref([]); // Матрица смежности

    // Вычисляем максимальное количество рёбер для текущего типа графа
    const maxEdges = computed(() => {
      return graphType.value === "undirected"
        ? Math.floor((n.value * (n.value - 1)) / 2)
        : n.value * (n.value - 1);
    });

    // Обнуляем количество рёбер, если оно превышает новое допустимое значение
    watch(m, () => {
      if (m.value > maxEdges.value) {
        m.value = maxEdges.value;
      }
      edges.value = [[1, 1]]; // Очищаем список рёбер при изменении количества вершин
    });

    // Функция для добавления нового ребра
    const addEdge = () => {
      if (edges.value.length < m.value) {
        edges.value.push([1, 1]); // Добавляем новое ребро с начальными значениями
      }
    };

    // Функция для построения матрицы смежности
    const generateAdjacencyMatrix = () => {
      matrix.value = Array.from({ length: n.value }, () =>
        Array(n.value).fill(0)
      );
      edges.value.forEach((edge) => {
        const [v1, v2] = edge;
        matrix.value[v1 - 1][v2 - 1] = 1; // Добавляем ребро в матрицу

        if (graphType.value === "undirected") {
          matrix.value[v2 - 1][v1 - 1] = 1; // Для неориентированного графа добавляем симметричное ребро
        }
      });
    };

    return {
      n,
      m,
      graphType,
      edges,
      matrix,
      addEdge,
      generateAdjacencyMatrix,
      maxEdges,
    };
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
