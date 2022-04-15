import React from "react";
import { View } from "react-native";

const TennisBall = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#dbfc53",
        width: 200,
        height: 200,
        borderRadius: 100,
        position: "absolute",
        left: props.left,
        top: props.top,
        overflow: "hidden",
        transform: [{ rotate: props.rotation }],
      }}
    >
      <View
        style={{
          position: "relative",
          width: 200,
          height: 200,
          left: 125,
          borderRadius: 100,
          borderColor: "white",
          borderWidth: 5,
        }}
      >
        <View
          style={{
            position: "relative",
            width: 200,
            height: 200,
            top: -5,
            left: -255,
            borderRadius: 100,
            borderColor: "white",
            borderWidth: 5,
          }}
        ></View>
      </View>
    </View>
  );
};

export default TennisBall;
