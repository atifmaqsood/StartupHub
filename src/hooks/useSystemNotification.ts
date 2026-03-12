import { useAppDispatch } from './redux';
import { addNotification, addNotificationAsync } from '../store/notificationSlice';
import { useToast } from '../context/ToastContext';

export const useSystemNotification = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const notify = (message: string, type: 'project' | 'task' | 'crm' | 'team', entityId: string = '') => {
    // Show Toast
    showToast(message, 'info');

    // Create persistent notification
    const notificationData = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      entityId,
      entityType: type,
      userId: 'system',
      userName: 'System',
      timestamp: new Date().toISOString(),
      isRead: false
    };

    dispatch(addNotification(notificationData as any));
    dispatch(addNotificationAsync(notificationData as any));
  };

  return { notify };
};
