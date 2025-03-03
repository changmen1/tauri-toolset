import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Slider,
  Box,
  LinearProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function NovelReader() {
  const [content, setContent] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // 📌 示例：爬取小说 API
  useEffect(() => {
    fetch("https://api.example.com/novel/123") // 这里换成真实的 API
      .then((res) => res.json())
      .then((data) => {
        setContent(data.chapters); // 假设返回 { chapters: ["第1章内容", "第2章内容", ...] }
      });
  }, []);
  // 📌 处理文件上传 (TXT)
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const chapters = text.split(/\n\s*\n/); // 按空行分割章节
    setContent(chapters);
    setCurrentPage(0);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        pb: 4,
        backgroundColor: darkMode ? "#121212" : "#fff",
        color: darkMode ? "#fff" : "#000",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* 顶部工具栏 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            component="span"
          >
            上传小说
          </Button>
        </label>

        <IconButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      {/* 小说内容 */}
      <Paper
        sx={{
          p: 3,
          minHeight: "60vh",
          maxHeight: "70vh",
          overflowY: "auto",
          borderRadius: 2,
          textAlign: "justify",
          backgroundColor: darkMode ? "#1e1e1e" : "#fafafa",
        }}
      >
        <Typography variant="h6">第 {currentPage + 1} 章</Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 2 }}>
          {content[currentPage] || "加载中..."}
        </Typography>
      </Paper>

      {/* 翻页 & 进度条 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <IconButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          <ArrowBackIcon />
        </IconButton>

        <Slider
          value={currentPage}
          min={0}
          max={content.length - 1}
          step={1}
          onChange={(_, newValue) => setCurrentPage(newValue as number)}
          sx={{ width: "70%" }}
        />

        <IconButton
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, content.length - 1))
          }
          disabled={currentPage === content.length - 1}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(currentPage / (content.length - 1)) * 100}
        sx={{ mt: 2 }}
      />
    </Container>
  );
}
