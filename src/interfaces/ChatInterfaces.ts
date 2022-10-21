export interface Message {
  relatedChatId: string;
  message: string;
  date: string;
  role: Role;
  status: MessageStatus;
}

export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  VENDOR = "VENDOR"
}

export enum MessageStatus {
  SENT = "SENT",
  RECEIVED = "RECEIVED",
  READ = "READ"
}