import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  getStudent,
  updateStudent,
  deleteStudent,
  uploadProfileImage,
  deleteProfileImage,
} from '../services/studentService';

const StudentProfile = () => {
  const studentId = 1; // Example student ID, change as needed
  const [student, setStudent] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch student on load
  useEffect(() => {
    getStudent(studentId).then(setStudent);
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Update student
  const handleUpdate = () => {
    updateStudent(studentId, student).then(() => alert('Profile updated!'));
  };

  // Delete student
  const handleDelete = () => {
    deleteStudent(studentId).then(() => {
      alert('Profile deleted!');
      setStudent({});
    });
  };

  // File selection for profile image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload profile image
  const handleUploadImage = () => {
    if (!selectedFile) return alert('Select a file first!');
    uploadProfileImage(studentId, selectedFile).then(url => {
      setStudent({ ...student, profileImageUrl: url });
      alert('Profile image updated!');
      setSelectedFile(null);
    });
  };

  // Delete profile image
  const handleDeleteImage = () => {
    deleteProfileImage(studentId).then(res => {
      setStudent({ ...student, profileImageUrl: '' });
      alert(res.message);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>Student Profile</h1>

      {/* Profile Image */}
      {student.profileImageUrl ? (
        <div style={{ marginBottom: '10px' }}>
          <img
            src={student.profileImageUrl}
            alt="Profile"
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
          />
          <br />
          <button onClick={handleDeleteImage} style={{ marginTop: '5px' }}>
            Delete Image
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '10px' }}>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadImage} style={{ marginLeft: '10px' }}>
            Upload Image
          </button>
        </div>
      )}

      {/* Student Inputs */}
      <input
        type="text"
        name="name"
        value={student.name || ''}
        placeholder="Name"
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="number"
        name="age"
        value={student.age || ''}
        placeholder="Age"
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      {/* Actions */}
      <button onClick={handleUpdate} style={{ marginRight: '10px' }}>
        Update
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default StudentProfile;