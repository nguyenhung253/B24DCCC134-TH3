// Types và Interfaces cho module Quản lý lịch

export interface IService {
  id: string;
  name: string;
  price: number;
  duration: number; // phút
  description?: string;
}

export interface IEmployee {
  id: string;
  name: string;
  phone: string;
  email?: string;
  services: string[]; // service ids
  maxCustomersPerDay: number;
  workSchedule: {
    dayOfWeek: number[]; // 0-6 (0=CN, 1=T2, ...)
    startTime: string; // HH:mm
    endTime: string; // HH:mm
  };
  rating: number;
  totalReviews: number;
}

export interface IAppointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  employeeId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface IReview {
  id: string;
  appointmentId: string;
  employeeId: string;
  customerId: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  reply?: string;
  createdAt: string;
}

export interface IStatistics {
  byDate: Record<string, number>;
  byService: Record<string, number>;
  byEmployee: Record<string, number>;
  totalRevenue: number;
  serviceRevenue: Record<string, number>;
  employeeRevenue: Record<string, number>;
}
