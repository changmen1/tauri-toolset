import * as React from "react";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

function MyApp() {
  const [inputText, setInputText] = useState(""); // 输入框的值
  const [translatedText, setTranslatedText] = useState(""); // 翻译结果
  const { enqueueSnackbar } = useSnackbar();

  // 调用翻译接口
  async function translateText(text: any) {
    if (!text.trim()) return; // 防止空输入
    const response = await fetch(
      "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(text) +
        "&langpair=zh|en"
    );
    const data = await response.json();
    console.log(data.responseData.translatedText);
    setTranslatedText(data.responseData.translatedText); // 更新翻译结果
    return data.responseData.translatedText;
  }
  // 复制文本到剪贴板
  const copyToClipboard = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
    }
  };

  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar("复制成功!", { variant });
    copyToClipboard();
  };

  return (
    <React.Fragment>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          //   bgcolor: "pink",
        }}
        onSubmit={(e) => e.preventDefault()} // 防止表单提交刷新页面
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="请输入"
          inputProps={{ "aria-label": "search google maps" }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => translateText(inputText)}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            setInputText(""); // 清空输入框
            setTranslatedText(""); // 清空翻译结果
          }}
        >
          <BackspaceIcon />
        </IconButton>
      </Paper>
      {/* 翻译结果 + 复制按钮 */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          mt: 2,
          width: "100%",
        }}
      >
        <TextField
          label="翻译内容"
          multiline
          disabled
          minRows={5}
          maxRows={10}
          fullWidth
          variant="outlined"
          value={translatedText} // 显示翻译结果
        />

        {/* 复制按钮 */}
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={handleClickVariant("success")}
          disabled={!translatedText}
        >
          <ContentCopyIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
