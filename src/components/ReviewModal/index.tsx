import React, { useState } from 'react';
import { Modal } from 'antd';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (id: string | null, content: string) => void;
  reviewId: string | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ visible, onClose, onSubmit, reviewId }) => {
  const [content, setContent] = useState<string>('');

  const handleOk = () => {
    onSubmit(reviewId, content);
    setContent('');
    onClose();
  };

  return (
    <Modal title="Phản hồi đánh giá" open={visible} onCancel={onClose} onOk={handleOk}>
      <p>Nhập phản hồi của bạn cho khách hàng:</p>
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        style={{ width: '100%', minHeight: '100px' }} 
      />
    </Modal>
  );
};

export default ReviewModal;