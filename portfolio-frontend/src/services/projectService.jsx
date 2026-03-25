import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/projects`;

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// 1. Lấy tất cả dự án (có phân trang)
export const getProjects = async (page = 1, limit = 6) => {
  try {
    const res = await axios.get(API_URL, {
      params: { page, limit },
    });
    return res.data; // { total, page, pages, projects: [...] }
  } catch (error) {
    console.error("Lỗi lấy danh sách dự án:", error);
    throw error.response?.data || { message: "Không thể lấy danh sách dự án" };
  }
};

// 2. Lấy chi tiết 1 dự án theo ID
export const getProjectById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data; // object project
  } catch (error) {
    console.error("Lỗi lấy chi tiết dự án:", error);
    throw error.response?.data || { message: "Không tìm thấy dự án" };
  }
};

// 3. Tạo dự án mới (multipart/form-data)
export const createProject = async (formData) => {
  try {
    const token = getToken();
    const res = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data; // project vừa tạo
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error.response?.data || { message: "Tạo dự án thất bại" };
  }
};

// 4. Cập nhật dự án (multipart/form-data)
export const updateProject = async (id, formData) => {
  try {
    const token = getToken();
    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data; // project đã cập nhật
  } catch (error) {
    console.error("Lỗi cập nhật dự án:", error);
    throw error.response?.data || { message: "Cập nhật dự án thất bại" };
  }
};

// 5. Xóa dự án
export const deleteProject = async (id) => {
  try {
    const token = getToken();
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data; // { message: "Project deleted" }
  } catch (error) {
    console.error("Lỗi xóa dự án:", error);
    throw error.response?.data || { message: "Xóa dự án thất bại" };
  }
};