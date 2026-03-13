import { useState } from 'react';
import { useModel } from 'umi';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default function ManageService() {
	const serviceModel = useModel('QuanLyLich.service');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedService, setSelectedService] = useState<any>(null);
	const [form] = Form.useForm();

	const handleOpenModal = (service?: any) => {
		if (service) {
			setIsEditing(true);
			setSelectedService(service);
			form.setFieldsValue({
				name: service.name,
				price: service.price,
				duration: service.duration,
				description: service.description,
			});
		} else {
			setIsEditing(false);
			setSelectedService(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleSubmit = (values: any) => {
		const serviceData = {
			name: values.name,
			price: parseInt(values.price),
			duration: parseInt(values.duration),
			description: values.description,
		};

		if (isEditing && selectedService) {
			serviceModel.updateService(selectedService.id, serviceData);
		} else {
			serviceModel.addService(serviceData);
		}

		setIsModalVisible(false);
		form.resetFields();
	};

	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Xóa dịch vụ',
			content: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			onOk() {
				serviceModel.deleteService(id);
			},
		});
	};

	const columns = [
		{
			title: 'Tên dịch vụ',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giá (đ)',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => price.toLocaleString(),
		},
		{
			title: 'Thời gian (phút)',
			dataIndex: 'duration',
			key: 'duration',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: any) => (
				<Space>
					<Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleOpenModal(record)}>
						Sửa
					</Button>
					<Button danger size='small' icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => handleOpenModal()}
				style={{ marginTop: 20, marginBottom: 20 }}
			>
				Thêm dịch vụ
			</Button>

			<Table columns={columns} dataSource={serviceModel.services} rowKey='id' pagination={{ pageSize: 10 }} />

			<Modal
				title={isEditing ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
				visible={isModalVisible}
				onOk={() => form.submit()}
				onCancel={() => setIsModalVisible(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Form.Item label='Tên dịch vụ' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
						<Input placeholder='Nhập tên dịch vụ' />
					</Form.Item>

					<Form.Item label='Giá (đ)' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
						<Input type='number' placeholder='Nhập giá' />
					</Form.Item>

					<Form.Item
						label='Thời gian thực hiện (phút)'
						name='duration'
						rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
					>
						<Input type='number' placeholder='Nhập thời gian (phút)' />
					</Form.Item>

					<Form.Item label='Mô tả' name='description'>
						<Input.TextArea placeholder='Nhập mô tả dịch vụ' rows={3} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
