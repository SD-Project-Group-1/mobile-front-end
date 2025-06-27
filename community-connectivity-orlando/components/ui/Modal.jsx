import React, { useEffect } from 'react';
import { Modal as RNModal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import Button from './Button';

export default function Modal({
    visible,
    onClose,
    title,
    message,
    size = 'regular', // or 'large'
    onConfirm, // only large modal
    onCancel, // only large modal
    setTime = 3000,
}) {
    // Auto-close modal after timeout
    useEffect(() => {
        let timer;
        if (visible && size === 'regular') {
        timer = setTimeout(() => {
            onClose && onClose();
        }, setTime);
        }
        return () => clearTimeout(timer);
    }, [visible, size, onClose, setTime]);

    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable 
                    style={[styles.container, 
                    size === 'large' ? styles.large : styles.regular]} 
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Modal Title */}
                    {title && <Text style={styles.title}>{title}</Text>}
                    {/* Modal Message */}
                    {message && <Text style={styles.message}>{message}</Text>}
                    {/* Modal Buttons for large modal */}
                    {size === 'large' && (
                        <View style={styles.buttonRow}>
                            <Button
                                title="Cancel"
                                onPress={onCancel}
                                style={styles.button}
                                variant="primary"
                                width={95}
                                height={60}
                            />
                            <Button
                                title="Confirm Delete"
                                onPress={onConfirm}
                                style={[styles.button, {paddingHorizontal: 17}]}
                                variant="primary"
                                width={95}
                                height={60}
                            />
                        </View>
                    )}
                </Pressable>
            </Pressable>
        </RNModal>
    );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.modal.default,
    borderRadius: 5,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.modal.border,
  },
  large: {
    width: '100%',
    maxWidth: 400,
  },
  regular: {
    width: '100%',
    maxWidth: 400,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.modal.title,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontFamily: 'InstrumentSans',
    fontSize: 14,
    color: Colors.modal.text,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
}); 