export interface Message {
  id: number; // уникальный идентификатор сообщения
  severity?: 'success' | 'info' | 'warn' | 'error'; // тип уведомления
  summary: string; // заголовок сообщения
  detail?: string; // дополнительная подробная информация
  shown?: boolean; // флаг, показывающий, было ли сообщение показано
}
