// import React, { useState, useEffect } from "react";
// import { StudentNotificationList } from "./StudentNotificationList";


// export interface Student {
//     id: string;
//     fullname: string;
//     verified: boolean;
//     // categories: Category[];
//     image_link: string;
//     email: string;
//     token: string;
//   }
// export default function StudentNotificationsPage() {
//   const [notifications, setNotifications] = useState<
//     { id: string; message: string }[]
//   >([]);

//   const [student, setStudent] = useState<Student>({
//     fullname: "Loading...",
//     email: "",
//     id: "",
//     token: "",
//     verified: false,
//     // categories: [],
//     image_link: "",
//   });

//   const token = student.token;
//   useEffect(() => {
//     const stored = localStorage.getItem("userData");
//     console.log("stored", stored);
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       console.log("parsed", parsed);
//       setStudent({
//         fullname: parsed.fullname || "Student",
//         email: parsed.email || "",
//         id: parsed.id,
//         token: parsed.token,
//         verified: parsed.verified,
//         // categories: parsed.categories,
//         image_link: parsed.image_link,
//       });
//     }
//   }, []);


//   useEffect(() => {
//     fetch("/api/notifications/me")
//       .then((res) => res.json())
//       .then(setNotifications);
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Remove notification?")) {
//       await fetch(`/api/notifications/me/${id}`, { method: "DELETE" });
//       setNotifications((ns) => ns.filter((n) => n.id !== id));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Notifications</h1>
//       <StudentNotificationList
//         notifications={notifications}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { StudentNotificationList } from "./StudentNotificationList";

// export interface Student {
//   id: string;
//   fullname: string;
//   verified: boolean;
//   image_link: string;
//   email: string;
//   token: string;
// }

// export interface Notification {
//   id: string;
//   message: string;
//   sent_at: string;
//   read: boolean;
// }

// export default function StudentNotificationsPage() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
  
//   const [student, setStudent] = useState<Student>({
//     fullname: "Loading...",
//     email: "",
//     id: "",
//     token: "",
//     verified: false,
//     image_link: "",
//   });

//   // Load student data from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("userData");
//     console.log("stored", stored);
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       console.log("parsed", parsed);
//       setStudent({
//         fullname: parsed.fullname || "Student",
//         email: parsed.email || "",
//         id: parsed.id,
//         token: parsed.token,
//         verified: parsed.verified,
//         image_link: parsed.image_link,
//       });
//     }
//   }, []);

//   // Fetch notifications when student data is loaded
//   useEffect(() => {
//     if (!student.id || !student.token) return;
    
//     fetchNotifications();
//   }, [student.id, student.token]);

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(
//         `https://api.a1schools.org/users/${student.id}/notifications`,
//         {
//           headers: {
//             Authorization: `Bearer ${student.token}`,
//           },
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       setNotifications(data.data);
//     } catch (err) {
//       console.error("Failed to fetch notifications:", err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Remove notification?")) {
//       try {
//         const response = await fetch(
//           `https://api.a1schools.org/users/${student.id}/notifications/${id}`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${student.token}`,
//             },
//           }
//         );
        
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
        
//         setNotifications((ns) => ns.filter((n) => n.id !== id));
//       } catch (err) {
//         console.error("Failed to delete notification:", err);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Notifications</h1>
//       <StudentNotificationList
//         notifications={notifications}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from "react";
import { StudentNotificationList } from "@/app/teacher/dashboard/StudentNotificationList";

export interface Teacher {
  id: string;
  fullname: string;
  verified: boolean;
  image_link: string;
  email: string;
  token: string;
}

export interface Notification {
  id: string;
  message: string;
  sent_at: string;
  read: boolean;
}

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [teacher, setTeacher] = useState<Teacher>({
    fullname: "Loading...",
    email: "",
    id: "",
    token: "",
    verified: false,
    image_link: "",
  });

  // Load student data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userData");
    console.log("stored", stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("parsed", parsed);
      setTeacher({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token,
        verified: parsed.verified,
        image_link: parsed.image_link,
      });
    }
  }, []);

  // Create a memoized fetchNotifications function
  const fetchNotifications = useCallback(async () => {
    if (!teacher.id || !teacher.token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.a1schools.org/users/${teacher.id}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${teacher.token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setNotifications(data.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }, [teacher.id, teacher.token]);

  // Fetch notifications when student data is loaded
  useEffect(() => {
    if (!teacher.id || !teacher.token) return;
    fetchNotifications();
  }, [teacher.id, teacher.token, fetchNotifications]);

  // Set up polling to check for new notifications periodically
  useEffect(() => {
    if (!teacher.id || !teacher.token) return;
    
    // Poll for new notifications every 30 seconds
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000); // 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [teacher.id, teacher.token, fetchNotifications]);

  // Function to manually refresh notifications
  const refreshNotifications = () => {
    fetchNotifications();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove notification?")) {
      try {
        const response = await fetch(
          `https://api.a1schools.org/users/${teacher.id}/notifications/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${teacher.token}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        setNotifications((ns) => ns.filter((n) => n.id !== id));
      } catch (err) {
        console.error("Failed to delete notification:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notifications</h1>
        <button 
          onClick={refreshNotifications}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 flex items-center"
        >
          {isLoading ? (
            <>
              <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
              Loading...
            </>
          ) : (
            "Refresh"
          )}
        </button>
      </div>
      <StudentNotificationList
        notifications={notifications}
        onDelete={handleDelete}
      />
    </div>
  );
}