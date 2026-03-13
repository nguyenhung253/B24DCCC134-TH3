import { IEmployee } from '@/models/QuanLyLich/employee';

// Service để xử lý logic liên quan đến nhân viên
export const employeeService = {
	// Kiểm tra nhân viên có phục vụ dịch vụ này không
	canServeService: (employee: IEmployee, serviceId: string): boolean => {
		return employee.services.includes(serviceId);
	},

	// Lấy danh sách nhân viên có thể phục vụ dịch vụ
	getByService: (employees: IEmployee[], serviceId: string): IEmployee[] => {
		return employees.filter((e) => e.services.includes(serviceId));
	},

	// Kiểm tra nhân viên có làm việc vào ngày này không
	isWorkingOnDay: (employee: IEmployee, dayOfWeek: number): boolean => {
		return employee.workSchedule.dayOfWeek.includes(dayOfWeek);
	},

	// Kiểm tra giờ có nằm trong giờ làm việc không
	isWithinWorkingHours: (employee: IEmployee, time: string): boolean => {
		const [hours, minutes] = time.split(':').map(Number);
		const timeInMinutes = hours * 60 + minutes;

		const [startHours, startMinutes] = employee.workSchedule.startTime.split(':').map(Number);
		const startInMinutes = startHours * 60 + startMinutes;

		const [endHours, endMinutes] = employee.workSchedule.endTime.split(':').map(Number);
		const endInMinutes = endHours * 60 + endMinutes;

		return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes;
	},
};
