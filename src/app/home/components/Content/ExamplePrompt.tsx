import { setPrompt } from "@/redux/slices/appSlice";
import { Box, Icon, Image, Text } from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineFileDone,
  AiOutlineLaptop,
  AiOutlineRead,
  AiOutlineSun,
} from "react-icons/ai";
import { useDispatch } from "react-redux";

const listPrompt = [
  "Design a fun coding game",
  "Create a script for a family-themed movie",
  "Develop an app to improve mental health",
  "Write a blog post about plant care",
  "Write a blog post about pet care",
  "Write a blog post about infant care",
  "Write a blog post about elderly care",
  "Explain the phenomenon of a solar eclipse",
  "Explain the differences between TypeScript and JavaScript",
  "Design a user interface for an online shopping app using Ant Design",
  "Propose a logo design idea for a tech startup",
  "Draft a script for an action movie",
  "Suggest a learning path for beginners in ReactJS",
  "Give advice to improve problem-solving skills in programming",
  "Guide on using project management tools like Jira or Trello",
  "Create a fantasy story about the world 100 years in the future",
  "Write a script for a reality TV show about software development",
  "Propose a new app to improve team productivity",
  "Write code to create a To-Do List app using ReactJS",
  "Guide on integrating APIs in a NextJS project",
  "Draft a script for a thrilling detective movie",
  "Write a short horror story",
  "Write a script for a movie about the life of a famous musician",
  "Develop a language learning app through games",
];

function getRandomPrompts(arr: any) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

const randomPrompts = getRandomPrompts(listPrompt);

export default function ExamplePrompt() {
  const [examples, setExamples] = useState<any>([]);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useLayoutEffect(() => {
    const examples = [
      {
        prompt: randomPrompts[0],
        icon: AiOutlineSun,
        color: "orange",
      },
      {
        prompt: randomPrompts[1],
        icon: AiOutlineFileDone,
        color: "blue.300",
      },
      {
        prompt: randomPrompts[2],
        icon: AiOutlineRead,
        color: "red.300",
      },
      {
        prompt: randomPrompts[3],
        icon: AiOutlineLaptop,
        color: "turquoise",
      },
    ];
    setExamples(examples);
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        overflowY: "auto",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 0px",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "max-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          padding: {
            base: "0px",
            md: "0px 60px",
          },
        }}
      >
        <Image
          src="/images/logo-ai-assistant.png"
          alt="logo"
          sx={{ width: "70px", height: "70px" }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              base: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gridGap: "16px",
          }}
        >
          {examples.map((example: any, index: number) => (
            <Box
              key={index}
              sx={{
                border: "1px solid gray",
                borderRadius: "13px",
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(setPrompt(t(example.prompt)))}
            >
              <Icon
                as={example.icon}
                color={example.color}
                width={6}
                height={6}
              />
              <Text sx={{ mt: "6px", color: "gray" }}>{t(example.prompt)}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
