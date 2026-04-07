
# Student Service Management System - Frontend

This is the **frontend** for the Student Service Management System (SSMS), built using **React** with **TypeScript** and **Vite**. The project allows users to view and manage student profiles, including uploading and updating profile images, integrated with **Supabase** for file storage.

## Features

- View student profiles
- Upload and update student profile images
- Integration with backend API
- Responsive and user-friendly interface

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks
- **File Storage:** Supabase
- **HTTP Requests:** Axios

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShashinduMalshan/Student-Service-Management-System-Frontend.git
   cd Student-Service-Management-System-Frontend
   ```

2.  Install dependencies:

    ```bash
    npm install
    ```
  
3. Set up environment variables:

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   VITE_API_URL=http://localhost:8080/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Folder Structure

```
src/
├─ api/                # Axios instance and API calls
├─ components/         # Reusable UI components
├─ pages/              # Page-level components
├─ hooks/              # Custom React hooks
├─ assets/             # Images and static files
├─ types/              # TypeScript types
└─ App.tsx             # Main app component
```

## Usage

* Navigate to the student profile page
* Upload or update profile images
* Changes will reflect immediately and images are stored in Supabase

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

## License

This project is open-source and available under the MIT License.