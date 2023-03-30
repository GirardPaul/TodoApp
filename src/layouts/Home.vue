<script setup>
import { ref, computed, onMounted } from "vue";
import Task from "../components/Task.vue";
import { useTasksStore } from "../store/store.js";
import { v4 as uuidv4 } from "uuid";

const store = useTasksStore();

const allActive = ref(true),
  activeActive = ref(false),
  completedActive = ref(false),
  tabsType = ref("all"),
  tasks = computed(() => {
    if (tabsType.value === "all") {
      return store.tasks;
    } else if (tabsType.value === "active") {
      return store.tasks.filter((task) => !task.done);
    } else if (tabsType.value === "completed") {
      return store.tasks.filter((task) => task.done);
    }
  }),
  taskName = ref("");

function changeTab(tab) {
  if (tab === "all") {
    allActive.value = true;
    tabsType.value = "all";
    activeActive.value = false;
    completedActive.value = false;
  } else if (tab === "active") {
    allActive.value = false;
    activeActive.value = true;
    tabsType.value = "active";
    completedActive.value = false;
  } else if (tab === "completed") {
    allActive.value = false;
    activeActive.value = false;
    completedActive.value = true;
    tabsType.value = "completed";
  }
}

function saveTask() {
  const task = {
    id: uuidv4(),
    description: taskName.value,
    done: false,
  };
  store.addTask(task);
  taskName.value = "";
}

function deleteTask(id) {
  store.deleteTask(id);
}

function deleteAllCompleted() {
  store.deleteAllCompleted();
}

function updateTask(id, done) {
  store.updateTask(id, done);
}
</script>
<template>
  <section class="container flex column">
    <h1>#todo</h1>
    <div class="flex tabs-list">
      <div
        @click="changeTab('all')"
        :class="['tab-item col-4', allActive ? 'active' : '']"
      >
        <p>All</p>
      </div>
      <div
        @click="changeTab('active')"
        :class="['tab-item col-4', activeActive ? 'active' : '']"
      >
        <p>Active</p>
      </div>
      <div
        @click="changeTab('completed')"
        :class="['tab-item col-4', completedActive ? 'active' : '']"
      >
        <p>Completed</p>
      </div>
    </div>
    <div class="flex column full">
      <div
        v-if="allActive || activeActive"
        class="flex justify-between align-center"
      >
        <input
          class="text-input full"
          type="text"
          v-model="taskName"
          placeholder="add details"
          @keyup.enter="saveTask"
        />
        <button @click="saveTask" type="button">Add</button>
      </div>
    </div>
    <div class="full mt-33">
      <Task
        :tasks="tasks"
        :tabsDeleteActive="completedActive"
        @delete="deleteTask"
        @update="updateTask"
      />
    </div>
    <div
      v-if="completedActive && tasks.length"
      class="full flex mt-33 justify-end"
    >
      <div
        @click="deleteAllCompleted"
        class="pointer button-delete flex align-center justify-center"
      >
        <span class="material-icons">delete</span>
        <p>delete all</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.button-delete {
  padding: 1.2rem 2.6rem;
  background: #eb5757;
  border-radius: 4px;
}
.button-delete > * {
  color: #fff;
}
.button-delete > p {
  margin-left: 0.55rem;
  font-size: 1.2rem;
  font-weight: 600;
}
.mt-33 {
  margin-top: 3.3rem;
}
.align-end {
  align-items: flex-end;
}
.text-input {
  border: 1px solid #bdbdbd;
  border-radius: 12px;
  padding: 2rem 1.2rem;
  color: #828282;
  font-size: 1.4rem;
  font-weight: 400;
}
button {
  margin-left: 2.5rem;
  border: none;
  border-radius: 1.2rem;
  background: #2f80ed;
  box-shadow: 0px 2px 6px rgba(127, 177, 243, 0.4);
  padding: 2rem 4rem;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3.2rem 40rem 0 40rem;
}
.col-4 {
  width: calc(100% / 3);
}
.tabs-list {
  width: 100%;
  margin-top: 5.8rem;
  margin-bottom: 1.8rem;
  border-bottom: 1px solid #bdbdbd;
  padding: 0 8rem;
}
.tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.8rem;
  cursor: pointer;
}

.tab-item.active {
  border-bottom: 4px solid #2f80ed;
  transition: border-bottom 0.2s ease-in-out;
}

.tab-item > p {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333333;
}
h1 {
  font-size: 3.6rem;
  font-weight: 700;
  color: #333333;
}

button:hover {
  background: #0039cb;
  box-shadow: 0px 2px 3px rgba(41, 98, 255, 0.2);
}

@media screen and (min-width: 901px) and (max-width: 1200px) {
  .container {
    margin: 3.2rem 20rem 0 20rem;
  }
}

@media screen and (min-width: 468px) and (max-width: 900px) {
  .container {
    margin: 3.2rem 10rem 0 10rem;
  }
}

@media screen and (max-width: 467px) {
  .container {
    margin: 3.2rem 5rem 0 5rem;
  }

  .text-input {
    padding: 1rem 1.2rem;
  }

  button {
    padding: 1rem 4rem;
  }

  .button-delete {
    padding: 1rem 2.6rem;
  }
}
</style>
