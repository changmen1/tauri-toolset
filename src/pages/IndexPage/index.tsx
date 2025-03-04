import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
// import ImportContactsIcon from "@mui/icons-material/ImportContacts";
// import DescriptionIcon from "@mui/icons-material/Description";
// import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { Outlet, useNavigate } from "react-router-dom";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "home",
  },
  {
    segment: "translate",
    title: "翻译",
    icon: <GTranslateIcon />,
  },
  {
    segment: "deepseek",
    title: "DeepSeek",
    icon: <SmartToyIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
//   {
//     segment: "reports",
//     title: "电影",
//     icon: <MovieFilterIcon />,
//     children: [
//       {
//         segment: "sales",
//         title: "Sales",
//         icon: <DescriptionIcon />,
//       },
//       {
//         segment: "traffic",
//         title: "Traffic",
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
  {
    segment: "setting",
    title: "设置",
    icon: <SettingsIcon />,
  },
  {
    segment: "guanyu",
    title: "关于",
    icon: <InfoIcon />,
  },
];

const demoTheme = extendTheme({
  //   colorSchemes: { light: true, dark: true },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F9F9FE",
          paper: "#EEEEF9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#020817",
          paper: "#020817",
        },
      },
    },
  },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(): Router {
  const location = window.location.pathname; // 获取当前真实路径
  const navigate = useNavigate(); // 获取 navigate 函数
  const router = React.useMemo(() => {
    return {
      pathname: location, // 直接使用当前 URL
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => {
        navigate(path);
      },
    };
  }, [location, navigate]);

  return router;
}

export const IndexPage = (props: any) => {
  const { window } = props;

  const router = useDemoRouter();

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        branding={{
          logo: (
            <img
              src="/src/assets/logo.jpg"
              alt="Logo"
              style={{ borderRadius: "50%" }}
            />
          ),
          title: "zxlToolset",
        }}
      >
        <PageContainer>
          <Grid container spacing={1}>
            {/* 子页面 */}
            <Outlet />
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};
