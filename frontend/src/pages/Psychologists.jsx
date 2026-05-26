import { useState } from 'react';
import Layout from '../components/Layout';

const psychologists = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialization: 'Student Anxiety & Stress Management',
    qualification: 'PhD in Clinical Psychology, NIMHANS',
    experience: '12 years',
    phone: '+91 98765 43210',
    email: 'dr.priya@neurobuddy.com',
    languages: ['English', 'Hindi', 'Kannada'],
    rating: 4.9,
    reviews: 128,
    available: true,
    image: 'PS',
    color: 'from-pink-500 to-rose-600',
    timings: [
      { day: 'Monday', time: '9:00 AM - 1:00 PM' },
      { day: 'Wednesday', time: '2:00 PM - 6:00 PM' },
      { day: 'Friday', time: '9:00 AM - 12:00 PM' },
    ],
    about: 'Specializes in helping students manage academic pressure, exam anxiety, and burnout. Uses CBT and mindfulness-based approaches.',
    fee: '₹800 / session',
    mode: ['Online', 'In-Person'],
  },
  {
    id: 2,
    name: 'Dr. Arjun Mehta',
    specialization: 'Career Counseling & Life Transitions',
    qualification: 'M.Phil Clinical Psychology, Delhi University',
    experience: '8 years',
    phone: '+91 87654 32109',
    email: 'dr.arjun@neurobuddy.com',
    languages: ['English', 'Hindi'],
    rating: 4.8,
    reviews: 95,
    available: true,
    image: 'AM',
    color: 'from-blue-500 to-indigo-600',
    timings: [
      { day: 'Tuesday', time: '10:00 AM - 2:00 PM' },
      { day: 'Thursday', time: '3:00 PM - 7:00 PM' },
      { day: 'Saturday', time: '9:00 AM - 1:00 PM' },
    ],
    about: 'Expert in career-related stress, identity issues, and life transitions. Helps students navigate career choices and workplace challenges.',
    fee: '₹700 / session',
    mode: ['Online'],
  },
  {
    id: 3,
    name: 'Dr. Sneha Iyer',
    specialization: 'Depression, Self-Esteem & Relationships',
    qualification: 'PhD Psychology, IIT Bombay',
    experience: '15 years',
    phone: '+91 76543 21098',
    email: 'dr.sneha@neurobuddy.com',
    languages: ['English', 'Tamil', 'Hindi'],
    rating: 4.9,
    reviews: 210,
    available: false,
    image: 'SI',
    color: 'from-purple-500 to-violet-600',
    timings: [
      { day: 'Monday', time: '2:00 PM - 6:00 PM' },
      { day: 'Wednesday', time: '9:00 AM - 1:00 PM' },
      { day: 'Friday', time: '3:00 PM - 6:00 PM' },
    ],
    about: 'Focuses on depression, low self-esteem, and relationship issues common among students. Uses integrative therapy approaches.',
    fee: '₹1000 / session',
    mode: ['Online', 'In-Person'],
  },
  {
    id: 4,
    name: 'Dr. Rahul Verma',
    specialization: 'ADHD, Focus & Academic Performance',
    qualification: 'MD Psychiatry, AIIMS Delhi',
    experience: '10 years',
    phone: '+91 65432 10987',
    email: 'dr.rahul@neurobuddy.com',
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.7,
    reviews: 87,
    available: true,
    image: 'RV',
    color: 'from-green-500 to-emerald-600',
    timings: [
      { day: 'Tuesday', time: '9:00 AM - 12:00 PM' },
      { day: 'Thursday', time: '10:00 AM - 2:00 PM' },
      { day: 'Saturday', time: '2:00 PM - 5:00 PM' },
    ],
    about: 'Specializes in ADHD, concentration issues, and academic performance. Helps students develop focus strategies and study habits.',
    fee: '₹900 / session',
    mode: ['Online', 'In-Person'],
  },
  {
    id: 5,
    name: 'Dr. Kavya Nair',
    specialization: 'Mindfulness, Sleep & Wellness',
    qualification: 'MSc Clinical Psychology, Manipal University',
    experience: '6 years',
    phone: '+91 54321 09876',
    email: 'dr.kavya@neurobuddy.com',
    languages: ['English', 'Malayalam', 'Hindi'],
    rating: 4.8,
    reviews: 63,
    available: true,
    image: 'KN',
    color: 'from-teal-500 to-cyan-600',
    timings: [
      { day: 'Monday', time: '10:00 AM - 1:00 PM' },
      { day: 'Wednesday', time: '4:00 PM - 7:00 PM' },
      { day: 'Friday', time: '10:00 AM - 1:00 PM' },
    ],
    about: 'Focuses on mindfulness-based therapy, sleep disorders, and overall wellness. Helps students build healthy routines and mental resilience.',
    fee: '₹650 / session',
    mode: ['Online'],
  },
  {
    id: 6,
    name: 'Dr. Aditya Bose',
    specialization: 'Trauma, Grief & Emotional Healing',
    qualification: 'PhD Counseling Psychology, Calcutta University',
    experience: '11 years',
    phone: '+91 43210 98765',
    email: 'dr.aditya@neurobuddy.com',
    languages: ['English', 'Bengali', 'Hindi'],
    rating: 4.9,
    reviews: 142,
    available: true,
    image: 'AB',
    color: 'from-orange-500 to-amber-600',
    timings: [
      { day: 'Tuesday', time: '2:00 PM - 6:00 PM' },
      { day: 'Thursday', time: '9:00 AM - 1:00 PM' },
      { day: 'Sunday', time: '10:00 AM - 1:00 PM' },
    ],
    about: 'Expert in trauma-informed therapy, grief counseling, and emotional healing. Creates a safe space for students dealing with difficult life events.',
    fee: '₹850 / session',
    mode: ['Online', 'In-Person'],
  },
];

const Psychologists = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const specializations = ['All', 'Anxiety & Stress', 'Career', 'Depression', 'ADHD', 'Mindfulness', 'Trauma'];

  const filtered = psychologists.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Talk to a Psychologist</h1>
                <p className="text-purple-200 mt-1">Connect with certified mental health professionals</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Certified Professionals</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium">100% Confidential</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Online & In-Person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-card border border-dark-border text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Psychologist Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((doc) => (
            <div key={doc.id} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 group">
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${doc.color} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white text-xl font-bold backdrop-blur-sm border border-white/30">
                      {doc.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                      <p className="text-white/80 text-sm mt-1">{doc.specialization}</p>
                      <p className="text-white/60 text-xs mt-1">{doc.qualification}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${doc.available ? 'bg-green-400/20 text-green-300 border border-green-400/30' : 'bg-red-400/20 text-red-300 border border-red-400/30'}`}>
                    {doc.available ? '● Available' : '● Busy'}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-dark-bg rounded-xl p-3 text-center">
                    <p className="text-yellow-400 font-bold text-lg">⭐ {doc.rating}</p>
                    <p className="text-gray-400 text-xs mt-1">{doc.reviews} reviews</p>
                  </div>
                  <div className="bg-dark-bg rounded-xl p-3 text-center">
                    <p className="text-purple-400 font-bold text-lg">{doc.experience}</p>
                    <p className="text-gray-400 text-xs mt-1">Experience</p>
                  </div>
                  <div className="bg-dark-bg rounded-xl p-3 text-center">
                    <p className="text-green-400 font-bold text-sm">{doc.fee}</p>
                    <p className="text-gray-400 text-xs mt-1">Per session</p>
                  </div>
                </div>

                {/* About */}
                <p className="text-gray-400 text-sm leading-relaxed">{doc.about}</p>

                {/* Timings */}
                <div>
                  <p className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available Timings
                  </p>
                  <div className="space-y-2">
                    {doc.timings.map((t, i) => (
                      <div key={i} className="flex items-center justify-between bg-dark-bg rounded-lg px-3 py-2">
                        <span className="text-purple-300 text-sm font-medium">{t.day}</span>
                        <span className="text-gray-300 text-sm">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages & Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {doc.languages.map((lang, i) => (
                      <span key={i} className="bg-dark-bg text-gray-300 text-xs px-2 py-1 rounded-lg border border-dark-border">{lang}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {doc.mode.map((m, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-lg font-medium ${m === 'Online' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'}`}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={`tel:${doc.phone}`}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-3 font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {doc.phone}
                  </a>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl py-3 font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-red-400 font-bold text-lg">Need Immediate Help?</h3>
              <p className="text-gray-300 text-sm mt-1">If you're in crisis or need immediate support, please reach out to these helplines:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <a href="tel:iCall" className="bg-dark-card rounded-xl p-3 border border-red-500/20 hover:border-red-500/50 transition">
                  <p className="text-white font-semibold text-sm">iCall (TISS)</p>
                  <p className="text-red-400 font-bold">9152987821</p>
                  <p className="text-gray-400 text-xs">Mon-Sat, 8AM-10PM</p>
                </a>
                <a href="tel:Vandrevala" className="bg-dark-card rounded-xl p-3 border border-red-500/20 hover:border-red-500/50 transition">
                  <p className="text-white font-semibold text-sm">Vandrevala Foundation</p>
                  <p className="text-red-400 font-bold">1860-2662-345</p>
                  <p className="text-gray-400 text-xs">24/7 Available</p>
                </a>
                <a href="tel:NIMHANS" className="bg-dark-card rounded-xl p-3 border border-red-500/20 hover:border-red-500/50 transition">
                  <p className="text-white font-semibold text-sm">NIMHANS Helpline</p>
                  <p className="text-red-400 font-bold">080-46110007</p>
                  <p className="text-gray-400 text-xs">Mon-Sat, 8AM-8PM</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedDoc(null)}>
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Book a Session</h2>
              <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={`bg-gradient-to-r ${selectedDoc.color} rounded-xl p-4 mb-6`}>
              <p className="text-white font-bold text-lg">{selectedDoc.name}</p>
              <p className="text-white/80 text-sm">{selectedDoc.specialization}</p>
            </div>
            <div className="space-y-4">
              <div className="bg-dark-bg rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                <a href={`tel:${selectedDoc.phone}`} className="text-green-400 font-bold text-lg hover:text-green-300 transition flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {selectedDoc.phone}
                </a>
              </div>
              <div className="bg-dark-bg rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a href={`mailto:${selectedDoc.email}`} className="text-blue-400 font-medium hover:text-blue-300 transition">{selectedDoc.email}</a>
              </div>
              <div className="bg-dark-bg rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-3">Available Slots</p>
                <div className="space-y-2">
                  {selectedDoc.timings.map((t, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-purple-300 text-sm font-medium">{t.day}</span>
                      <span className="text-gray-300 text-sm">{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-dark-bg rounded-xl p-4">
                <span className="text-gray-400 text-sm">Session Fee</span>
                <span className="text-green-400 font-bold">{selectedDoc.fee}</span>
              </div>
            </div>
            <a
              href={`tel:${selectedDoc.phone}`}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-4 font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now to Book
            </a>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Psychologists;
