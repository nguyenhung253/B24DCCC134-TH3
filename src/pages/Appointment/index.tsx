import { Card, Button, Table, Tag } from 'antd';
import { useModel } from 'umi';
import FormAppointment from './components/FormAppointment';

export default function AppointmentPage() {

  const {
    employees,
    appointments,
    setVisible,
    setSelected,
    cancelAppointment
  } = useModel('appointment');

  //////////////////////////////
  // bảng lịch hẹn

  const columns = [
    {
      title: 'Khách',
      dataIndex: 'customer'
    },
    {
      title: 'Nhân viên',
      dataIndex: 'employee'
    },
    {
      title: 'Giờ',
      dataIndex: 'time'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => {

        let color = 'orange';

        if (status === 'Xác nhận') color = 'blue';
        if (status === 'Hoàn thành') color = 'green';
        if (status === 'Đã hủy') color = 'red';

        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Hành động',
      render: (_: any, record: any) => (
        <>
          {record.status !== 'Hoàn thành' &&
           record.status !== 'Đã hủy' && (
            <Button
              danger
              onClick={() => cancelAppointment(record.id)}
            >
              Hủy
            </Button>
          )}
        </>
      )
    }
  ];

  return (
    <div>

      <h2>Đặt lịch</h2>

      {employees.map((emp: any) => (
        <Card
          key={emp.id}
          title={emp.name}
          style={{ marginBottom: 20 }}
        >

          {emp.times.length > 0 ? (
            emp.times.map((time: string) => (
              <Button
                key={time}
                style={{ marginRight: 10, marginBottom: 10 }}
                onClick={() => {
                  setSelected({
                    employee: emp.name,
                    time
                  });
                  setVisible(true);
                }}
              >
                {time}
              </Button>
            ))
          ) : (
            <p>Chưa có giờ làm</p>
          )}

        </Card>
      ))}

      <FormAppointment />

      <h2 style={{ marginTop: 40 }}>Danh sách lịch hẹn</h2>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={appointments}
      />

    </div>
  );
}