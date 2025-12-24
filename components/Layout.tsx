
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants.tsx';
import { WatchItem } from '../types.ts';

interface LayoutProps {
    children: React.ReactNode;
    items: WatchItem[];
    onSelectItem: (id: string) => void;
}

/**
 * DynamicBackground provides a smooth cross-fade effect when the theme changes.
 * It uses the current theme color to generate a custom fluid aura.
 */
const DynamicBackground: React.FC<{ color: string }> = ({ color }) => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-black transition-colors duration-1000">
            {/* The primary colored aura that follows the theme */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] transition-all duration-1000 opacity-20 blur-[120px] rounded-full"
                style={{ 
                    background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` 
                }}
            />
            {/* Secondary atmospheric gradients */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-screen transition-all duration-1000">
                 <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vh] bg-[#1a0a2e]/40 blur-[100px] rounded-full animate-fluid" />
                 <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vh] bg-[#0a0a2e]/40 blur-[100px] rounded-full" />
            </div>
            {/* Noise grain for texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

const ScrollToTop: React.FC<{ themeColor: string }> = ({ themeColor }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 z-[120] w-12 h-12 md:w-14 md:h-14 rounded-2xl glass flex items-center justify-center text-white transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            style={{ 
                borderColor: `${themeColor}44`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${themeColor}22`
            }}
        >
            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: themeColor }}
            />
            <svg 
                className="w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-500 group-hover:-translate-y-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export const Layout: React.FC<LayoutProps> = ({ children, items, onSelectItem }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Determine current theme based on route
    const currentCategory = useMemo(() => 
        CATEGORIES.find(cat => location.pathname === cat.path),
    [location.pathname]);

    // Use a default theme color if on home or admin
    const themeColor = currentCategory?.color || '#A42EFF';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchActive(false);
            setSearchQuery('');
        }
    };

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter items for search preview
    const searchPreview = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return items.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
    }, [items, searchQuery]);

    return (
        <div className="min-h-screen text-white relative font-sans selection:bg-primary selection:text-white">
            <DynamicBackground color={themeColor} />
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500">
                <div className="max-w-[1920px] mx-auto flex items-center justify-between">
                    {/* Logo - Reverted Icon path but maintained Boldonse font */}
                    <Link to="/" className="relative group z-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" fill={themeColor} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                                </svg>
                            </div>
                            <div className="hidden md:flex flex-col justify-center relative pl-1">
                                <div className="font-logo text-[0.6rem] tracking-[0.3em] text-white font-bold absolute -top-1 left-0 z-20 drop-shadow-md">THE</div>
                                <div className="font-logo text-3xl tracking-wide font-black leading-none transform scale-y-110 py-0.5" style={{ color: themeColor }}>WATCH</div>
                                <div className="font-logo text-[0.6rem] tracking-[0.3em] text-white font-bold absolute -bottom-1 right-0 z-20 drop-shadow-md">LIST</div>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-2 glass-premium px-3 py-2 rounded-full border border-white/10 absolute left-1/2 -translate-x-1/2">
                        <Link 
                            to="/"
                            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/10 whitespace-nowrap ${location.pathname === '/' ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            Home
                        </Link>
                        {CATEGORIES.map(cat => {
                            const isActive = location.pathname === cat.path;
                            const isBright = ['cdrama', 'anime'].includes(cat.id);
                            return (
                                <Link 
                                    key={cat.id} 
                                    to={cat.path}
                                    style={isActive ? { backgroundColor: cat.color, boxShadow: `0 0 20px ${cat.color}66` } : {}}
                                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/10 whitespace-nowrap ${isActive ? (isBright ? 'text-black' : 'text-white') + ' shadow-lg' : 'text-white/60 hover:text-white'}`}
                                >
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 z-50">
                        {/* Search Bar */}
                        <div ref={searchRef} className={`relative transition-all duration-500 ${searchActive ? 'w-full md:w-80' : 'w-10 md:w-12'}`}>
                            <div className={`flex items-center ${searchActive ? 'glass bg-black/60 border-white/20' : 'glass bg-white/5 border-transparent hover:bg-white/10'} rounded-2xl border transition-all`}>
                                <button 
                                    onClick={() => setSearchActive(!searchActive)}
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors shrink-0"
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                
                                {searchActive && (
                                    <form onSubmit={handleSearch} className="flex-1">
                                        <input 
                                            autoFocus
                                            type="text" 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search database..."
                                            className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 h-10 md:h-12 pr-4"
                                        />
                                    </form>
                                )}
                            </div>

                            {/* Search Preview Dropdown */}
                            {searchActive && searchQuery && (
                                <div className="absolute top-full right-0 mt-4 w-72 glass-premium rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-scale-up">
                                    {searchPreview.length > 0 ? (
                                        <>
                                            {searchPreview.map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        onSelectItem(item.id);
                                                        setSearchActive(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full p-4 flex items-center gap-4 hover:bg-white/10 transition-colors text-left group"
                                                >
                                                    <div className="w-10 h-14 bg-black/50 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                                        <img src={item.poster} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-white truncate group-hover:text-primary-light transition-colors">{item.title}</div>
                                                        <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">{item.year}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="p-8 text-center">
                                            <div className="text-2xl mb-2 opacity-30">🔍</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">No matches found</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Admin Button */}
                        <Link 
                            to="/admin"
                            title="Admin Panel"
                            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 shrink-0 ${location.pathname === '/admin' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'glass bg-white/5 border-transparent hover:bg-white/10 text-white/60 hover:text-white'}`}
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>

            <ScrollToTop themeColor={themeColor} />

            <div className="relative z-10">
                <div key={location.pathname} className="animate-fade-in">
                    {children}
                </div>
            </div>
        </div>
    );
};