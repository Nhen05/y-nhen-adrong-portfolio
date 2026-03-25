import { useState, useEffect } from "react";
import {
  BsPlusCircle,
  BsPencil,
  BsTrash,
  BsTrophy,
} from "react-icons/bs";
import { Table, Button, Modal, Form, Alert, Image, Spinner } from "react-bootstrap";

// Import các API function (điều chỉnh đường dẫn nếu cần)
import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../services/achievementService"; // ← thay bằng đường dẫn thật của bạn

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    certificateUrl: "",
    category: "",
    type: "",
  });

  // Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  // Load danh sách chứng chỉ khi mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAchievements(); // có thể truyền filters nếu cần
      const safeData = Array.isArray(data)
        ? data
        : data?.achievements || [];

      setAchievements(safeData);
    } catch (err) {
      setError(err.message || "Không thể tải danh sách chứng chỉ");
      showAlert("Lỗi khi tải dữ liệu: " + (err.message || "Unknown error"), "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsEdit(false);
    setCurrentAchievement({
      name: "",
      issuer: "",
      issueDate: "",
      certificateUrl: "",
      category: "",
      type: "",
    });
    setShowModal(true);
  };

  const handleEdit = async (achievement) => {
    // Nếu cần lấy dữ liệu mới nhất từ server (tùy trường hợp)
    try {
      const freshData = await getAchievementById(achievement._id);
      setCurrentAchievement(freshData);
    } catch (err) {
      setCurrentAchievement({ ...achievement }); // fallback dùng data cũ
    }
    setIsEdit(true);
    setShowModal(true);
  };

  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: "", variant: "success" }), 5000);
  };

  const handleSave = async () => {
    if (!currentAchievement.name?.trim() || !currentAchievement.issuer?.trim()) {
      showAlert("Tên chứng chỉ và Issuer không được để trống!", "danger");
      return;
    }

    try {
      let updatedOrNew;

      if (isEdit) {
        updatedOrNew = await updateAchievement(currentAchievement._id, currentAchievement);
        showAlert("Cập nhật chứng chỉ thành công!", "success");
      } else {
        updatedOrNew = await createAchievement(currentAchievement);
        showAlert("Thêm chứng chỉ mới thành công!", "success");
      }

      // Refresh lại danh sách
      await fetchAchievements();
      setShowModal(false);
    } catch (err) {
      showAlert("Lỗi: " + (err.message || "Không thể lưu chứng chỉ"), "danger");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa chứng chỉ này?")) return;

    try {
      await deleteAchievement(id);
      showAlert("Xóa chứng chỉ thành công!", "success");
      // Refresh danh sách
      fetchAchievements();
    } catch (err) {
      showAlert("Xóa thất bại: " + (err.message || "Unknown error"), "danger");
    }
  };

  return (
    <div style={{ padding: "2rem 1.5rem", background: "#0a0e17", minHeight: "100vh", color: "#f1f5f9" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          style={{
            fontWeight: 700,
            color: "#eab308",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <BsTrophy size={32} />
          Quản lý Chứng chỉ & Thành tựu
        </h2>

        <Button
          variant="warning"
          onClick={handleAddNew}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#000" }}
        >
          <BsPlusCircle size={18} />
          Thêm chứng chỉ mới
        </Button>
      </div>

      {/* Alerts */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}

      {/* Loading & Error */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="warning" />
          <p className="mt-2">Đang tải danh sách chứng chỉ...</p>
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Bảng danh sách */}
      {!loading && !error && (
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            overflowX: "auto",
          }}
        >
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Tên chứng chỉ</th>
                <th>Issuer</th>
                <th>Ngày cấp</th>
                <th>Category</th>
                <th>Type</th>
                <th>Ảnh chứng chỉ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(achievements) || achievements.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Chưa có chứng chỉ nào. Hãy thêm mới!
                  </td>
                </tr>
              ) : (
                achievements.map((ach) => (
                  <tr key={ach._id}>
                    <td>{ach.name}</td>
                    <td>{ach.issuer}</td>
                    <td>
                      {ach.issueDate
                        ? new Date(ach.issueDate).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>
                    <td>
                      <span className="badge bg-info">{ach.category || "—"}</span>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{ach.type || "—"}</span>
                    </td>
                    <td>
                      {ach.certificateUrl ? (
                        <Image
                          src={ach.certificateUrl}
                          thumbnail
                          style={{ width: "80px", height: "auto", cursor: "pointer" }}
                          onClick={() => window.open(ach.certificateUrl, "_blank")}
                          alt={ach.name}
                        />
                      ) : (
                        "Không có ảnh"
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(ach)}
                      >
                        <BsPencil size={16} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(ach._id)}
                      >
                        <BsTrash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal Thêm / Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header
          closeButton
          style={{ background: "#1e293b", color: "#f1f5f9", borderBottom: "1px solid #334155" }}
        >
          <Modal.Title>{isEdit ? "Sửa chứng chỉ" : "Thêm chứng chỉ mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#0f172a", color: "#f1f5f9" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên chứng chỉ *</Form.Label>
              <Form.Control
                type="text"
                value={currentAchievement.name || ""}
                onChange={(e) =>
                  setCurrentAchievement({ ...currentAchievement, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Issuer (Tổ chức cấp) *</Form.Label>
              <Form.Control
                type="text"
                value={currentAchievement.issuer || ""}
                onChange={(e) =>
                  setCurrentAchievement({ ...currentAchievement, issuer: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày cấp</Form.Label>
              <Form.Control
                type="date"
                value={
                  currentAchievement.issueDate
                    ? currentAchievement.issueDate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setCurrentAchievement({ ...currentAchievement, issueDate: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link ảnh chứng chỉ (URL)</Form.Label>
              <Form.Control
                type="url"
                value={currentAchievement.certificateUrl || ""}
                onChange={(e) =>
                  setCurrentAchievement({
                    ...currentAchievement,
                    certificateUrl: e.target.value,
                  })
                }
                placeholder="https://i.ibb.co/..."
              />
              {currentAchievement.certificateUrl && (
                <div className="mt-2">
                  <small>Xem trước:</small>
                  <Image
                    src={currentAchievement.certificateUrl}
                    thumbnail
                    style={{ maxWidth: "200px", marginTop: "0.5rem" }}
                    onError={(e) => (e.target.src = "/placeholder-image.png")} // fallback nếu link lỗi
                    alt="Preview"
                  />
                </div>
              )}
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={currentAchievement.category || ""}
                    onChange={(e) =>
                      setCurrentAchievement({
                        ...currentAchievement,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Chọn category</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="devops">DevOps</option>
                    <option value="fullstack">Fullstack</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={currentAchievement.type || ""}
                    onChange={(e) =>
                      setCurrentAchievement({ ...currentAchievement, type: e.target.value })
                    }
                  >
                    <option value="">Chọn type</option>
                    <option value="professional">Professional</option>
                    <option value="student">Student</option>
                    <option value="completion">Completion</option>
                    <option value="participation">Participation</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ background: "#1e293b", borderTop: "1px solid #334155" }}
        >
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="warning" onClick={handleSave} style={{ color: "#000" }}>
            {isEdit ? "Cập nhật" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAchievements;