import { Tabs } from 'antd';
import { CalendarOutlined, UserOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';
import BookingAppointment from './components/BookingAppointment';
import ManageAppointment from './components/ManageAppointment';
import ManageEmployee from './components/ManageEmployee';
import ManageService from './components/ManageService';
import Statistics from './components/Statistics';

export default function QuanLyLichPage() {
	return (
		<div style={{ padding: '20px' }}>
			<h1>Quản lý lịch hẹn dịch vụ</h1>
			<Tabs defaultActiveKey='1'>
				<Tabs.TabPane
					key='1'
					tab={
						<span>
							<CalendarOutlined />
							Đặt lịch
						</span>
					}
				>
					<BookingAppointment />
				</Tabs.TabPane>
				<Tabs.TabPane
					key='2'
					tab={
						<span>
							<FileTextOutlined />
							Quản lý lịch hẹn
						</span>
					}
				>
					<ManageAppointment />
				</Tabs.TabPane>
				<Tabs.TabPane
					key='3'
					tab={
						<span>
							<UserOutlined />
							Quản lý nhân viên
						</span>
					}
				>
					<ManageEmployee />
				</Tabs.TabPane>
				<Tabs.TabPane
					key='4'
					tab={
						<span>
							<UserOutlined />
							Quản lý dịch vụ
						</span>
					}
				>
					<ManageService />
				</Tabs.TabPane>
				<Tabs.TabPane
					key='5'
					tab={
						<span>
							<BarChartOutlined />
							Thống kê
						</span>
					}
				>
					<Statistics />
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}
