
import { request } from '@umijs/max';

export async function fetchReviews(params: any) {
  return request('/api/reviews', {
    method: 'GET',
    params,
  });
}

export async function replyReview(id: string, replyContent: string) {
  return request(`/api/reviews/${id}/reply`, {
    method: 'POST',
    data: { replyContent },
  });
}