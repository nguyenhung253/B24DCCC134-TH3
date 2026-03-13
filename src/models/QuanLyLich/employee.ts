import { useState, useEffect } from 'react';
import { message } from 'antd';

export interface IEmployee {
	id: string;
	name: string;
	phone: string;
	email?: string;
	services: string[]; 
	maxCustomersPerDay: number;
	workSchedule: {
		dayOfWeek: number[]; // 0-6 (0=CN, 1=T2, ...)
		startTime: string; 
		endTime: string; 
	};
	rating: number;
	totalReviews: number;
}

const STORAGE_KEY = 'appointment_employees';

export default () => {
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			setEmployees(JSON.parse(saved));
		} else {
			initDefaultEmployees();
		}
	}, []);

	const initDefaultEmployees = () => {
		const defaults: IEmployee[] = [
			{
				id: '1',
				name: 'Nhân viên A',
				phone: '0123456789',
				email: 'nva@example.com',
				services: ['1', '2'],
				maxCustomersPerDay: 5,
				workSchedule: {
					dayOfWeek: [1, 2, 3, 4, 5, 6],
					startTime: '09:00',
					endTime: '17:00',
				},
				rating: 4.5,
				totalReviews: 10,
			},
			{
				id: '2',
				name: 'Nhân viên B',
				phone: '0987654321',
				email: 'nvb@example.com',
				services: ['3', '4'],
				maxCustomersPerDay: 4,
				workSchedule: {
					dayOfWeek: [1, 2, 3, 4, 5],
					startTime: '10:00',
					endTime: '18:00',
				},
				rating: 4.8,
				totalReviews: 15,
			},
		];
		setEmployees(defaults);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
	};

	const addEmployee = (employee: Omit<IEmployee, 'id' | 'rating' | 'totalReviews'>) => {
		const newEmployee: IEmployee = {
			...employee,
			id: Date.now().toString(),
			rating: 0,
			totalReviews: 0,
		};
		const updated = [...employees, newEmployee];
		setEmployees(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Thêm nhân viên thành công');
		return newEmployee;
	};

	const updateEmployee = (id: string, employee: Partial<IEmployee>) => {
		const updated = employees.map((e) => (e.id === id ? { ...e, ...employee } : e));
		setEmployees(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Cập nhật nhân viên thành công');
	};

	const deleteEmployee = (id: string) => {
		const updated = employees.filter((e) => e.id !== id);
		setEmployees(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Xóa nhân viên thành công');
	};

	const getEmployeeById = (id: string) => {
		return employees.find((e) => e.id === id);
	};

	const updateEmployeeRating = (id: string, newRating: number, totalReviews: number) => {
		updateEmployee(id, { rating: newRating, totalReviews });
	};

	return {
		employees,
		addEmployee,
		updateEmployee,
		deleteEmployee,
		getEmployeeById,
		updateEmployeeRating,
	};
};
