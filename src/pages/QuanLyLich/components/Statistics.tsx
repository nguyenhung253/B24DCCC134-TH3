import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import { Card, Row, Col, DatePicker, Button, Table, Statistic, Empty } from 'antd';
import { BarChartOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function Statistics() {
	const appointmentModel = useModel('QuanLyLich.appointment');
	const serviceModel = useModel('QuanLyLich.service');
	const employeeModel = useModel('QuanLyLich.employee');
	const statisticsModel = useModel('QuanLyLich.statistics');
	const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
	const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

	useEffect(() => {
		statisticsModel.calculateStatistics(appointmentModel.appointments, serviceModel.services, startDate, endDate);
	}, [startDate, endDate, appointmentModel.appointments]);

	const handleSearch = () => {
		statisticsModel.calculateStatistics(appointmentModel.appointments, serviceModel.services, startDate, endDate);
	};

	const serviceColumns = [
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
			title: 'Số lượng',
			dataIndex: 'count',
			key: 'count',
			align: 'center' as const,
		},
		{
			title: 'Doanh thu (đ)',
			dataIndex: 'revenue',
			key: 'revenue',
			align: 'center' as const,
			render: (revenue: number) => revenue.toLocaleString(),
		},
	];

	const employeeColumns = [
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
			title: 'Số lịch',
			dataIndex: 'count',
			key: 'count',
			align: 'center' as const,
		},
		{
			title: 'Doanh thu (đ)',
			dataIndex: 'revenue',
			key: 'revenue',
			align: 'center' as const,
			render: (revenue: number) => revenue.toLocaleString(),
		},
	];

	const serviceData = Object.entries(statisticsModel.statistics.byService).map(([serviceId, count]) => ({
		serviceId,
		count,
		revenue: statisticsModel.statistics.serviceRevenue[serviceId] || 0,
	}));

	const employeeData = Object.entries(statisticsModel.statistics.byEmployee).map(([employeeId, count]) => ({
		employeeId,
		count,
		revenue: statisticsModel.statistics.employeeRevenue[employeeId] || 0,
	}));

	return (
		<div style={{ marginTop: 20 }}>
			<Card style={{ marginBottom: 20 }}>
				<Row gutter={16} style={{ marginBottom: 20 }}>
					<Col xs={24} sm={8}>
						<DatePicker
							value={moment(startDate)}
							onChange={(date) => setStartDate(date?.format('YYYY-MM-DD') || '')}
							style={{ width: '100%' }}
							placeholder='Từ ngày'
						/>
					</Col>
					<Col xs={24} sm={8}>
						<DatePicker
							value={moment(endDate)}
							onChange={(date) => setEndDate(date?.format('YYYY-MM-DD') || '')}
							style={{ width: '100%' }}
							placeholder='Đến ngày'
						/>
					</Col>
					<Col xs={24} sm={8}>
						<Button type='primary' onClick={handleSearch} style={{ width: '100%' }}>
							Tìm kiếm
						</Button>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col xs={24} sm={8}>
						<Statistic
							title='Tổng lịch hẹn'
							value={Object.values(statisticsModel.statistics.byDate).reduce((a, b) => a + b, 0)}
							prefix={<CalendarOutlined />}
						/>
					</Col>
					<Col xs={24} sm={8}>
						<Statistic
							title='Tổng doanh thu'
							value={statisticsModel.statistics.totalRevenue}
							suffix='đ'
							prefix={<DollarOutlined />}
						/>
					</Col>
					<Col xs={24} sm={8}>
						<Statistic
							title='Số dịch vụ'
							value={Object.keys(statisticsModel.statistics.byService).length}
							prefix={<BarChartOutlined />}
						/>
					</Col>
				</Row>
			</Card>

			<Card title='Thống kê theo dịch vụ' style={{ marginBottom: 20 }}>
				{serviceData.length > 0 ? (
					<Table columns={serviceColumns} dataSource={serviceData} rowKey='serviceId' pagination={false} />
				) : (
					<Empty description='Không có dữ liệu' />
				)}
			</Card>

			<Card title='Thống kê theo nhân viên'>
				{employeeData.length > 0 ? (
					<Table columns={employeeColumns} dataSource={employeeData} rowKey='employeeId' pagination={false} />
				) : (
					<Empty description='Không có dữ liệu' />
				)}
			</Card>
		</div>
	);
}
