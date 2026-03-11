import { Modal, Form, Input } from 'antd';
import { useModel } from 'umi';

export default function FormAppointment() {
  const { visible, setVisible, selected, addAppointment } =
    useModel('appointment');

  const [form] = Form.useForm();

  const submit = (values: any) => {
    addAppointment(values);
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title={`Đặt lịch - ${selected?.employee || ''} (${selected?.time || ''})`}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={submit}>
        <Form.Item
          label="Tên khách"
          name="customer"
          rules={[{ required: true, message: 'Nhập tên khách' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}