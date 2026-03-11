import { useState } from 'react';
import { Button, Table, Input, Space, Tag } from 'antd';
import { useModel } from 'umi';

export default function AdminPage() {

  const {
    employees,
    appointments,
    addEmployee,
    deleteEmployee,
    addTime,
    deleteTime,
    confirmAppointment,
    finishAppointment
  } = useModel('appointment');

  const [employeeName, setEmployeeName] = useState('');
  const [time, setTime] = useState('');

  //////////////////////////////
  // bảng nhân viên

  const employeeColumns = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'name'
    },
    {
      title: 'Giờ làm',
      render: (_: any, record: any) => (
        <>
          {record.times.map((t: string) => (
            <Tag
              key={t}
              closable
              onClose={() => deleteTime(record.id, t)}
            >
              {t}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Thêm giờ',
      render: (_: any, record: any) => (
        <Space>
          <Input
            placeholder="HH:mm"
            style={{ width: 100 }}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button
            onClick={() => addTime(record.id, time)}
          >
            Thêm
          </Button>
        </Space>
      )
    },
    {
      title: 'Hành động',
      render: (_: any, record: any) => (
        <Button
          danger
          onClick={() => deleteEmployee(record.id)}
        >
          Xóa
        </Button>
      )
    }
  ];

  //////////////////////////////
  // bảng lịch hẹn

  const appointmentColumns = [
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
        <Space>
          {record.status === 'Chờ duyệt' && (
            <Button
              type="primary"
              onClick={() => confirmAppointment(record.id)}
            >
              Xác nhận
            </Button>
          )}

          {record.status === 'Xác nhận' && (
            <Button
              onClick={() => finishAppointment(record.id)}
            >
              Hoàn thành
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div>

      <h2>Quản lý nhân viên</h2>

      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tên nhân viên"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            addEmployee(employeeName);
            setEmployeeName('');
          }}
        >
          Thêm nhân viên
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={employeeColumns}
        dataSource={employees}
        pagination={false}
      />

      <h2 style={{ marginTop: 40 }}>Quản lý lịch hẹn</h2>

      <Table
        rowKey="id"
        columns={appointmentColumns}
        dataSource={appointments}
      />

    </div>
  );
}