import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle hover states for menu items
  const handleHover = (item: string | null) => {
    setHoveredItem(item);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${isActive
        ? 'text-[#F76C09] font-semibold'
        : 'text-[#3E5AC1] hover:text-[#F76C09]'
      }`;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#FEFEFE] shadow-lg py-2'
          : 'bg-gradient-to-r from-[#FEFEFE]/95 to-[#F7F7EA]/95 backdrop-blur-md py-4'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-3"
            onClick={closeMenu}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/logo.png"
                alt="Bigtrading Logo"
                className="h-12 w-auto drop-shadow-md transition-all duration-300 group-hover:drop-shadow-xl"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                className="text-xl font-display font-bold text-[#3E5AC1] uppercase tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                BIG TRADING
              </motion.span>
              <motion.span
                className="text-xs text-[#1844C6]/80 uppercase tracking-tight hidden md:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('business.navbarTagline')}
              </motion.span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="nav-links-container flex items-center">
              {['Home', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  className="relative"
                  onHoverStart={() => handleHover(item)}
                  onHoverEnd={() => handleHover(null)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <NavLink
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={navLinkClass}
                  >
                    {item}
                    {hoveredItem === item && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-[#F76C09] rounded-full"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="tel:+81804213-9008"
              className="ml-6 flex items-center gap-2 px-4 py-2 bg-[#F76C09] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#E77D2E]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Phone size={16} />
              <span className="text-sm font-medium">Call Us</span>
            </motion.a>
            <div className="ml-4">
              <LanguageSwitcher className="bg-gray-100 hover:bg-gray-200 text-[#3E5AC1]" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-full ${isOpen ? 'bg-[#F7F7EA]' : ''} text-[#3E5AC1] hover:text-[#F76C09] focus:outline-none`}
              aria-expanded="false"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="px-4 pt-3 pb-4 space-y-3 bg-gradient-to-b from-[#FEFEFE] to-[#F7F7EA]/90 shadow-lg rounded-b-2xl border-t border-[#3E5AC1]/10">
              {['Home', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={({ isActive }) => `flex items-center space-x-2 px-3 py-2.5 rounded-xl ${isActive ? 'bg-[#3E5AC1]/10 text-[#F76C09]' : 'text-[#3E5AC1]'}`}
                    onClick={closeMenu}
                  >
                    {item === 'Home' && <Car size={18} />}
                    {item === 'About' && <Globe size={18} />}
                    {item === 'Contact' && <Phone size={18} />}
                    <span>{item}</span>
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-2 mt-2 border-t border-[#3E5AC1]/10"
              >
                <div className="flex items-center justify-center mb-3 px-2">
                  <LanguageSwitcher className="w-full bg-gray-100 hover:bg-gray-200 text-[#3E5AC1]" />
                </div>

                <a
                  href="tel:+81804213-9008"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#F76C09] text-white rounded-xl shadow-md hover:bg-[#E77D2E] transition-colors duration-300"
                >
                  <Phone size={16} />
                  <span>{t('cta.callUs')}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;