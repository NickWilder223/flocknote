// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import styles from "./JokeCard.module.css";

export function JokeCard({ id, setup, punchline, liked, handleLike, handleDislike }) {
    const [isVisible, setIsVisible] = useState(true);

    // reset visibility when id changes (new joke loaded)
    useEffect(() => {
        setIsVisible(true);
    }, [id]);

    return (
        <div className={styles.jokeCardWrapper}>
            <AnimatePresence
                initial={false}
                mode="wait"
            >
                {isVisible && (
                    <motion.div
                        className={`${styles.jokeCard} ${liked ? styles.liked : ""}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.jokeContent}>
                            <p className={styles.setup}>{setup}</p>
                            <p className={styles.punchLine}>{punchline}</p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <motion.button
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.ratingButton} ${liked ? styles.like : ""}`}
                                onClick={() => handleLike(id)}
                                disabled={liked}
                            >
                                👍
                            </motion.button>
                            <motion.button
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.ratingButton} ${liked ? styles.like : ""}`}
                                onClick={() => {
                                    setIsVisible(false);

                                    setTimeout(() => {
                                        handleDislike(id);
                                    }, 300); // match with transition duration
                                }}
                            >
                                🤦
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
