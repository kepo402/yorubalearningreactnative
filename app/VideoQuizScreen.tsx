import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Video } from 'expo-av'; // Use expo-av for both web and mobile

const VideoQuizScreen = ({ route }) => {
  const { words } = route.params;
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = React.useRef(null); // Reference to the video player

  const pauseTimes = words.map((word) => word.pause_time);

  const handleVideoProgress = (status) => {
    if (status.isLoaded) {
      const currentTime = status.positionMillis / 1000; // Convert to seconds
      if (currentQuestionIndex < pauseTimes.length && currentTime >= pauseTimes[currentQuestionIndex]) {
        setIsVideoPaused(true);
        videoRef.current.pauseAsync(); // Pause the video
      }
    }
  };

  const handleAnswer = (selectedOption, correctAnswer) => {
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', 'You got it right!');
    } else {
      Alert.alert('Wrong!', `The correct answer is: ${correctAnswer}`);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsVideoPaused(false);
    videoRef.current.playAsync(); // Resume the video
  };

  const currentWord = words[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex >= words.length) {
      Alert.alert('Quiz Finished', `Your score is ${score}/${words.length}`);
    }
  }, [currentQuestionIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}/{words.length}</Text>

      <Video
        ref={videoRef}
        source={{ uri: currentWord.video.video_file.url }} // Use URL from your data
        style={styles.video}
        paused={isVideoPaused}
        onPlaybackStatusUpdate={handleVideoProgress}
        useNativeControls
      />

      {currentQuestionIndex < words.length && (
        <>
          <Text style={styles.question}>What did you see for "{currentWord.word}"?</Text>
          <View style={styles.options}>
            {currentWord.shuffled_options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => handleAnswer(option, currentWord.correct_answer)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fcf4f4',
    alignItems: 'center',
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
    color: '#3498db',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  options: {
    width: '100%',
    marginTop: 20,
  },
});

export default VideoQuizScreen;
