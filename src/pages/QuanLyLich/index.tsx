import { Tabs, Button } from 'antd';
import { UserOutlined, FileTextOutlined, BarChartOutlined, ReloadOutlined } from '@ant-design/icons';
import ManageEmployee from './components/ManageEmployee';
import ManageService from './components/ManageService';
import Statistics from './components/Statistics';
import './styles.less';

const { TabPane } = Tabs;

export default function QuanLyLichPage() {
	const handleResetData = () => {
		if (window.confirm('Bạn có chắc muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác.')) {
			localStorage.removeItem('appointment_appointments');
			localStorage.removeItem('appointment_employees');
			localStorage.removeItem('appointment_services');
			localStorage.removeItem('appointment_reviews');
			window.location.reload();
		}
	};

	return (
		<div className='quanlylich-container'>
			<div className='quanlylich-card'>
				<div className='page-header'>
					<div className='header-left'>
						<img src='/logo.png' alt='PTIT Logo' className='ptit-logo' />
						<div className='header-text'>
							<h1 className='page-title'>Hệ thống quản lý lịch hẹn dịch vụ</h1>
							<p className='page-subtitle'></p>
						</div>
					</div>
					<Button icon={<ReloadOutlined />} onClick={handleResetData} className='reset-btn'>
						Xóa dữ liệu
					</Button>
				</div>

				<Tabs defaultActiveKey='1' className='quanlylich-tabs'>
					<TabPane
						key='1'
						tab={
							<span className='tab-label'>
								<UserOutlined />
								Quản lý nhân viên
							</span>
						}
					>
						<ManageEmployee />
					</TabPane>
					<TabPane
						key='2'
						tab={
							<span className='tab-label'>
								<FileTextOutlined />
								Quản lý dịch vụ
							</span>
						}
					>
						<ManageService />
					</TabPane>
					<TabPane
						key='3'
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
