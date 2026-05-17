import React, { useState, useMemo } from "react";
import { Table, Input, Button, Modal, Form, InputNumber, Space } from "antd";

type Course = {
  id: number;
  name: string;
  description: string;
  duration: string;
  students: number;
};

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [form] = Form.useForm();

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();

      setCourses([
        ...courses,
        { id: Date.now(), ...values },
      ]);

      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleSaveEdit = () => {
    if (!editingCourse) return;

    setCourses(
      courses.map((c) =>
        c.id === editingCourse.id ? editingCourse : c
      )
    );
    setEditingCourse(null);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (_: unknown, record: Course) =>
        editingCourse?.id === record.id ? (
          <Input
            value={editingCourse.name}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, name: e.target.value })
            }
          />
        ) : (
          record.name
        ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (_: unknown, record: Course) =>
        editingCourse?.id === record.id ? (
          <Input
            value={editingCourse.description}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                description: e.target.value,
              })
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      render: (_: unknown, record: Course) =>
        editingCourse?.id === record.id ? (
          <Input
            value={editingCourse.duration}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                duration: e.target.value,
              })
            }
          />
        ) : (
          record.duration
        ),
    },
    {
      title: "Học viên",
      dataIndex: "students",
      render: (_: unknown, record: Course) =>
        editingCourse?.id === record.id ? (
          <InputNumber
            value={editingCourse.students}
            onChange={(value) =>
              setEditingCourse({
                ...editingCourse,
                students: Number(value),
              })
            }
          />
        ) : (
          record.students
        ),
    },
    {
      title: "Hành động",
      render: (_: unknown, record: Course) =>
        editingCourse?.id === record.id ? (
          <Space>
            <Button type="primary" onClick={handleSaveEdit}>
              Lưu
            </Button>
            <Button onClick={() => setEditingCourse(null)}>Huỷ</Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => setEditingCourse(record)}>Sửa</Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Xoá
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý khóa học</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "900px" }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Thêm khóa học
        </Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={filteredCourses}
        columns={columns}
      />

      <Modal
        title="Thêm khóa học"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Thời lượng" rules={[{ required: true, message: "Vui lòng nhập thời lượng" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="students" label="Học viên" rules={[{ required: true, message: "Vui lòng nhập số lượng học viên" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;