// src/api/achievementApi.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/achievements`;

// Lấy token từ localStorage (giống cách bạn làm ở project)
const getToken = () => localStorage.getItem("token");

export const getAchievements = async (filters) => {
  const res = await axios.get(API_URL, { params: filters });

  const data = res.data;

  return Array.isArray(data) ? data : data.achievements;
};

// 2. Lấy chi tiết 1 chứng chỉ theo ID
export const getAchievementById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data; // object achievement
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết chứng chỉ:", error);
    throw error.response?.data || { message: "Không tìm thấy chứng chỉ" };
  }
};

// 3. Tạo chứng chỉ mới
// Lưu ý: nếu có upload file (ảnh chứng chỉ) thì dùng FormData, còn không thì gửi JSON bình thường
export const createAchievement = async (achievementData, isMultipart = false) => {
  try {
    const token = getToken();
    let config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    let payload = achievementData;

    // Nếu có file (ví dụ: ảnh chứng chỉ) thì chuyển sang FormData
    if (isMultipart) {
      payload = new FormData();
      // ví dụ:
      // payload.append("title", achievementData.title);
      // payload.append("issuer", achievementData.issuer);
      // payload.append("certificateImage", achievementData.file); // file object
      // ... thêm các field khác

      config.headers["Content-Type"] = "multipart/form-data";
    }

    const res = await axios.post(API_URL, payload, config);
    return res.data; // achievement vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo chứng chỉ:", error);
    throw error.response?.data || { message: "Tạo chứng chỉ thất bại" };
  }
};

// 4. Cập nhật chứng chỉ
// Tương tự create: hỗ trợ cả JSON và multipart/form-data
export const updateAchievement = async (id, achievementData, isMultipart = false) => {
  try {
    const token = getToken();
    let config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    let payload = achievementData;

    if (isMultipart) {
      payload = new FormData();
      // append các field tương tự như create
      // payload.append("title", achievementData.title);
      // nếu có file mới thì: payload.append("certificateImage", file);

      config.headers["Content-Type"] = "multipart/form-data";
    }

    const res = await axios.put(`${API_URL}/${id}`, payload, config);
    return res.data; // achievement đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật chứng chỉ:", error);
    throw error.response?.data || { message: "Cập nhật chứng chỉ thất bại" };
  }
};

// 5. Xóa chứng chỉ
export const deleteAchievement = async (id) => {
  try {
    const token = getToken();
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data; // thường là { message: "Achievement deleted" }
  } catch (error) {
    console.error("Lỗi khi xóa chứng chỉ:", error);
    throw error.response?.data || { message: "Xóa chứng chỉ thất bại" };
  }
};