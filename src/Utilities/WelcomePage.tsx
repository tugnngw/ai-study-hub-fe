import React from 'react';

interface WelcomePageProps {
  onNavigate: (page: any) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-[#EBEBEB] font-sans text-black antialiased flex flex-col items-center p-4">
      <div className="w-full max-w-[1024px] bg-white shadow-md flex flex-col items-center pb-12">
        
        {/* HEADER BAR */}
        <header className="w-full h-[70px] bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-12 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7B92FF] rounded-[12px] flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <span className="text-[22px] font-bold tracking-tight text-black">AI STUDY HUB</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onNavigate('login')} className="h-[32px] px-4 rounded-full border border-[#8A51FF]/30 text-xs font-bold text-[#8A51FF] hover:bg-purple-50 transition-colors cursor-pointer">
              Đăng Nhập
            </button>
            <button type="button" onClick={() => onNavigate('register')} className="h-[32px] px-4 rounded-full border border-[#8A51FF]/30 text-xs font-bold text-[#8A51FF] hover:bg-purple-50 transition-colors cursor-pointer">
              Tạo Tài Khoản
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="text-center mt-12 px-6 flex flex-col items-center">
          <div className="h-[36px] px-4 bg-[#7B92FF]/15 text-[#7B92FF] rounded-full flex items-center gap-1.5 mb-6 text-sm font-bold">
            <span>⚡</span> Powered by AI Technology
          </div>
          <h1 className="text-[36px] font-bold leading-tight text-black">
            Manage your learning documents <br />
            <span className="text-[#9BAFFF]">with AI</span>
          </h1>
          <p className="mt-3 text-gray-500 text-xs max-w-[420px] leading-relaxed">
            Upload, organize, and chat with your study materials. Get instant answers powered by advanced AI technology.
          </p>
        </section>

        {/* FEATURES BANNER */}
        <section className="text-center mt-12 w-full px-6">
          <h2 className="text-[32px] font-bold text-black">Everything you need to succeed</h2>
          <p className="text-gray-400 text-xs mt-1">Powerful features to enhance your learning experience</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 w-full max-w-[900px] mx-auto">
            {/* Card 1 */}
            <div className="bg-white border border-gray-300 rounded-[16px] p-5 flex flex-col items-start text-left gap-3 min-h-[220px]">
              <div className="w-10 h-10 bg-[#7B92FF]/20 rounded-[10px] flex items-center justify-center text-[#7B92FF]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-base font-bold text-black">AI Chatbot</h3>
              <p className="text-gray-500 text-xs leading-normal">Chat with AI to get instant answers from your documents</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white border border-gray-300 rounded-[16px] p-5 flex flex-col items-start text-left gap-3 min-h-[220px]">
              <div className="w-10 h-10 bg-[#7B92FF]/20 rounded-[10px] flex items-center justify-center text-[#7B92FF]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </div>
              <h3 className="text-base font-bold text-black">Document Sharing</h3>
              <p className="text-gray-500 text-xs leading-normal">Collaborate with classmates by sharing your study materials</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white border border-gray-300 rounded-[16px] p-5 flex flex-col items-start text-left gap-3 min-h-[220px]">
              <div className="w-10 h-10 bg-[#7B92FF]/20 rounded-[10px] flex items-center justify-center text-[#7B92FF]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              </div>
              <h3 className="text-base font-bold text-black">Cloud Storage</h3>
              <p className="text-gray-500 text-xs leading-normal">Store your documents securely in the cloud with unlimited access</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white border border-gray-300 rounded-[16px] p-5 flex flex-col items-start text-left gap-3 min-h-[220px]">
              <div className="w-10 h-10 bg-[#7B92FF]/20 rounded-[10px] flex items-center justify-center text-[#7B92FF]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h3 className="text-base font-bold text-black">Upload Documents</h3>
              <p className="text-gray-500 text-xs leading-normal">Easy drag-and-drop file upload with multiple format support</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-[900px] bg-gradient-to-r from-[#70B0FF] to-[#B38FFF] rounded-[16px] flex flex-col items-center justify-center text-center p-8 mt-12 gap-3 text-white">
          <h2 className="text-2xl font-bold">Ready to transform your studying?</h2>
          <p className="text-xs opacity-90">Join thousands of students already using AI Study Hub</p>
          <button type="button" onClick={() => onNavigate('register')} className="h-[44px] px-8 bg-white text-[#7CA0FF] rounded-[12px] font-bold text-sm shadow-sm hover:bg-gray-50 transition-all cursor-pointer mt-2">
            Get Started for Free
          </button>
        </section>

        {/* FOOTER */}
        <footer className="w-full max-w-[900px] bg-black text-white rounded-b-[16px] p-6 text-left mt-12">
          <h4 className="text-sm font-bold">AI Study Hub</h4>
          <p className="text-[11px] opacity-40 mt-1">Modern AI-powered document management system for students and educators.</p>
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;