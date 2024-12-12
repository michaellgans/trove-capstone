// TransactionCard Component

// Asset Imports
import { View, StyleSheet, Modal, Text } from "react-native";
import { UserPhotoSmall } from "./UserPhotoSmall";
import { ArrowIcon } from "./icons/ArrowIcon";
import { CustomButton } from "./Button";
import { FinancialInput } from "./FinancialInput";
import { useState } from "react";

// Script Imports

// Types
type TransactionCardProps = {
  themeColor: string;
  buttonLabel: string;
};

// Returns a TransactionCard Component
export function TransactionCard({themeColor, buttonLabel}: TransactionCardProps) {
  // Define Hook
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View
      style={styles.container}
    >
      {/* User Icon, Arrow, User Icon */}
      <View
        style={styles.transfer}
      >
        <UserPhotoSmall themeColor={themeColor} source={require("../assets/images/avatarSmall.png")} />
        <View
          style={styles.icon}
        >
          <ArrowIcon />
        </View>
        <UserPhotoSmall themeColor={themeColor} source={require("../assets/images/avatarSmall2.png")} />
      </View>
      <FinancialInput symbol="$" type="USD" />
      <CustomButton label={buttonLabel} color={themeColor} onPress={toggleModal} />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}>
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }}>
          <View 
            style={{ 
              backgroundColor: 'white', 
              padding: 20, 
              borderRadius: 30
            }}>
            <Text 
              style={{ 
                fontSize: 30,
                fontFamily: 'Inter',
              }}>
                Transaction Sent!
            </Text>
            <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
            >
            </View>
            <CustomButton label="Close" color="#0255EE" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    elevation: 7,
    padding: 20,
  },
  icon: {
    paddingHorizontal: 8,
  },
  transfer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

