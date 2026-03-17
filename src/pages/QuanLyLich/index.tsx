import { Tabs } from 'antd';
import { UserOutlined, FileTextOutlined, BarChartOutlined, CalendarOutlined } from '@ant-design/icons';

import BookingAppointment from './components/BookingAppointment';
import ManageAppointment from './components/ManageAppointment';
import ManageEmployee from './components/ManageEmployee';
import ManageService from './components/ManageService';
import Statistics from './components/Statistics';

import './styles.less';

const { TabPane } = Tabs;

export default function QuanLyLichPage() {
	return (
		<div className='quanlylich-container'>
			<div className='quanlylich-card'>
				<div className='page-header'>
					<div className='header-left'>
						<img src='/logo.png' alt='PTIT Logo' className='ptit-logo' />
						<div className='header-text'>
							<h1 className='page-title'>Hệ thống quản lý lịch hẹn dịch vụ</h1>
						</div>
					</div>
				</div>

				<Tabs defaultActiveKey='1' className='quanlylich-tabs'>
					<TabPane
						key='1'
						tab={
							<span className='tab-label'>
								<CalendarOutlined />
								Đặt lịch
							</span>
						}
					>
						<BookingAppointment />
					</TabPane>

					<TabPane
						key='2'
						tab={
							<span className='tab-label'>
								<CalendarOutlined />
								Lịch hẹn
							</span>
						}
					>
						<ManageAppointment />
					</TabPane>

					<TabPane
						key='3'
						tab={
							<span className='tab-label'>
								<UserOutlined />
								Nhân viên
							</span>
						}
					>
						<ManageEmployee />
					</TabPane>

					<TabPane
						key='4'
						tab={
							<span className='tab-label'>
								<FileTextOutlined />
								Dịch vụ
							</span>
						}
					>
						<ManageService />
					</TabPane>

					<TabPane
						key='5'
						tab={
							<span className='tab-label'>
								<BarChartOutlined />
								Thống kê
							</span>
						}
					>
						<Statistics />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}
