import { useEffect, useState, type ChangeEvent } from 'react';
import {
    UserPlus, Pencil, Trash2, Camera,
    ChevronLeft, ChevronRight, X, BookOpen, User,
    Search, Calendar, Trash, RefreshCcw
} from 'lucide-react';
import {
    getStudent,
    updateStudent,
    deleteStudent,
    uploadProfileImage,
    deleteProfileImage,
    getAllStudents,
    addStudent // Import our updated service
} from '../services/studentService';

const StudentProfile = () => {
    // States
    const [student, setStudent] = useState<any>({ name: '', email: '', course: '' });
    const [students, setStudents] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [searchId, setSearchId] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEditStudent, setCurrentEditStudent] = useState<any>({});
    const [showImageModal, setShowImageModal] = useState(false);

    // Initial Load & Pagination
    const fetchStudents = () => {
        setIsSearching(false);
        getAllStudents(page, size).then((data) => {
            setStudents(data.content || []);
            setTotalPages(data.totalPages || 0);
        });
    };

    useEffect(() => { if (searchId === '') fetchStudents(); }, [searchId]);
    useEffect(() => { if (!isSearching) fetchStudents(); }, [page]);

    // Search Logic
    const handleSearch = () => {
        if (!searchId) return;
        getStudent(Number(searchId)).then((data) => {
            if (data && data.id) {
                setStudents([data]);
                setIsSearching(true);
                setTotalPages(1);
            } else {
                alert("Student not found!");
                setSearchId('');
            }
        }).catch(() => setSearchId(''));
    };

    // Form Handlers
    const handleNewStudentChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleModalChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentEditStudent({ ...currentEditStudent, [name]: value });
    };

    // Image Selection & Preview
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeSelectedFile = (e: any) => {
        e.stopPropagation();
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    // CREATE STUDENT (With Optional Image)
    // Inside your StudentProfile component

    const handleCreate = async () => {
        // 1. Validation (matches your @NotBlank constraints)
        if (!student.name || !student.email || !student.course) {
            return alert("Please fill in Name, Email, and Course.");
        }

        try {
            // 2. Call the service with TWO arguments
            // student = { name, email, course }
            // selectedFile = the File object from the input
            await addStudent(student, selectedFile);

            alert("Student registered successfully!");

            // 3. Reset State
            setStudent({ name: '', email: '', course: '' });
            setSelectedFile(null);
            setPreviewUrl(null);

            // 4. Reload the Table
            fetchStudents();

        } catch (error: any) {
            console.error("Upload Error:", error);

            // Detailed error message if backend validation fails
            if (error.response?.data?.message) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("Failed to register student. Please check the network tab.");
            }
        }
    };

    // IMAGE UPDATE (For existing users)
    const handleUploadImageModal = () => {
        if (!selectedFile) return alert('Select a file first!');
        uploadProfileImage(currentEditStudent.id, selectedFile).then(() => {
            alert("Image updated!");
            setSelectedFile(null);
            setShowImageModal(false);
            isSearching ? handleSearch() : fetchStudents();
        });
    };

    const handleDeleteImage = () => {
        deleteProfileImage(currentEditStudent.id).then(() => {
            alert("Image removed.");
            setShowImageModal(false);
            isSearching ? handleSearch() : fetchStudents();
        });
    };

    const handleModalSave = () => {
        updateStudent(currentEditStudent.id, currentEditStudent).then(() => {
            alert('Updated!');
            setShowEditModal(false);
            isSearching ? handleSearch() : fetchStudents();
        });
    };

    const handleRowDelete = (id: number) => {
        if (window.confirm("Delete this student?")) {
            deleteStudent(id).then(() => fetchStudents());
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <>
            <style>{`
                .page-container { background-color: #f8fafc; min-height: 100vh; padding: 40px 20px; font-family: 'Inter', sans-serif; color: #1e293b; }
                .max-width-wrapper { max-width: 1200px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 30px; }
                .search-section { background: white; padding: 12px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; gap: 10px; max-width: 550px; margin: 0 auto 40px auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .input-wrapper { flex: 1; position: relative; display: flex; align-items: center; }
                .search-input { width: 100%; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 15px; outline: none; }
                .search-btn { background: #4f46e5; color: white; border: none; padding: 0 20px; border-radius: 10px; font-weight: 600; cursor: pointer; }
                .main-grid { display: grid; grid-template-columns: 320px 1fr; gap: 30px; }
                @media (max-width: 950px) { .main-grid { grid-template-columns: 1fr; } }
                .card { background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; padding: 24px; }
                .card-title { font-size: 17px; font-weight: 700; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; color: #475569; }
                
                .reg-upload-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }
                .reg-photo-circle { width: 100px; height: 100px; border-radius: 50%; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; overflow: hidden; background: #f8fafc; transition: 0.2s; }
                .reg-photo-circle:hover { border-color: #4f46e5; background: #eef2ff; }
                .reg-preview { width: 100%; height: 100%; object-fit: cover; }
                .remove-preview-btn { position: absolute; top: 0; right: 0; background: #ef4444; color: white; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

                .img-box { position: relative; cursor: pointer; border-radius: 50%; overflow: hidden; width: 45px; height: 45px; background: #f1f5f9; }
                .img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s; }
                .img-box:hover .img-overlay { opacity: 1; }
                .img-fill { width: 100%; height: 100%; object-fit: cover; }
                .form-group { margin-bottom: 15px; }
                .label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
                .input { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
                .btn-primary { width: 100%; background: #4f46e5; color: white; padding: 12px; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
                .table-card { padding: 0; overflow-x: auto; }
                table { width: 100%; border-collapse: collapse; min-width: 600px; }
                th { background: #f8fafc; padding: 15px 20px; font-size: 11px; color: #64748b; text-transform: uppercase; }
                td { padding: 12px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
                .action-btns { display: flex; gap: 8px; }
                .icon-btn { border: none; padding: 8px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; }
                .edit-btn { color: #d97706; background: #fffbeb; }
                .delete-btn { color: #dc2626; background: #fef2f2; }
                .pagination { padding: 15px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
                .pag-btn { background: none; border: none; display: flex; align-items: center; cursor: pointer; color: #64748b; font-weight: 600; font-size: 13px; }
                .pag-btn:disabled { opacity: 0.3; cursor: default; }
                .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 400px; padding: 25px; position: relative; }
            `}</style>

            <div className="page-container">
                <div className="max-width-wrapper">
                    <header className="header"><h1>Student Registry System</h1></header>

                    {/* Search Bar */}
                    <div className="search-section">
                        <div className="input-wrapper">
                            <input className="search-input" type="text" placeholder="Search by ID..." value={searchId} onChange={(e) => setSearchId(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
                            {searchId && <X style={{ position: 'absolute', right: 10, cursor: 'pointer', color: '#94a3b8' }} size={16} onClick={() => setSearchId('')} />}
                        </div>
                        <button className="search-btn" onClick={handleSearch}><Search size={18} /></button>
                    </div>

                    <div className="main-grid">
                        {/* REGISTRATION FORM */}
                        <aside>
                            <div className="card">
                                <div className="card-title"><UserPlus size={18} color="#4f46e5" /> New Registration</div>

                                <div className="reg-upload-container">
                                    <label className="label">Profile Photo (Optional)</label>
                                    <div className="reg-photo-circle" onClick={() => document.getElementById('reg-file-input')?.click()}>
                                        {previewUrl ? (
                                            <>
                                                <img src={previewUrl} className="reg-preview" alt="Preview" />
                                                <button className="remove-preview-btn" onClick={removeSelectedFile}><Trash size={12} /></button>
                                            </>
                                        ) : (
                                            <div style={{ textAlign: 'center', color: '#94a3b8' }}><Camera size={24} /><div style={{ fontSize: '10px' }}>Upload</div></div>
                                        )}
                                    </div>
                                    <input id="reg-file-input" type="file" hidden accept="image/*" onChange={handleFileChange} />
                                </div>

                                <div className="form-group"><label className="label">Name</label><input className="input" name="name" value={student.name} onChange={handleNewStudentChange} placeholder="Full Name" /></div>
                                <div className="form-group"><label className="label">Email</label><input className="input" name="email" value={student.email} onChange={handleNewStudentChange} placeholder="email@example.com" /></div>
                                <div className="form-group"><label className="label">Course</label><input className="input" name="course" value={student.course} onChange={handleNewStudentChange} placeholder="Major" /></div>
                                <button className="btn-primary" onClick={handleCreate}>Register Student</button>
                            </div>
                        </aside>

                        {/* TABLE */}
                        <div className="card table-card">
                            <table>
                                <thead><tr><th>Student</th><th>Course</th><th>Joined</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {students.map((s) => (
                                        <tr key={s.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div className="img-box" onClick={() => { setCurrentEditStudent(s); setShowImageModal(true); }}>
                                                        {s.profileImageUrl ? <img src={s.profileImageUrl} className="img-fill" /> : <div className="img-fill" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} color="#cbd5e1" /></div>}
                                                        <div className="img-overlay"><Camera size={14} color="white" /></div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '700' }}>{s.name}</div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: #{s.id} | {s.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} /> {s.course}</div></td>
                                            <td><div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}><Calendar size={14} /> {formatDate(s.createdAt)}</div></td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="icon-btn edit-btn" onClick={() => { setCurrentEditStudent(s); setShowEditModal(true); }}><Pencil size={15} /></button>
                                                    <button className="icon-btn delete-btn" onClick={() => handleRowDelete(s.id)}><Trash2 size={15} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!isSearching && (
                                <div className="pagination">
                                    <button className="pag-btn" onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}><ChevronLeft size={16} /> Prev</button>
                                    <span style={{ fontSize: '12px' }}>Page {page + 1} of {totalPages}</span>
                                    <button className="pag-btn" onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page + 1 >= totalPages}>Next <ChevronRight size={16} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* IMAGE MODAL */}
                {showImageModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close" onClick={() => setShowImageModal(false)}><X size={18} /></button>
                            <h4>Update Picture</h4>
                            <input type="file" onChange={handleFileChange} style={{ margin: '15px 0' }} />
                            <button className="btn-primary" onClick={handleUploadImageModal}>Upload Photo</button>
                            {currentEditStudent.profileImageUrl && <button className="btn-primary" onClick={handleDeleteImage} style={{ background: '#fee2e2', color: '#ef4444', marginTop: '10px' }}>Remove Current</button>}
                        </div>
                    </div>
                )}

                {/* EDIT MODAL */}
                {showEditModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close" onClick={() => setShowEditModal(false)}><X size={18} /></button>
                            <h4>Edit Student Details</h4>
                            <div className="form-group"><label className="label">Name</label><input className="input" name="name" value={currentEditStudent.name || ''} onChange={handleModalChange} /></div>
                            <div className="form-group"><label className="label">Email</label><input className="input" name="email" value={currentEditStudent.email || ''} onChange={handleModalChange} /></div>
                            <div className="form-group"><label className="label">Course</label><input className="input" name="course" value={currentEditStudent.course || ''} onChange={handleModalChange} /></div>
                            <button className="btn-primary" onClick={handleModalSave}>Save Changes</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default StudentProfile;