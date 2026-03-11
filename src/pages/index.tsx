import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@umijs/max';
import { Table, Button, Rate, Tag } from 'antd';
import ReviewModal from '@/components/ReviewModal';

const ReviewPage: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.review);
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  useEffect(() => {
    dispatch({ type: 'review/getList', payload: {} });
  }, [dispatch]);

  const handleOpenReply = (id: string) => {
    setSelectedReview(id);
    setModalVisible(true);
  };

  const handleSubmitReply = (id: string | null, content: string) => {
    dispatch({
      type: 'review/submitReply',
      payload: { id, content },
    });
  };

  const columns = [
    { title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Dịch vụ', dataIndex: 'serviceName', key: 'serviceName' },
    { 
      title: 'Đánh giá', 
      dataIndex: 'rating', 
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />
    },
    { title: 'Nội dung', dataIndex: 'comment', key: 'comment' },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record.hasReplied ? 'green' : 'red'}>
          {record.hasReplied ? 'Đã phản hồi' : 'Chưa phản hồi'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Button 
           type="primary" 
           disabled={record.hasReplied} 
           onClick={() => handleOpenReply(record.id)}
        >
          Phản hồi
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý đánh giá Dịch vụ & Nhân viên</h2>
      <Table 
        dataSource={list} 
        columns={columns} 
        rowKey="id" 
        loading={loading} 
      />
      <ReviewModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitReply}
        reviewId={selectedReview}
      />
    </div>
  );
};

export default ReviewPage;