import { useState, useEffect } from 'react';
import { message } from 'antd';
import { IReview } from '@/services/QuanLyLich/types';

const STORAGE_KEY = 'appointment_reviews';

export default () => {
	const [reviews, setReviews] = useState<IReview[]>([]);

	
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			setReviews(JSON.parse(saved));
		}
	}, []);

	const addReview = (review: Omit<IReview, 'id' | 'createdAt'>) => {
		const newReview: IReview = {
			...review,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
		};
		const updated = [...reviews, newReview];
		setReviews(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Đánh giá thành công');
		return newReview;
	};

	const replyReview = (reviewId: string, reply: string) => {
		const updated = reviews.map((r) => (r.id === reviewId ? { ...r, reply } : r));
		setReviews(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Phản hồi thành công');
	};

	const getEmployeeReviews = (employeeId: string) => {
		return reviews.filter((r) => r.employeeId === employeeId);
	};

	const getEmployeeAverageRating = (employeeId: string) => {
		const employeeReviews = getEmployeeReviews(employeeId);
		if (employeeReviews.length === 0) return 0;
		const sum = employeeReviews.reduce((acc, r) => acc + r.rating, 0);
		return Math.round((sum / employeeReviews.length) * 10) / 10;
	};

	const getReviewByAppointment = (appointmentId: string) => {
		return reviews.find((r) => r.appointmentId === appointmentId);
	};

	const deleteReview = (id: string) => {
		const updated = reviews.filter((r) => r.id !== id);
		setReviews(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		message.success('Xóa đánh giá thành công');
	};

	return {
		reviews,
		addReview,
		replyReview,
		deleteReview,
		getEmployeeReviews,
		getEmployeeAverageRating,
		getReviewByAppointment,
	};
};
