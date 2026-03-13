import { useState } from 'react';
import { useModel } from 'umi';
import { Table, Button, Modal, Form, Input, Select, TimePicker, Checkbox, Space, Row, Col, Rate } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { reviewService } from '@/services/QuanLyLich/review';

export default function ManageEmployee() {
	const employeeModel = useModel('QuanLyLich.employee');
	const serviceModel = useModel('QuanLyLich.service');
	const reviewModel = useModel('QuanLyLich.review');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
	const [form] = Form.useForm();

	const dayOfWeekLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

	const handleOpenModal = (employee?: any) => {
		if (employee) {
			setIsEditing(true);
			setSelectedEmployee(employee);
			form.setFieldsValue({
				name: employee.name,
				phone: employee.phone,
				email: employee.email,
				services: employee.services,
				maxCustomersPerDay: employee.maxCustomersPerDay,
				dayOfWeek: employee.workSchedule.dayOfWeek,
				startTime: dayjs(employee.workSchedule.startTime, 'HH:mm'),
				endTime: dayjs(employee.workSchedule.endTime, 'HH:mm'),
			});
		} else {
			setIsEditing(false);
			setSelectedEmployee(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleSubmit = (values: any) => {
		const employeeData = {
			name: values.name,
			phone: values.phone,
			email: values.email,
			services: values.services,
			maxCustomersPerDay: values.maxCustomersPerDay,
			workSchedule: {
				dayOfWeek: values.dayOfWeek,
				startTime: values.startTime.format('HH:mm'),
				endTime: values.endTime.format('HH:mm'),
			},
		};

		if (isEditing && selectedEmployee) {
			employeeModel.updateEmployee(selectedEmployee.id, employeeData);
		} else {
			employeeModel.addEmployee(employeeData);
		}

		setIsModalVisible(false);
		form.resetFields();
	};

	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Xóa nhân viên',
			content: 'Bạn có chắc chắn muốn xóa nhân viên này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			onOk() {
				employeeModel.deleteEmployee(id);
			},
		});
	};

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Điện thoại',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'services',
			key: 'services',
			render: (services: string[]) => {
				return services
					.map((id) => serviceModel.getServiceById(id)?.name)
					.filter(Boolean)
					.join(', ');
			},
		},
		{
			title: 'Đánh giá',
			dataIndex: 'id',
			key: 'rating',
			render: (id: string) => {
				const rating = reviewService.getAverageRating(reviewModel.reviews, id);
				return <Rate disabled value={rating} />;
			},
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
				Thêm nhân viên
			</Button>

			<Table columns={columns} dataSource={employeeModel.employees} rowKey='id' pagination={{ pageSize: 10 }} />

			<Modal
				title={isEditing ? 'Sửa nhân viên' : 'Thêm nhân viên'}
				visible={isModalVisible}
				onOk={() => form.submit()}
				onCancel={() => setIsModalVisible(false)}
				width={700}
			>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Row gutter={16}>
						<Col xs={24} sm={12}>
							<Form.Item label='Tên nhân viên' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
								<Input placeholder='Nhập tên nhân viên' />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12}>
							<Form.Item
								label='Điện thoại'
								name='phone'
								rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
							>
								<Input placeholder='Nhập số điện thoại' />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label='Email' name='email'>
						<Input placeholder='Nhập email' type='email' />
					</Form.Item>

					<Form.Item
						label='Dịch vụ phục vụ'
						name='services'
						rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
					>
						<Select mode='multiple' placeholder='Chọn dịch vụ'>
							{serviceModel.services.map((service) => (
								<Select.Option key={service.id} value={service.id}>
									{service.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						label='Số khách tối đa/ngày'
						name='maxCustomersPerDay'
						rules={[{ required: true, message: 'Vui lòng nhập số khách' }]}
					>
						<Input type='number' placeholder='Nhập số khách tối đa' />
					</Form.Item>

					<Form.Item label='Ngày làm việc' name='dayOfWeek' rules={[{ required: true }]}>
						<Checkbox.Group>
							{dayOfWeekLabels.map((label, index) => (
								<Checkbox key={index} value={index}>
									{label}
								</Checkbox>
							))}
						</Checkbox.Group>
					</Form.Item>

					<Row gutter={16}>
						<Col xs={24} sm={12}>
							<Form.Item
								label='Giờ bắt đầu'
								name='startTime'
								rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
							>
								<TimePicker format='HH:mm' style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12}>
							<Form.Item label='Giờ kết thúc' name='endTime' rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}>
								<TimePicker format='HH:mm' style={{ width: '100%' }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
}
