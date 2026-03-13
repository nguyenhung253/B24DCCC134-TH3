import { IAppointment } from '@/models/QuanLyLich/appointment';

// Service để xử lý logic liên quan đến lịch hẹn
export const appointmentService = {
	// Kiểm tra xem giờ có trống không
	isTimeSlotAvailable: (
		appointments: IAppointment[],
		employeeId: string,
		date: string,
		time: string,
		duration: number,
	): boolean => {
		const dayAppointments = appointments.filter(
			(a) => a.employeeId === employeeId && a.date === date && a.status !== 'cancelled',
		);

		const [hours, minutes] = time.split(':').map(Number);
		const appointmentStart = hours * 60 + minutes;
		const appointmentEnd = appointmentStart + duration;

		for (const apt of dayAppointments) {
			const [aptHours, aptMinutes] = apt.time.split(':').map(Number);
			const aptStart = aptHours * 60 + aptMinutes;
			const aptEnd = aptStart + 30;

			if (!(appointmentEnd <= aptStart || appointmentStart >= aptEnd)) {
				return false;
			}
		}

		return true;
	},

	// Lấy lịch hẹn theo nhân viên
	getByEmployee: (appointments: IAppointment[], employeeId: string, date?: string) => {
		return appointments.filter((a) => {
			if (a.employeeId !== employeeId) return false;
			if (date && a.date !== date) return false;
			return a.status !== 'cancelled';
		});
	},

	// Lấy lịch hẹn theo khách hàng
	getByCustomer: (appointments: IAppointment[], customerId: string) => {
		return appointments.filter((a) => a.customerId === customerId);
	},

	// Lấy lịch hẹn theo ngày
	getByDate: (appointments: IAppointment[], date: string) => {
		return appointments.filter((a) => a.date === date && a.status !== 'cancelled');
	},
};
