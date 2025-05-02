// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaLinkedinIn,
//   FaInstagram,
//   FaTwitter,
// } from "react-icons/fa";
// import { FiChevronRight } from "react-icons/fi";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

// export default function ContactPage() {
//   return (
//    <>
//    <Header />
//     <div className="bg-white w-[100%] text-gray-800">
//    {/* Main Content */}
//    <main className="  py-12 ">
//      {/* Intro Text */}
//      <section className="text-center  mx-auto ">
//        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
//          Get in Touch with Us Today!
//        </h1>
//        <p className="text-gray-600 max-w-2xl mx-auto">
//          At A1, we welcome your inquiries, feedback, and collaboration. Reach
//          out via any channel below and our team will assist you promptly.
//        </p>
//      </section>

//      {/* Contact via Email */}
//      <section>
//        <h2 className="text-2xl font-semibold text-center mb-6">
//          Contact Us Via Email
//        </h2>
//        <ul className="max-w-xl mx-auto space-y-4">
//          <li className="flex items-center justify-between">
//            <div className="flex items-center space-x-3">
//              <FaEnvelope className="text-blue-600 w-6 h-6" />
//              <span>General Inquiries</span>
//            </div>
//            <a
//              href="mailto:info@a1.com"
//              className="text-blue-600 hover:underline"
//            >
//              {/* victorkelechi044@gmail.com */}
//              support@aischool.com
//            </a>
//          </li>
//          <li className="flex items-center justify-between">
//            <div className="flex items-center space-x-3">
//              <FaEnvelope className="text-blue-600 w-6 h-6" />
//              <span>Business Collaborations</span>
//            </div>
//            <a
//              href="mailto:partners@a1.com"
//              className="text-blue-600 hover:underline"
//            >
//             victorkelechi044@gmail.com
//            </a>
//          </li>
//          {/* <li className="flex items-center justify-between">
//            <div className="flex items-center space-x-3">
//              <FaEnvelope className="text-blue-600 w-6 h-6" />
//              <span>Job Opportunities</span>
//            </div>
//            <a
//              href="mailto:careers@a1.com"
//              className="text-blue-600 hover:underline"
//            >
//              careers@a1.com
//            </a>
//          </li> */}
//        </ul>
//      </section>

//      {/* Contact via Phone */}
//      <section>
//        <h2 className="text-2xl font-semibold text-center mb-6">
//          Contact Us By Phone
//        </h2>
//        <ul className="max-w-xl mx-auto space-y-4">
//          <li className="flex items-center justify-between">
//            <div className="flex items-center space-x-3">
//              <FaPhoneAlt className="text-blue-600 w-6 h-6" />
//              <span>General Inquiries</span>
//            </div>
//            <a
//              href="tel:+2349022803039"
//              className="text-blue-600 hover:underline"
//            >
//              +234 902 280 3039
//            </a>
//          </li>
//          {/* <li className="flex items-center justify-between">
//            <div className="flex items-center space-x-3">
//              <FaPhoneAlt className="text-blue-600 w-6 h-6" />
//              <span>Business Collaborations</span>
//            </div>
//            <a
//              href="tel:+14445556666"
//              className="text-blue-600 hover:underline"
//            >
//              +1 (444) 555-6666
//            </a>
//          </li>
//          <li className="flex items-center justify-between">
//            <div className="flex items-center space-x-3">
//              <FaPhoneAlt className="text-blue-600 w-6 h-6" />
//              <span>Free Consultation</span>
//            </div>
//            <a
//              href="tel:+17778889999"
//              className="text-blue-600 hover:underline"
//            >
//              +1 (777) 888-9999
//            </a>
//          </li> */}
//        </ul>
//      </section>

//      {/* Office Locations */}
//      <section>
//        <h2 className="text-2xl font-semibold text-center mb-6">
//          Office Locations
//        </h2>
//        <ul className="max-w-xl mx-auto space-y-6">
//          <li className="flex items-start space-x-4">
//            <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mt-1" />
//            <div>
//              <strong>Abuja</strong>
//              <p>Alex Ekwueme way jabi Abuja, FCT</p>
//            </div>
//          </li>
//          {/* <li className="flex items-start space-x-4">
//            <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mt-1" />
//            <div>
//              <strong>San Francisco</strong>
//              <p>456 A1 Street, Floor 5, San Francisco, CA 94105</p>
//            </div>
//          </li> */}
//        </ul>
//      </section>

//      {/* Response & Privacy */}
//      <section className="grid mx-auto w-[60%] md:grid-cols-2 gap-6">
//        <div className="bg-gray-50 p-6 rounded-lg">
//          <h3 className="font-semibold mb-2">Our Response</h3>
//          <p className="text-gray-600">
//            We commit to timely responses and will guide you through every
//            step, from project inquiries to partnership discussions.
//          </p>
//        </div>
//        <div className="bg-gray-50 p-6 rounded-lg">
//          <h3 className="font-semibold mb-2">Privacy Assurance</h3>
//          <p className="text-gray-600">
//            Your privacy matters. We adhere to strict policies and never share
//            your data without consent.
//          </p>
//        </div>
//      </section>

//      {/* Social & Thank You */}
//      <section className="text-center space-y-4">
//        <p>Join us on social media</p>
//        <div className="flex justify-center space-x-6 text-blue-600">
//          {/* <a href="#">
//            <FaLinkedinIn className="w-6 h-6 hover:text-blue-800" />
//          </a> */}
//          <a href="https://www.instagram.com/officiala1school ">
//            <FaInstagram className="w-6 h-6 hover:text-blue-800" />
//          </a>
//          {/* <a href="#">
//            <FaTwitter className="w-6 h-6 hover:text-blue-800" />
//          </a> */}
//        </div>
//        <p className="text-gray-500">
//          Thank you for considering A1 for your digital needs.
//        </p>
//      </section>

//      {/* CTA Banner */}
//      <section className="bg-[blue] text-white py-12 mt-[30px] w-[100%] text-center">
//        <h2 className="text-3xl font-bold mb-4">
//          Ready to Boost Your Digital Presence?
//        </h2>
//        <p className="mb-6 max-w-xl mx-auto">
//          Unlock your potential with tailored solutions that drive real
//          results.
//        </p>
//        <div className="flex justify-center space-x-4">
//          <a
//            href="/register"
//            className="px-6 py-3 bg-white text-[blue] font-semibold rounded-lg hover:bg-gray-100"
//          >
//            Get Started
//          </a>
//          {/* <a
//            href="/register"
//            className="px-6 py-3 border border-white rounded-lg hover:bg-white/20"
//          >
//            Free Consultation
//          </a> */}
         
//          <a className="px-6 py-3 border border-white rounded-lg hover:bg-white/20" href="mailto:Victorkelechi044@gmail.com"> Free Consultation</a>

//        </div>
//      </section>

//      {/* Logo Showcase */}
//      {/* <section className="flex justify-center mt-12">
//        <Image src="/logo-large.svg" alt="A1 logo" width={300} height={80} />
//      </section> */}
//    </main>
//  </div>
//  <Footer />
//  </>
//   );
// }

// 'use client'

// import React, { useState, useEffect } from "react";
// import emailjs from "@emailjs/browser";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });
  
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<{
//     success: boolean;
//     message: string;
//   } | null>(null);

//   // Validate form on data change
//   useEffect(() => {
//     const { name, email, subject, message } = formData;
//     const isValid = 
//       name.trim() !== "" && 
//       email.trim() !== "" && 
//       subject.trim() !== "" && 
//       message.trim() !== "" &&
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
    
//     setIsFormValid(isValid);
//   }, [formData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!isFormValid) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Replace these with your actual EmailJS service credentials
//       const result = await emailjs.send(
//         "service_rnsndgi", // e.g., "service_xyz123"
//         "template_4lccsji", // e.g., "template_abc456"
//         {
//           from_name: formData.name,
//           reply_to: formData.email,
//           subject: formData.subject,
//           message: formData.message
//         },
//         "wJ3Np2BV-0EBf6IGc" // e.g., "user_def789"
//       );
      
//       setSubmitStatus({
//         success: true,
//         message: "Your message has been sent successfully!"
//       });
      
//       // Reset form after successful submission
//       setFormData({
//         name: "",
//         email: "",
//         subject: "",
//         message: ""
//       });
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       setSubmitStatus({
//         success: false,
//         message: "Failed to send message. Please try again later."
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//     <Header/>
//     <div className="bg-white ">
//       {/* Header Section */}
//       <div className="relative bg-blue text-white py-20">
//         <div className="container mx-auto px-4 relative z-10">
//           <h1 className="text-4xl font-bold text-center">Contact Us</h1>
//         </div>
//         <div className="absolute inset-0 bg-black opacity-30"></div>
//       </div>
      
//       {/* Main Form Section */}
//       <div className="container mx-auto py-16 px-4 md:px-6 flex flex-col md:flex-row">
//         {/* Left Side - Ask Us */}
//         <div className="w-full md:w-1/3 bg-blue text-white p-8 rounded-l-lg mb-6 md:mb-0">
//           <h2 className="text-3xl font-bold mb-4">Ask Us</h2>
//           <p className="mb-6">We are always on the desk to attend to your inquiries.</p>
//           <p>Feel free to send us a message</p>
//         </div>
        
//         {/* Right Side - Form */}
//         <div className="w-full md:w-2/3 bg-gray-50 p-8 rounded-r-lg shadow-md">
//           <h2 className="text-3xl font-bold text-blue-900 mb-8">Send us a message</h2>
          
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div className="mb-8">
//               <textarea
//                 name="message"
//                 placeholder="Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={6}
//                 className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                 required
//               ></textarea>
//             </div>
            
//             <button
//               type="submit"
//               disabled={!isFormValid || isSubmitting}
//               className={`w-full py-3 px-4 text-white font-medium rounded-md transition duration-200 
//                 ${isFormValid && !isSubmitting 
//                   ? "bg-blue hover:bg-blue" 
//                   : "bg-gray cursor-not-allowed"}`}
//             >
//               {isSubmitting ? "SENDING..." : "SEND A MESSAGE"}
//             </button>
            
//             {submitStatus && (
//               <div className={`mt-4 p-3 rounded-md ${submitStatus.success ? "bg-green text-green" : "bg-red text-red"}`}>
//                 {submitStatus.message}
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
      
//       {/* Footer Section */}
//       <footer className="bg-gray-50 py-16 border-t border-gray-200">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div>
//               <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full border border-blue-700 text-blue-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-blue-900 mb-2">Visit Us</h3>
//               <p className="text-gray-600">25 Olowu Street, Ikeja,</p>
//               <p className="text-gray-600">Lagos state, Nigeria</p>
//             </div>
            
//             <div>
//               <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full border border-blue-700 text-blue-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-blue-900 mb-2">Contact Us</h3>
//               <p className="text-gray-600">Support@example.org</p>
//             </div>
            
//             <div>
//               <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full border border-blue-700 text-blue-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-blue-900 mb-2">Find Us Online</h3>
//               <div className="flex space-x-4 justify-center">
//                 <a href="#" className="text-blue-700 hover:text-blue-900">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-blue-700 hover:text-blue-900">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-blue-700 hover:text-blue-900">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>

//     <Footer />
//     </>
//   );
// };

// export default ContactForm;




'use client'

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Validate form on data change
  useEffect(() => {
    const { name, email, subject, message } = formData;
    const isValid = 
      name.trim() !== "" && 
      email.trim() !== "" && 
      subject.trim() !== "" && 
      message.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
    
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!isFormValid) return;
    
  //   setIsSubmitting(true);
    
  //   try {
  //     // The email address where you want to receive messages
  //     const ownerEmail = "Victorkelechi044@gmail.com"; // Change this to your email
      
  //     // Encode subject and body for mailto
  //     const subject = encodeURIComponent(formData.subject);
  //     const body = encodeURIComponent(
  //       `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  //     );
      
  //     // Construct mailto link
  //     const mailtoLink = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
      
  //     // Open the user's default mail client
  //     window.location.href = mailtoLink;
      
  //     setSubmitStatus({
  //       success: true,
  //       message: "Email client opened. Please send the email to complete your message."
  //     });
      
  //     // Reset form after successful submission
  //     setFormData({
  //       name: "",
  //       email: "",
  //       subject: "",
  //       message: ""
  //     });
  //   } catch (error) {
  //     console.error("Failed to open email client:", error);
  //     setSubmitStatus({
  //       success: false,
  //       message: "Failed to open email client. Please try again later."
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isFormValid) return;
  
    setIsSubmitting(true);
  
    try {
      const ownerEmail = "Victorkelechi044@gmail.com"; // Change if needed
  
      // Encode subject and body for URL
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
  
      // Gmail compose link
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${ownerEmail}&su=${subject}&body=${body}`;
  
      // Open Gmail in a new tab (recommended)
      window.open(gmailLink, "_blank");
  
      setSubmitStatus({
        success: true,
        message: "Gmail opened. Please send the email to complete your message."
      });
  
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Failed to open Gmail:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to open Gmail. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
    <Header/>
    <div className="bg-white ">
      {/* Header Section */}
      <div className="relative bg-blue text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Main Form Section */}
      <div className="container mx-auto py-16 px-4 md:px-6 flex flex-col md:flex-row">
        {/* Left Side - Ask Us */}
        <div className="w-full md:w-1/3 bg-blue text-white p-8 rounded-l-lg mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Ask Us</h2>
          <p className="mb-6">We are always on the desk to attend to your inquiries.</p>
          <p>Feel free to send us a message</p>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-2/3 bg-gray-50 p-8 rounded-r-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Send us a message</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-8">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-4 text-white font-medium rounded-md transition duration-200 
                ${isFormValid && !isSubmitting 
                  ? "bg-blue hover:bg-blue" 
                  : "bg-gray cursor-not-allowed"}`}
            >
                {isSubmitting ? "OPENING EMAIL CLIENT..." : "SEND A MESSAGE"}
            </button>
            
            {submitStatus && (
              <div className={`mt-4 p-3 rounded-md ${submitStatus.success ? "bg-green text-green" : "bg-red text-red"}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full border border-blue-700 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Visit Us</h3>
              {/* <p className="text-gray-600">25 Olowu Street, Ikeja,</p> */}
              <div className="text-gray-600"><strong>Abuja</strong>
                           <p>Alex Ekwueme way jabi Abuja, FCT</p></div>
            </div>
            
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full border border-blue-700 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Contact Us</h3>
              <p className="text-gray-600"><a href="mailto:Victorkelechi044@gmail.com"> Victorkelechi044@gmail.com</a></p>
            </div>
            
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full border border-blue-700 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Find Us Online</h3>
              <div className="flex space-x-4 justify-center">
                {/* <a href="#" className="text-blue-700 hover:text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a> */}
                <a href="https://www.instagram.com/officiala1school" className="text-blue-700 hover:text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* <a href="#" className="text-blue-700 hover:text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

    <Footer />
    </>
  );
};

export default ContactForm;
