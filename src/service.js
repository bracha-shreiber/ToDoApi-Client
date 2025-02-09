import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.response.use(
  response => {
    return response.data; // מחזיר את הנתונים מהתגובה
  },
  error => {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);
export default {
  getTasks: async () => {
    const result = await axiosInstance.get(`/tasks`); 
    if (Array.isArray(result)) 
      return result;
    else {
      return [];
    }
  },

  postTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axiosInstance.post(`/tasks`, { name });
      return result; // אין צורך ב-`result.data` כי ה-interceptor מחזיר את הנתונים
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  putCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axiosInstance.put(`/tasks/${id}`, { isComplete });
      return result; // אין צורך ב-`result.data`
    } catch (error) {
      console.error('Error updating task completion:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
