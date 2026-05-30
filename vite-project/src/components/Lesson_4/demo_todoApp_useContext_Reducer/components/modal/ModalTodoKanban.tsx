import React, { useEffect } from "react";
import { Button, Input, Modal, Form, Select } from "antd";
import type { TodoKanbanItem } from "../../context/todo-kanban-context";

interface ModalTodoKanbanProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (values: TodoKanbanItem) => void;
  editingTodo: TodoKanbanItem | null;
}

const ModalTodoKanban: React.FC<ModalTodoKanbanProps> = ({
  open,
  onClose,
  onSuccess,
  editingTodo,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: TodoKanbanItem) => {
    onSuccess?.(values);
    form.resetFields();
  };

  useEffect(() => {
    if (editingTodo) {
      form.setFieldsValue(editingTodo);
    } else {
      form.resetFields();
    }
  }, [editingTodo]);

  return (
    <Modal
      title={editingTodo ? "Update Todo" : "Create Todo"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input code",
            },
          ]}
        >
          <Input placeholder="TODO-1" />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input title",
            },
          ]}
        >
          <Input placeholder="Shopping cart issue" />
        </Form.Item>

        <Form.Item label="Priority" name="level" initialValue="NORMAL">
          <Select
            options={[
              {
                label: "LOW",
                value: "LOW",
              },
              {
                label: "NORMAL",
                value: "NORMAL",
              },
              {
                label: "HIGH",
                value: "HIGH",
              },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          {editingTodo ? "Update Todo" : "Create Todo"}
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalTodoKanban;
