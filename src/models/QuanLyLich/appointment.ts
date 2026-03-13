import { useState, useEffect } from 'react';
import { message } from 'antd';
import { IAppointment } from '@/services/QuanLyLich/types';

const STORAGE_KEY = 'appointment_appointments';

export default () => {
	const [appointments, setAppointments] = useState<IAppointment[]>([]);

	// Load từ localStorage
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			setAppointments(JSON.parse(saved));
		}
	}, []);

	const addAppointment = (appointment: Omit<IAppointment, 'id' | 'createdAt'>) => {
		const newAppointment: IAppointment = {
			...appointment,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
		};
		const updated = [...appointments, newAppointment];
		setAppointments(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Đặt lịch thành công');
		return newAppointment;
	};

	const updateAppointmentStatus = (id: string, status: IAppointment['status']) => {
		const updated = appointments.map((a) => (a.id === id ? { ...a, status } : a));
		setAppointments(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Cập nhật trạng thái thành công');
	};

	const cancelAppointment = (id: string) => {
		updateAppointmentStatus(id, 'cancelled');
	};

	const getAppointmentsByEmployee = (employeeId: string, date?: string) => {
		return appointments.filter((a) => {
			if (a.employeeId !== employeeId) return false;
			if (date && a.date !== date) return false;
			return a.status !== 'cancelled';
		});
	};

	const getAppointmentsByCustomer = (customerId: string) => {
		return appointments.filter((a) => a.customerId === customerId);
	};

	const getAppointmentsByDate = (date: string) => {
		return appointments.filter((a) => a.date === date && a.status !== 'cancelled');
	};

	const checkTimeSlotAvailable = (employeeId: string, date: string, time: string, duration: number) => {
		const dayAppointments = getAppointmentsByEmployee(employeeId, date);

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
	};

	const deleteAppointment = (id: string) => {
		const updated = appointments.filter((a) => a.id !== id);
		setAppointments(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Xóa lịch hẹn thành công');
	};

	return {
		appointments,
		addAppointment,
		updateAppointmentStatus,
		cancelAppointment,
		deleteAppointment,
		getAppointmentsByEmployee,
		getAppointmentsByCustomer,
		getAppointmentsByDate,
		checkTimeSlotAvailable,
	};
};
