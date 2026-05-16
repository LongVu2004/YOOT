import React, { useState, useMemo } from "react";
import { Table, Input, Button, Modal, Form, InputNumber, Space, Tag } from "antd";
import { getAcademicLevel, getLevelColor } from "../../index";

export type ManageStudent = {
  id: number;
  hoten: string;
  phuhuynh: string;
  sdt: string;
  hocluc: string;
  diem: number;
};

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<ManageStudent[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<ManageStudent | null>(null);

  const [form] = Form.useForm();

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.hoten.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();

      const student: ManageStudent = {
        id: Date.now(),
        ...values,
        hocluc: getAcademicLevel(values.diem),
      };

      setStudents([...students, student]);
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleSaveEdit = () => {
    if (!editingStudent) return;

    const updated = {
      ...editingStudent,
      hocluc: getAcademicLevel(editingStudent.diem),
    };

    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
  };

  const columns = [
    {
      title: "Học viên",
      dataIndex: "hoten",
      render: (_: unknown, record: ManageStudent) =>
        editingStudent?.id === record.id ? (
          <Input
            value={editingStudent.hoten}
            onChange={(e) =>
              setEditingStudent({ ...editingStudent, hoten: e.target.value })
            }
          />
        ) : (
          record.hoten
        ),
    },
    {
      title: "Phụ huynh",
      dataIndex: "phuhuynh",
      render: (_: unknown, record: ManageStudent) =>
        editingStudent?.id === record.id ? (
          <Input
            value={editingStudent.phuhuynh}
            onChange={(e) =>
              setEditingStudent({ ...editingStudent, phuhuynh: e.target.value })
            }
          />
        ) : (
          record.phuhuynh
        ),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "sdt",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
      render: (_: unknown, record: ManageStudent) =>
        editingStudent?.id === record.id ? (
          <InputNumber
            value={editingStudent.diem}
            onChange={(value) =>
              setEditingStudent({
                ...editingStudent,
                diem: Number(value),
              })
            }
          />
        ) : (
          record.diem
        ),
    },
    {
      title: "Học lực",
      render: (_: unknown, record: ManageStudent) => (
        <Tag color={getLevelColor(record.hocluc)}>
          {record.hocluc}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      render: (_: unknown, record: ManageStudent) =>
        editingStudent?.id === record.id ? (
          <Space>
            <Button type="primary" onClick={handleSaveEdit}>
              Lưu
            </Button>
            <Button onClick={() => setEditingStudent(null)}>Huỷ</Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => setEditingStudent(record)}>Sửa</Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Xoá
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý học viên</h2>

      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Thêm
        </Button>
      </Space>

      <Table rowKey="id" dataSource={filteredStudents} columns={columns} />

      <Modal
        title="Thêm học viên"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="hoten" label="Họ tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phuhuynh" label="Phụ huynh" rules={[{ required: true, message: "Vui lòng nhập tên phụ huynh" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="sdt" label="Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="diem" label="Điểm" rules={[{ required: true, message: "Vui lòng nhập điểm" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;