import { useEffect, useState } from 'react';
import { getAllStudents, getStudent, deleteStudent } from '../services/studentService';
import SearchHeader from '../components/SearchHeader';
import RegistrationForm from '../components/RegistrationForm';
import StudentTable from '../components/StudentTable';
import EditStudentModal from '../components/Modals/EditStudentModal';
import ImageModal from '../components/Modals/ImageModal';

const StudentProfile = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchId, setSearchId] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Modal States
    const [editTarget, setEditTarget] = useState<any>(null);
    const [imageTarget, setImageTarget] = useState<any>(null);

    const loadStudents = async () => {
        setIsSearching(false);
        const data = await getAllStudents(page, 5);
        setStudents(data.content || []);
        setTotalPages(data.totalPages || 0);
    };

    useEffect(() => {
        if (!searchId) loadStudents();
    }, [page, searchId]);

    const handleSearch = async (id: string) => {
        if (!id) return loadStudents();
        try {
            const data = await getStudent(Number(id));
            setStudents(data ? [data] : []);
            setIsSearching(true);
        } catch {
            alert("Student not found");
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure?")) {
            await deleteStudent(id);
            loadStudents();
        }
    };

    return (
        <div className="page-container">
            <div className="max-width-wrapper">
                <SearchHeader 
                    value={searchId} 
                    onChange={setSearchId} 
                    onSearch={handleSearch} 
                />

                <div className="main-grid">
                    <RegistrationForm onRefresh={loadStudents} />
                    
                    <StudentTable 
                        students={students} 
                        isSearching={isSearching}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onEdit={setEditTarget}
                        onDelete={handleDelete}
                        onImageClick={setImageTarget}
                    />
                </div>
            </div>

            {editTarget && (
                <EditStudentModal 
                    student={editTarget} 
                    onClose={() => setEditTarget(null)} 
                    onSuccess={loadStudents} 
                />
            )}

            {imageTarget && (
                <ImageModal 
                    student={imageTarget} 
                    onClose={() => setImageTarget(null)} 
                    onSuccess={loadStudents} 
                />
            )}
        </div>
    );
};

export default StudentProfile;