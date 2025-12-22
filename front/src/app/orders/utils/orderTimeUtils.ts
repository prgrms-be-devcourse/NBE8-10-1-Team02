export function canModifyOrder(createDate: string | Date): boolean {
  const orderDate = typeof createDate === 'string' ? new Date(createDate) : createDate;
  const now = new Date();

  const nextDay14 = new Date(orderDate);
  nextDay14.setDate(nextDay14.getDate() + 1);
  nextDay14.setHours(14, 0, 0, 0);

  return now < nextDay14;
}

export function getOrderModifyInfo(createDate: string | Date): {
  canModify: boolean;
  expiresAt: Date;
  expiresAtFormatted: string;
} {
  const orderDate = typeof createDate === 'string' ? new Date(createDate) : createDate;
  const now = new Date();

  const expiresAt = new Date(orderDate);
  expiresAt.setDate(expiresAt.getDate() + 1);
  expiresAt.setHours(14, 0, 0, 0);

  const canModify = now < expiresAt;

  const expiresAtFormatted = expiresAt.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return {
    canModify,
    expiresAt,
    expiresAtFormatted,
  };
}
