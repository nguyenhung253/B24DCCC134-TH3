import { IReview } from '@/models/QuanLyLich/review';

// Service để xử lý logic liên quan đến đánh giá
export const reviewService = {
	// Lấy đánh giá của nhân viên
	getByEmployee: (reviews: IReview[], employeeId: string): IReview[] => {
		return reviews.filter((r) => r.employeeId === employeeId);
	},

	// Tính rating trung bình của nhân viên
	getAverageRating: (reviews: IReview[], employeeId: string): number => {
		const employeeReviews = reviews.filter((r) => r.employeeId === employeeId);
		if (employeeReviews.length === 0) return 0;
		const sum = employeeReviews.reduce((acc, r) => acc + r.rating, 0);
		return Math.round((sum / employeeReviews.length) * 10) / 10;
	},

	// Lấy đánh giá theo lịch hẹn
	getByAppointment: (reviews: IReview[], appointmentId: string): IReview | undefined => {
		return reviews.find((r) => r.appointmentId === appointmentId);
	},

	// Kiểm tra lịch hẹn đã được đánh giá chưa
	isReviewed: (reviews: IReview[], appointmentId: string): boolean => {
		return reviews.some((r) => r.appointmentId === appointmentId);
	},
};
