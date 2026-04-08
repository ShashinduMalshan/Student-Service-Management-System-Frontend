import { useState } from 'react';
import { X } from 'lucide-react';
import { updateStudent } from '../../services/studentService';
import type { Student, StudentRequest } from '../../types/student';

interface Props {
    student: Student;
    onClose: () => void;
    onSuccess: () => void;
}

const EditStudentModal = ({ student, onClose, onSuccess }: Props) => {
    const [form, setForm] = useState<StudentRequest>({
        name: student.name,
        email: student.email,
        course: student.course,
    });

    const handleSave = async () => {
        try {
            await updateStudent(student.id, form);
            alert("Student updated successfully");
            onSuccess();
            onClose();
        } catch (error) {
            alert("Update failed");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}><X size={18} /></button>
                <h4 style={{ marginTop: 0, marginBottom: '20px' }}>Edit Student Details</h4>
                
                <div className="form-group">
                    <label className="label">Full Name</label>
                    <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                
                <div className="form-group">
                    <label className="label">Email</label>
                    <input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>

                <div className="form-group">
                    <label className="label">Course</label>
                    <input className="input" value={form.course} onChange={e => setForm({...form, course: e.target.value})} />
                </div>

                <button className="btn-primary" style={{ marginTop: '10px' }} onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditStudentModal;