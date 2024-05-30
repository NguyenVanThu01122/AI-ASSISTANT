import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Typewriter = ({
  text,
  sx,
  icon,
}: {
  text: string;
  sx: any;
  icon?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(displayText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }
    }, 30); // Thay đổi thời gian ở đây để điều chỉnh tốc độ
  }, [currentIndex, text]);

  return (
    displayText && (
      <Text
        position="relative"
        sx={{
          "&::after": {
            content: "''",
            display: "inline-block",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            backgroundImage: icon ? `url(${icon})` : "",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "absolute",
            bottom: "2px",
          },
          ...sx,
        }}
      >
        {displayText}
      </Text>
    )
  );
};

export default Typewriter;
