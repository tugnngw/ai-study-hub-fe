import React from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type NavigationPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login' | 'register';

interface WelcomePageProps {
  onNavigate: (page: NavigationPage) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-black antialiased flex flex-col items-center">
      
      {/* ==================== 1. NAVBAR / HEADER ==================== */}
      <header className="w-full h-[90px] bg-white border-b border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.1)] flex items-center justify-between px-6 md:px-16">
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-4">
          <div className="w-[70px] h-[70px] bg-[#0d99ff]/42 rounded-[20px] flex items-center justify-center text-[#8A38F5]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <span className="text-[32px] font-semibold text-black tracking-tight">
            AI STUDY HUB
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => onNavigate('login')}   
            className="w-[130px] h-[46px] rounded-[20px] border border-[#8a38f5]/40 bg-white text-[20px] font-semibold text-[#4a15d1]/75 hover:bg-purple-50 transition-colors cursor-pointer"
          >
            Đăng Nhập
          </button>
          <button 
            type="button"
            onClick={() => onNavigate('register')} 
            className="w-[147px] h-[46px] rounded-[20px] border border-[#8a38f5]/40 bg-white text-[20px] font-semibold text-[#5900ff]/82 hover:bg-purple-50 transition-colors cursor-pointer"
          >
            Tạo Tài Khoản
          </button>
        </div>
      </header>

      {/* ==================== 2. HERO SECTION ==================== */}
      <section className="w-full max-w-4xl text-center mt-16 px-4 flex flex-col items-center">
        {/* Badge: Powered by AI Technology */}
        <div className="h-[60px] px-6 bg-[#683fc6]/17 rounded-[30px] flex items-center gap-2 mb-8">
          <span className="text-yellow-500 text-2xl">⚡</span>
          <span className="text-[24px] font-semibold text-[#4D62EA]">
            Powered by AI Technology
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-[48px] font-semibold leading-[58px] text-black max-w-[800px]">
          Manage your learning documents <br />
          <span className="bg-gradient-to-b from-[#0575e6]/62 to-[#8a38f5]/68 bg-clip-text text-transparent inline-block font-bold">
            with AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-[16px] font-semibold text-[#6A7282] max-w-[580px] leading-relaxed">
          Upload, organize, and chat with your study materials. Get instant answers powered by advanced AI technology.
        </p>
      </section>

      {/* ==================== 3. FEATURES SECTION ==================== */}
      <section className="w-full max-w-7xl mt-24 px-6">
        <div className="text-center mb-12">
          <h2 className="text-[48px] font-semibold text-black">
            Everything you need to succeed
          </h2>
          <p className="text-[16px] font-semibold text-[#6A7282] mt-2">
            Powerful features to enhance your learning experience
          </p>
        </div>

        {/* Grid 4 Cards tính năng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full">
          
          {/* Card 1: AI Chatbot */}
          <div className="w-[280px] h-[350px] bg-white border border-black rounded-[20px] p-6 flex flex-col justify-start gap-4 shadow-sm">
            <div className="w-[70px] h-[70px] bg-gradient-to-r from-[#0d99ff]/51 to-[#8a38f5]/40 rounded-[15px] flex items-center justify-center text-white text-3xl">
              🤖
            </div>
            <h3 className="text-[24px] font-semibold text-black mt-2">AI Chatbot</h3>
            <p className="text-[18px] leading-[24px] font-semibold text-[#6A7282]">
              Chat with AI to get instant answers from your documents
            </p>
          </div>

          {/* Card 2: Document Sharing */}
          <div className="w-[280px] h-[350px] bg-white border border-black rounded-[20px] p-6 flex flex-col justify-start gap-4 shadow-sm">
            <div className="w-[70px] h-[70px] bg-gradient-to-r from-[#0d99ff]/51 to-[#8a38f5]/40 rounded-[15px] flex items-center justify-center text-white text-3xl">
              🔗
            </div>
            <h3 className="text-[24px] font-semibold text-black mt-2">Document Sharing</h3>
            <p className="text-[18px] leading-[24px] font-semibold text-[#6A7282]">
              Collaborate with classmates by sharing your study materials
            </p>
          </div>

          {/* Card 3: Cloud Storage */}
          <div className="w-[280px] h-[350px] bg-white border border-black rounded-[20px] p-6 flex flex-col justify-start gap-4 shadow-sm">
            <div className="w-[70px] h-[70px] bg-gradient-to-r from-[#0d99ff]/51 to-[#8a38f5]/40 rounded-[15px] flex items-center justify-center text-white text-3xl">
              ☁️
            </div>
            <h3 className="text-[24px] font-semibold text-black mt-2">Cloud Storage</h3>
            <p className="text-[18px] leading-[24px] font-semibold text-[#6A7282]">
              Store your documents securely in the cloud with unlimited access
            </p>
          </div>

          {/* Card 4: Upload Documents */}
          <div className="w-[280px] h-[350px] bg-white border border-black rounded-[20px] p-6 flex flex-col justify-start gap-4 shadow-sm">
            <div className="w-[70px] h-[70px] bg-gradient-to-r from-[#0d99ff]/51 to-[#8a38f5]/40 rounded-[15px] flex items-center justify-center text-white text-3xl">
              📤
            </div>
            <h3 className="text-[24px] font-semibold text-black mt-2">Upload Documents</h3>
            <p className="text-[18px] leading-[24px] font-semibold text-[#6A7282]">
              Easy drag-and-drop file upload with multiple format support
            </p>
          </div>

        </div>
      </section>

      {/* ==================== 4. CTA BANNER ==================== */}
      <section className="w-full max-w-[1410px] h-[290px] mt-24 px-4 mb-24">
        <div className="w-full h-full bg-gradient-to-r from-[#0d99ff]/48 to-[#8a38f5]/56 rounded-[30px] flex flex-col items-center justify-center text-center p-6 gap-6">
          <h2 className="text-[40px] font-semibold text-white leading-[48px]">
            Ready to transform your studying?
          </h2>
          <p className="text-[20px] font-semibold text-white">
            Join thousands of students already using AI Study Hub
          </p>
          <button 
            type="button"
            onClick={() => onNavigate('register')}
            className="w-full max-w-[380px] h-[70px] bg-white rounded-[20px] text-[24px] font-semibold text-[#0D86FF] hover:bg-gray-50 transition-all shadow-md active:scale-[0.99]"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* ==================== 5. FOOTER ==================== */}
      <footer className="w-full h-[177px] bg-black flex flex-col justify-center px-12 text-left mt-auto">
        <h4 className="text-[24px] font-semibold text-white">
          AI Study Hub
        </h4>
        <p className="text-[16px] font-semibold text-white/50 mt-2 max-w-xl">
          Modern AI-powered document management system for students and educators.
        </p>
      </footer>

    </div>
  );
};

export default WelcomePage;