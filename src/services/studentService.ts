import axiosInstance from './api';

// Get single student by ID
export const getStudent = async (id: number) => {
  const res = await axiosInstance.get(`/v1/students/${id}`);
  return res.data;
};

// Update student by ID
export const updateStudent = async (id: number, data: any) => {
  const res = await axiosInstance.put(`/v1/students/${id}`, data);
  return res.data;
};

// Delete student by ID
export const deleteStudent = async (id: number) => {
  const res = await axiosInstance.delete(`/v1/students/${id}`);
  return res.data;
};

// Add new student
// studentService.ts

export const addStudent = async (studentData: any, imageFile?: File | null) => {
  const formData = new FormData();

  // 1. Create a JSON Blob for the DTO part
  // This tells the backend "this part of the form is JSON"
  const studentBlob = new Blob([JSON.stringify(studentData)], {
    type: 'application/json',
  });

  // 2. Append using the EXACT keys from your Java @RequestPart annotations
  formData.append('student', studentBlob); // Matches @RequestPart("student")

  if (imageFile) {
    formData.append('image', imageFile); // Matches @RequestPart("image")
  }

  // 3. Send the request
  const res = await axiosInstance.post(`/v1/students`, formData, {
    headers: {
      // NOTE: It is often better to omit this header so the browser 
      // can automatically calculate the "boundary" string.
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

// Get all students (paginated)
export const getAllStudents = async (page = 0, size = 5) => {
  const res = await axiosInstance.get(`/v1/students?page=${page}&size=${size}`);
  return res.data;
};

// Upload/Update profile image
export const uploadProfileImage = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axiosInstance.patch(`/v1/students/${id}/profile-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data; // returns image URL
};

// Delete profile image
export const deleteProfileImage = async (id: number) => {
  const res = await axiosInstance.delete(`/v1/students/${id}/profile-image`);
  return res.data; // returns { message: "Profile image deleted successfully" }
};