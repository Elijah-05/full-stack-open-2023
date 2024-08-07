export interface DiaryType {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export type DiaryEntry = Omit<DiaryType, "id">;

export interface NewEntryPropType {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

interface InputHandlerProp {
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface WeatherSelectionProps extends InputHandlerProp {
  weather: string;
}

export interface VisibilitySelectionProps extends InputHandlerProp {
  visibility: string;
}
