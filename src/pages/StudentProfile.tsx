import { useEffect, useState, type ChangeEvent } from 'react';
import {
  getStudent,
  updateStudent,
  deleteStudent,
  uploadProfileImage,
  deleteProfileImage,
  getAllStudents,
} from '../services/studentService';

const StudentProfile = () => {
  const studentId = 1;
  const [student, setStudent] = useState<any>({});
  const [students, setStudents] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchStudents = () => {
    getAllStudents(page, size).then((data) => {
      setStudents(data.content || []);
      setTotalPages(data.totalPages || 0);
    });
  };

  useEffect(() => {
    getStudent(studentId).then(setStudent);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleUpdate = () => {
    updateStudent(studentId, student).then(() => alert('Profile updated!'));
  };

  const handleDelete = () => {
    deleteStudent(studentId).then(() => {
      alert('Profile deleted!');
      setStudent({});
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleUploadImage = () => {
    if (!selectedFile) return alert('Select a file first!');
    uploadProfileImage(studentId, selectedFile).then((url) => {
      setStudent({ ...student, profileImageUrl: url });
      alert('Profile image updated!');
      setSelectedFile(null);
    });
  };

  const handleDeleteImage = () => {
    deleteProfileImage(studentId).then((res) => {
      setStudent({ ...student, profileImageUrl: '' });
      alert(res.message);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
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

      {/* All Students Table */}
      <h2 style={{ marginTop: '30px' }}>All Students</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{s.id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{s.name}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{s.email}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{s.course}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;