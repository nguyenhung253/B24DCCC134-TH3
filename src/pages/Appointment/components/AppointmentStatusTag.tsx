import { Tag } from 'antd';

export default function AppointmentStatusTag({ status }: any) {

  const map: any = {
    pending: { color: 'orange', text: 'Chờ duyệt' },
    confirmed: { color: 'blue', text: 'Xác nhận' },
    completed: { color: 'green', text: 'Hoàn thành' },
    cancelled: { color: 'red', text: 'Hủy' }
  };

  return (
    <Tag color={map[status]?.color}>
      {map[status]?.text}
    </Tag>
  );
}