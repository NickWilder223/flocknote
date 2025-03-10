import { useEffect, useState } from "react";
import { JokeCard } from "./components/JokeCard";
import { fetchJokes } from "./services";

import styles from "./Home.module.css";

export function Home() {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadJokes();
    }, []);

    async function loadJokes() {
        setIsLoading(true);
        try {
            const jokesData = await fetchJokes();
            setJokes(jokesData);
            setError(null);
        } catch (err) {
            setError("Failed to fetch jokes. Please try again later.");
            console.error("error fetching jokes:", err);
        } finally {
            setIsLoading(false);
        }
    }

    function handleLike(id) {
        setJokes((prevJokes) => prevJokes.map((joke) => (joke.id === id ? { ...joke, liked: true } : joke)));
    }

    function handleDislike(id) {
        setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== id));
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dad Joke Generator!</h1>
                <button
                    className={styles.refreshBtn}
                    onClick={loadJokes}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Get New Jokes"}
                </button>
            </header>
            <div className={styles.jokeContainer}>
                {isLoading && <div className={styles.error}>Loading...</div>}
                {error && <div className={styles.error}>{error}</div>}
                {!isLoading &&
                    jokes &&
                    jokes.map((value) => (
                        <JokeCard
                            key={`joke-card-${value.id}`}
                            id={value.id}
                            setup={value.setup}
                            punchline={value.punchline}
                            liked={value.liked}
                            handleDislike={handleDislike}
                            handleLike={handleLike}
                        />
                    ))}
            </div>
        </div>
    );
}
