export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  gold: string;
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
}

export interface HeaderTheme {
  background: string;
  text: string;
  activeText: string;
  border: string;
  buttonBackground: string;
  buttonText: string;
}

export interface FooterTheme {
  background: string;
  text: string;
  mutedText: string;
  border: string;
}

export interface LayoutTheme {
  maxWidth: string;
  sectionPaddingDesktop: string;
  sectionPaddingTablet: string;
  sectionPaddingMobile: string;
}

export interface BorderRadiusTheme {
  small: string;
  medium: string;
  card: string;
  large: string;
  button: string;
}

export interface Theme {
  brand: {
    name: string;
    shortName: string;
    logoText: string;
    tagline: string;
  };
  colors: ThemeColors;
  header: HeaderTheme;
  footer: FooterTheme;
  layout: LayoutTheme;
  borderRadius: BorderRadiusTheme;
}