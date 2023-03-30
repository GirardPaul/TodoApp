import { defineStore } from "pinia";
export const useTasksStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  }),
  actions: {
    addTask(task) {
      this.tasks.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteAllCompleted() {
      this.tasks = this.tasks.filter((task) => !task.done);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    updateTask(id, done) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          task.done = done;
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
});
