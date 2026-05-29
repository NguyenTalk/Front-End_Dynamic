'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { SearchIcon, ArrowDownIcon } from '@/icons';
import DynamicLogo from '@/icons/DynamicLogo';
import { auth } from '@/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useMovies';
import { useDebounce } from '@/hooks/useDebounce';
import { img } from '@/api/tmdb';

export default function Navbar() {
  const scrolled = useScrolled();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Search dropdown logic
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data: searchResults = [] } = useSearch(isClient ? debouncedQuery : '');
  
  interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string | null;
    media_type?: string;
  }
  
  const filteredSearchResults = (searchResults as SearchResult[])?.filter(
    (item) => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv')
  ).slice(0, 8) || [];

  const isActive = (path: string) => pathname === path;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchResultClick = (movie: SearchResult) => {
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-netflix-black/95 backdrop-blur-sm shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex-shrink-0 flex items-center">
          {/* 🎨 Logo Dynamic theo phong cách Netflix */}
          <DynamicLogo className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform" />
        </Link>

        <ul className="hidden md:flex items-center gap-5">
           {/* Các thẻ <li> Home, TVShows, Movies... bên dưới giữ nguyên vẹn */}
          {/* Home */}
          <li>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -2, 2, -2, 0],
              }}
              transition={{
                rotate: {
                  duration: 0.4,
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.2,
                },
              }}
            >
              <Link
                href="/"
                className={`text-sm relative inline-block ${
                  isActive('/')
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
                {isActive('/') && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-gradient-to-r from-netflix-red to-transparent"></span>
                )}
              </Link>
            </motion.div>
          </li>

          {/* TVShows */}
          <li>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -2, 2, -2, 0],
              }}
              transition={{
                rotate: {
                  duration: 0.4,
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.2,
                },
              }}
            >
              <Link
                href="/tv"
                className={`text-sm relative inline-block ${
                  isActive('/tv')
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                TVShows
                {isActive('/tv') && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-gradient-to-r from-netflix-red to-transparent"></span>
                )}
              </Link>
            </motion.div>
          </li>

          {/* Movies */}
          <li>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -2, 2, -2, 0],
              }}
              transition={{
                rotate: {
                  duration: 0.4,
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.2,
                },
              }}
            >
              <Link
                href="/movies"
                className={`text-sm relative inline-block ${
                  isActive('/movies')
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
                {isActive('/movies') && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-gradient-to-r from-netflix-red to-transparent"></span>
                )}
              </Link>
            </motion.div>
          </li>

          {/* New Popular */}
          <li>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -2, 2, -2, 0],
              }}
              transition={{
                rotate: {
                  duration: 0.4,
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.2,
                },
              }}
            >
              <Link
                href="/new-popular"
                className={`text-sm relative inline-block ${
                  isActive('/new-popular')
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                NewPopular
                {isActive('/new-popular') && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-gradient-to-r from-netflix-red to-transparent"></span>
                )}
              </Link>
            </motion.div>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <AnimatePresence>
          {searchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-black/80 border border-white/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="px-2 bg-transparent"
                >
                  <SearchIcon />
                </button>
                <input
                  autoFocus
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onBlur={() => setTimeout(() => !searchQuery && setSearchOpen(false), 200)}
                  className="w-full py-1.5 pr-3 bg-transparent text-white text-sm outline-none placeholder-gray-400"
                />
              </form>

              {/* Search Results Dropdown */}
              {isClient && searchQuery && filteredSearchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-netflix-dark/95 border border-gray-700 rounded-md shadow-xl max-h-96 overflow-y-auto z-50"
                >
                  {filteredSearchResults.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSearchResultClick(movie)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left border-b border-gray-700/50 last:border-b-0 bg-transparent"
                    >
                      <img
                        src={img.poster(movie.poster_path ?? null) || ''}
                        alt={movie.title || movie.name}
                        className="w-10 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {movie.title || movie.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {movie.media_type === 'tv' ? 'TV Show' : 'Movie'}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {isClient && searchQuery && filteredSearchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-netflix-dark/95 border border-gray-700 rounded-md shadow-xl p-4 z-50"
                >
                  <p className="text-gray-400 text-sm text-center">No results found</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="bg-transparent p-1 hover:opacity-80 transition-opacity"
            >
              <SearchIcon />
            </button>
          )}
        </AnimatePresence>

        {/* Profile dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setProfileMenuOpen(true)}
          onMouseLeave={() => setProfileMenuOpen(false)}
        >
          <button className="flex items-center gap-1 bg-transparent">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
              alt="Profile"
              className="w-8 h-8 rounded object-cover"
            />
            <ArrowDownIcon />
          </button>

          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-netflix-dark/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-xl overflow-hidden"
              >
                <Link href="/profile" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                  Account
                </Link>
                <hr className="border-gray-700" />
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors bg-transparent"
                >
                  Sign out of Netflix
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
