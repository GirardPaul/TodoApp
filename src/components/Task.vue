<script setup>
defineProps({
  tasks: Array,
  tabsDeleteActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["delete", "update"]);

function deleteTask(id) {
  emit("delete", id);
}

function changeTaskStatus(id, done) {
  emit("update", id, !done);
}
</script>

<template>
  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
      class="flex justify-between align-center"
    >
      <div class="flex align-center">
        <input
          @click="changeTaskStatus(task.id, task.done)"
          :checked="task.done"
          type="checkbox"
        />
        <p :class="['task-name', task.done ? 'strike-through' : '']">
          {{ task.description }}
        </p>
      </div>
      <span
        v-if="tabsDeleteActive"
        @click="deleteTask(task.id)"
        class="material-icons pointer"
        >delete</span
      >
    </li>
  </ul>
</template>

<style scoped>
li:first-child {
  padding-top: 0;
}
li {
  list-style: none;
  padding-top: 1rem;
}
.task-name {
  margin-left: 0.7rem;
  font-size: 1.8rem;
}
.strike-through {
  text-decoration: line-through;
}

.material-icons {
  color: #bdbdbd;
}
</style>
