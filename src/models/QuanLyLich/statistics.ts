import { useState } from 'react';
import { IStatistics } from '@/services/QuanLyLich/types';

export default () => {
	const [statistics, setStatistics] = useState<IStatistics>({
		byDate: {},
		byService: {},
		byEmployee: {},
		totalRevenue: 0,
		serviceRevenue: {},
		employeeRevenue: {},
	});

	const calculateStatistics = (appointments: any[], services: any[], startDate: string, endDate: string) => {
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

		const result: IStatistics = {
			byDate,
			byService,
			byEmployee,
			totalRevenue,
			serviceRevenue,
			employeeRevenue,
		};

		setStatistics(result);
		return result;
	};

	const getAppointmentCountByDate = (date: string) => {
		return statistics.byDate[date] || 0;
	};

	const getAppointmentCountByService = (serviceId: string) => {
		return statistics.byService[serviceId] || 0;
	};

	const getAppointmentCountByEmployee = (employeeId: string) => {
		return statistics.byEmployee[employeeId] || 0;
	};

	const getRevenueByService = (serviceId: string) => {
		return statistics.serviceRevenue[serviceId] || 0;
	};

	const getRevenueByEmployee = (employeeId: string) => {
		return statistics.employeeRevenue[employeeId] || 0;
	};

	return {
		statistics,
		calculateStatistics,
		getAppointmentCountByDate,
		getAppointmentCountByService,
		getAppointmentCountByEmployee,
		getRevenueByService,
		getRevenueByEmployee,
	};
};
