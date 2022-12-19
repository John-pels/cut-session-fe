import { IStudioSessions } from "../@types";

export const filterDataByKeyAndValue = (
  data: Array<IStudioSessions>,
  key: keyof IStudioSessions,
  value: string
) => {
  const result = data.filter(
    (item) => item[key].toLowerCase() === value.toLowerCase()
  );
  return result;
};
