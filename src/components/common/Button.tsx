import React from 'react'
import { Button } from "@mui/material";


interface CustomButtonCompProps {
  props?: any,
  handleFunc?: any,
  type?: any
  title?: string
  onClick?: () => void;
}
export const CustomButtonComp: React.FC<CustomButtonCompProps> = ({ props, type, onClick }) => {
  return (
    <Button
      // onClick={handlerFunc}
      type={type}
      sx={{
        backgroundColor: "buttonbg.main",
        mt: props.mt,
        width: props.width,
        lineHeight: props.lineheight,
        fontSize: props.fontsize,
        fontFamily: props.fontfamily,
        height: props.height,
        color: props.color,
      }}
      onClick={onClick}
    >
      {props.text}
    </Button>
  );
};

export const CustomButtonCompTwo: React.FC<CustomButtonCompProps> = ({ title, props, type, onClick }) => {
  return (
    <Button type={type} sx={{
      height: props.height,
      width: props.width,
      fontFamily: props.fontFamily,
      color: props.color,
      fontSize: props.fontSize,
      fontWeight: props.fontweight,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      textTransform: props.textTransform,
      letterSpacing: props.letterspacing

    }}
    onClick={onClick}
    >
      {title}
    </Button>
  )
}