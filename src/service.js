import axios from 'axios';

const apiUrl = "https://localhost:7271"

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/items`);    
    return result.data;
  },

  postTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post(`${apiUrl}/items`, { name });
      return result.data; // מחזיר את הנתונים שהתקבלו מהשרת
    } catch (error) {
      console.error('Error adding task:', error);
      throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
    }
  },

  putCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.put(`${apiUrl}/items/${id}`, { isComplete });
      return result.data; // מחזיר את הנתונים שהתקבלו מהשרת
    } catch (error) {
      console.error('Error updating task completion:', error);
      throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      await axios.delete(`${apiUrl}/items/${id}`);
      return { success: true }; // מחזיר אובייקט שמצביע על הצלחה
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
    }
  }
};
