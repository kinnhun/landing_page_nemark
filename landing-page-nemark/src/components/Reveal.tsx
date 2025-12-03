import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const Reveal = ({ children, width = 'fit-content', delay = 0.25, direction = 'up', className = '' }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 75 : direction === 'down' ? -75 : 0,
      x: direction === 'left' ? 75 : direction === 'right' ? -75 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.5, delay: delay } 
    },
  };

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer = ({ children, className = '', delay = 0.1 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();
  
    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      }
    }, [isInView, controls]);
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: delay,
        },
      },
    };
  
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={className}
      >
        {children}
      </motion.div>
    );
  };
  
  export const StaggerItem = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
  
    return (
      <motion.div variants={itemVariants} className={className}>
        {children}
      </motion.div>
    );
  };
