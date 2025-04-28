<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRobotStore } from '../stores/robots'
import type { Robot } from '@/types.ts';

const store = useRobotStore()
const showForm = ref(false)
const newRobot = ref({
  id: '',
  name: '',
  type: '',
  status: 'active' as const,
  lastActive: new Date(),
})
// TODO: cleaner form on add robot

onMounted(() => {
  store.fetchRobots()
  console.log('Robots:', store.robots)
  // Remove this line: store.deleteRobot('')
})
const handleSubmit = async () => {
  try {
    const robotData={
      id:newRobot.value.id,
      name:newRobot.value.name,
      type:newRobot.value.type,
      status:newRobot.value.status,
      lastActive:newRobot.value.lastActive
    }
    await store.createRobot(robotData)
    // Reset the form
    newRobot.value = {
      id: '',
      name: '',
      type: '',
      status: 'active',
      lastActive: new Date(),
    }
    showForm.value = false
    await store.fetchRobots()
  } catch (error) {
    console.error('Failed to create robot:', error)
    store.error =error instanceof Error ? error.message : 'Failed to create robot value'
  }
}

const handleDelete = async (id: string) => {
  if (!id || id.trim() === '') {
    console.error('Invalid robot ID for deletion');
    return;
  }

  if (confirm('Are you sure you want to delete this robot?')) {
    try {
      console.log('Deleting robot with ID:', id)
      await store.deleteRobot(id)
      // Optionally refresh the list after successful deletion
      await store.fetchRobots()
    } catch (error) {
      console.error('Failed to delete robot:', error)
    }
  }
}
</script>

<template>
  <div class="robot-list">
    <h2>Robots</h2>
    <button @click='showForm = true' class="add-button">Add Robot</button>
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>Add Your Robot</h3>
        <!--show error if exists-->
        <div v-if="store.error" class="error-message">{{ store.error }}</div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name:</label>
            <input id="name" v-model="newRobot.name" type="text" required>
          </div>
          <div class="form-group">
            <label for="type">Type:</label>
            <input id="type" v-model="newRobot.type" type="text" required>
          </div>
          <div class="form-group">
            <label for="status">Status:</label>
            <select id="status" v-model="newRobot.status" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="submit" :disabled="store.loading">{{ store.loading ? 'Saving...' : 'Save' }}</button>
            <button type="button" @click="showForm = false" class="cancel" :disabled="store.loading">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="store.loading"></div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <div v-else class="robots-grid">
      <div v-for="robot in store.robots" :key="robot.id" class="robot-card">
        <h3>{{ robot.name }}</h3>
        <p>Type: {{ robot.type }}</p>
        <p>Status: {{ robot.status }}</p>
        <p>Last Active: {{ new Date(robot.lastActive).toLocaleString() }}</p>
        <div class="actions">
          <button @click="$emit('edit', robot)">Edit</button>
          <button @click="handleDelete(robot.id)" class="delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.robot-list {
  padding: 25px;
  position: absolute;
  height: fit-content;
  border: 1px solid var(--neutral-200);
  left: 40px;
  bottom: 100px;
  max-width: fit-content;
  max-height: 70vh;
  overflow-y: auto;
  background: var(--primary-dark);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  color: var(--neutral-100);

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.robots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.robot-card {
  background: var(--neutral-400);
  border: 1px solid var(--neutral-200);
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(107, 75, 255, 0.15);
  }

  h3 {
    color: var(--neutral-100);
    font-size: 1.2rem;
    margin-bottom: 12px;
  }

  p {
    color: var(--neutral-300);
    margin: 8px 0;
  }
}

.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-active { background-color: var(--status-active); }
.status-inactive { background-color: var(--status-inactive); }
.status-maintenance { background-color: var(--status-maintenance); }

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
}

.add-button {
  background: var(--accent-purple);
  color: var(--neutral-100);
  padding: 12px 24px;
  font-size: 0.95rem;

  &:hover {
    background: #7d61ff;
  }
}

button.edit {
  background: var(--accent-blue);
  color: var(--neutral-100);

  &:hover {
    background: #0066dd;
  }
}

button.delete {
  background: var(--status-inactive);
  color: var(--neutral-100);

  &:hover {
    background: #ff3459;
  }
}

.modal {
  background-color: rgba(26, 27, 46, 0.85);
}

.modal-content {
  background: var(--neutral-400);
  border-radius: 16px;
  padding: 32px;

  h3 {
    color: var(--neutral-100);
  }
}

.form-group {
  margin-bottom: 16px;

  label {
    color: var(--neutral-300);
    margin-bottom: 8px;
  }

  input, select {
    background: var(--primary-dark);
    border: 1px solid var(--neutral-200);
    color: var(--neutral-100);
    border-radius: 8px;
    padding: 10px;
    width: 100%;

    &:focus {
      border-color: var(--accent-purple);
      outline: none;
    }
  }
}

.error-message {
  color: var(--status-inactive);
  background: rgba(255, 75, 110, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
