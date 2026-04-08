// src/types/student.ts

export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  profileImageUrl?: string;
  createdAt: string; // ISO Date String from Java LocalDateTime
  updatedAt: string;
}

/** 
 * Matches your StudentRequestDTO in Java
 */
export interface StudentRequest {
  name: string;
  email: string;
  course: string;
}

/**
 * Matches Spring Boot Page object
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  last: boolean;
  first: boolean;
}

/**
 * Standard API Message Response
 */
export interface MessageResponse {
  message: string;
}