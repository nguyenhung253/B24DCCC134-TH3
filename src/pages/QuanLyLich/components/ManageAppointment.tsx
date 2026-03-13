import React, { useState } from 'react';
import { useModel } from 'umi';
import { Table, Button, Tag, Space, Modal, Form, Input, Select } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { reviewService } from '@/services/QuanLyLich/review';

export default function ManageAppointment() {
	const appointmentModel = useModel('QuanLyLich.appointment');
	const employeeModel = useModel('QuanLyLich.employee');
	const serviceModel = useModel('QuanLyLich.service');
	const reviewModel = useModel('QuanLyLich.review');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
	const [form] = Form.useForm();

	const statusColors: Record<string, string> = {
		pending: 'orange',
		confirmed: 'blue',
		completed: 'green',
		cancelled: 'red',
	};

	const statusLabels: Record<string, string> = {
		pending: 'Chờ duyệt',
		confirmed: 'Xác nhận',
		completed: 'Hoàn thành',
		cancelled: 'Đã hủy',
	};

	const handleStatusChange = (id: string, status: string) => {
		appointmentModel.updateAppointmentStatus(id, status as any);
	};

	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Xóa lịch hẹn',
			content: 'Bạn có chắc chắn muốn xóa lịch hẹn này?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			onOk() {
				appointmentModel.deleteAppointment(id);
			},
		});
	};

	const handleReview = (record: any) => {
		if (record.status !== 'completed') {
			Modal.error({ title: 'Lỗi', content: 'Chỉ có thể đánh giá lịch hẹn đã hoàn thành' });
			return;
		}

		if (reviewService.isReviewed(reviewModel.reviews, record.id)) {
			Modal.error({ title: 'Lỗi', content: 'Lịch hẹn này đã được đánh giá' });
			return;
		}

		setSelectedAppointment(record);
		setIsModalVisible(true);
	};

	const handleSubmitReview = (values: any) => {
		if (!selectedAppointment) return;

		reviewModel.addReview({
			appointmentId: selectedAppointment.id,
			employeeId: selectedAppointment.employeeId,
			customerId: selectedAppointment.customerId,
			customerName: selectedAppointment.customerName,
			rating: values.rating,
			comment: values.comment,
		});

		const employeeReviews = reviewService.getByEmployee(reviewModel.reviews, selectedAppointment.employeeId);
		const avgRating = employeeReviews.reduce((sum, r) => sum + r.rating, 0) / employeeReviews.length;
		employeeModel.updateEmployeeRating(
			selectedAppointment.employeeId,
			Math.round(avgRating * 10) / 10,
			employeeReviews.length,
		);

		setIsModalVisible(false);
		form.resetFields();
	};

	const columns = [
		{
			title: 'Khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'serviceId',
			key: 'serviceId',
			render: (serviceId: string) => {
				const service = serviceModel.getServiceById(serviceId);
				return service?.name || 'N/A';
			},
		},
		{
			title: 'Nhân viên',
			dataIndex: 'employeeId',
			key: 'employeeId',
			render: (employeeId: string) => {
				const emp = employeeModel.getEmployeeById(employeeId);
				return emp?.name || 'N/A';
			},
		},
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Giờ',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>,
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: any) => (
				<Space>
					{record.status === 'pending' && (
						<Button
							type='primary'
							size='small'
							icon={<CheckOutlined />}
							onClick={() => handleStatusChange(record.id, 'confirmed')}
						>
							Xác nhận
						</Button>
					)}
					{record.status === 'confirmed' && (
						<Button
							type='primary'
							size='small'
							icon={<CheckOutlined />}
							onClick={() => handleStatusChange(record.id, 'completed')}
						>
							Hoàn thành
						</Button>
					)}
					{record.status === 'completed' && (
						<Button type='default' size='small' onClick={() => handleReview(record)}>
							Đánh giá
						</Button>
					)}
					<Button danger size='small' icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={appointmentModel.appointments}
				rowKey='id'
				pagination={{ pageSize: 10 }}
				style={{ marginTop: 20 }}
			/>

			<Modal
				title='Đánh giá dịch vụ'
				visible={isModalVisible}
				onOk={() => form.submit()}
				onCancel={() => setIsModalVisible(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleSubmitReview}>
					<Form.Item
						label='Đánh giá (1-5 sao)'
						name='rating'
						rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}
					>
						<Select placeholder='Chọn số sao'>
							<Select.Option value={1}>⭐ 1 sao</Select.Option>
							<Select.Option value={2}>⭐⭐ 2 sao</Select.Option>
							<Select.Option value={3}>⭐⭐⭐ 3 sao</Select.Option>
							<Select.Option value={4}>⭐⭐⭐⭐ 4 sao</Select.Option>
							<Select.Option value={5}>⭐⭐⭐⭐⭐ 5 sao</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label='Bình luận' name='comment' rules={[{ required: true, message: 'Vui lòng nhập bình luận' }]}>
						<Input.TextArea placeholder='Nhập bình luận của bạn' rows={4} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
