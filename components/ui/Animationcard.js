import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedCard = ({ children, index }) => {
    const ref = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start({ opacity: 1, y: 0 });
                } else {
                    controls.start({ opacity: 0, y: 50 });
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard;
