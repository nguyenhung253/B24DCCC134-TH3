import { IAppointment } from '@/models/QuanLyLich/appointment';
import { IService } from '@/models/QuanLyLich/service';

export interface IStatisticsData {
	byDate: Record<string, number>;
	byService: Record<string, number>;
	byEmployee: Record<string, number>;
	totalRevenue: number;
	serviceRevenue: Record<string, number>;
	employeeRevenue: Record<string, number>;
}

// Service để xử lý logic thống kê
export const statisticsService = {
	// Tính toán thống kê
	calculate: (
		appointments: IAppointment[],
		services: IService[],
		startDate: string,
		endDate: string,
	): IStatisticsData => {
		const filtered = appointments.filter((a) => a.date >= startDate && a.date <= endDate && a.status !== 'cancelled');

		const byDate: Record<string, number> = {};
		const byService: Record<string, number> = {};
		const byEmployee: Record<string, number> = {};
		const serviceRevenue: Record<string, number> = {};
		const employeeRevenue: Record<string, number> = {};
		let totalRevenue = 0;

		filtered.forEach((apt) => {
			byDate[apt.date] = (byDate[apt.date] || 0) + 1;
			byService[apt.serviceId] = (byService[apt.serviceId] || 0) + 1;
			byEmployee[apt.employeeId] = (byEmployee[apt.employeeId] || 0) + 1;

			const service = services.find((s) => s.id === apt.serviceId);
			if (service) {
				serviceRevenue[apt.serviceId] = (serviceRevenue[apt.serviceId] || 0) + service.price;
				totalRevenue += service.price;
			}

			if (service) {
				employeeRevenue[apt.employeeId] = (employeeRevenue[apt.employeeId] || 0) + service.price;
			}
		});

		return {
			byDate,
			byService,
			byEmployee,
			totalRevenue,
			serviceRevenue,
			employeeRevenue,
		};
	},

	// Lấy số lượng lịch theo ngày
	getCountByDate: (data: IStatisticsData, date: string): number => {
		return data.byDate[date] || 0;
	},

	// Lấy số lượng lịch theo dịch vụ
	getCountByService: (data: IStatisticsData, serviceId: string): number => {
		return data.byService[serviceId] || 0;
	},

	// Lấy số lượng lịch theo nhân viên
	getCountByEmployee: (data: IStatisticsData, employeeId: string): number => {
		return data.byEmployee[employeeId] || 0;
	},

	// Lấy doanh thu theo dịch vụ
	getRevenueByService: (data: IStatisticsData, serviceId: string): number => {
		return data.serviceRevenue[serviceId] || 0;
	},

	// Lấy doanh thu theo nhân viên
	getRevenueByEmployee: (data: IStatisticsData, employeeId: string): number => {
		return data.employeeRevenue[employeeId] || 0;
	},
};
