import { IAppointment } from './types';

export const appointmentService = {
	// kiểm tra khung giờ còn trống không
	isTimeSlotAvailable(
		appointments: IAppointment[],
		employeeId: string,
		date: string,
		time: string,
		duration: number,
	) {
		const dayAppointments = appointments.filter(
			(a) => a.employeeId === employeeId && a.date === date && a.status !== 'cancelled',
		);

		const [hours, minutes] = time.split(':').map(Number);
		const start = hours * 60 + minutes;
		const end = start + duration;

		for (const apt of dayAppointments) {
			const [aptHours, aptMinutes] = apt.time.split(':').map(Number);
			const aptStart = aptHours * 60 + aptMinutes;

			// mặc định 30 phút nếu không có duration
			const aptEnd = aptStart + 30;

			// kiểm tra trùng
			if (!(end <= aptStart || start >= aptEnd)) {
				return false;
			}
		}

		return true;
	},
};
