import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'; // Use expo-av for video playback

export default function BeginnerScreen() {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [videoPaused, setVideoPaused] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const token = 'Token 4fa702a6cf77b878693ab6d5a0ac2139a6691c20';
                const response = await fetch('http://127.0.0.1:8000/api/beginner/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched data:', data);

                const baseUrl = 'http://127.0.0.1:8000/';
                const updatedWords = data.map(item => ({
                    ...item,
                    videoUrl: `${baseUrl}${item.video__video_file}`,
                }));

                console.log('Updated words with video URLs:', updatedWords);
                setWords(updatedWords);
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData();
    }, []);

    const handleVideoProgress = (status) => {
        if (status.isLoaded && currentQuestionIndex < words.length) {
            const currentTime = status.positionMillis / 1000; // Get current time in seconds
            if (currentTime >= words[currentQuestionIndex]?.pause_time) {
                setVideoPaused(true);
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }
        }
    };

    const checkAnswer = (selectedOption, correctAnswer) => {
        if (selectedOption === correctAnswer) {
            setScore(score + 1);
            showFeedback('Correct!', '#2ecc71');
        } else {
            showFeedback(`Wrong! The correct answer is: ${correctAnswer}`, '#e74c3c');
        }
        setTimeout(() => {
            setVideoPaused(false);
        }, 2000);
    };

    const showFeedback = (message) => {
        setFeedback(message);
        setFeedbackVisible(true);
        setTimeout(() => setFeedbackVisible(false), 2000);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score: {score}/10</Text>
            {words.length > 0 && (
                <Video
                    source={{ uri: words[currentQuestionIndex]?.videoUrl }} // Use the correct video URL
                    style={styles.video}
                    onPlaybackStatusUpdate={handleVideoProgress} // Handle playback status updates
                    isMuted={videoPaused} // Mute the video if paused
                    useNativeControls // Use native controls
                />
            )}
            {feedbackVisible && (
                <View style={styles.feedbackOverlay}>
                    <Text style={styles.feedbackText}>{feedback}</Text>
                </View>
            )}
            {words[currentQuestionIndex] && words[currentQuestionIndex].options && (
                <View>
                    <Text style={styles.question}>{`What did you see in the video for "${words[currentQuestionIndex].word}"?`}</Text>
                    <View style={styles.options}>
                        {[words[currentQuestionIndex].correct_answer, words[currentQuestionIndex].wrong_answer_1, words[currentQuestionIndex].wrong_answer_2, words[currentQuestionIndex].wrong_answer_3].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.option}
                                onPress={() => checkAnswer(option, words[currentQuestionIndex].correct_answer)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf4f4',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3498db',
        position: 'absolute',
        top: 10,
        left: 10,
    },
    video: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    feedbackOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        borderRadius: 10,
    },
    feedbackText: {
        color: 'white',
        fontSize: 24,
    },
    question: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    options: {
        flexDirection: 'column',
        gap: 10,
    },
    option: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
