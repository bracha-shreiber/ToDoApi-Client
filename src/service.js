import axios from 'axios';
axios.baseURL(process.env.REACT_APP_API_URL)
// axiosInstance.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     console.error('Error occurred:', error.response ? error.response.data : error.message);
//     return Promise.reject(error);
//   }
// );
export default {
  getTasks: async () => {
    const result = await axios.get(`/items`);    
    if(Array.isArray(result.data))
      return result.data;
    else{
    return [];}
  },

  postTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post(`/items`, { name });
      return result.data; // מחזיר את הנתונים שהתקבלו מהשרת
    } catch (error) {
      console.error('Error adding task:', error);
      throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
    }
  },

  putCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      return result.data; // מחזיר את הנתונים שהתקבלו מהשרת
    } catch (error) {
      console.error('Error updating task completion:', error);
      throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      await axios.delete(`/items/${id}`);
      return { success: true }; // מחזיר אובייקט שמצביע על הצלחה
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
    }
  }
};
