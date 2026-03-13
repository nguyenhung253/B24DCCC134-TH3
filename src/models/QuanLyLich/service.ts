import { useState, useEffect } from 'react';
import { message } from 'antd';
import { IService } from '@/services/QuanLyLich/types';

const STORAGE_KEY = 'appointment_services';

export default () => {
	const [services, setServices] = useState<IService[]>([]);

	
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			setServices(JSON.parse(saved));
		} else {
			initDefaultServices();
		}
	}, []);

	const initDefaultServices = () => {
		const defaults: IService[] = [
			{ id: '1', name: 'Cắt tóc', price: 50000, duration: 30, description: 'Cắt tóc cơ bản' },
			{ id: '2', name: 'Gội đầu', price: 30000, duration: 20, description: 'Gội đầu thư giãn' },
			{ id: '3', name: 'Nhuộm tóc', price: 150000, duration: 60, description: 'Nhuộm tóc chuyên nghiệp' },
			{ id: '4', name: 'Massage', price: 100000, duration: 45, description: 'Massage thư giãn' },
		];
		setServices(defaults);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
	};

	const addService = (service: Omit<IService, 'id'>) => {
		const newService: IService = {
			...service,
			id: Date.now().toString(),
		};
		const updated = [...services, newService];
		setServices(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Thêm dịch vụ thành công');
		return newService;
	};

	const updateService = (id: string, service: Omit<IService, 'id'>) => {
		const updated = services.map((s) => (s.id === id ? { ...s, ...service } : s));
		setServices(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Cập nhật dịch vụ thành công');
	};

	const deleteService = (id: string) => {
		const updated = services.filter((s) => s.id !== id);
		setServices(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Xóa dịch vụ thành công');
	};

	const getServiceById = (id: string) => {
		return services.find((s) => s.id === id);
	};

	return {
		services,
		addService,
		updateService,
		deleteService,
		getServiceById,
	};
};
