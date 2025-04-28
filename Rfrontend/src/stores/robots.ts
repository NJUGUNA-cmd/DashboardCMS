import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Robot, RobotState } from '../types.ts'
import api from '../api/axios'

export const useRobotStore = defineStore('robots', () => {
  const robots = ref<Robot[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRobots() {
    loading.value = true
    error.value = null
    try {
      console.log('Making API request to:', import.meta.env.VITE_API_URL + '/robots')
      const response = await api.get('/robots')
      console.log('Raw API response:', response.data)

      if (!Array.isArray(response.data)) {
        console.error('Expected array of robots, got:', response.data)
        throw new Error('Invalid data format received from server')
      }

      robots.value = response.data.map((robot: any) => ({
        id: robot.id,
        name: robot.name,
        type: robot.type,
        status: robot.status,
        lastActive: new Date(robot.lastActive)
      }))

      console.log('Processed robots:', robots.value)
    } catch (err: any) {
      console.error('Error fetching robots:', err)
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }
  async function createRobot(robot: Robot) {
    try {
      console.log('Creating robot:', robot)
     // const response = await api.post('/robots', robot)
      const{id, ...robotData} = robot
      const payload={...robotData,lastActive:new Date(robotData.lastActive).toISOString()};
      console.log('sending Payload:', payload);
      const response = await api.post('/robots', payload)
      const newRobot = {
        ...response.data,
        lastActive: new Date(response.data.lastActive)
      }
      robots.value.push(newRobot)

      console.log('Robot created successfully:', newRobot)
      return response.data
    } catch (err: unknown) {
      console.error('Failed to create robot:', err)
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to create robot'
      }
      throw error.value
    } finally {
      loading.value = false
    }
  }
  async function deleteRobot(id: string) {
    if (!id || id.trim() === '') {
      throw new Error('Invalid robot ID');
    }

    try {
      loading.value = true
      error.value = null
      console.log(`Deleting robot with ID ${id}`)
      await api.delete(`/robots/${id}`)
      console.log(`Robot with ID ${id} deleted successfully`)
      robots.value = robots.value.filter((robot) => robot.id !== id)
    } catch (err: unknown) {
      console.error('Failed to delete robot:', err)
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to delete robot'
      }
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    robots,
    loading,
    error,
    fetchRobots,
    deleteRobot,
    createRobot
  }
})
