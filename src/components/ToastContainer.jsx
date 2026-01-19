import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

let toastId = 0;
const toastListeners = new Set();

export const toast = {
  success: (message, options = {}) => {
    showToast({ type: 'success', message, ...options });
  },
  error: (message, options = {}) => {
    showToast({ type: 'error', message, ...options });
  },
  info: (message, options = {}) => {
    showToast({ type: 'info', message, ...options });
  },
  warning: (message, options = {}) => {
    showToast({ type: 'warning', message, ...options });
  },
};

function showToast(toast) {
  const id = toastId++;
  const toastWithId = { ...toast, id, duration: toast.duration || 3000 };
  toastListeners.forEach(listener => listener(toastWithId));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (newToast) => {
      setToasts(prev => [...prev, newToast]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, newToast.duration);
    };

    toastListeners.add(listener);
    return () => toastListeners.delete(listener);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-amber-600 text-white';
      case 'info':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`${getStyles(t.type)} px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[280px] max-w-md pointer-events-auto`}
          >
            <div className="flex-shrink-0">
              {getIcon(t.type)}
            </div>
            
            <p className="flex-1 font-medium text-sm">
              {t.message}
            </p>

            <button
              onClick={() => removeToast(t.id)}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}