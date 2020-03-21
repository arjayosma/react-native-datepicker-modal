import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  View
} from 'react-native';

const isAndroid = Platform.OS === 'android';
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modal: { backgroundColor: '#333333', height: 260, width: '100%' },
  modalButtonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 15
  }
});

const Wrapper = ({ children, condition, wrapper }) =>
  condition ? wrapper(children) : children;

const ModalWrapper = ({
  children,
  close,
  show,
  modalOverlayStyle,
  modalStyle,
  modalButtonContainer,
  modalButtonStyle,
  modalButtonText
}) => (
  <Modal
    animationType="slide"
    transparent
    visible={show}
    onRequestClose={close}
  >
    <View style={[styles.overlay, modalOverlayStyle]}>
      <View style={[styles.modal, modalStyle]}>
        <View style={[styles.modalButtonContainer, modalButtonContainer]}>
          <Button
            style={[modalButtonStyle]}
            title={modalButtonText}
            onPress={close}
          />
        </View>
        {children}
      </View>
    </View>
  </Modal>
);

export default DateTimePickerModal = ({
  children,
  onChange,
  touchableStyle,
  modalOverlayStyle,
  modalStyle,
  modalButtonContainer,
  modalButtonStyle,
  modalButtonText,
  show,
  toggle,
  value,
  ...props
}) => {
  return (
    <>
      <TouchableOpacity style={touchableStyle} onPress={toggle}>
        {children}
      </TouchableOpacity>
      <Wrapper
        condition={!isAndroid}
        wrapper={children => (
          <ModalWrapper
            show={show}
            close={toggle}
            modalOverlayStyle={modalOverlayStyle}
            modalStyle={modalStyle}
            modalButtonContainer={modalButtonContainer}
            modalButtonStyle={modalButtonStyle}
            modalButtonText={modalButtonText}
          >
            {children}
          </ModalWrapper>
        )}
      >
        {show && (
          <DateTimePicker
            {...props}
            value={value}
            onChange={(event, date) => {
              if (isAndroid) {
                toggle();
              }

              if (date) {
                onChange(event, date);
              }
            }}
          />
        )}
      </Wrapper>
    </>
  );
};

DateTimePickerModal.defaultProps = {
  modalButtonText: 'Done'
};

DateTimePickerModal.propTypes = {
  /**
   * Text for the iOS modal button (default: "Done").
   */
  modalButtonText: PropTypes.string,
  /**
   * Styles for the modal overlay.
   */
  modalOverlayStyle: ViewPropTypes.style,
  /**
   * Styles for the modal.
   */
  modalStyle: ViewPropTypes.style,
  /**
   * Styles for the modal button.
   */
  modalButtonStyle: ViewPropTypes.style,
  /**
   * Styles for the modal button container.
   */
  modalButtonContainer: ViewPropTypes.style,
  /**
   * Styles for the container of the rendered date/time.
   */
  touchableStyle: ViewPropTypes.style
};
