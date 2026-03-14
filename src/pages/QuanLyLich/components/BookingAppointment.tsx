import React, { useState } from 'react';
import { useModel } from 'umi';
import { Form, Input, Button, Select, DatePicker, TimePicker, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import { appointmentService } from '@/services/QuanLyLich/appointment';

export default function BookingAppointment() {
	const [form] = Form.useForm();
	const appointmentModel = useModel('QuanLyLich.appointment');
	const employeeModel = useModel('QuanLyLich.employee');
	const serviceModel = useModel('QuanLyLich.service');
	const [selectedEmployee, setSelectedEmployee] = useState<string>('');
	const [selectedService, setSelectedService] = useState<string>('');

	const handleSubmit = (values: any) => {
		if (!selectedEmployee || !selectedService) {
			message.error('Vui lòng chọn nhân viên và dịch vụ');
			return;
		}

		const date = values.date.format('YYYY-MM-DD');
		const time = values.time.format('HH:mm');
		const service = serviceModel.getServiceById(selectedService);

		if (!service) {
			message.error('Dịch vụ không tồn tại');
			return;
		}

		const isAvailable = appointmentService.isTimeSlotAvailable(
			appointmentModel.appointments,
			selectedEmployee,
			date,
			time,
			service.duration,
		);

		if (!isAvailable) {
			message.error('Giờ này không còn trống hoặc vượt quá số lượng khách trong ngày');
			return;
		}

		appointmentModel.addAppointment({
			customerId: Date.now().toString(),
			customerName: values.customerName,
			customerPhone: values.customerPhone,
			employeeId: selectedEmployee,
			serviceId: selectedService,
			date,
			time,
			status: 'pending',
			notes: values.notes,
		});

		form.resetFields();
		setSelectedEmployee('');
		setSelectedService('');
	};

	return (
		<div className='card-section'>
			<div className='card-title'> Đặt lịch hẹn mới</div>
			<Form form={form} layout='vertical' onFinish={handleSubmit}>
				<Row gutter={16}>
					<Col xs={24} sm={12}>
						<Form.Item
							label='Tên khách hàng'
							name='customerName'
							rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
						>
							<Input placeholder='Nhập tên khách hàng' />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12}>
						<Form.Item
							label='Số điện thoại'
							name='customerPhone'
							rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
						>
							<Input placeholder='Nhập số điện thoại' />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col xs={24} sm={12}>
						<Form.Item label='Chọn dịch vụ' required>
							<Select placeholder='Chọn dịch vụ' value={selectedService || undefined} onChange={setSelectedService}>
								{serviceModel.services.map((service) => (
									<Select.Option key={service.id} value={service.id}>
										{service.name} - {service.price.toLocaleString()}đ ({service.duration} phút)
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12}>
						<Form.Item label='Chọn nhân viên' required>
							<Select placeholder='Chọn nhân viên' value={selectedEmployee || undefined} onChange={setSelectedEmployee}>
								{employeeModel.employees
									.filter((emp) => selectedService === '' || emp.services.includes(selectedService))
									.map((emp) => (
										<Select.Option key={emp.id} value={emp.id}>
											{emp.name} - ⭐ {emp.rating} ({emp.totalReviews} đánh giá)
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col xs={24} sm={12}>
						<Form.Item label='Ngày' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
							<DatePicker style={{ width: '100%' }} disabledDate={(current) => current < moment().startOf('day')} />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12}>
						<Form.Item label='Giờ' name='time' rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}>
							<TimePicker format='HH:mm' style={{ width: '100%' }} />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label='Ghi chú' name='notes'>
					<Input.TextArea placeholder='Ghi chú thêm (nếu có)' rows={3} />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' size='large' style={{ width: '100%' }}>
						Đặt lịch
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}