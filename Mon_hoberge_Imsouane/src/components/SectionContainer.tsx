import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  bgColor?: string;
  textColor?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  title,
  subtitle,
  id,
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 ${bgColor} ${textColor}`}
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
        >
          {title && (
            <h2 className="section-title text-center">{title}</h2>
          )}
          {subtitle && (
            <p className="text-center text-lg mb-12 max-w-3xl mx-auto">{subtitle}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionContainer;