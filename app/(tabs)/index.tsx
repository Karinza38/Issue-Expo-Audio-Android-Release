import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  // Initialize audio player with your audio file
  const player = useAudioPlayer(require('@/assets/audio/audio.mp3'));
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    // Optional: auto-play when component mounts
    player.play();
  }, []);

  const playPauseAudio = () => {
    if (status.currentTime >= status.duration) {
      player.seekTo(0);
    }
    player.playing ? player.pause() : player.play();
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={playPauseAudio}
      >
        <ThemedText style={styles.playButtonText}>
          {player.playing ? '⏸️' : '▶️'}
        </ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.timeText}>
        {formatTime(status.currentTime)} / {formatTime(status.duration)}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#A1CEDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 30,
  },
  timeText: {
    fontSize: 18,
  },
});
